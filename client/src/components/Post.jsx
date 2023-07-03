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
import Friend from "./Friend";
import Comment from "./Comment";
import { patchLikeApi } from "../api/posts";
import { getCommentsApi } from "../api/comments";

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
  const [comments, setComments] = useState();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user.userId);
  const isLiked = Array.isArray(likes) ? likes.includes(loggedInUserId) : false;
  const likesCount = [...likes].length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const commentClickHandler = () => {
    setIsComment(!isComment);
    getCommentsApi(setComments, postId);
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
            <IconButton
              onClick={() =>
                patchLikeApi(loggedInUserId, postId, dispatch, setPost)
              }
            >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={commentClickHandler}>
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
        <Box mt="0.5rem">
          {comments
            ? comments.comments.map((comment, index) => (
                <Comment
                  name={`${comment.user.firstName} ${comment.user.lastName}`}
                  picturePath={comment.user.picturePath}
                  description={comment.description}
                  commentUserId={comment.user._id}
                  key={`${name}-${index}`}
                />
              ))
            : null}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Post;
