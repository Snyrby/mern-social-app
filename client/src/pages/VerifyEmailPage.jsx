import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmailApi } from "../api/auth";
import { setError } from "../state";
import { FlexCenter } from "../style";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { CustomButton } from "../components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmailPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const verifyToken = () => {
    setLoading(true);
    verifyEmailApi(query.get("email"), query.get("token"))
      .then((response) => {
        setLoading(false);
        setMessage(response);
      })
      .catch((error) => {
        dispatch(setError({ error: error.response.data.msg }));
        return navigate(`/error/${error.request.status}`);
      });
  };

  useEffect(() => {
    verifyToken();
  }, []);

    if (loading) {
      return (
        <FlexCenter>
          <Typography variant="h2">Loading... Please Wait</Typography>
        </FlexCenter>
      );
    }
  return (
    <FlexCenter flexDirection="column" sx={{top:"300px"}}>
      <Typography variant="h2">{message}</Typography>
      <CustomButton text="Login" onClick="/" comment />
      {/* <CustomButton text="Login Page" onClick={navigate("/")} /> */}
    </FlexCenter>
  );
};

export default VerifyEmailPage;
