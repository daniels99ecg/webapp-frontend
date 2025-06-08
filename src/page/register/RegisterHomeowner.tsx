import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
  InputAdornment, 
  IconButton,
  MenuItem,  
  Autocomplete
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function RegisterHomeowner() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    city: "",
    country: "USA",
    address: "",
    state: "",
    zcode: "",
    servicetype: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar solo el campo que cambió
    let errorMsg = "";

   switch (name) {
  case "firstname":
    if (!value.trim()) errorMsg = "First name is required";
    break;
  case "lastname":
    if (!value.trim()) errorMsg = "Last name is required";
    break;
  case "email":
    const emailRegex = /\S+@\S+\.\S+/;
    if (!value.trim()) errorMsg = "Email is required";
    else if (!emailRegex.test(value)) errorMsg = "Invalid email format";
    break;
  case "phonenumber":
    if (!value.trim()) errorMsg = "Phone number is required";
    else if (value.length < 7) errorMsg = "Invalid phone number";
    break;
  case "password":
    if (!value.trim()) errorMsg = "Password is required";
    else if (value.length < 6) errorMsg = "Minimum 6 characters";
    break;
  case "countrycode":
    if (!value.trim()) errorMsg = "Country code is required";
    break;
  case "country":
    if (!value.trim()) errorMsg = "Country is required";
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
}


    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

 const validate = () => {
  const newErrors: { [key: string]: string } = {};
  const emailRegex = /\S+@\S+\.\S+/;

  if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
  if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";

  if (!formData.email.trim()) newErrors.email = "Email is required";
  else if (!emailRegex.test(formData.email))
    newErrors.email = "Invalid email format";

  if (!formData.phonenumber.trim())
    newErrors.phonenumber = "Phone number is required";
  else if (formData.phonenumber.length < 7)
    newErrors.phonenumber = "Invalid phone number";

  if (!formData.password.trim()) newErrors.password = "Password is required";
  else if (formData.password.length < 6)
    newErrors.password = "Minimum 6 characters";

  if (!formData.city.trim())
    newErrors.countrycode = "Country code is required";
  if (!formData.country.trim()) newErrors.country = "Country is required";
  if (!formData.address.trim()) newErrors.address = "Address is required";
  if (!formData.state.trim()) newErrors.state = "State is required";

  if (!formData.zcode.trim()) newErrors.zcode = "Postal code is required";
  else if (!/^\d+$/.test(formData.zcode)) newErrors.zcode = "Numbers only";

  if (!formData.servicetype.trim())
    newErrors.servicetype = "Service type is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/homeowner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
    <Container>
  <Typography variant="h5" gutterBottom>
    Homeowner Registration
  </Typography>
  <Grid container spacing={2}>
    {/* First row fields (two columns) */}
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

    {/* Second row fields (two columns) */}
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

    {/* Third row fields (two columns) */}
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
        name="city"
        label="City"
        onChange={handleChange}
        required
        fullWidth
        

        error={!!errors.city}
        helperText={errors.city}
      />
    </Grid>

    {/* Fourth row fields (two columns) */}
    <Grid >
      <TextField
        name="country"
        label="Country"
        onChange={handleChange}
        required
        fullWidth
        defaultValue={"USA"}
        error={!!errors.country}
        helperText={errors.country}
        disabled
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

    {/* Fifth row fields (two columns) */}
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
            state: newValue && newValue.code ? '' : 'Estado requerido'
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

    {/* 'servicetype' field full width */}
    <TextField
    name="servicetype"
    label="Service Type"
    onChange={handleChange}
    value={formData.servicetype}
    select
    required
    fullWidth
    sx={{ maxWidth: "86%" }}
    error={!!errors.servicetype}
    helperText={errors.servicetype}
  >
    {serviceOptions.map((option) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ))}
  </TextField>
    {/* Submit button row */}
    <Grid>
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
