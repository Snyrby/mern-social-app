import { Button, useTheme } from "@mui/material";
import React from "react";

const CustomButton = ({ values, text, comment, cancel, onClick }) => {
    const { palette } = useTheme();
  return (
    <Button
      disabled={!comment ? !values?.description : null}
      type={!cancel ? "submit" : "reset"}
      href={onClick ? onClick : null}
      sx={{
        color: palette.background.alt,
        backgroundColor: !cancel ? palette.primary.main : palette.neutral.medium,
        borderRadius: "3rem",
        marginLeft: cancel ? "20px" : "0",
        fontSize: comment && "0.6rem",
        "&:hover": {
          cursor: "pointer",
          color: palette.primary.main,
        },
      }}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
