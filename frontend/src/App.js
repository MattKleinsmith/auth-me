import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import * as sessionActions from "./store/session";
import Header from "./components/Header";
import SpotGrid from "./components/SpotGrid/SpotGrid";
import SpotDetails from "./components/SpotDetails";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);

  return (
    <div >
      <Header />
      <Switch>
        <Route exact path="/"><SpotGrid /></Route>
        <Route path="/spots/:spotId"><SpotDetails /></Route>
        <Route path="*"><SpotDetails /></Route>
      </Switch>
    </div>
  );
}

export default App;
