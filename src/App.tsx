import "./App.css";
import { RoomList } from "./components/RoomList";

function App() {
  return <RoomList server={import.meta.env.VITE_API_URL} />;
}

export default App;
