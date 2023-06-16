import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { FlexBetween, UserImage, WidgetWrapper } from "../style";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../utils";
import axios from "axios";

const UserInfo = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const { data } = await axios.get(`${url}/api/v1/users/${userId}`);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);
};
