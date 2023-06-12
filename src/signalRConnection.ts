import * as signalR from "@microsoft/signalr";
import { RoomDbo } from "./components/models";
const URL = "http://localhost:5103/roomHub"; //or whatever your backend port is
class Connector {
  private connection: signalR.HubConnection;
  public events: (
    onPingReceived: (message: string) => void,
    onRoomUpdate: (room: RoomDbo) => void
  ) => void;
  static instance: Connector;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => document.write(err));
    this.events = (onPingReceived, onRoomUpdate) => {
      this.connection.on("ReceivePing", (message) => onPingReceived(message));
      this.connection.on("UpdateRoom", (room) => onRoomUpdate(room));
    };
  }
  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;
