import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components share/header";
import RouterApp from "./components share/router/routerApp";

function App() {
  return (
    <div className="main-shop">
      <Suspense fallback={<div></div>}>
        <BrowserRouter>
          <Header />
          <RouterApp />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
