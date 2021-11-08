import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Stylists() {
  const { setUserType } = useContext(UserContext);
  setUserType("stylist");

  return (
    <div>
      <button>
        <Link to="/stylists/signup">Sign Up as a Stylist</Link>
      </button>
      <button>
        <Link to="/login">Login as a Stylist</Link>
      </button>
    </div>
  );
}

export default Stylists;
