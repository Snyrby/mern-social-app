import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FlexCenter } from "../style";
import img from "../assets/not-found.svg";
import { useSelector } from "react-redux";

const ErrorHandler = ({ notFoundCode, notFoundMessage }) => {
  const { code } = useParams();
  const errorMessage = useSelector((state) => state.error);
  const { palette } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    {
      code === "401" ? navigate("/") : navigate(-1);
    }
  };
  return (
    <FlexCenter mt="2rem" sx={{ flexDirection: "column" }}>
      <img src={img} alt="error" width="60%" height="500px" />
      <Typography variant="h1">
        {notFoundCode ? `Error: ${notFoundCode}` : `Error: ${code}`}
      </Typography>
      <Typography variant="h5">
        {notFoundMessage ? `${notFoundMessage}` : `${errorMessage}`}
      </Typography>
      <FlexCenter sx={{ flexDirection: "column" }}>
        <Typography variant="h6" m="2rem 0 0.5rem">
          {code === "401"
            ? "Please sign in again to perform that action"
            : "Please try again"}
        </Typography>
        <Button
          type="submit"
          onClick={handleClick}
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
          {code === "401" ? "Login Page" : "Previous Page"}
        </Button>
      </FlexCenter>
    </FlexCenter>
  );
};

export default ErrorHandler;
