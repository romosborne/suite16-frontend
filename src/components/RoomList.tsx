import { Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { AnthemDbo, InputDbo, RoomDbo } from "./models";
import { Room } from "./Room";
import Connector from "../signalRConnection";
import { Anthem } from "./Anthem";

export const RoomList = (props: { server: string }) => {
  const [rooms, setRooms] = useState<RoomDbo[]>([]);
  const [inputs, setInputs] = useState<InputDbo[]>([]);
  const [anthem, setAnthem] = useState<AnthemDbo | null>(null);
  const [anthemInputs, setAnthemInputs] = useState<InputDbo[]>([]);

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
      },
      (a) => {
        setAnthem(a);
      }
    );
  });

  useEffect(() => {
    const fetchState = async () => {
      const data = await fetch(`http://${props.server}/room/`);
      const json = await data.json();
      setRooms(json.rooms);
      setInputs(json.inputs);
      setAnthem(json.anthem);
      setAnthemInputs(json.anthemInputs);
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
      {anthem && (
        <Anthem a={anthem} inputs={anthemInputs} server={props.server} />
      )}
      {rooms.map((r) => (
        <Room key={r.id} r={r} inputs={inputs} server={props.server} />
      ))}
    </Container>
  );
};
