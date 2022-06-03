import { useState } from "react";
import {
  ActionIcon,
  NativeSelect,
  Paper,
  Slider,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { Col, Modal, Row } from "react-bootstrap";
import { Settings, Volume, Volume3 } from "tabler-icons-react";
import { BaseUrl, InputDbo, Phonic, RoomDbo } from "./models";

export const Room = ({ r, inputs }: { r: RoomDbo; inputs: InputDbo[] }) => {
  const [showModal, setModal] = useState(false);
  const [room, setRoom] = useState(r);

  // State for sliders
  const [vol, setVol] = useState(r.volume);
  const [bass, setBass] = useState(r.bass);
  const [treble, setTreble] = useState(r.treble);

  const handle = async (url: string, f: (r: RoomDbo) => RoomDbo) => {
    const response = await fetch(`${BaseUrl}/room/${r.id}/${url}`, {
      method: "POST",
    });
    if (response.ok) {
      setRoom(f);
    } else {
      const body = await response.text();
      console.error(`Status: ${response.statusText} Body: ${body}`);
    }
  };

  const handleToggleMute = async () =>
    await handle("toggleMute", (r) => {
      return { ...r, mute: !r.mute };
    });
  const handleSetVol = async (value: number) =>
    await handle(`vol/${value}`, (r) => {
      return { ...r, vol: value };
    });
  const handleSetBass = async (value: number) =>
    await handle(`bass/${value}`, (r) => {
      return { ...r, bass: value };
    });
  const handleSetTreble = async (value: number) =>
    await handle(`treble/${value}`, (r) => {
      return { ...r, treble: value };
    });
  const handleSetLoud = async (value: boolean) =>
    await handle(`loudnessContour/${value ? "1" : "0"}`, (r) => {
      return { ...r, loudnessContour: value };
    });
  const handleSetStereoEnhance = async (value: boolean) =>
    await handle(`stereoEnhance/${value ? "1" : "0"}`, (r) => {
      return { ...r, stereoEnhance: value };
    });

  const handleSetInput = async (id: string) => {
    await handle(`input/${id}`, (r) => {
      return { ...r, inputId: id };
    });
  };

  const handleSetPhonic = async (phonic: Phonic) => {
    await handle(`phonic/${phonic}`, (r) => {
      return { ...r, phonic: phonic };
    });
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{r.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ marginBottom: 20 }}>
            <Col xs={3}>
              <Text weight={500}>Input: </Text>
            </Col>
            <Col>
              <NativeSelect
                data={inputs.map((i) => {
                  return { value: i.id, label: i.name };
                })}
                value={room.inputId}
                onChange={(e) => handleSetInput(e.currentTarget.value)}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col xs={3}>
              <Text weight={500}>Treble: </Text>
            </Col>
            <Col>
              <Slider
                min={-12}
                max={12}
                step={2}
                label={null}
                marks={[
                  { value: -12, label: "-12db" },
                  { value: 0, label: "0db" },
                  { value: 12, label: "+12db" },
                ]}
                color="orange"
                value={treble}
                onChange={setTreble}
                onChangeEnd={handleSetTreble}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col xs={3}>
              <Text weight={500}>Bass: </Text>
            </Col>
            <Col>
              <Slider
                min={-12}
                max={12}
                step={2}
                label={null}
                marks={[
                  { value: -12, label: "-12db" },
                  { value: 0, label: "0db" },
                  { value: 12, label: "+12db" },
                ]}
                color="orange"
                value={bass}
                onChange={setBass}
                onChangeEnd={handleSetBass}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col>
              <Switch
                label="Loudness Contour"
                checked={room.loudnessContour}
                onChange={(e) => handleSetLoud(e.currentTarget.checked)}
              />
            </Col>
            <Col>
              <Switch
                label="Stereo Enhance"
                checked={room.stereoEnhance}
                onChange={(e) =>
                  handleSetStereoEnhance(e.currentTarget.checked)
                }
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col xs={3}>
              <Text weight={500}>Phonic: </Text>
            </Col>
            <Col>
              <NativeSelect
                data={[
                  { value: Phonic[Phonic.Stereo], label: "Stereo" },
                  { value: Phonic[Phonic.MonoLeft], label: "Mono Left" },
                  { value: Phonic[Phonic.MonoRight], label: "Mono Right" },
                ]}
                value={Phonic[room.phonic]}
                onChange={(e) =>
                  handleSetPhonic(
                    Phonic[e.currentTarget.value as keyof typeof Phonic]
                  )
                }
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Paper shadow="md" p="md" withBorder style={{ marginTop: 10 }}>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col xs={1} style={{ padding: "10px", marginRight: "10px" }}>
            <ActionIcon
              radius="sm"
              size="xl"
              onClick={(_: any) => handleToggleMute()}
            >
              {room.mute ? (
                <Volume3 size={48} />
              ) : (
                <Volume size={48} color="orange" />
              )}
            </ActionIcon>
          </Col>
          <Col>
            <Title order={2}>{r.name}</Title>
          </Col>
          <Col xs={1}>
            <ActionIcon radius="sm" onClick={(_: any) => setModal(true)}>
              <Settings size={48} />
            </ActionIcon>
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
              onChangeEnd={handleSetVol}
            />
          </Col>
        </Row>
      </Paper>
    </>
  );
};
