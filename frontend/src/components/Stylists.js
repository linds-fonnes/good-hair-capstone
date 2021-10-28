import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Stylists() {
  const { setUserType } = useContext(UserContext);
  setUserType("stylist");

  return (
    <div>
      <a>
        <Link to="/signup">Sign Up as a Stylist</Link>
      </a>
      <a>
        <Link to="/login">Login as a Stylist</Link>
      </a>
    </div>
  );
}

export default Stylists;
