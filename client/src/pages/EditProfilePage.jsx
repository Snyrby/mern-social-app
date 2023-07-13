import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setError, setLogin } from "../state";
import { Form, Navbar } from "../components";
import { editProfileForm } from "../constants";
import { updateUserApi } from "../api/user";

const EditProfilePage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const editProfileSchema = yup.object().shape({
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
    location: yup.string().required("Location is required"),
    occupation: yup.string().required("Occupation is required"),
    // picture: yup.string(),
  });

  const initialValuesEditProfile = {
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    occupation: user.occupation,
    picture: { name: user.picturePath },
  };

  const editProfile = (values, onSubmitProps) => {
    setLoading(true);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    updateUserApi(formData)
      .then((response) => {
        dispatch(setLogin({ user: response }));
        dispatch(setError({ error: null }));
        setLoading(false);
        onSubmitProps.resetForm();
        onSubmitProps.setSubmitting(false);
        // navigate("/home");
        // window.location.reload(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setError({ error: error.response.data.msg }));
        onSubmitProps.setSubmitting(false);
      });
  };

  return (
    <Box>
      <Navbar />
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Edit Profile,
        </Typography>
        <Form
          initialValues={initialValuesEditProfile}
          schema={editProfileSchema}
          inputFields={editProfileForm}
          buttonName="Edit"
          loadingButtonName="Editing..."
          submit={editProfile}
          loading={loading}
          edit
        />
      </Box>
    </Box>
  );
};

export default EditProfilePage;
