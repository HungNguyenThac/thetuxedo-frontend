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
      <Route exact path="/vestcollection/listItem" component={vestCollection} />
      <Route exact path="/vestcollection/vestcuoi" component={vestcuoi} />
      <Route exact path="/vestcollection/vestcongso" component={vestcongso} />
      <Route exact path="/vestcollection/vestdahoi" component={vestdahoi} />
    </Switch>
  );
}

export default Vest;
