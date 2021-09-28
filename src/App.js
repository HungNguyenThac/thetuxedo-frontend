import firebase from "firebase";
import { createBrowserHistory } from "history";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import { postBillToReducer } from "./actions/billUser";
import { dispatchHistory } from "./actions/history";
import { setInfoUser } from "./actions/infoUser";
import { addItemToCartFormDataUser } from "./actions/itemCart";
import userApi from "./api/userApi";
import "./App.scss";
import Footer from "./components share/footer";
import Header from "./components share/header";
import LoadingMain from "./components share/loading";
import RouterApp from "./components share/router/routerApp";
import { getCookie } from "./shareFunction/checkCookies";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const cookies = getCookie("user");
    if (cookies.length >= 1) {
      async function getDataUser() {
        let response = await userApi.getDataUser();
        const { status, user } = response;
        if (status === 200) {
          dispatch(setInfoUser(user));
          dispatch(addItemToCartFormDataUser(user.cart));
          dispatch(postBillToReducer(user.bill));
          dispatch(dispatchHistory(user.history));
        }
      }
      getDataUser();
    }
  }, [dispatch]);

  return (
    <div className="main-shop">
      <Suspense fallback={<LoadingMain />}>
        <Router history={createBrowserHistory()}>
          <Header />
          <RouterApp />
          <Footer />
          <LoadingMain />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
