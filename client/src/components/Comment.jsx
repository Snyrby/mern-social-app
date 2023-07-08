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

const Comment = ({
  name,
  picturePath,
  description,
  commentUserId,
  postUserId,
  loggedInUserId,
}) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
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
        {loggedInUserId === postUserId ||
          (loggedInUserId === commentUserId && (
            <Tooltip title="Delete">
              <IconButton>
                <Delete />
              </IconButton>
            </Tooltip>
          ))}
      </FlexBetween>
    </Box>
  );
};

export default Comment;
