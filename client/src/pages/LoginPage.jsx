import { Box, useMediaQuery, useTheme, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import { Form } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { loginForm } from "../constants";
import * as yup from "yup";
import { setAlert, setError, setLogin } from "../state";
import { loginUserApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const alert = useSelector((state) => state?.alert);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = (values, onSubmitProps) => {
    setLoading(true);
    const { email, password } = values;
    const loginUser = { email, password };
    loginUserApi(loginUser)
      .then((response) => {
        dispatch(setLogin({ user: response }));
        onSubmitProps.resetForm();
        setLoading(false);
        dispatch(setError({error: null}));
        dispatch(setAlert({alert: null}));
        onSubmitProps.setSubmitting(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setError({error: error.response.data.msg}));
        onSubmitProps.setSubmitting(false);
      });
  };
  
  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const loginSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

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
        {alert ? (
          <Alert
            variant="outlined"
            severity="info"
            sx={{borderColor: "primary", "& .MuiAlert-icon": {
              color: "primary"
            }}}
          >
            <Typography >
              {alert}
            </Typography>
          </Alert>
        ) : null}
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
          initialValues={initialValuesLogin}
          schema={loginSchema}
          inputFields={loginForm}          
          buttonName="Login"
          loadingButtonName="Logging In..."
          submit={login}
          loading={loading}
          login
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
