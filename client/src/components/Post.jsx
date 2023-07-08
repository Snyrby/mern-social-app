import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween, WidgetWrapper } from "../style";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComments, setError, setPost } from "../state";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector((state) => state.comments);
  const loggedInUserId = useSelector((state) => state.user.userId);
  const isLiked = Array.isArray(likes) ? likes.includes(loggedInUserId) : false;
  const likesCount = [...likes].length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const commentClickHandler = () => {
    setIsComment(!isComment);
    getCommentsApi(postId)
      .then((response) => {
        dispatch(setComments({ comments: response }));
      })
      .catch((error) => {
        dispatch(setError({ error: error.response.data.msg }));
        return navigate(`/error/${error.request.status}`);
      });
  };

  const likeClickHandler = () => {
    patchLikeApi(loggedInUserId, postId)
      .then((response) => {
        dispatch(setPost({ post: response }));
      })
      .catch((error) => {
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
            <Tooltip title="Like">
              <IconButton onClick={likeClickHandler}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
            </Tooltip>
            <Typography>{likesCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <Tooltip title="Comment">
              <IconButton onClick={commentClickHandler}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
            </Tooltip>
            <Typography>{commentsLength}</Typography>
          </FlexBetween>
        </FlexBetween>
        <Tooltip title="Share">
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Tooltip>
      </FlexBetween>
      {isComment && (
        <Box mt="0.5rem">
          <AddComment postId={postId} comments={comments} />
          {comments ? (
            comments.map((comment, index) => (
              <Comment
                commentId={comment._id}
                postId={postId}
                name={`${comment.user.firstName} ${comment.user.lastName}`}
                picturePath={comment.user.picturePath}
                description={comment.description}
                commentUserId={comment.user._id}
                postUserId={postUserId}
                key={`${name}-${index}`}
              />
            ))
          ) : (
            <Typography>No Comments for this Post</Typography>
          )}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Post;
