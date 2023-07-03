import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import { UserImage } from "../style";
import { useNavigate } from "react-router-dom";

const Comment = ({ name, picturePath, description, commentUserId }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Divider width="100%" />
      <Box display="flex" flex="1" mt="0.5rem">
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
            pl: "1rem",
            textTransform: "capitalize",
            "&:hover": {
              color: palette.primary.light,
              cursor: "pointer",
            },
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box flex="1">
        <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
