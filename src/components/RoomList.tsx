import { Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { InputDbo, RoomDbo } from "./models";
import { Room } from "./Room";
import Connector from "../signalRConnection";

export const RoomList = (props: { server: string }) => {
  const [rooms, setRooms] = useState<RoomDbo[]>([]);
  const [inputs, setInputs] = useState<InputDbo[]>([]);

  const { events } = Connector(props.server);

  useEffect(() => {
    events(
      (m) => console.warn(`Ping: ${m}`),
      (r) => {
        //console.warn({ r });
        setRooms((rooms) => {
          const newRooms = [];
          for (const oldRoom of rooms) {
            if (oldRoom.id === r.id) newRooms.push(r);
            else newRooms.push(oldRoom);
          }
          return newRooms;
        });
      }
    );
  });

  useEffect(() => {
    const fetchState = async () => {
      const data = await fetch(`http://${props.server}/room/`);
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
        <Room key={r.id} r={r} inputs={inputs} server={props.server} />
      ))}
    </Container>
  );
};
