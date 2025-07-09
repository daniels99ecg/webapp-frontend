import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
} from "@mui/material";
import { useState } from "react";

export default function LoginInit() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!credentials.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (credentials.password.length < 6) {
      newErrors.password = "Must be at least 6 characters";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/homeowner/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("resultado", data);
        window.location.href = "/home";
        // Guardar sesión o redirigir
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Incorrect credentials");
      }
    } catch (err) {
      alert("Error connecting to the server");
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
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            helperText={errors.password}
          />
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          Sign In
        </Button>
      </Stack>
    </Container>
  );
}
