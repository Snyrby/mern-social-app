import { Button, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({
  text,
  comment,
  cancel,
  onClick,
  disabled,
  form,
}) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      return navigate(onClick)
    } else {
      return undefined
    }
  };

  return (
    <Button
      disabled={
        disabled
        // !comment ? !values?.description : form ? !isValid || isSubmitting : null
      }
      type={!cancel ? "submit" : !form ? "reset" : "button"}
      onClick={handleClick}
      sx={{
        color: palette.background.alt,
        backgroundColor: !cancel
          ? palette.primary.main
          : palette.neutral.medium,
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
