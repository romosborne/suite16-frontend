import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./features/Layout";
import { Home } from "./features/Home";
import { FetchData } from "./features/FetchData";
import { Counter } from "./features/Counter";

import "./custom.css";
import { RoomList } from "./features/room/RoomList";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={RoomList} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
      </Layout>
    );
  }
}
