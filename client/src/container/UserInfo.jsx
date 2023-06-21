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
import { Navigate, useNavigate } from "react-router-dom";
import url from "../utils";
import axios from "axios";

const UserInfo = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
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

  if (!user) {
    return null;
    // TODO: loading state
  }

  const { 
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
   } = user;

   return (
    <WidgetWrapper>
      <FlexBetween 
      gap="0.5rem" 
      pb="1.1rem"
      onClick={() => navigate}
      >

      </FlexBetween>
    </WidgetWrapper>
   )
};
