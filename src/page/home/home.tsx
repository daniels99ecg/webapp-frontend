import { useEffect, useState } from "react";
// @ts-ignore
import {
  // @ts-ignore
  Button,
  // @ts-ignore
  TextField,
  // @ts-ignore
  Select,
  // @ts-ignore
  MenuItem,
  // @ts-ignore
  Dialog,
  DialogTitle,
  // @ts-ignore
  DialogContent,
  // @ts-ignore
  DialogActions,
  // @ts-ignore
  FormControl,
  // @ts-ignore
  InputLabel,
  Typography,
  Box,
  // @ts-ignore
  Card,
  // @ts-ignore
  // @ts-ignore
  CardContent,
  // @ts-ignore
  Checkbox, 
  // @ts-ignore
  ListItemText,
// @ts-ignore
  Table,
  // @ts-ignore
  TableBody,
  // @ts-ignore
  TableCell,
  // @ts-ignore
  TableContainer,
  // @ts-ignore
  TableHead,
  // @ts-ignore
  TableRow,
  // @ts-ignore
  Paper,
  // @ts-ignore
  IconButton,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, Tab } from '@mui/material';

import { v4 as uuidv4 } from "uuid";
import Navbar from "../navbar/navbar";
// @ts-ignore
import DoneIcon from '@mui/icons-material/Done';
// @ts-ignore
import UpdateIcon from '@mui/icons-material/Update';

// @ts-ignore
const projectOptions = ["Lawn Care", "Pool Care", "Pest Control"];

export default function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string[]>([]);
  // @ts-ignore
  const [showDialog, setShowDialog] = useState(false);
  const [addToBid, setAddToBid] = useState<null | boolean>(null);
  const [bidForm, setBidForm] = useState({
    startDate: "",
    endDate: "",
    cost: "",
  });
const user = JSON.parse(localStorage.getItem("user") || "{}");
const [editingProject, setEditingProject] = useState<any | null>(null);
type Homeowner = {
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  servicetype: string;
};

type ServiceProvider = {
  serviceprovider_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  companyname: string;
  servicetype: string;
};

const [homeowners, setHomeowners] = useState<Homeowner[]>([]);
const [serviceproviders, setServiceproviders] = useState<ServiceProvider[]>([]);
useEffect(() => {
  const fetchProjects = async () => {
    try {
      let url = "";

      if (user.userType === "serviceprovider") {
        url = `${import.meta.env.VITE_API_URL}/api/homeowner/list`;
      } else if (user.userType === "homeowner") {
        url = `${import.meta.env.VITE_API_URL}/api/homeowner/allhome?user_id=${user.user_id}`;
      } else if (user.userType === "admin") {
        url = `${import.meta.env.VITE_API_URL}/api/homeowner/all`;
      } else {
        console.error("Invalid user type");
        return;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();

    if (user.userType === "admin") {
  setHomeowners(data.homeowners || []);
  setServiceproviders(data.serviceproviders || []);
} else {
        // Si la respuesta es un array vacío, no mostrar alerta
        if (Array.isArray(data) && data.length === 0) {
          console.log("No projects found");
          setProjects([]);
          return;
        }

        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("Error loading projects");
    }
  };

  fetchProjects();
}, []);


// @ts-ignore
  const handleAddProject = () => {
    setSelectedProject([]);
    setAddToBid(null);
    setBidForm({ startDate: "", endDate: "", cost: "" });
    setEditingProject(null);
    setShowDialog(true);
  };

//   const handleSaveProject = async () => {
//       const addToBidValue = projects.length < 15 ? false : addToBid;
// console.log("Add to bid value:", projects.length);
//   const newProject = {
//     id: uuidv4(),
//     name: selectedProject,
//     addToBid: addToBidValue,
//     ...bidForm,
//     user_id: user.user_id,

//   };
// console.log("Saving project:", newProject); 
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/homeowner/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newProject),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save project");
//     }

//     // Opcional: puedes obtener la respuesta JSON
//     const savedProject = await response.json();

//     // Actualizas tu estado con el proyecto guardado
//     setProjects([...projects, savedProject]);
//     setShowDialog(false);
//   } catch (error) {
//     console.error("Error saving project:", error);
//     alert("Error saving project");
//   }
// };
// @ts-ignore
const handleSaveProject = async () => {
  const addToBidValue = projects.length < 15 ? false : addToBid;

 const newProject = {
  id: editingProject ? editingProject.id : uuidv4(),
  names: selectedProject, // este es el campo correcto que usa el backend
  add_to_bid: addToBidValue,
  start_date: bidForm.startDate || null,
  end_date: bidForm.endDate || null,
  costs: bidForm.cost || null,
  user_id: user.user_id,
  update_data: editingProject ? true : null, // opcional: indica si es edición
};


  try {
    const url = editingProject
      ? `${import.meta.env.VITE_API_URL}/api/serviceprovider/updateall`
      : `${import.meta.env.VITE_API_URL}/api/homeowner/register`;

    const method = editingProject ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) throw new Error("Failed to save project");

    const savedProject = await response.json();

    if (editingProject) {
      // Reemplaza el proyecto actualizado
      setProjects(projects.map((p) => (p.id === savedProject.id ? savedProject : p)));
    } else {
      setProjects([...projects, savedProject]);
    }

    setShowDialog(false);
  } catch (error) {
    console.error("Error saving project:", error);
    alert("Error saving project");
  }
};
// @ts-ignore
const handleEditProject = (project: any) => {
  setSelectedProject(Array.isArray(project.names) ? project.names : [project.name]);
  setAddToBid(project.add_to_bid);
  setBidForm({
    startDate: project.start_date || "",
    endDate: project.end_date || "",
    cost: project.costs || "",
  });
  setEditingProject(project); // setea el proyecto a editar
  setShowDialog(true);
};


const homeownerColumns = [
  { field: 'firstname', headerName: 'First Name', flex: 1 },
  { field: 'lastname', headerName: 'Last Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'phonenumber', headerName: 'Phone', flex: 1 },
   { field: 'address', headerName: 'Address', flex: 1},
    { field: 'zcode', headerName: 'ZIP Code', flex: 1 },
];

const serviceProviderColumns = [
  { field: 'firstname', headerName: 'First Name', flex: 1 },
  { field: 'lastname', headerName: 'Last Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'phonenumber', headerName: 'Phone', flex: 1 },
  { field: 'companyname', headerName: 'Company', flex: 1 },
];
const [selectedTab, setSelectedTab] = useState(0);
const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
  setSelectedTab(newValue);
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
  {user.userType === 'admin' ? (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab label="Homeowners" />
        <Tab label="Service Providers" />
      </Tabs>

      <Box mt={3} width="100%">
        {selectedTab === 0 && (
          <>
            <Typography variant="h6" gutterBottom>Homeowners</Typography>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={homeowners}
                columns={homeownerColumns}
                getRowId={(row) => row.user_id}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
              />
            </div>
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Typography variant="h6" gutterBottom>Service Providers</Typography>
            <div style={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={serviceproviders}
                columns={serviceProviderColumns}
                getRowId={(row) => row.serviceprovider_id}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
              />
            </div>
          </>
        )}
      </Box>
    </>
  ) : (
    <DialogTitle>Your registration process has been completed ¡¡¡Thank you !!!</DialogTitle>
  )}
</Box>

  {/* <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "88vh",
      px: 2,
    }}
  >
    {user.userType !== "serviceprovider" && (
  <Button variant="contained" color="primary" onClick={handleAddProject}>
    New Bidding Event
  </Button>
)}


    
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


    {(addToBid === null && selectedProject && projects.length > 15) || editingProject ? (
  <Box>
    <Typography>Do you want to add this project to the current bid?</Typography>
    <Button onClick={() => setAddToBid(true)}>Yes</Button>
    <Button onClick={() => setAddToBid(false)}>No</Button>
  </Box>
) : null}


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
{projects.length === 0 ? (
    <Typography align="center" mt={2}>
      No projects found.
    </Typography>
  ) : (
    projects.map((p) => (
      <Card key={p.id} sx={{ mt: 2 }}>
        <CardContent>
          <Typography>
            <strong>Name:</strong>{" "}
            {Array.isArray(p.names) ? p.names.join(", ") : p.name}
          </Typography>
          <Typography>
            <strong>Added to Bid:</strong> {p.add_to_bid ? "Yes" : "No"}
          </Typography>
         {p.add_to_bid && projects.length >= 15 && (
  <>
    {p.update_data ? (
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
    ) : (
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
  </>
)}

    {user.userType === "homeowner" && p.update_data &&(
  <Box display="flex" justifyContent="flex-end" mt={2}>
    <IconButton onClick={() => handleEditProject(p)}>
      <UpdateIcon />
    </IconButton>
  </Box>
)}


          {user.userType == "serviceprovider"  && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
  <IconButton
    color="primary"
    onClick={async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/serviceprovider/update?user_id=${p.id}`, {
          method: 'PUT',
        });
        if (!response.ok) throw new Error('Error al actualizar');
        const data = await response.json();
        console.log('Proyecto actualizado:', data);
        // Opcional: mostrar feedback visual
        alert('Proyecto actualizado con éxito');
      } catch (err) {
        console.error(err);
        alert('Error al actualizar el proyecto');
      }
    }}
  >
    <DoneIcon />
  </IconButton>
</Box>
          )} 
        
        </CardContent>
      </Card>
    ))
  )}


{user.userType == "serviceprovider" && projects.length > 0 && (
  <Box mt={4} width="100%" maxWidth="600px">
    <Typography variant="h6" align="center" gutterBottom>
      Service Type
    </Typography>

    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Project Type</strong></TableCell>
            <TableCell align="center"><strong>Count</strong></TableCell>
            <TableCell align="center"><strong>Mark</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectOptions.map((type) => {
            const count = projects.filter((p) =>
              Array.isArray(p.names) ? p.names.includes(type) : p.name === type
            ).length;

            return (
              <TableRow key={type}>
                <TableCell align="center">{type}</TableCell>
                <TableCell align="center">{count}</TableCell>
                <TableCell align="center">{count > 0 ? "✓" : "✗"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)}

</Box>

  </Box> */}
</>

  );
}
