import axios from "axios";
import firebase from "firebase";
import { createBrowserHistory } from "history";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import { postBillToReducer } from "./actions/billUser";
import { dispatchHistory } from "./actions/history";
import { setInfoUser } from "./actions/infoUser";
import { addItemToCartFormDataUser } from "./actions/itemCart";
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
