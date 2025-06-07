import { TextField, Button, Container, Typography, MenuItem, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";

import { useState } from "react";
import Swal from "sweetalert2";
import {  Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterServiceProvider() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    companyname: "",
    experience: "",
    phonenumber: "",
    city: "",
    address: "",
    state: "",
    zcode: "",
    servicetype: "",
    licensed: "",
    insuranced: "",
    email: "",
    passwords: "",
  });
    const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

const validateField = (name: string, value: string) => {
  let errorMsg = "";
  switch (name) {
    case "firstname":
      if (!value.trim()) errorMsg = "First name is required";
      break;
    case "lastname":
      if (!value.trim()) errorMsg = "Last name is required";
      break;
    case "companyname":
      if (!value.trim()) errorMsg = "Company name is required";
      break;
    case "experience":
      if (!value.trim()) errorMsg = "Experience is required";
      else if (isNaN(Number(value)) || Number(value) < 0)
        errorMsg = "Must be a positive number";
      break;
    case "phonenumber":
      if (!value.trim()) errorMsg = "Phone number is required";
      else if (value.length < 7) errorMsg = "Invalid phone number";
      break;
    case "countrycode":
      if (!value.trim()) errorMsg = "Country code is required";
      break;
    case "address":
      if (!value.trim()) errorMsg = "Address is required";
      break;
    case "state":
      if (!value.trim()) errorMsg = "State is required";
      break;
    case "zcode":
      if (!value.trim()) errorMsg = "Postal code is required";
      else if (!/^\d+$/.test(value)) errorMsg = "Numbers only";
      break;
    case "servicetype":
      if (!value.trim()) errorMsg = "Service type is required";
      break;
    case "licensed":
      if (!value.trim()) errorMsg = "Please indicate if you are licensed (yes/no)";
      else if (!["yes", "no"].includes(value.toLowerCase()))
        errorMsg = 'Must be "yes" or "no"';
      break;
    case "insuranced":
      if (!value.trim()) errorMsg = "Please indicate if you are insured (yes/no)";
      else if (!["yes", "no"].includes(value.toLowerCase()))
        errorMsg = 'Must be "yes" or "no"';
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/serviceprovider`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          companyname: formData.companyname,
          experience: parseInt(formData.experience) || 0,
          phonenumber: formData.phonenumber,
          city: formData.city,
          address: formData.address,
          state: formData.state,
          zcode: formData.zcode,
          servicetype: formData.servicetype,
          licensed: formData.licensed,
          insuranced: formData.insuranced,
          email:formData.email,
          passwords:formData.passwords
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Service provider registered successfully",
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
          text: errorData.message || "Could not register the provider",
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
        text: "Error connecting to the server",
        customClass: {
          container: "swal2-container",
          popup: "swal-top-zindex",
        },
        target: document.body,
      });
      console.error(error);
    }
  };

const usStates = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];
const serviceOptions = ['Lawn Care', 'Pool Care', 'Pest Control'];
  return (
    <>
      <Container>
        <Typography variant="h5" gutterBottom>
          Service Provider Registration
        </Typography>

        <Grid container spacing={2}>
          <Grid >
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
          <Grid >
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
           <Grid >
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

     <Grid>
      <TextField
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        required
        fullWidth
        
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ marginLeft: -3 }}>
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Grid> 
          <Grid >
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
          <Grid >
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
          <Grid >
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
          <Grid >
            <TextField
              name="city"
              label="City"
              onChange={handleChange}
              required
              fullWidth
              error={!!errors.city}
              helperText={errors.city}
              
            />
          </Grid>
          <Grid >
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
           <Grid sx={{ width: "211px" }}>
      <Autocomplete
        options={usStates}
        getOptionLabel={(option) => option.name}
        onChange={(_event, newValue) => {
          setFormData((prev) => ({
            ...prev,
            state: newValue ? newValue.code : ''
          }));
          setErrors((prev) => ({
            ...prev,
            state: newValue && newValue.code ? '' : 'State is required'
          }));
        }}
        value={
          usStates.find((s) => s.code === formData.state) || null
        }
        
        renderInput={(params) => (
          <TextField
            {...params}
            label="State"
            required
            error={!!errors.state}
            helperText={errors.state}
            fullWidth
               
            
          />
        )}
        isOptionEqualToValue={(option, value) => option.code === value.code}
      />
    </Grid>
          <Grid >
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
          <Grid   sx={{ width: "211px" }}>
             <TextField
    name="servicetype"
    label="Service Type"
    onChange={handleChange}
    value={formData.servicetype}
    select
    required
    fullWidth
  
    error={!!errors.servicetype}
    helperText={errors.servicetype}
  >
    {serviceOptions.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
          </Grid>
          <Grid >
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
          <Grid >
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

          
          <Grid >
            <Button
              variant="contained"
              onClick={handleSubmit}
              fullWidth
              type="button"
            >
              Submit
            </Button>
          </Grid>
       
        </Grid>
      </Container>
    </>
  );
}
