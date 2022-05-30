import React, { Component } from "react";

import "./custom.css";
import { RoomList } from "./features/room/RoomList";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <React.StrictMode>
        Hello
        <RoomList />
      </React.StrictMode>
    );
  }
}
