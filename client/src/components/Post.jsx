import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween, WidgetWrapper } from "../style";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import url from "../utils/url";
import axios from "axios";
import Friend from "./Friend";

const Post = ({
  postId,
  postUserId,
  picturePath,
  userPicturePath,
  description,
  likes,
  name,
  location,
  commentsLength,
}) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.userId);
  const isLiked = Array.isArray(likes) ? likes.includes(loggedInUserId) : false;
  const likesCount = [...likes].length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    try {
      const { data } = await axios.patch(`${url}/api/v1/posts/like/${postId}`);
      dispatch(setPost({ post: data.post }));
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`./${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{commentsLength}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComment && (
        <Box 
          mt="0.5rem"
        >
          {console.log(getComments())}
          {[getComments()].map((comment, index) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography sx={{color: main, m:"0.5rem", pl:"1rem"}}>
                {comment.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Post;
