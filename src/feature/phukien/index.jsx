import React from "react";
import { Route, Switch } from "react-router-dom";

import totalItem from "./combo";
import caVat from "./cavat";
import ghimCaiAo from "./ghimCaiAo";
import khanCaiAo from "./khancaiao";
import noCaiCo from "./nocaico";
import thatLung from "./thatlung";

// const totalItem = React.lazy(() => import("./combo"));
// const caVat = React.lazy(() => import("./cavat"));
// const ghimCaiAo = React.lazy(() => import("./ghimCaiAo"));
// const khanCaiAo = React.lazy(() => import("./khancaiao"));
// const noCaiCo = React.lazy(() => import("./nocaico"));
// const thatLung = React.lazy(() => import("./thatlung"));

PhuKienCollection.propTypes = {};

function PhuKienCollection(props) {
  return (
    <Switch>
      <Route exact path="/phukien/combo" component={totalItem} />
      <Route exact path="/phukien/thatlung" component={thatLung} />
      <Route exact path="/phukien/cavat" component={caVat} />
      <Route exact path="/phukien/nocaico" component={noCaiCo} />
      <Route exact path="/phukien/khancaiao" component={khanCaiAo} />
      <Route exact path="/phukien/ghimcaiao" component={ghimCaiAo} />
    </Switch>
  );
}

export default PhuKienCollection;
