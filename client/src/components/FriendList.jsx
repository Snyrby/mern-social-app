import { Box, Typography, useTheme } from "@mui/material";
import Friend from "./Friend";
import { WidgetWrapper } from "../style";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import url from "../utils/url";
import axios from "axios";

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useSelector((state) => state.user.friends);
  const isFriend = !Array.isArray(friends) || !friends.length ? false : true;

  const getFriends = async () => {
    try {
      const { data } = await axios.get(
        `${url}/api/v1/users/friends/${userId}`
      );
      dispatch(setFriends( data ));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {isFriend ?
        <Box display="flex" flexDirection="column" gap="1.5rem">
            {friends.map((friend) => (
            <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                subtitle={friend.occupation}
                userPicturePath={friend.picturePath}
            />
            ))}
        </Box>
      : null}
    </WidgetWrapper>
  );
};

export default FriendList;
