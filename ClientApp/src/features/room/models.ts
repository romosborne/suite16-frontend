export interface RoomDbo {
  id: string;
  name: string;
  mute: boolean;
  volume: number;
  bass: number;
  treble: number;
  balance: number;
  inputId: string;
}

export interface InputDbo {
  id: string;
  name: string;
}

export const BaseUrl = "http://localhost:5066";
