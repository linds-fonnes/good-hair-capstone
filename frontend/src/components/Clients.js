import React from "react";
import { Link } from "react-router-dom";

function Clients() {
  return (
    <div className="container text-center">
      <Link to="/clients/signup">
        <button className="btn btn-primary btn-block m-4">
          Sign Up as a Client
        </button>
      </Link>
      <Link to="/login">
        <button className="btn btn-primary btn-block m-4">
          Login as a Client
        </button>
      </Link>
    </div>
  );
}

export default Clients;
