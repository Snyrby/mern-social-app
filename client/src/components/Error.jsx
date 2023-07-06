import React from "react";
import { useParams } from "react-router-dom";

const Error = () => {
  const { code } = useParams();
  console.log(code);
  return (
    <div>
      error { code }
      {/* Error: { code }
      <p>{message}</p> */}
    </div>
  );
};

export default Error;
