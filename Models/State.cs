public class State {
    public Room[] Rooms { get; set; }
    public Input[] Inputs { get; set; }

    public State() {
        Rooms = new Room[16];
        Inputs = new Input[16];

        for (int i = 0; i < 16; i++) {
            Rooms[i] = new Room(i + 1);
            Inputs[i] = new Input(i + 1);
        }
    }

    public void AdjustRoom(int room, Action<Room> f) {
        f(Rooms.Single(r => r.Id == room));
    }
}