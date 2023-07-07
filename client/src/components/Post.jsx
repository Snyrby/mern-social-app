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
import { setError, setPost } from "../state";
import { Comment, Friend, AddComment } from "../components";
import { patchLikeApi } from "../api/posts";
import { getCommentsApi } from "../api/comments";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const likeClickHandler = () => {
    patchLikeApi(loggedInUserId, postId).then((response) => {
      dispatch(setPost({ post: response}))
    }).catch((error) => {
      dispatch(setError({ error: error.response.data.msg }));
      return navigate(`/error/${error.request.status}`);
    });
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
              onClick={likeClickHandler}
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
          <AddComment />
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
