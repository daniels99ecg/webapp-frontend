
import { Button, Stack, Typography, Container, Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';

import { useState } from 'react';
import RegisterHomeowner from './RegisterHomeowner';
import CloseIcon from '@mui/icons-material/Close';
import RegisterServiceProvider from './RegisterServiceProvider';


export default function Register() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalProvider, setOpenModalProvider] = useState(false);


  const handleOpenModal = () => {
    setOpenModal(true);
   
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const handleOpenModalProvider = () => {
    setOpenModalProvider(true);

  };

  const handleCloseModalProvider = () => {
    setOpenModalProvider(false);
  };


  return (
    <Container>
    <Typography variant="h4" align="center" gutterBottom>
    What type of user do you want to register?
</Typography>

<Box display="flex" justifyContent="center">
  <Stack spacing={2} direction="column" width="300px">
    <Button variant="contained" fullWidth onClick={handleOpenModal}>
      Register HomeOwner
    </Button>
    <Button variant="contained" fullWidth onClick={handleOpenModalProvider}>
      Register ServiceProvider 
    </Button>
  </Stack>
</Box>

     {/* Registrar propetario */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle>
        <IconButton
      edge="end"
      color="inherit"
      onClick={handleCloseModal}
      aria-label="close"
      sx={{
        position: 'absolute',
        right: 20,
        top: 8,
      }}
    >
      <CloseIcon /> 
    </IconButton>
        </DialogTitle>
        <DialogContent>
          <RegisterHomeowner />
        </DialogContent>
        
      </Dialog>

        {/* Registrar provider */}
        <Dialog open={openModalProvider} onClose={handleCloseModalProvider} fullWidth>
        <DialogTitle>

        <IconButton
      edge="end"
      color="inherit"
      onClick={handleCloseModalProvider}
      aria-label="close"
      sx={{
        position: 'absolute',
        right: 20,
        top: 8,
      }}
    >
      <CloseIcon /> {/* Aquí utilizamos el CloseIcon */}
    </IconButton>
        </DialogTitle>
        <DialogContent>
          <RegisterServiceProvider />
        </DialogContent>
        
      </Dialog>




    </Container>
  );
}
