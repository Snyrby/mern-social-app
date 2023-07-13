import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setError, setFriends } from "../state";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { FlexBetween, UserImage } from "../style";
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
  const isFriend = Array.isArray(friends)
    ? JSON.stringify(friends.find((e) => e._id === friendId))
      ? true
      : false
    : false;

    const friendRequestClick = () => {
      patchFriendApi(userId, friendId).then((response) => {
        dispatch(setFriends({ friends: response }));
      }).catch((error) => {
        dispatch(setError({ error: error.response.data.msg }));
        return navigate(`/error/${error.request.status}`);
      })
    }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <Tooltip title="Profile Page">
          <IconButton
            aria-label="Profile Page"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <UserImage image={userPicturePath} size="55px" />
          </IconButton>
        </Tooltip>
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
          onClick={friendRequestClick}
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
