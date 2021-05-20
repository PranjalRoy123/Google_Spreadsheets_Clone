import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import MyNav from "./MyNav";
import { v4 as uuidv4 } from "uuid";
import Room from "./Room";

export default function App() {
  return (
    <Router>
      <MyNav />
      <Switch>
        <Route path="/" exact>
          <div>Home</div>
        </Route>
        <Route path="/room/:code">
          <Room />
        </Route>
        <Route path="/create/">
          <Redirect to={`/room/${uuidv4(8)}`}></Redirect>
        </Route>
      </Switch>
    </Router>
  );
}
