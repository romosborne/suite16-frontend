import { useState } from "react";
import "./App.css";
import { RoomList } from "./components/RoomList";
import { Modal } from "react-bootstrap";
import { TextInput } from "@mantine/core";

function App() {
  const [server, setServer] = useState<string | null>("192.168.5.113:5000");

  return (
    <>
      <Modal show={!server} centered>
        <Modal.Header>
          <Modal.Title>Set server</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            onBlurCapture={(event) => setServer(event.currentTarget.value)}
          />
        </Modal.Body>
      </Modal>
      {server && <RoomList server={server} />}
    </>
  );
}

export default App;
