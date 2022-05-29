using System.IO.Ports;

public interface IStateService {
    void ParseCommand(string command);
    State GetState();
}

public class StateService : IStateService {
    private State _state;

    public StateService() {
        _state = new State();
    }

    public State GetState() {
        return _state;
    }

    public void toggleMute(int roomId) {

    }

    public void ParseCommand(string command) {
        System.Console.WriteLine($"Parsing {command}");
        var f1 = command.Substring(3, 2);
        var f2 = command.Substring(5, 2);
        _ = int.TryParse(command.AsSpan(8 , 2), out var room);
        System.Console.WriteLine($"f1: {f1}, f2:{f2}");
        switch (f1) {
            case "MT":
                switch (f2) {
                    case "ON":
                        _state.Rooms[room - 1].Mute = true;
                        break;
                    case "OF":
                        _state.Rooms[room - 1].Mute = false;
                        break;
                }
                break;
        }
    }
}