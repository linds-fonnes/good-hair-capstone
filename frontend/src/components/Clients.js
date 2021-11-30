import React from "react";
import { Link } from "react-router-dom";

function Clients() {
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
