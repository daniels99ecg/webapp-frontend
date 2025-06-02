import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Card,
  CardContent,
  Checkbox, 
  ListItemText
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../navbar/navbar";

const projectOptions = ["Lawn Care", "Pool Care", "Pest Control"];

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [addToBid, setAddToBid] = useState<null | boolean>(null);
  const [bidForm, setBidForm] = useState({
    startDate: "",
    endDate: "",
    cost: "",
  });
const user = JSON.parse(localStorage.getItem("user") || "{}");

useEffect(() => {
  const fetchProjects = async () => {
    try {
      let url = "";

      if (user.userType === "serviceprovider") {
        url = `https://webapp-backend-tvrm.onrender.com/api/homeowner/list`;
      } else if (user.userType === "homeowner") {
        url = `https://webapp-backend-tvrm.onrender.com/api/homeowner/allhome?user_id=${user.user_id}`;
      } else {
        throw new Error("Tipo de usuario no válido");
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error(error);
      alert("Error loading projects");
    }
  };

  fetchProjects();
}, []);

 

  const handleAddProject = () => {
    setSelectedProject([]);
    setAddToBid(null);
    setBidForm({ startDate: "", endDate: "", cost: "" });
    setShowDialog(true);
  };

  const handleSaveProject = async () => {
  const newProject = {
    id: uuidv4(),
    name: selectedProject,
    addToBid,
    ...bidForm,
    user_id: user.user_id,

  };

  try {
    const response = await fetch("https://webapp-backend-tvrm.onrender.com/api/homeowner/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error("Failed to save project");
    }

    // Opcional: puedes obtener la respuesta JSON
    const savedProject = await response.json();

    // Actualizas tu estado con el proyecto guardado
    setProjects([...projects, savedProject]);
    setShowDialog(false);
  } catch (error) {
    console.error("Error saving project:", error);
    alert("Error saving project");
  }
};


  return (
  <>
  <Navbar/>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "88vh",
      px: 2,
    }}
  >
    <Button variant="contained" color="primary" onClick={handleAddProject}>
      Add Project
    </Button>

    {/* Dialog para agregar proyecto */}
    <Dialog open={showDialog} onClose={() => setShowDialog(false)} fullWidth>
      <DialogTitle>Add Project</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
    <FormControl fullWidth>
  <InputLabel>Select Project</InputLabel>
  <Select
    multiple
    value={selectedProject}
    onChange={(e) => setSelectedProject(e.target.value as string[])}
    label="Select Project"
    renderValue={(selected) => (selected as string[]).join(", ")}

  >
    {projectOptions.map((project) => (
      <MenuItem key={project} value={project}>
        <Checkbox checked={selectedProject.indexOf(project) > -1} />
        <ListItemText primary={project} />
      </MenuItem>
    ))}
  </Select>
</FormControl>


        {addToBid === null && selectedProject && (
          <Box>
<Typography>Do you want to add this project to the current bid?</Typography>
            <Button onClick={() => setAddToBid(true)}>Yes</Button>
            <Button onClick={() => setAddToBid(false)}>No</Button>
          </Box>
        )}

        {addToBid && (
          <>
           <TextField
  label="Start Date"
  type="date"
  InputLabelProps={{ shrink: true }}
  fullWidth
  value={bidForm.startDate}
  onChange={(e) => setBidForm({ ...bidForm, startDate: e.target.value })}
/>
<TextField
  label="End Date"
  type="date"
  InputLabelProps={{ shrink: true }}
  fullWidth
  value={bidForm.endDate}
  onChange={(e) => setBidForm({ ...bidForm, endDate: e.target.value })}
/>
<TextField
  label="Bid Cost ($)"
  type="number"
  fullWidth
  value={bidForm.cost}
  onChange={(e) => setBidForm({ ...bidForm, cost: e.target.value })}
/>

          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setShowDialog(false)}>Cancel</Button>
        <Button onClick={handleSaveProject} disabled={!selectedProject}>Save</Button>
      </DialogActions>
    </Dialog>

      <Box mt={4} width="100%" maxWidth="600px">
      <Typography variant="h5" align="center">
        Registered Projects
      </Typography>
      {projects.map((p) => (
        <Card key={p.id} sx={{ mt: 2 }}>
          <CardContent>
            <Typography>
              <strong>ID:</strong> {p.id}
            </Typography>
            <Typography>
              <strong>Name:</strong> {Array.isArray(p.names) ? p.names.join(", ") : p.name}
            </Typography>
            <Typography>
              <strong>Added to Bid:</strong> {p.add_to_bid ? "Yes" : "No"}
            </Typography>
            {p.add_to_bid && (
              <>
                <Typography>
                  <strong>Start Date:</strong>{" "}
                  {new Date(p.start_date).toLocaleDateString("en-US")}
                </Typography>
                <Typography>
                  <strong>End Date:</strong>{" "}
                  {new Date(p.end_date).toLocaleDateString("en-US")}
                </Typography>
                <Typography>
                  <strong>Cost:</strong> ${p.costs}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  </Box>
</>

  );
}
