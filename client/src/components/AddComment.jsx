import React from "react";
import { FlexEnd, FlexStart, UserImage } from "../style";
import { Divider, InputBase, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

const commentSchema = yup.object().shape({
  description: yup
    .string()
    .required("A comment is required")
    .max(1000, "A comment must be less than 1000 characters long"),
});

const initialCommentValue = {
  description: "",
  // picture: "",
};

const AddComment = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { userId, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const handlePost = async (values, onSubmitProps) => {};
  return (
    <Formik
      onSubmit={handlePost}
      initialValues={initialCommentValue}
      validationSchema={commentSchema}
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
          <FlexStart m="1rem 0">
            <UserImage image={picturePath} size="30px" />
            <FlexStart width="100%" ml="0.5rem" sx={{flexDirection: "column"}}>
              <InputBase
                  name="description"
                  placeholder="Add a comment..."
                  value={values.description}
                  errors={Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderRadius: "2rem",
                  }}
                />
              <Divider width="100%" />
              <FlexEnd>
                <CustomButton values={values} text="Comment" />
                <CustomButton text="Cancel" />
              </FlexEnd>
            </FlexStart>
          </FlexStart>
        </form>
      )}
    </Formik>
  );
};

export default AddComment;
