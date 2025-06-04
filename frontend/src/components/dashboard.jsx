import React from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
      <h1>hiii</h1>
    </div>
  );
}

export default Dashboard;
