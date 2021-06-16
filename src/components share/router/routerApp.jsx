import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

const main = React.lazy(() => import("../../feauture/mainpage"));
const notFound = React.lazy(() => import("../notFound"));
const vest = React.lazy(() => import("../../feauture/vestcollection"));
const vestcuoi = React.lazy(() =>
  import("../../feauture/vestcollection/vescuoi")
);
const vestcongso = React.lazy(() =>
  import("../../feauture/vestcollection/vestcongso")
);
const vestdahoi = React.lazy(() =>
  import("../../feauture/vestcollection/vestdahoi")
);
const aosomi = React.lazy(() => import("../../feauture/aosomi"));
const giay = React.lazy(() => import("../../feauture/giay"));
const quan = React.lazy(() => import("../../feauture/quan"));
const sale = React.lazy(() => import("../../feauture/sale"));
const phukien = React.lazy(() => import("../../feauture/phukien"));
const cavat = React.lazy(() => import("../../feauture/phukien/cavat"));
const khancaiao = React.lazy(() => import("../../feauture/phukien/khancaiao"));
const mangsettay = React.lazy(() =>
  import("../../feauture/phukien/mangsettay")
);
const nocaico = React.lazy(() => import("../../feauture/phukien/nocaico"));
const thatlung = React.lazy(() => import("../../feauture/phukien/thatlung"));
const login = React.lazy(() => import("../../feauture/trangdangnhap"));
const userpage = React.lazy(() => import("../../feauture/trangcanhan"));
const lienhe = React.lazy(() => import("../../feauture/tranglienhe"));
const chitiet = React.lazy(() => import("../../feauture/detail"));
const cartPage = React.lazy(() => import("../../feauture/cartPage"));

RouterApp.propTypes = {};

function RouterApp(props) {
  return (
    <Switch>
      <Route exact path="/" component={main} />
      <Route exact path="/feature/vestcollection" component={vest} />
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
      <Route exact path="/feature/aosomi" component={aosomi} />
      <Route exact path="/feature/giaytay" component={giay} />
      <Route exact path="/feature/quanau" component={quan} />
      <Route exact path="/feature/uudai" component={sale} />
      <Route exact path="/feature/phukien" component={phukien} />
      <Route exact path="/feature/phukien/thatlung" component={thatlung} />
      <Route exact path="/feature/phukien/cavat" component={cavat} />
      <Route exact path="/feature/phukien/nocaico" component={nocaico} />
      <Route exact path="/feature/phukien/khancaiao" component={khancaiao} />
      <Route exact path="/feature/phukien/mangsettay" component={mangsettay} />
      <Route exact path="/feature/login" component={login} />
      <Route exact path="/feature/userpage" component={userpage} />
      <Route exact path="/feature/connectwithus" component={lienhe} />
      <Route exact path="/feature/detail" component={chitiet} />
      <Route exact path="/feature/cartPage" component={cartPage} />
      <Route component={notFound} />
    </Switch>
  );
}

export default RouterApp;
