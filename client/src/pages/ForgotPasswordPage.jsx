import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form } from "../components";
import { useDispatch } from "react-redux";
import { forgotPasswordForm } from "../constants";
import * as yup from "yup";
import { setAlert, setError } from "../state";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../api/auth";

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesForgotPassword = {
    email: "",
  };

  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const forgotPassword = (values, onSubmitProps) => {
    setLoading(true);
    const { email } = values;
    forgotPasswordApi(email)
      .then((response) => {
        dispatch(setAlert({ alert: response }));
        dispatch(setError({ error: null }));
        setLoading(false);
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setError({ error: error.response.data.msg }));
        onSubmitProps.setSubmitting(false);
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
          Reset Password,
        </Typography>
        <Form
          initialValues={initialValuesForgotPassword}
          schema={forgotPasswordSchema}
          inputFields={forgotPasswordForm}
          buttonName="Send Reset Password Email"
          loadingButtonName="Sending..."
          submit={forgotPassword}
          loading={loading}
          forgot
        />
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
