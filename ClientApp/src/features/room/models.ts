export interface RoomDbo {
  id: string;
  name: string;
  on: boolean;
  mute: boolean;
  volume: number;
  bass: number;
  treble: number;
  balance: number;
  stereoEnhance: boolean;
  loudnessContour: boolean;
  phonic: Phonic;
  inputId: string;
}

export interface InputDbo {
  id: string;
  name: string;
}

export enum Phonic {
  Stereo,
  MonoLeft,
  MonoRight,
}

export const BaseUrl = "http://192.168.1.15:5077";
