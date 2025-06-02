import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
} from '@mui/material';
import { useState } from 'react';

export default function LoginInit() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!credentials.email) {
      newErrors.email = 'Email es obligatorio';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Formato de email no válido';
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = 'Contraseña es obligatoria';
      valid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch('https://webapp-backend-tvrm.onrender.com/api/homeowner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (res.ok) {
        const data = await res.json();
        
        window.location.href = '/home';
        // Guardar sesión o redirigir
         localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Stack spacing={2}>
        <FormControl fullWidth error={!!errors.email}>
          <TextField
            label="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            helperText={errors.email}
          />
        </FormControl>

        <FormControl fullWidth error={!!errors.password}>
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            helperText={errors.password}
          />
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          Iniciar sesión
        </Button>
      </Stack>
    </Container>
  );
}
