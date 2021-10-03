import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import main from "../../feature/mainpage";
import notFound from "../notFound";
import vest from "../../feature/vestcollection/index.jsx";
import aosomi from "../../feature/aosomi";
import giay from "../../feature/giay";
import quan from "../../feature/quan";
import sale from "../../feature/sale";
import phukien from "../../feature/phukien";
import login from "../../feature/trangdangnhap";
import userpage from "../../feature/trangcanhan";
import lienhe from "../../feature/tranglienhe";
import chitiet from "../../feature/detail";
import cartPage from "../../feature/cartPage";
import payPage from "../../feature/thanhToan";

// const main = React.lazy(() => import("../../feature/mainpage"));
// const notFound = React.lazy(() => import("../notFound"));
// const vest = React.lazy(() => import("../../feature/vestcollection/index.jsx"));
// const aosomi = React.lazy(() => import("../../feature/aosomi"));
// const giay = React.lazy(() => import("../../feature/giay"));
// const quan = React.lazy(() => import("../../feature/quan"));
// const sale = React.lazy(() => import("../../feature/sale"));
// const phukien = React.lazy(() => import("../../feature/phukien"));
// const login = React.lazy(() => import("../../feature/trangdangnhap"));
// const userpage = React.lazy(() => import("../../feature/trangcanhan"));
// const lienhe = React.lazy(() => import("../../feature/tranglienhe"));
// const chitiet = React.lazy(() => import("../../feature/detail"));
// const cartPage = React.lazy(() => import("../../feature/cartPage"));
// const payPage = React.lazy(() => import("../../feature/thanhToan"));

RouterApp.propTypes = {};

function RouterApp() {
  return (
    <Switch>
      <Route exact path="/" component={main} />
      <Redirect from="/vestcollection" to="/vestcollection/listItem" exact />
      <Route path="/vestcollection/" component={vest} />
      <Route exact path="/aosomi" component={aosomi} />
      <Route exact path="/giaytay" component={giay} />
      <Route exact path="/quanau" component={quan} />
      <Route exact path="/uudai" component={sale} />
      <Redirect from="/phukien" to="/phukien/combo" exact />
      <Route path="/phukien" component={phukien} />
      <Route exact path="/login" component={login} />
      <Route exact path="/dashboard" component={userpage} />
      <Route exact path="/connectwithus" component={lienhe} />
      <Route exact path="/aosomi/detail/:param" component={chitiet} />
      <Route exact path="/Handmade/detail/:param" component={chitiet} />
      <Route exact path="/giaytay/detail/:param" component={chitiet} />
      <Route exact path="/cavat/detail/:param" component={chitiet} />
      <Route exact path="/ghimcaiao/detail/:param" component={chitiet} />
      <Route exact path="/khancaiao/detail/:param" component={chitiet} />
      <Route exact path="/nocaico/detail/:param" component={chitiet} />
      <Route exact path="/thatlung/detail/:param" component={chitiet} />
      <Route exact path="/combophukien/detail/:param" component={chitiet} />
      <Route exact path="/quanau/detail/:param" component={chitiet} />
      <Route exact path="/uudai/detail/:param" component={chitiet} />
      <Route exact path="/vestdahoi/detail/:param" component={chitiet} />
      <Route exact path="/vestcongso/detail/:param" component={chitiet} />
      <Route exact path="/vestcuoi/detail/:param" component={chitiet} />
      <Route exact path="/cartPage" component={cartPage} />
      <Route exact path="/payPage" component={payPage} />
      <Route component={notFound} />
    </Switch>
  );
}

export default RouterApp;
