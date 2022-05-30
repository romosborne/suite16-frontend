using System.IO.Ports;

public interface IStateService {
    void ParseCommand(string command);
    int? IdToIndex(int id);
    State GetState();
}

public class StateService : IStateService {
    private readonly State _state;

    public StateService() {
        _state = new State();
    }

    public State GetState() {
        return _state;
    }

    public int? IdToIndex(int id) {
        for (int i = 0; i < _state.Rooms.Length; i++) {
            if (_state.Rooms[i].Id == id) return i;
        }
        return null;
    }

    public void ParseCommand(string command) {
        System.Console.WriteLine($"Parsing {command}");
        var f1 = command.Substring(3, 2);
        var f2 = command.Substring(5, 2);
        _ = int.TryParse(command.AsSpan(8, 2), out var room);
        System.Console.WriteLine($"f1: {f1}, f2:{f2}");
        switch (f1) {
            // Mute
            case "MT":
                switch (f2) {
                    case "ON":
                        _state.AdjustRoom(room, (r) => r.Mute = true);
                        break;
                    case "OF":
                        _state.AdjustRoom(room, (r) => r.Mute = false);
                        break;
                }
                break;
            // Volume
            case "V0":
                _state.AdjustRoom(room, (r) => r.Volume = int.Parse(f2));
                break;

        }
    }
}