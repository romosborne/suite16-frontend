import { useState } from "react";
import { ActionIcon, Paper, Slider, Title } from "@mantine/core";
import { Col, Row } from "react-bootstrap";
import { Volume, Volume3 } from "tabler-icons-react";
import { BaseUrl, RoomDbo } from "./models";

export const Room = ({ r }: { r: RoomDbo }) => {
  const [vol, setVol] = useState(r.volume);
  const [mute, setMute] = useState(r.mute);

  const handleToggleMute = async () => {
    await fetch(`${BaseUrl}/room/${r.id}/toggleMute`, {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        setMute(!mute);
      } else {
        console.log(response.statusText);
        console.log(response.body);
      }
    });
  };

  const handleSetVolume = async (value: number) => {
    const response = await fetch(`${BaseUrl}/room/${r.id}/vol/${value}`, {
      method: "POST",
    });
    if (response.ok) {
      setVol(value);
    } else {
      console.log(response.statusText);
      console.log(response.body);
    }
  };

  return (
    <Paper shadow="md" p="md" withBorder style={{ marginTop: 10 }}>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col xs={1} style={{ padding: "10px", marginRight: "10px" }}>
          <ActionIcon
            radius="sm"
            size="xl"
            onClick={(_: any) => handleToggleMute()}
          >
            {mute ? <Volume3 size={48} /> : <Volume size={48} color="orange" />}
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
            value={vol}
            onChange={setVol}
            onChangeEnd={handleSetVolume}
          />
        </Col>
      </Row>
    </Paper>
  );
};
