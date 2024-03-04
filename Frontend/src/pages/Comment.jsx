import { TextField, Typography, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Comment.css';
import axios from 'axios';

const Comment = (props) => {
  const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });
  const [rating, setRating] = useState([]);
  const [type, setType] = useState([]);
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    restuarantid: '',
    restuarant: '',
    cuisine: '',
    type: '',
    rating: '',
    contactno: '',
    manager: '',
    nooftables: '',
    country: '',
    state: '',
    district: '',
    userid: '',
    password: '',
    status: '',
    latitude:'',
    longitude:''
  });
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3005/rview")
      .then(response => {
        console.log(response.data)
        setRating(response.data)
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3005/tview")
      .then(response => {
        console.log(response.data)
        setType(response.data)
      })
      .catch(err => console.log(err))
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target
    setInputs((inputs) => ({ ...inputs, [name]: value }))
    console.log(inputs)
  }

  const addHandler = async (event) => {
    event.preventDefault();
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append all the input data to FormData
    Object.entries(inputs).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    // Append the image file to FormData
    if (image) {
      formData.append('image', image);
    }
  
    try {
      // Send the FormData using axios
      const response = await axios.post("http://localhost:3005/new", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
  
      alert("Record Saved");
      navigate('/Analytics');
    } catch (error) {
      console.error('Error adding record:', error);
    }
  };

  return (
    <div className='form-container'>
      <Typography variant='h5' className='regs'>Registration</Typography><br></br>
      <form>
        <TextField label="Restuarant ID" name='restuarantid' variant="outlined" type='text' value={inputs.restuarantid} onChange={inputHandler} required /><br /><br />
        <TextField label="Restuarant" name='restuarant' variant="outlined" type='text' value={inputs.restuarant} onChange={inputHandler} required /><br /><br />
        <TextField id="cuisine" name='cuisine' label="Cuisine Type" variant="outlined" type='text' value={inputs.cuisine} onChange={inputHandler} /><br /><br />
        <label>Restuarant Type</label>
        <select name="type" value={inputs.type} onChange={inputHandler} >
          {
            type.map((value, index) => {
              return (
                <option key={index} value={value.type}>{value.type}</option>
              )
            })
          }
        </select><br /><br />
        <label>Restuarant Rating</label>
        <select name="rating" value={inputs.rating} onChange={inputHandler} >
          {
            rating.map((value, index) => {
              return (
                <option key={index} value={value.rating}>{value.rating}</option>
              )
            })
          }
        </select><br /><br />
        <TextField id="contactno" name='contactno' label="Contact no:" variant="outlined" type='phone' value={inputs.contactno} onChange={inputHandler} /><br /><br />
        <TextField id="manager" name='manager' label="Manager" variant="outlined" type='text' value={inputs.manager} onChange={inputHandler} /><br /><br />
        <TextField id="nooftables" name='nooftables' label="No of Tables for Booking" variant="outlined" type='number' value={inputs.nooftables} onChange={inputHandler} /><br /><br />
        <FormControl sx={{ m: 1, minWidth: 220 }} >
          <InputLabel id="demo-simple-select-autowidth-label" >Country</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={inputs.country}
            onChange={inputHandler}
            autoWidth
            name='country'
            label="Country"
          >
            <MenuItem value="country" >
              <em>None</em>
            </MenuItem>
            <MenuItem value="AMERICA">America</MenuItem>
            <MenuItem value="INDIA">India</MenuItem>
            <MenuItem value="NEPAL">Nepal</MenuItem>
          </Select>
        </FormControl><br /><br />
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={inputs.state}
            onChange={inputHandler}
            autoWidth
            name='state'
            label="State"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
            <MenuItem value="Arunachal Pradesh">Arunachal Pradesh</MenuItem>
            <MenuItem value="Assam">Assam</MenuItem>
            <MenuItem value="Bihar">Bihar</MenuItem>
            <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
            <MenuItem value="Goa">Goa</MenuItem>
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Haryana">Haryana</MenuItem>
            <MenuItem value="Himachal Pradesh">Himachal Pradesh</MenuItem>
            <MenuItem value={19}>Jharkhand</MenuItem>
            <MenuItem value={20}>Karnataka</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
            <MenuItem value={22}>Madhya Pradesh</MenuItem>
            <MenuItem value={23}>Maharatra</MenuItem>
            <MenuItem value={24}>Manipur</MenuItem>
            <MenuItem value={25}>Meghalaya</MenuItem>
            <MenuItem value={26}>Mizoram</MenuItem>
            <MenuItem value={27}>Nagaland</MenuItem>
            <MenuItem value={28}>Odisha</MenuItem>
            <MenuItem value={29}>Punjab</MenuItem>
            <MenuItem value={30}>Rajasthan</MenuItem>
            <MenuItem value={31}>Sikkim</MenuItem>
            <MenuItem value={32}>Tamil Nadu</MenuItem>
            <MenuItem value={33}>Telangana</MenuItem>
            <MenuItem value={34}>Tripura</MenuItem>
            <MenuItem value={35}>Uttarakhand</MenuItem>
            <MenuItem value={36}>Uttar Pradesh</MenuItem>
            <MenuItem value={37}>West Bengal</MenuItem>
          </Select>
        </FormControl><br /><br />
        <TextField id="dis" name='district' label="District" variant="outlined" type='text' value={inputs.district} onChange={inputHandler} /><br /><br />
        <TextField id="uid" name='userid' label="User id" variant="outlined" type='text' value={inputs.userid} onChange={inputHandler} /><br /><br />
        <TextField id="pwd" name='password' label="Password" variant="outlined" type='password' value={inputs.password} onChange={inputHandler} /><br /><br />
        <FormControl sx={{ m: 1, minWidth: 220 }} >
          <InputLabel id="demo-simple-select-autowidth-label" >Status</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={inputs.status}
            onChange={inputHandler}
            autoWidth
            name='status'
            label="Status"
          >
            <MenuItem value="" >
              <em>None</em>
            </MenuItem>
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </FormControl><br /><br />
        {/* <Grid item xs={6}> */}
  <TextField
    fullWidth
    label="Profile Photo"
    name="pic"
    type="file"
    onChange={handleImageChange}
    // margin="normal"
    // InputProps={{
    //   startAdornment: (
    //     <InputAdornment position="start">
    //       {previewPhoto ? (
    //         <Avatar alt="Profile Photo" src={previewPhoto} />
    //       ) : (
    //         <Avatar>☺</Avatar>
    //       )}
    //     </InputAdornment>
    //   ),
    // }}
  />
{/* </Grid> */}
          <div>
            <TextField id="latitude" label="Latitude" variant="outlined" name='latitude' value={inputs.latitude} onChange={inputHandler}/><br /><br />
            <TextField id="longitude" label="Longitude" variant="outlined" name='longitude' value={inputs.longitude} onChange={inputHandler} /><br /><br />
          </div>
        <Button variant="outlined" onClick={addHandler}>Register</Button><br />
      </form>
    </div>
  );
};

export default Comment;
