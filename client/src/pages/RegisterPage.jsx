import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { registerUserApi } from '../api/auth';
import { setAlert, setError } from '../state';
import { Form } from '../components';
import { registerForm } from '../constants';


const RegisterPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const registerSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: yup
      .string()
      .max(50, "Email length can only be 50 characters long")
      .email("Invalid Email")
      .required("Email is required"),
    password: yup
      .string()
      .required("A password is required")
      .min(6, "Password must be at least 6 characters"),
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    picture: yup.string().required("A profile picture is required"),
  });
  
  const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };
  
  const register = (values, onSubmitProps) => {
    setLoading(true);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    registerUserApi(formData)
      .then((response) => {
        console.log(response);
        onSubmitProps.resetForm()
        setMessage(response);
          // dispatch(setError({error: null}));
          // setLoading(false);
        navigate("/", { replace: true });
        // dispatch(setAlert({ alert: response }));
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setError({error: error.response.data.msg}));
      });
  };
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
        </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia,
        </Typography>
        <Form
          initialValues={initialValuesRegister}
          schema={registerSchema}
          inputFields={registerForm}
          buttonName="Register"
          loadingButtonName="Registering..."
          submit={register}
          loading={loading}
          register
        />
      </Box>
    </Box>
  )
}

export default RegisterPage;