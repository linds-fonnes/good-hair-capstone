import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../components/Home";
import Stylists from "../components/Stylists";
import StylistList from "../components/StylistList";
import Clients from "../components/Clients";
import StylistSignupForm from "../components/StylistSignupForm";
import ClientSignupForm from "../components/ClientSignupForm";
import LoginForm from "../components/LoginForm";
import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/stylists/signup">
          <StylistSignupForm signup={signup}></StylistSignupForm>
        </Route>
        <Route exact path="/stylists">
          <Stylists />
        </Route>
        <Route exact path="/clients/signup">
          <ClientSignupForm signup={signup}></ClientSignupForm>
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}></LoginForm>
        </Route>
        <PrivateRoute exact path="/stylists/search">
          <StylistList></StylistList>
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
