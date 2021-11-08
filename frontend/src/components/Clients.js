import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

function Clients() {
  const { setUserType } = useContext(UserContext);
  setUserType("client");

  return (
    <div>
      <button>
        <Link to="/clients/signup">Sign Up as a Client</Link>
      </button>
      <button href="">
        <Link to="/login">Login as a Client</Link>
      </button>
    </div>
  );
}

export default Clients;
