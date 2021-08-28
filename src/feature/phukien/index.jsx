import React from "react";
import { Route, Switch } from "react-router-dom";

const totalItem = React.lazy(() => import("./TotalItem"));
const caVat = React.lazy(() => import("./cavat"));
const ghimCaiAo = React.lazy(() => import("./ghimCaiAo"));
const khanCaiAo = React.lazy(() => import("./khancaiao"));
const noCaiCo = React.lazy(() => import("./nocaico"));
const thatLung = React.lazy(() => import("./thatlung"));

PhuKienCollection.propTypes = {};

function PhuKienCollection(props) {
  return (
    <Switch>
      <Route exact path="/feature/phukien/combo" component={totalItem} />
      <Route exact path="/feature/phukien/thatlung" component={thatLung} />
      <Route exact path="/feature/phukien/cavat" component={caVat} />
      <Route exact path="/feature/phukien/nocaico" component={noCaiCo} />
      <Route exact path="/feature/phukien/khancaiao" component={khanCaiAo} />
      <Route exact path="/feature/phukien/ghimcaiao" component={ghimCaiAo} />
    </Switch>
  );
}

export default PhuKienCollection;
