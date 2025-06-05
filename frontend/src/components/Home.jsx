import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1>REACT-DJANGO APPLICATION</h1>
      </div>
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="cursor-pointer "
        >
          Lets get started
        </button>
      </div>
    </div>
  );
}

export default Home;
