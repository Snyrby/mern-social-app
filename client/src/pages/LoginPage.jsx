import { Box, useMediaQuery, useTheme, Typography, Alert } from "@mui/material";
import React from "react";
import { Form } from "../components";
import { useSelector } from "react-redux";
import { loginForm } from "../constants";
import * as yup from "yup";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const alert = useSelector((state) => state?.alert);
  console.log(alert);

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
            sx={{ position: "absolute" }}
          >
            {alert}
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
          image
          buttonName="Login"
          loadingButtonName="Logging In"
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
