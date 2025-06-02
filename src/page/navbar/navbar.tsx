import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

export default function Navbar() {
  const handleLogout = () => {
    // Aquí puedes limpiar el localStorage, redirigir, etc.
    localStorage.removeItem("user");
    window.location.href = "/"; // redirige al login o página principal
  };
const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          WebApp
        </Typography>

        {/* Espaciador para empujar el botón a la derecha */}
        <Box sx={{ flexGrow: 1 }} />
   {user.firstname && (
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Welcome, {user.firstname}
          </Typography>
        )}

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
