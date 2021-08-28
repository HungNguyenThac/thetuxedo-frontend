import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const main = React.lazy(() => import("../../feature/mainpage"));
const notFound = React.lazy(() => import("../notFound"));
const vest = React.lazy(() => import("../../feature/vestcollection/index.jsx"));
const aosomi = React.lazy(() => import("../../feature/aosomi"));
const giay = React.lazy(() => import("../../feature/giay"));
const quan = React.lazy(() => import("../../feature/quan"));
const sale = React.lazy(() => import("../../feature/sale"));
const phukien = React.lazy(() => import("../../feature/phukien"));
const login = React.lazy(() => import("../../feature/trangdangnhap"));
const userpage = React.lazy(() => import("../../feature/trangcanhan"));
const lienhe = React.lazy(() => import("../../feature/tranglienhe"));
const chitiet = React.lazy(() => import("../../feature/detail"));
const cartPage = React.lazy(() => import("../../feature/cartPage"));
const payPage = React.lazy(() => import("../../feature/thanhToan"));

RouterApp.propTypes = {};

function RouterApp(props) {
  return (
    <Switch>
      <Route exact path="/" component={main} />
      <Redirect
        from="/feature/vestcollection"
        to="/feature/vestcollection/vestcollection/"
        exact
      />
      <Route path="/feature/vestcollection/" component={vest} />
      <Route exact path="/feature/aosomi" component={aosomi} />
      <Route exact path="/feature/giaytay" component={giay} />
      <Route exact path="/feature/quanau" component={quan} />
      <Route exact path="/feature/uudai" component={sale} />
      <Redirect from="/feature/phukien" to="/feature/phukien/combo" exact />
      <Route path="/feature/phukien" component={phukien} />
      <Route exact path="/feature/login" component={login} />
      <Route exact path="/feature/dashboard" component={userpage} />
      <Route exact path="/feature/connectwithus" component={lienhe} />
      <Route exact path="/feature/detail" component={chitiet} />
      <Route exact path="/feature/cartPage" component={cartPage} />
      <Route exact path="/feature/payPage" component={payPage} />
      <Route component={notFound} />
    </Switch>
  );
}

export default RouterApp;
