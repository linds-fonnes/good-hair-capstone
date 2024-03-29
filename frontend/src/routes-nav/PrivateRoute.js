import React, { useContext } from "react";
import { Route } from "react-router-dom";
import UserContext from "../UserContext";

function PrivateRoute({ exact, path, children }) {
  const { currentUser } = useContext(UserContext);
  console.log(
    "PrivateRoute",
    "exact=",
    exact,
    "path=",
    path,
    "currentUser=",
    currentUser
  );

  // if (!currentUser) {
  //   return <Redirect to="/login"></Redirect>;
  // }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
