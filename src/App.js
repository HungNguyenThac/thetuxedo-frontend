import "./App.scss";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components share/header";
const main = React.lazy(() => import("./feauture/mainpage"));
const notFound = React.lazy(() => import("./components share/notFound"));
const vest = React.lazy(() => import("./feauture/vestcollection"));
const vestcuoi = React.lazy(() => import("./feauture/vestcollection/vescuoi"));
const vestcongso = React.lazy(() =>
  import("./feauture/vestcollection/vestcongso")
);
const vestdahoi = React.lazy(() =>
  import("./feauture/vestcollection/vestdahoi")
);
const aosomi = React.lazy(() => import("../src/feauture/aosomi"));
const giay = React.lazy(() => import("../src/feauture/giay"));
const quan = React.lazy(() => import("../src/feauture/quan"));
const sale = React.lazy(() => import("../src/feauture/sale"));
const phukien = React.lazy(() => import("../src/feauture/phukien"));
const cavat = React.lazy(() => import("../src/feauture/phukien/cavat"));
const khancaiao = React.lazy(() => import("../src/feauture/phukien/khancaiao"));
const mangsettay = React.lazy(() =>
  import("../src/feauture/phukien/mangsettay")
);
const nocaico = React.lazy(() => import("../src/feauture/phukien/nocaico"));
const thatlung = React.lazy(() => import("../src/feauture/phukien/thatlung"));
const login = React.lazy(() => import("./feauture/trangdangnhap"));
const userpage = React.lazy(() => import("./feauture/trangcanhan"));
const lienhe = React.lazy(() => import("./feauture/tranglienhe"));

function App() {
  return (
    <div className="main-shop">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={main} />
            <Route
              exact
              path="/feature/vestcollection/vestcuoi"
              component={vestcuoi}
            />
            <Route
              exact
              path="/feature/vestcollection/vestdahoi"
              component={vestdahoi}
            />
            <Route
              exact
              path="/feature/vestcollection/vestcongso"
              component={vestcongso}
            />
            <Route exact path="/feature/vestcollection" component={vest} />
            <Route exact path="/feature/aosomi" component={aosomi} />
            <Route exact path="/feature/giaytay" component={giay} />
            <Route exact path="/feature/quanau" component={quan} />
            <Route exact path="/feature/uudai" component={sale} />
            <Route exact path="/feature/phukien" component={phukien} />
            <Route
              exact
              path="/feature/phukien/thatlung"
              component={thatlung}
            />
            <Route exact path="/feature/phukien/cavat" component={cavat} />
            <Route exact path="/feature/phukien/nocaico" component={nocaico} />
            <Route
              exact
              path="/feature/phukien/khancaiao"
              component={khancaiao}
            />
            <Route
              exact
              path="/feature/phukien/mangsettay"
              component={mangsettay}
            />
            <Route exact path="/feature/login" component={login} />
            <Route exact path="/feature/userpage" component={userpage} />
            <Route exact path="/feature/connectwithus" component={lienhe} />
            <Route component={notFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
