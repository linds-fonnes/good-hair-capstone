import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

function Homepage() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Good Hair</h1>
      {currentUser ? (
        <h2>Welcome Back {currentUser.first_name} </h2>
      ) : (
        <p>
          <Link to="/login">Login</Link>
          <Link to="/clients/signup">Sign up</Link>
        </p>
      )}
      <p>Find stylists near you </p>
    </div>
  );
}

export default Homepage;
