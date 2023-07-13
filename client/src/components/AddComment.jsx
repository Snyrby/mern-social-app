import React from "react";
import { FlexEnd, FlexStart, UserImage } from "../style";
import { Divider, IconButton, InputBase, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";
import { createCommentApi } from "../api/comments";
import { setError, setComments, setPost } from "../state";

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

const AddComment = ({ postId, comments }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { userId, picturePath } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const handleSubmit = (values, onSubmitProps) => {
    const comment = { postId, userId, description: values.description };
    createCommentApi(comment)
      .then((response) => {
        dispatch(
          setComments({ comments: [response, ...comments], postId: postId })
        );
        onSubmitProps.resetForm();
      })
      .catch((error) => {
        dispatch(setError({ error: error.response.data.msg }));
        return navigate(`/error/${error.request.status}`);
      });
  };
  return (
    <Formik
      onSubmit={handleSubmit}
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
        <form onSubmit={handleSubmit} onReset={resetForm}>
          <FlexStart m="1rem 0">
            <Tooltip title="Profile Page">
              <IconButton
                aria-label="Profile Page"
                onClick={() => navigate(`/profile/${userId}`)}
              >
                <UserImage image={picturePath} size="30px" />
              </IconButton>
            </Tooltip>

            <FlexStart
              width="100%"
              ml="0.5rem"
              sx={{ flexDirection: "column" }}
            >
              <InputBase
                name="description"
                placeholder="Add a comment..."
                value={values.description}
                errors={Boolean(errors.description)}
                helperText={touched.description && errors.description}
                onChange={handleChange}
                sx={{
                  mt:"10px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "2rem",
                }}
              />
              {values.description && <Divider width="100%" />}
            </FlexStart>
          </FlexStart>
          {values.description && (
            <FlexEnd width="100%" m="1rem 0">
              <CustomButton text="Comment" comment />
              <CustomButton text="Cancel" cancel comment />
            </FlexEnd>
          )}
        </form>
      )}
    </Formik>
  );
};

export default AddComment;
