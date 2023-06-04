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
import { InputDbo, Phonic, RoomDbo } from "./models";
import { SliderNoClick } from "./SliderNoClick";

export const Room = ({ r, inputs }: { r: RoomDbo; inputs: InputDbo[] }) => {
  const [showModal, setModal] = useState(false);
  const [room, setRoom] = useState(r);

  // State for sliders
  const [vol, setVol] = useState(r.volume);
  const [bass, setBass] = useState(r.bass);
  const [treble, setTreble] = useState(r.treble);

  const handle = async (url: string, f: (r: RoomDbo) => RoomDbo) => {
    const response = await fetch(`/room/${r.id}/${url}`, {
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
    if (id === "") {
      await handle("off", (r) => {
        return { ...r, on: false };
      });
    } else {
      await handle(`input/${id}`, (r) => {
        return { ...r, inputId: id, on: true };
      });
    }
  };
  const handleOnOff = async () => {
    await handle(room.on ? "off" : "on", (r) => {
      return { ...r, on: !r.on };
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
          <Row style={{ marginBottom: 30 }}>
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
          <hr />
          <Row style={{ marginBottom: 30 }}>
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
          <Row style={{ marginBottom: 30 }}>
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
          <Row style={{ marginBottom: 30 }}>
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
          <Row style={{ marginBottom: 30 }}>
            <Col xs={3}>
              <Text weight={500}>Options: </Text>
            </Col>
            <Col>
              <Switch
                label="Loudness Contour"
                checked={room.loudnessContour}
                onChange={(e) => handleSetLoud(e.currentTarget.checked)}
                style={{ marginBottom: 10 }}
              />
              <Switch
                label="Stereo Enhance"
                checked={room.stereoEnhance}
                onChange={(e) =>
                  handleSetStereoEnhance(e.currentTarget.checked)
                }
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Paper shadow="md" p="md" withBorder style={{ marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title order={2} style={{ flexGrow: 1 }}>
            {r.name}
          </Title>
          <NativeSelect
            data={inputs
              .map((i) => {
                return { value: i.id, label: i.name };
              })
              .concat([{ value: "", label: "Off" }])}
            value={room.on ? room.inputId : ""}
            onChange={(e) => handleSetInput(e.currentTarget.value)}
          />
          <ActionIcon
            size="lg"
            radius="md"
            onClick={(_: any) => setModal(true)}
            style={{ marginRight: "5px" }}
          >
            <Settings size={48} />
          </ActionIcon>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ActionIcon
            radius="sm"
            size="xl"
            onClick={(_: any) => handleToggleMute()}
            style={{ padding: "5px", marginRight: "5px" }}
          >
            {room.mute ? (
              <Volume3 size={48} />
            ) : (
              <Volume size={48} color="orange" />
            )}
          </ActionIcon>
          <SliderNoClick
            marks={[{ value: 10 }, { value: 20 }, { value: 30 }]}
            max={40}
            label={null}
            color="orange"
            disabled={room.mute}
            value={vol}
            onChange={setVol}
            onChangeEnd={handleSetVol}
            style={{ flexGrow: 1 }}
          />
        </div>
      </Paper>
    </>
  );
};
