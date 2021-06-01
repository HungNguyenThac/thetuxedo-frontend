import "./App.css";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components share/header";
const main = React.lazy(() => import("./feauture/mainpage"));
const notFound = React.lazy(() => import("./components share/notFound"));
const ao = React.lazy(() => import("../src/feauture/ao"));
const giay = React.lazy(() => import("../src/feauture/giay"));
const quan = React.lazy(() => import("../src/feauture/quan"));
const sale = React.lazy(() => import("../src/feauture/sale"));

function App() {
  return (
    <div className="main-shop">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={main} />
            <Route exact path="/feature/ao" component={ao} />
            <Route exact path="/feature/giay" component={giay} />
            <Route exact path="/feature/quan" component={quan} />
            <Route exact path="/feature/sale" component={sale} />
            <Route exact component={notFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
