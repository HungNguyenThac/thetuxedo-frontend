import React from "react";
import { Route, Switch } from "react-router-dom";

const vestCollection = React.lazy(() => import("./VestCollection"));
const vestcuoi = React.lazy(() => import("./vestCuoi"));
const vestcongso = React.lazy(() => import("./vestCongSo"));
const vestdahoi = React.lazy(() => import("./vestDaHoi"));

Vest.propTypes = {};

function Vest(props) {
  return (
    <Switch>
      <Route
        exact
        path="/feature/vestcollection/vestcollection"
        component={vestCollection}
      />
      <Route
        exact
        path="/feature/vestcollection/vestcuoi"
        component={vestcuoi}
      />
      <Route
        exact
        path="/feature/vestcollection/vestcongso"
        component={vestcongso}
      />
      <Route
        exact
        path="/feature/vestcollection/vestdahoi"
        component={vestdahoi}
      />
    </Switch>
  );
}

export default Vest;
