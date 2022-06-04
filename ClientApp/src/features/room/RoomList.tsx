import { Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BaseUrl, InputDbo, RoomDbo } from "./models";
import { Room } from "./Room";

export const RoomList = () => {
  const [rooms, setRooms] = useState<RoomDbo[]>([]);
  const [inputs, setInputs] = useState<InputDbo[]>([]);

  useEffect(() => {
    const fetchState = async () => {
      const data = await fetch(`${BaseUrl}/room/`);
      const json = await data.json();
      setRooms(json.rooms);
      setInputs(json.inputs);
    };

    fetchState().catch(console.error);
  }, []);

  if (rooms.length === 0) {
    return (
      <Center style={{ height: 500 }}>
        <Spinner animation="border" />
      </Center>
    );
  }

  return (
    <Container fluid="sm">
      {rooms.map((r) => (
        <Room key={r.id} r={r} inputs={inputs} />
      ))}
    </Container>
  );
};
