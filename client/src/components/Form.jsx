import { React, useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { FlexBetween, FlexCenter, FlexStart } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, setError } from "../state";
import CustomButton from "./CustomButton";

const Form = ({
  inputFields,
  buttonName,
  loadingButtonName,
  schema,
  initialValues,
  submit,
  loading,
  login,
  register,
  forgot,
  edit,
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state?.error);

  const handleFormSubmit = (values, onSubmitProps) => {
    submit(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      enableReinitialize={false}
      validateOnMount={true}
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
        isSubmitting,
        isValid,
      }) => (
        <form onSubmit={handleSubmit}>
          <FlexStart flexDirection="column" width="100%">
            {inputFields.map((field, i) =>
              field.name !== "image" ? (
                <TextField
                  key={i}
                  name={field.name}
                  label={field.label}
                  type={
                    field.name === "password" ||
                    field.name === "confirmPassword"
                      ? "password"
                      : undefined
                  }
                  onBlur={handleBlur}
                  value={values[field.name]}
                  onChange={handleChange}
                  errors={touched[field.name] && errors[field.name]}
                  helperText={touched[field.name] && errors[field.name]}
                  sx={{
                    width: "100%",
                    marginBottom: i !== inputFields.length - 1 ? "20px" : 0,
                  }}
                />
              ) : (
                <Dropzone
                  key={i}
                  accept={String[("image/jpg", "image/jpeg", "image/png")]}
                  multiple={false}
                  onDrop={(accept) => setFieldValue("picture", accept[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p="1rem"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                      width="100%"
                      mb="20px"
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
              )
            )}
            {error && (
              <FlexCenter m="1rem 0 0" width="100%">
                <Typography color="red" variant="h6">
                  {error}
                </Typography>
              </FlexCenter>
            )}

            {/* Buttons */}
            <FlexCenter flexDirection="column" width="100%">
              {/* <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                fullWidth
                sx={{
                  m: error ? "1rem 0" : "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {loading ? loadingButtonName : buttonName}
              </Button> */}
              <FlexCenter width="100%" m="1rem 0">
                <CustomButton
                  disabled={!isValid || isSubmitting}
                  text= {loading ? loadingButtonName : buttonName}
                />
                {edit && <CustomButton form text="Cancel" cancel onClick={-1} />}
              </FlexCenter>
              <Typography
                onClick={() => {
                  dispatch(setError({ error: null }));
                  dispatch(setAlert({ alert: null }));
                  resetForm();
                  {
                    login && navigate("/register");
                  }
                  {
                    register && navigate("/");
                  }
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
                {login && "Don't have an account? Sign Up here."}
                {register && "Have an account? Log In here."}
              </Typography>
              {!edit && (
                <Typography
                  onClick={() => {
                    dispatch(setAlert({ alert: null }));
                    dispatch(setError({ error: null }));
                    resetForm();
                    {
                      !forgot ? navigate("/forgot-password") : navigate("/");
                    }
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
                  {!forgot ? "Forgot Password? Reset Here." : "Back to Login?"}
                </Typography>
              )}
            </FlexCenter>
          </FlexStart>
        </form>
      )}
    </Formik>
  );
};

export default Form;
