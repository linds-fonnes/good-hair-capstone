import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <h1>Good Hair</h1>
      <p>Find stylists near you </p>
    </div>
  );
}

export default Homepage;
