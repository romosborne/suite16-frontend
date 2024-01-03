import { useEffect, useState } from "react";
import { NativeSelect, Paper, Title } from "@mantine/core";
import { AnthemDbo, InputDbo } from "./models";
import { SliderNoClick } from "./SliderNoClick";

export const Anthem = ({
  a,
  inputs,
  server,
}: {
  a: AnthemDbo;
  inputs: InputDbo[];
  server: string;
}) => {
  const [vol, setVol] = useState(a.volume);

  useEffect(() => {
    setVol(a.volume);
  }, [a]);

  const handle = async (url: string) => {
    const response = await fetch(`http://${server}/room/anthem/${url}`, {
      method: "POST",
    });
    if (!response.ok) {
      const body = await response.text();
      console.error(`Status: ${response.statusText} Body: ${body}`);
    }
  };

  const handleSetVol = async (value: number) => await handle(`vol/${value}`);
  const handleSetInput = async (id: string) => await handle(`input/${id}`);

  return (
    <>
      <Paper shadow="md" p="md" withBorder style={{ marginTop: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Title order={2} style={{ flexGrow: 1, textAlign: "left" }}>
            Anthem
          </Title>
          <NativeSelect
            data={inputs.map((i) => {
              return { value: i.id, label: i.name };
            })}
            value={a.inputId}
            onChange={(e) => handleSetInput(e.currentTarget.value)}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", minHeight: "44px" }}
        >
          <SliderNoClick
            marks={[{ value: -75 }, { value: -50 }, { value: -25 }]}
            min={-95.5}
            max={0}
            label={null}
            value={vol}
            onChange={setVol}
            onChangeEnd={handleSetVol}
          />
        </div>
      </Paper>
    </>
  );
};
