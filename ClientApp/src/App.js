import React, { Component } from "react";
import { Container, Navbar } from "react-bootstrap";

import "./custom.css";
import { RoomList } from "./features/room/RoomList";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <React.StrictMode>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>Dovecote Speakers</Navbar.Brand>
          </Container>
        </Navbar>
        <RoomList />
      </React.StrictMode>
    );
  }
}
