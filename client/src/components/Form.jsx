import { React, useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../style";

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

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
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

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
    const [PageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = PageType === "login";
    const isRegister = PageType === "register";
    const handleFormSubmit = async(values, onSubmitProps) => {};
    return (
        <Formik 
        onSubmit={handleFormSubmit} 
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box 
                    display="grid" 
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr)"
                    sx={{
                        "& > div": { gridColumns: isNonMobile ? undefined : "span 4"},
                    }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                  name="firstName"
                                  label="First Name"
                                  onBlur={handleBlur}
                                  value={values.firstName}
                                  onChange={handleChange}
                                  errors={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                  helperText={touched.firstName && errors.firstName}
                                  sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                  name="lastName"
                                  label="Last Name"
                                  onBlur={handleBlur}
                                  value={values.lastName}
                                  onChange={handleChange}
                                  errors={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                  helperText={touched.lastName && errors.lastName}
                                  sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                  name="location"
                                  label="Location"
                                  onBlur={handleBlur}
                                  value={values.location}
                                  onChange={handleChange}
                                  errors={Boolean(touched.location) && Boolean(errors.location)}
                                  helperText={touched.location && errors.location}
                                  sx={{ gridColumn: "span 2"}}
                                />
                            </>
                        )}
                    </Box>
                </form>
            )}
        </Formik>
    )
};

export default Form;
