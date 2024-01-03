import { createStyles, Slider as ManSlider, SliderProps } from "@mantine/core";

const useStyles = createStyles(() => ({
  root: {
    pointerEvents: "none",
  },
  thumb: {
    pointerEvents: "all",
  },
}));

export const SliderNoClick = (props: SliderProps) => {
  const { classes } = useStyles();
  return (
    <ManSlider
      classNames={{
        root: classes.root,
        thumb: classes.thumb,
      }}
      color="orange"
      style={{ flexGrow: 1 }}
      size="xl"
      thumbSize={32}
      {...props}
    />
  );
};
