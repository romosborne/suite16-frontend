import * as signalR from "@microsoft/signalr";
import { AnthemDbo, RoomDbo } from "./components/models";
class Connector {
  private connection: signalR.HubConnection;
  public events: (
    onPingReceived: (message: string) => void,
    onRoomUpdate: (room: RoomDbo) => void,
    onAnthemUpdate: (anthem: AnthemDbo) => void
  ) => void;
  static instance: Connector;

  constructor(url: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://${url}/roomHub`)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => document.write(err));
    this.events = (onPingReceived, onRoomUpdate, onAnthemUpdate) => {
      this.connection.on("ReceivePing", (message) => onPingReceived(message));
      this.connection.on("UpdateRoom", (room) => onRoomUpdate(room));
      this.connection.on("UpdateAnthem", (anthem) => onAnthemUpdate(anthem));
    };
  }
  public static getInstance(url: string): Connector {
    if (!Connector.instance) Connector.instance = new Connector(url);
    return Connector.instance;
  }
}
export default Connector.getInstance;
