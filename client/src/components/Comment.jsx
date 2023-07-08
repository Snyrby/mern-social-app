import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { FlexBetween, FlexCenter, FlexStart, UserImage } from "../style";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentApi } from "../api/comments";
import { deleteComment, setError } from "../state";

const Comment = ({
  commentId,
  postId,
  name,
  picturePath,
  description,
  commentUserId,
  postUserId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const { userId, role } = useSelector((state) => state.user);
  const handleDeleteClick = () => {
    deleteCommentApi(commentId)
      .then((response) => {
        dispatch(deleteComment({ commentId, postId }));
      })
      .catch((error) => {
        dispatch(setError({ error: error.response.data.msg }));
        return navigate(`/error/${error.request.status}`);
      });
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Divider width="100%" />
      <FlexBetween width="100%">
        <FlexStart flexDirection="column" width="100%">
          <FlexStart flexDirection="row">
            <UserImage image={picturePath} size="30px" />
            <Typography
              variant="h5"
              fontWeight="500"
              onClick={() => {
                navigate(`/profile/${commentUserId}`);
              }}
              sx={{
                color: main,
                m: "0.5rem",
                // pl: "0.6rem",
                textTransform: "capitalize",
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
          </FlexStart>
          <FlexStart>
            <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
              {description}
            </Typography>
          </FlexStart>
        </FlexStart>
        {role === "admin" ||
        userId === commentUserId ||
        userId === postUserId ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        ) : null}
      </FlexBetween>
    </Box>
  );
};

export default Comment;
