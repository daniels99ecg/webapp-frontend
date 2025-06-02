import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterHomeowner() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    countrycode: "",
    country: "",
    address: "",
    state: "",
    zcode: "",
    servicetype: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar solo el campo que cambió
    let errorMsg = "";

    switch (name) {
      case "firstname":
        if (!value.trim()) errorMsg = "Nombre requerido";
        break;
      case "lastname":
        if (!value.trim()) errorMsg = "Apellido requerido";
        break;
      case "email":
        const emailRegex = /\S+@\S+\.\S+/;
        if (!value.trim()) errorMsg = "Correo requerido";
        else if (!emailRegex.test(value)) errorMsg = "Correo no válido";
        break;
      case "phonenumber":
        if (!value.trim()) errorMsg = "Teléfono requerido";
        else if (value.length < 7) errorMsg = "Teléfono inválido";
        break;
      case "password":
        if (!value.trim()) errorMsg = "Contraseña requerida";
        else if (value.length < 6) errorMsg = "Mínimo 6 caracteres";
        break;
      case "countrycode":
        if (!value.trim()) errorMsg = "Código país requerido";
        break;
      case "country":
        if (!value.trim()) errorMsg = "País requerido";
        break;
      case "address":
        if (!value.trim()) errorMsg = "Dirección requerida";
        break;
      case "state":
        if (!value.trim()) errorMsg = "Estado requerido";
        break;
      case "zcode":
        if (!value.trim()) errorMsg = "Código postal requerido";
        else if (!/^\d+$/.test(value)) errorMsg = "Solo números";
        break;
      case "servicetype":
        if (!value.trim()) errorMsg = "Servicio requerido";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.firstname.trim()) newErrors.firstname = "Nombre requerido";
    if (!formData.lastname.trim()) newErrors.lastname = "Apellido requerido";
    if (!formData.email.trim()) newErrors.email = "Correo requerido";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Correo no válido";

    if (!formData.phonenumber.trim())
      newErrors.phonenumber = "Teléfono requerido";
    else if (formData.phonenumber.length < 7)
      newErrors.phonenumber = "Teléfono inválido";

    if (!formData.password.trim()) newErrors.password = "Contraseña requerida";
    else if (formData.password.length < 6)
      newErrors.password = "Mínimo 6 caracteres";

    if (!formData.countrycode.trim())
      newErrors.countrycode = "Código país requerido";
    if (!formData.country.trim()) newErrors.country = "País requerido";
    if (!formData.address.trim()) newErrors.address = "Dirección requerida";
    if (!formData.state.trim()) newErrors.state = "Estado requerido";

    if (!formData.zcode.trim()) newErrors.zcode = "Código postal requerido";
    else if (!/^\d+$/.test(formData.zcode)) newErrors.zcode = "Solo números";

    if (!formData.servicetype.trim())
      newErrors.servicetype = "Servicio requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const res = await fetch("http://localhost:3000/api/homeowner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Propietario registrado correctamente",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            container: "swal2-container",
            popup: "swal-top-zindex",
          },
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "No se pudo registrar el propietario",
          customClass: {
            container: "swal2-container",
            popup: "swal-top-zindex",
          },
          target: document.body,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al conectar con el servidor",
        customClass: {
          container: "swal2-container",
          popup: "swal-top-zindex",
        },
        target: document.body,
      });
      console.error(error);
    }
  };

  return (
    <Container>
  <Typography variant="h5" gutterBottom>
    Homeowner Registration
  </Typography>
  <Grid container spacing={2}>
    {/* First row fields (two columns) */}
    <Grid item xs={12} sm={6}>
      <TextField
        name="firstname"
        label="First Name"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.firstname}
        helperText={errors.firstname}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        name="lastname"
        label="Last Name"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.lastname}
        helperText={errors.lastname}
      />
    </Grid>

    {/* Second row fields (two columns) */}
    <Grid item xs={12} sm={6}>
      <TextField
        name="email"
        label="Email"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        name="phonenumber"
        label="Phone Number"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.phonenumber}
        helperText={errors.phonenumber}
      />
    </Grid>

    {/* Third row fields (two columns) */}
    <Grid item xs={12} sm={6}>
      <TextField
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.password}
        helperText={errors.password}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        name="countrycode"
        label="Country Code"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.countrycode}
        helperText={errors.countrycode}
      />
    </Grid>

    {/* Fourth row fields (two columns) */}
    <Grid item xs={12} sm={6}>
      <TextField
        name="country"
        label="Country"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.country}
        helperText={errors.country}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        name="address"
        label="Address"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.address}
        helperText={errors.address}
      />
    </Grid>

    {/* Fifth row fields (two columns) */}
    <Grid item xs={12} sm={6}>
      <TextField
        name="state"
        label="State"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.state}
        helperText={errors.state}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        name="zcode"
        label="Postal Code"
        onChange={handleChange}
        required
        fullWidth
        error={!!errors.zcode}
        helperText={errors.zcode}
      />
    </Grid>

    {/* 'servicetype' field full width */}
    <TextField
      name="servicetype"
      label="Service Type"
      onChange={handleChange}
      required
      fullWidth
      sx={{ maxWidth: "86%" }}
      error={!!errors.servicetype}
      helperText={errors.servicetype}
    />

    {/* Submit button row */}
    <Grid item xs={12}>
      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          type="button"
        >
          Submit
        </Button>
      </Stack>
    </Grid>
  </Grid>
</Container>

  );
}
