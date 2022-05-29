using System.IO.Ports;

public interface ISuite16ComService {
    void ToggleMute(int roomId);
}

public class Suite16ComService : ISuite16ComService, IDisposable {
    private readonly object _lock;

    private readonly List<string> _buffer;
    private readonly SerialPort _sp;
    private readonly IStateService _state;

    public Suite16ComService(string comPort, IStateService state) {
        _state = state;

        _buffer = new List<string>();
        _lock = new object();

        _sp = new SerialPort() {
            PortName = comPort,
            BaudRate = 19200,
            DataBits = 8,
            StopBits = StopBits.One,
            Parity = Parity.None,
        };
        _sp.DataReceived += new SerialDataReceivedEventHandler(Read);
        _sp.Open();
        System.Console.WriteLine("Hello");
        CompleteRefresh();
    }

    private void Send(string a) {
        _sp.Write($"{a}\r");
    }
    private void CompleteRefresh() {
        Send("`GALRMG00\r\n");
    }

    public void ToggleMute(int room) {
        Send($"`SMTOGR{room:00}");
    }

    private void Read(object sender, SerialDataReceivedEventArgs e) {
        try {
            string? command = null;
            lock (_lock) {
                var x = _sp.ReadExisting();
                _buffer.Add(x);
                if (x.EndsWith("\r")) {
                    command = string.Join("", _buffer);
                    _buffer.Clear();
                }
            }

            if (command != null) _state.ParseCommand(command);
        }
        catch (IOException ex) {
            System.Console.WriteLine(ex);
        }
    }

    public void Dispose() {
        _sp.Close();
    }
}