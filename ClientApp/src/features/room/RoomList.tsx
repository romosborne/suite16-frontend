import { Container } from "react-bootstrap";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store";
import { Room } from "./Room";

export const RoomList = () => {
  const roomIds = useAppSelector((state: RootState) =>
    state.rooms.map((r) => r.id)
  );

  return (
    <Container fluid className="w-75">
      {roomIds.map((r) => (
        <Room id={r} />
      ))}
    </Container>
  );
};
