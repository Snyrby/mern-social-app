import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { FlexBetween, WidgetWrapper, UserImage } from "../style";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import url from "../utils/url";
import axios from "axios";
import Friend from "./Friend";
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
    getComments();
  };

  const patchLike = async () => {
    try {
      const { data } = await axios.patch(`${url}/api/v1/posts/like/${postId}`, {
        userId: loggedInUserId,
      });
      dispatch(setPost({ post: data.post }));
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/comments/${postId}`);
      setComments({ comments: data.comments });
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
                <Box
                  key={`${name}-${index}`}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Divider width="100%" />
                  <Box display="flex" flex="1" mt="0.5rem">
                    <UserImage image={comment.user.picturePath} size="30px" />
                    <Typography
                      variant="h5"
                      fontWeight="500"
                      onClick={() => {
                        navigate(`/profile/${comment.user._id}`);
                      }}
                      sx={{
                        color: main,
                        m: "0.5rem",
                        pl: "1rem",
                        textTransform: "capitalize",
                        "&:hover": {
                          color: palette.primary.light,
                          cursor: "pointer",
                        },
                      }}
                    >
                      {comment.user.firstName} {comment.user.lastName}
                    </Typography>
                  </Box>
                  <Box flex="1">
                    <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                      {comment.description}
                    </Typography>
                  </Box>
                </Box>
              ))
            : null}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default Post;
