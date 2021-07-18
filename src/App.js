import "./App.scss";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import Header from "./components share/header";
import RouterApp from "./components share/router/routerApp";
import Footer from "./components share/footer";
import LoadingMain from "./components share/loading";
import axios from "axios";
import { getCookie } from "./shareFunction/checkCookies";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUser } from "./actions/infoUser";
import { addItemToCartFormDataUser } from "./actions/itemCart";
import { postBillToReducer } from "./actions/billUser";
import { dispatchHistory } from "./actions/history";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const cookies = getCookie("user");
    if (cookies.length !== 0) {
      async function getDataUser() {
        let responseDataUser = await axios({
          method: "POST",
          url: "http://localhost:9527/user/getData",
          headers: { Authorization: cookies },
        });
        if (responseDataUser.status === 200) {
          dispatch(setInfoUser(responseDataUser.data.data));
          dispatch(addItemToCartFormDataUser(responseDataUser.data.data.cart));
          let bill = postBillToReducer(responseDataUser.data.data.bill);
          dispatch(bill);
          let history = dispatchHistory(responseDataUser.data.data.history);
          dispatch(history);
        }
      }
      getDataUser();
    }
  }, []);

  return (
    <div className="main-shop">
      <Suspense fallback={<div></div>}>
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
