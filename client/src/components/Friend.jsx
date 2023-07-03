import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import axios from "axios";
import { url } from "../utils";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { FlexBetween, UserImage } from "../style";
import { useEffect } from "react";
import { patchFriendApi } from "../api/user";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = Array.isArray(friends) ? (JSON.stringify(friends.find(e => e._id === friendId)) ? true : false) : (false);

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              textTransform: "capitalize",
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId !== userId ? (
        <IconButton
          onClick={() => patchFriendApi(userId, friendId, dispatch, setFriends)}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : null}
    </FlexBetween>
  );
};

export default Friend;
