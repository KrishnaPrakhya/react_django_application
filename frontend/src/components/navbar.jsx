import React from "react";
import { SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        MyApp
      </div>
      <div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            <a href="/sign-in" className="mr-4">
              Sign In
            </a>
            <a href="/sign-up">Sign Up</a>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
