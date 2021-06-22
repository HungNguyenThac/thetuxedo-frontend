import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Router, Switch, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components share/header";
import RouterApp from "./components share/router/routerApp";
import Footer from "./components share/footer";

// window.addEventListener("resize", setPaddingBottom);
// function setPaddingBottom() {
//   const mainShop = document.querySelector(".main-shop");
//   console.log(mainShop);
//   if (mainShop !== null) {
//     mainShop.style.paddingBottom = window.innerWidth / 3.772 + "px";
//   }
// }

function App() {
  return (
    <div className="main-shop">
      <Suspense fallback={<div></div>}>
        <Router history={createBrowserHistory()}>
          <Header />
          <RouterApp />
          <Footer />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
