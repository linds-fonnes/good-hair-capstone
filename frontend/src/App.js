import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes-nav/Routes";
import UserContext from "./UserContext";
import jwt from "jsonwebtoken";
import GoodHairApi from "./api/api";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";

export const TOKEN_STORAGE_ID = "goodhair-token";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [favoritedIds, setFavoritedIds] = useState(new Set([]));

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { email } = jwt.decode(token);
            GoodHairApi.token = token;
            let user = await GoodHairApi.getCurrentUser(email);
            setCurrentUser(user.data.email);
            setFavoritedIds(new Set(currentUser.favorites));
          } catch (err) {
            console.error("loadUserInfo error:", err);
            setCurrentUser(null);
          }
        }
      }
      getCurrentUser();
    },
    [token]
  );

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function signup(signupData) {
    try {
      let token = await GoodHairApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  async function login(loginData) {
    try {
      let token = await GoodHairApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function hasFavoritedStylist(id) {
    return favoritedIds.has(id);
  }

  function addFavorite(id) {
    if (hasFavoritedStylist(id)) return;
    GoodHairApi.addFavorite(currentUser.email, id);
    setFavoritedIds(new Set([...favoritedIds, id]));
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          hasFavoritedStylist,
          addFavorite,
        }}
      >
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
