import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form } from "../components";
import { useDispatch } from "react-redux";
import { resetPasswordForm } from "../constants";
import * as yup from "yup";
import { setAlert, setError } from "../state";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../api/auth";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordPage = () => {
  const query = useQuery();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValuesResetPassword = {
    password: "",
    confirmPassword: "",
  };

  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .required("A password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("A password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const resetPassword = (values, onSubmitProps) => {
    if (values.password === values.confirmPassword) {
      setLoading(true);
      resetPasswordApi(query.get("email"), query.get("token"), values.password)
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
    } else {
      setLoading(false);
      dispatch(
        setError({ error: "Passwords do not match. Please try again." })
      );
      onSubmitProps.setFieldValue("password", "");
      onSubmitProps.setFieldValue("confirmPassword", "");
      onSubmitProps.setSubmitting(false);
    }
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
          Change Password,
        </Typography>
        <Form
          initialValues={initialValuesResetPassword}
          schema={resetPasswordSchema}
          inputFields={resetPasswordForm}
          buttonName="Reset Password"
          loadingButtonName="Resetting..."
            submit={resetPassword}
          loading={loading}
          forgot
        />
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
