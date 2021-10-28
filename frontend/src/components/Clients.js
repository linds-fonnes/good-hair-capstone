import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Clients() {
  const { setUserType } = useContext(UserContext);
  setUserType("client");

  return (
    <div>
      <a>
        <Link to="/signup">Sign Up as a Client</Link>
      </a>
      <a>
        <Link to="/login">Login as a Client</Link>
      </a>
    </div>
  );
}

export default Clients;
