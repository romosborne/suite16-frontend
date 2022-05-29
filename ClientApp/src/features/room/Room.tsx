import { useState } from "react";
import { ActionIcon, Paper, Slider, Title } from "@mantine/core";
import { Col, Row } from "react-bootstrap";
import { Volume, Volume3 } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectRoomById, setVolume, toggleMute } from "./roomSlice";

export const Room = ({ id }: { id: string }) => {
  const r = useAppSelector((state) => selectRoomById(state, id));
  if (r === undefined) throw new RangeError(`Unknown room id: ${id}`);

  const dispatch = useAppDispatch();
  const handleToggleMute = () => {
    console.log("Clicked");
    dispatch(toggleMute(id));
  };
  const handleSetVolume = (value: number) =>
    dispatch(setVolume({ id: id, value: value }));

  return (
    <Paper shadow="md" p="md" withBorder style={{ marginTop: 10 }}>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col xs={1} style={{ padding: "10px", marginRight: "10px" }}>
          <ActionIcon radius="sm" size="xl" onClick={handleToggleMute}>
            {r.muted ? (
              <Volume3 size={48} />
            ) : (
              <Volume size={48} color="orange" />
            )}
          </ActionIcon>
        </Col>
        <Col>
          <Title order={2}>{r.name}</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Slider
            marks={[{ value: 10 }, { value: 20 }, { value: 30 }]}
            max={40}
            label={null}
            color="orange"
            value={r.volume}
            // onChange={setVol}
            onChangeEnd={handleSetVolume}
          />
        </Col>
      </Row>
    </Paper>
  );
};
