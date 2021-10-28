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
          <NavLink to="=/profile"></NavLink>
        </li>
        <li>
          <NavLink to="/search"></NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={logout}>
            Logout {currentUser.first_name}{" "}
          </NavLink>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul>
        <li>
          <NavLink to="/stylists">Stylists</NavLink>
        </li>
        <li>
          <NavLink to="/clients">Clients</NavLink>
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
