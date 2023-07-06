import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Close,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { FlexBetween, UserImage, WidgetWrapper } from "../style";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setError } from "../state";
import { Formik } from "formik";
import * as yup from "yup";
import { createPostApi } from "../api/posts";
import { useNavigate } from "react-router-dom";

const postSchema = yup.object().shape({
  description: yup
    .string()
    .required("A post message is required")
    .max(1000, "A post must be less than 1000 characters"),
});

const initialPostValue = {
  description: "",
  picture: "",
};

const CreatePosts = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(true);
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  const handlePost = async (values, onSubmitProps) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("picturePath", values.image.name);
    }
    createPostApi(formData)
      .then((response) => {
        dispatch(addPost({ posts: response }));
        onSubmitProps.resetForm();
      })
      .catch((error) => {
        dispatch(setError({ error: error.response.data.msg }));
        return navigate(`/error/${error.request.status}`);
      });
  };
  return (
    <Formik
      onSubmit={handlePost}
      initialValues={initialPostValue}
      validationSchema={postSchema}
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
          <WidgetWrapper>
            <FlexBetween gap="1.5rem">
              <UserImage image={picturePath} />
              <InputBase
                name="description"
                placeholder="What's on your mind..."
                value={values.description}
                errors={Boolean(errors.description)}
                helperText={touched.description && errors.description}
                onChange={handleChange}
                sx={{
                  width: "100%",
                  backgroundColor: palette.neutral.light,
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
                }}
              />
            </FlexBetween>
            {isImage && (
              <Box
                borderRadius="5px"
                border={`1px solid ${medium}`}
                mt="1rem"
                p="1rem"
              >
                <Dropzone
                  accept=".jpg, .png, .jpeg"
                  multiple={false}
                  onDrop={(accept) => setFieldValue("picture", accept[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add image Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                      {values.picture && (
                        <IconButton
                          onClick={() => setFieldValue("picture", null)}
                          sx={{ width: "15%" }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      )}
                    </FlexBetween>
                  )}
                </Dropzone>
              </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween>
              {/* Picture Icon */}
              <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                <ImageOutlined sx={{ color: mediumMain }} />
                <Typography
                  color={mediumMain}
                  sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                >
                  Image
                </Typography>
              </FlexBetween>
              {isNonMobileScreens ? (
                <>
                  <FlexBetween gap="0.25rem">
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
                  </FlexBetween>
                  <FlexBetween gap="0.25rem">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                  </FlexBetween>
                  <FlexBetween gap="0.25rem">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                  </FlexBetween>
                </>
              ) : (
                // TODO: ADD values on click
                <FlexBetween gap="0.25rem">
                  {mobileMenu ? (
                    <MoreHorizOutlined
                      sx={{ color: mediumMain }}
                      onClick={() => setMobileMenu(!mobileMenu)}
                    />
                  ) : (
                    <Close
                      sx={{ color: mediumMain }}
                      onClick={() => setMobileMenu(!mobileMenu)}
                    />
                  )}
                </FlexBetween>
              )}
              <Button
                disabled={!values.description}
                type="submit"
                sx={{
                  color: palette.background.alt,
                  backgroundColor: palette.primary.main,
                  borderRadius: "3rem",
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.main,
                  },
                }}
              >
                Create Post
              </Button>
            </FlexBetween>
            {!isNonMobileScreens && !mobileMenu ? (
              <>
                <FlexBetween gap="0.25rem" mt="0.75rem">
                  <Box display="flex">
                    <GifBoxOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Clip</Typography>
                  </Box>
                  <Box display="flex">
                    <AttachFileOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Attachment</Typography>
                  </Box>
                  <Box display="flex">
                    <MicOutlined sx={{ color: mediumMain }} />
                    <Typography color={mediumMain}>Audio</Typography>
                  </Box>
                </FlexBetween>
              </>
            ) : null}
          </WidgetWrapper>
        </form>
      )}
    </Formik>
  );
};

export default CreatePosts;
