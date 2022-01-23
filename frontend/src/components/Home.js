import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.log("currentUSEr", currentUser);
  return (
    <div>
      <h1>Good Hair</h1>
      {currentUser ? (
        <div>
          <h2>Welcome Back ! </h2>
          <p>
            <Link to="/stylists/search">Find Stylists Near You</Link>
          </p>
        </div>
      ) : (
        <p>
          <Link to="/login">Login</Link>
          <Link to="/clients/signup">Sign up</Link>
        </p>
      )}
    </div>
  );
}

export default Homepage;
