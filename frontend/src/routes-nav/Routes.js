import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../components/Home";
import Stylists from "../components/Stylists";
import Clients from "../components/Clients";

function Routes({ login, signup }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/stylists">
          <Stylists />
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}></LoginForm>
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup}></SignupForm>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
