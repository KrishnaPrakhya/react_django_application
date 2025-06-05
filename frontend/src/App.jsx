import { Route, Routes, Navigate } from "react-router-dom";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./components/Home";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import ItemTest from "./components/ItemTest";

function App() {
  return (
    <div className="p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <div className="flex justify-center items-center mt-24">
              <SignIn />
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <div className="flex justify-center items-center mt-24">
              <SignUp />
            </div>
          }
        />
        <Route path="/item" element={<ItemTest />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
