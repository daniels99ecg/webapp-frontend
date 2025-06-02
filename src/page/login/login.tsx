import { Container, Typography, Button, Stack, Box, Modal, Paper } from '@mui/material';
import LoginInit from './logininit';
import { useState } from 'react';
import Register from '../register/register';

export default function Login() {

  const [openLogin, setOpenLogin] = useState(false);

  const [openRegister, setOpenRester] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);



  const handleOpenRegister = () => setOpenRester(true);
  const handleCloseRegster = () => setOpenRester(false);


  return (
    <Container maxWidth="sm">
    <Box
      minHeight="90vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        elevation={4} // sombra para dar profundidad
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Welcome!
        </Typography>
        <Stack spacing={2} width="100%">
          <Button variant="contained" fullWidth onClick={handleOpenLogin}>
            Login
          </Button>
          <Button variant="outlined" fullWidth onClick={handleOpenRegister}>
            Register
          </Button>
        </Stack>
      </Paper>
    </Box>

        {/* Login */}
      <Modal open={openLogin} onClose={handleCloseLogin}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
            maxWidth: '90%',
          }}
        >
          <LoginInit />
        </Box>
      </Modal>

  {/* option register */}
      <Modal open={openRegister} onClose={handleCloseRegster}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
            maxWidth: '90%',
          }}
        >
           <Register />
        </Box>
      </Modal>


    </Container>
   
  );
}
