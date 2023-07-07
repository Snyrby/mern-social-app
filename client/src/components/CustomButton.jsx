import { Button, useTheme } from "@mui/material";
import React from "react";

const CustomButton = ({ values, text }) => {
    const { palette } = useTheme();
  return (
    <Button
      disabled={!values?.description}
      type="submit"
      sx={{
        color: palette.background.alt,
        backgroundColor: palette.primary.main,
        borderRadius: "3rem",
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
