import React, { useState } from 'react'
import signinimage from '../assets/login-animate.svg'
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors, isSubmitted },
      } = useForm();

    const handleUsername = (event) => {
        setUsername(event.target.value)
        console.log(username);

    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
        console.log(password);

    }

    const onSubmit = (data) => {
        let AdminData = {
            username: username,
            password: password,
        }
        console.log(AdminData);
        console.log("AdminData:", data);
        
        axios.post('http://localhost:5000/Admin/checkAdminLogin',data)
        .then(response => {
            toast.success("Login successful", {
                position: "top-center", 
              });
         
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
          toast.error('login unsuccessfully',{
            position: "top-center",
        
          })
        });
    }

    const handleClick = async () => {
        const valid = await trigger(); // Manually trigger validation
        if (valid) {
          handleSubmit(onSubmit)(); // Proceed with form submission if valid
        }
      };
    return (
        <div>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-6 align-self-center  p-2" style={{ backgroundColor: '#dc3545' }}>
                        <img src={signinimage} height={570} />
                    </div>
                    <div className="col-5 align-self-center ms-5 p-5" >
                        <h1 style={{ color: '#dc3545' }}>Hello,<br></br>
                            Welcome back</h1>
                            <form >
                        <div class="mt-4">
                            <TextField
                                id="outlined-basic"
                                label="Username"
                                fullWidth
                                onChange={handleUsername}
                                {...register("username", {
                                    required: "Username is required",
                                    validate: (value) =>
                                      value === "sabesh" || "username is not match",
                                  })}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="outlined"
                            />
                            {errors.username && (
                                <Alert severity="error" style={{ marginTop: "10px" }}>
                    {errors.username.message}
                  </Alert>
                )}
                        </div>
                        <div class="mt-4">
                            
                            <TextField 
                            id="outlined-basic"
                             label="password" 
                             fullWidth
                             {...register("password", {
                                required: "password is required",
                                validate: (value) =>
                                  value === "sneha" || "password is not correct",
                              })}
                            slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VisibilityIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }} variant="outlined" />
                             {errors.password && (
                   <Alert severity="error" style={{ marginTop: "10px" }}>
                   {errors.password.message}
                 </Alert>
                )}
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-12 col-6 mt-4 text-center">
                                <a href="" class="text-indigo-14" style={{ textDecoration: 'none', color: '#dc3545', fontSize: '18px' }}>Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button class="btn w-100 text-white" type="button" style={{ backgroundColor: '#dc3545' }} onClick={handleClick}>Signin</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
        
    )
};

export default Signin
