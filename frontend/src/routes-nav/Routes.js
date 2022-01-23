import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../components/Home";
import StylistList from "../components/StylistList";
import Clients from "../components/Clients";
import ClientSignupForm from "../components/ClientSignupForm";
import LoginForm from "../components/LoginForm";
import PrivateRoute from "./PrivateRoute";
import ClientProfile from "../components/ClientProfile";
import StylistProfile from "../components/StylistProfile";

function Routes({ login, signup }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
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
        <PrivateRoute exact path="/clients/profile">
          <ClientProfile></ClientProfile>
        </PrivateRoute>
        <PrivateRoute exact path="/stylists/:email">
          <StylistProfile></StylistProfile>
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
