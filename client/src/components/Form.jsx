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
import Dropzone from "react-dropzone";
import { FlexBetween, FlexCenter } from "../style";
import { registerUserApi, loginUserApi } from "../api/auth";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Error from "./Error";

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
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = PageType === "login";
  const isRegister = PageType === "register";

  const register = (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    registerUserApi(formData)
      .then((response) => {
        onSubmitProps.resetForm();
        // TODO: Alert for message
      })
      .catch((error) => {
        setErrorMessage(error.response.data.msg);
      }).finally(() => {setPageType("login");});
  };

  const login = async (values, onSubmitProps) => {
    const { email, password } = values;
    const loginUser = { email, password };
    loginUserApi(loginUser)
      .then((response) => {
        dispatch(setLogin({ user: response }));
        onSubmitProps.resetForm();
        navigate("/home");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.msg);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
              "& > div": { gridColumns: isNonMobile ? undefined : "span 4" },
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
                  errors={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  name="lastName"
                  label="Last Name"
                  onBlur={handleBlur}
                  value={values.lastName}
                  onChange={handleChange}
                  errors={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  name="location"
                  label="Location"
                  onBlur={handleBlur}
                  value={values.location}
                  onChange={handleChange}
                  errors={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  name="occupation"
                  label="Occupation"
                  onBlur={handleBlur}
                  value={values.occupation}
                  onChange={handleChange}
                  errors={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    accept=".jpg, .png, .jpeg"
                    multiple={false}
                    onDrop={(accept) => setFieldValue("picture", accept[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              name="email"
              label="Email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              errors={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            {errorMessage && (
              <FlexCenter>
                <Typography color="red" variant="h6">
                  {errorMessage}
                </Typography>
              </FlexCenter>
            )}
            <TextField
              name="password"
              label="Password"
              type="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              errors={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Buttons */}
          <Box>
            {errorMessage && (
              <FlexCenter m="1rem 0 0">
                <Typography color="red" variant="h6">
                  {errorMessage}
                </Typography>
              </FlexCenter>
            )}
            <Button
              type="submit"
              fullWidth
              sx={{
                m: errorMessage ? "1rem 0" : "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
