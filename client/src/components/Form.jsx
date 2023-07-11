import { React } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { FlexBetween, FlexCenter, FlexStart } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../state";

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
}) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state?.error);

  const handleFormSubmit = async (values, onSubmitProps) => {
    await submit(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={schema}
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
          <FlexStart flexDirection="column" width="100%">
            {inputFields.map((field, i) =>
              field.name !== "image" ? (
                <TextField
                  key={i}
                  name={field.name}
                  label={field.label}
                  type={field.name === "password" ? "password" : undefined}
                  onBlur={handleBlur}
                  value={values[field.name]}
                  onChange={handleChange}
                  errors={
                    touched[field.name] &&
                    errors[field.name]
                  }
                  helperText={
                    touched[field.name] &&
                    errors[field.name]
                  }
                  sx={{
                    width: "100%",
                    marginBottom: i !== inputFields.length - 1 ? "20px" : 0,
                  }}
                />
              ) : (
                <Dropzone
                  key={i}
                  accept={String["image/jpg", "image/jpeg", "image/png"]}
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
              <Button
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
              </Button>
              <Typography
                onClick={() => {
                  dispatch(setError({ error: null }));
                  resetForm();
                  {login && navigate("/register")}
                  {register && navigate("/")}
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
                {login && ("Don't have an account? Sign Up here.")}
                {register && ("Have an account? Log In here.")}
              </Typography>
              <Typography
                onClick={() => {
                  dispatch(setError({ error: null }));
                  resetForm();
                  navigate("/reset-password");
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
                Forgot Password? Reset Here.
              </Typography>
            </FlexCenter>
          </FlexStart>
        </form>
      )}
    </Formik>
  );
};

export default Form;
