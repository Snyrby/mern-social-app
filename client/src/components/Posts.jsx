import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
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
import { setPosts } from "../state";
import url from "../utils/url";
import axios from 'axios';
import { Formik } from "formik";
import * as yup from "yup";

const postSchema = yup.object().shape({
  description: yup
  .string()
  .required("A post message is required")
  .max(1000, "A post must be less than 1000 characters"),
});

const initialPostValue = {
  description: "",
}

const Posts = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { userId } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("description", post);
    if (image) {
      formData.append("picturePath", image.name)
    }
    try {
      const { data } = await axios.post(`${url}/api/v1/posts`, formData)
    } catch (error) {
      
    }
  }
  return (
    <Formik
    onSubmit={handlePost}
    initialValues={initialPostValue}
    validationSchema={postSchema}
    ></Formik>
  )
}

export default Posts