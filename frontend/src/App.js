import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import * as sessionActions from "./store/session";
import Header from "./components/Header";
import SpotGrid from "./components/SpotGrid/SpotGrid";
import SpotDetails from "./components/SpotDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div >
      <Header isLoaded={isLoaded} />
      <div className="line"></div>
      <Switch  >
        <Route exact path="/"><SpotGrid /></Route>
        <Route exact path="/spots/:spotId"><SpotDetails /></Route>
      </Switch>
    </div>
  );
}

export default App;
