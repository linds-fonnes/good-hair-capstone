import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul>
        <li>
          <NavLink to="/clients/profile">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/stylists/search">Find a Stylist</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={logout}>
            Logout
          </NavLink>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul>
        <li>
          <NavLink to="/clients">Client Registration</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav>
      <Link to="/">Good Hair</Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
