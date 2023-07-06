import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { FlexBetween, UserImage, WidgetWrapper } from "../style";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";
import { getUserInfoApi } from "../api/user";
import { useSelector } from "react-redux";

const UserInfo = ({ userId, picturePath }) => {
  const { palette } = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const loggedInUserId = useSelector((state) => state.user.userId);

  useEffect(() => {
    getUserInfoApi(userId)
      .then((response) => {
        setUser(response);
      })
      .catch(() => {
        return navigate("/");
      });
  }, []);

  if (!user) {
    return null;
    // TODO: loading state
  }
  const { firstName, lastName, location, occupation, friends } = user;
  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              onClick={() => navigate(`/profile/${userId}`)}
              sx={{
                textTransform: "capitalize",
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        {loggedInUserId === userId && (
          <ManageAccountsOutlined
            onClick={() => navigate(`/edit-profile/${userId}`)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        )}
      </FlexBetween>
      <Divider />

      {/* Second Row */}
      <Box p="1rem 0">
        <Box display="flex" align="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" align="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* Third Row */}
      {/* <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider /> */}

      {/* Fourth Row */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <AiFillTwitterCircle size="2rem" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <AiFillLinkedin size="2rem" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserInfo;
