
import { TextField, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function RegisterServiceProvider() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    companyname: '',
    experience: '',
    phonenumber: '',
    countrycode: '',
    address: '',
    state: '',
    zcode: '',
    servicetype: '',
    licensed: '',
    insuranced: '',
    userid: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    switch (name) {
      case 'firstname':
        if (!value.trim()) errorMsg = 'Nombre requerido';
        break;
      case 'lastname':
        if (!value.trim()) errorMsg = 'Apellido requerido';
        break;
      case 'companyname':
        if (!value.trim()) errorMsg = 'Nombre de la empresa requerido';
        break;
      case 'experience':
        if (!value.trim()) errorMsg = 'Experiencia requerida';
        else if (isNaN(Number(value)) || Number(value) < 0)
          errorMsg = 'Debe ser un número positivo';
        break;
      case 'phonenumber':
        if (!value.trim()) errorMsg = 'Teléfono requerido';
        else if (value.length < 7) errorMsg = 'Teléfono inválido';
        break;
      case 'countrycode':
        if (!value.trim()) errorMsg = 'Código país requerido';
        break;
      case 'address':
        if (!value.trim()) errorMsg = 'Dirección requerida';
        break;
      case 'state':
        if (!value.trim()) errorMsg = 'Departamento/Estado requerido';
        break;
      case 'zcode':
        if (!value.trim()) errorMsg = 'Código postal requerido';
        else if (!/^\d+$/.test(value)) errorMsg = 'Solo números';
        break;
      case 'servicetype':
        if (!value.trim()) errorMsg = 'Tipo de servicio requerido';
        break;
      case 'licensed':
        if (!value.trim()) errorMsg = 'Debe indicar si tiene licencia (sí/no)';
        else if (!['sí', 'no', 'si', 'no'].includes(value.toLowerCase()))
          errorMsg = 'Debe ser "sí" o "no"';
        break;
      case 'insuranced':
        if (!value.trim()) errorMsg = 'Debe indicar si tiene seguro (sí/no)';
        else if (!['sí', 'no', 'si', 'no'].includes(value.toLowerCase()))
          errorMsg = 'Debe ser "sí" o "no"';
        break;
      case 'userid':
        if (value.trim() && isNaN(Number(value))) errorMsg = 'Debe ser un número';
        break;
    }
    return errorMsg;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar el campo en tiempo real
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      const errorMsg = validateField(key, value);
      if (errorMsg) newErrors[key] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return; // prevenir submit si hay errores

    try {
      const res = await fetch('http://localhost:3000/api/serviceprovider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          companyname: formData.companyname,
          experience: parseInt(formData.experience) || 0,
          phonenumber: formData.phonenumber,
          countrycode: formData.countrycode,
          address: formData.address,
          state: formData.state,
          zcode: formData.zcode,
          servicetype: formData.servicetype,
          licensed: formData.licensed,
          insuranced: formData.insuranced,
          userid: parseInt(formData.userid) || null,
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Proveedor de servicio registrado correctamente',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            container: 'swal2-container',
            popup: 'swal-top-zindex',
          },
        }).then(() => {
          window.location.href = '/';
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'No se pudo registrar el proveedor',
          customClass: {
            container: 'swal2-container',
            popup: 'swal-top-zindex',
          },
          target: document.body,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al conectar con el servidor',
        customClass: {
          container: 'swal2-container',
          popup: 'swal-top-zindex',
        },
        target: document.body,
      });
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
  Service Provider Registration
</Typography>

   <Grid container spacing={2}>
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
  <Grid item xs={12} sm={6}>
    <TextField
      name="companyname"
      label="Company Name"
      onChange={handleChange}
      required
      fullWidth
      error={!!errors.companyname}
      helperText={errors.companyname}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      name="experience"
      label="Years of Experience"
      type="number"
      onChange={handleChange}
      required
      fullWidth
      error={!!errors.experience}
      helperText={errors.experience}
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
  <Grid item xs={12} sm={6}>
    <TextField
      name="servicetype"
      label="Service Type"
      onChange={handleChange}
      required
      fullWidth
      error={!!errors.servicetype}
      helperText={errors.servicetype}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      name="licensed"
      label="Licensed (yes/no)"
      onChange={handleChange}
      required
      fullWidth
      error={!!errors.licensed}
      helperText={errors.licensed}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <TextField
      name="insuranced"
      label="Insured (yes/no)"
      onChange={handleChange}
      required
      fullWidth
      error={!!errors.insuranced}
      helperText={errors.insuranced}
    />
  </Grid>

  <TextField
    name="userid"
    label="Owner ID (optional)"
    onChange={handleChange}
    fullWidth
    sx={{ maxWidth: "86%" }}
    error={!!errors.userid}
    helperText={errors.userid}
  />
  <Grid item xs={12}>
    <Button variant="contained" onClick={handleSubmit} fullWidth type="button">
      Submit
    </Button>
  </Grid>
</Grid>

     
    </Container>
  );
}
