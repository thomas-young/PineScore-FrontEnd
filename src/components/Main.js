import React from "react";
import { Switch, Route } from "react-router-dom";
import ProfessorTable from "./ProfessorTable";
import { Info } from "./Info";

const Main = state => (
  <Switch>
    <Route
      exact
      path="/"
      render={professors => (
        <ProfessorTable professorinfo={state.professorinfo} />
      )}
    />
    <Route path="/info" component={Info} />
  </Switch>
);

export default Main;
