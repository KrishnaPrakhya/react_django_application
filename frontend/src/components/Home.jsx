import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-20">
        <Typography variant="h4">Apartments Filtering Application</Typography>
      </div>
      <div className="mt-20">
        <Button
          onClick={() => navigate("/apartments")}
          variant="contained"
          className="cursor-pointer "
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Home;
