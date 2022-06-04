using System.IO.Ports;

public class Response {
    public bool Ok { get; set; }
    public string? Error { get; set; }
}

public interface ISuite16ComService {
    Response ToggleMute(int id);
    Response SetVolume(int id, int value);
    Response SetTreble(int id, int value);
    Response SetBass(int id, int value);
    Response SetLoudnessContour(int id, bool value);
    Response SetStereoEnhance(int id, bool value);
    Response SetPhonic(int id, Phonic value);
    Response SetInput(int id, int value);
    Response SetOn(int id, int input);
    Response SetOff(int id);
}

public class Suite16ComService : ISuite16ComService, IDisposable {
    private readonly object _lock;

    private readonly List<string> _buffer;
    private readonly SerialPort _sp;
    private readonly IStateService _state;

    private readonly Response Ok = new() { Ok = true };

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

    private Response CompleteRefresh() {
        Send("`GALRMG00\r\n");
        return Ok;
    }

    public Response ToggleMute(int room) {
        Send($"`SMTOGR{room:00}");
        return Ok;
    }

    public Response SetVolume(int room, int vol) {
        Send($"`SV{vol:000}R{room:00}");
        return Ok;
    }

    public Response SetTreble(int id, int value) {
        Send($"`ST{value:+00;-00;000}R{id:00}");
        return Ok;
    }

    public Response SetBass(int id, int value) {
        Send($"`SB{value:+00;-00;000}R{id:00}");
        return Ok;
    }

    public Response SetLoudnessContour(int id, bool value) {
        Send($"`SLD{(value ? "ON" : "OF")}R{id:00}");
        return Ok;
    }

    public Response SetStereoEnhance(int id, bool value) {
        Send($"`SSE{(value ? "ON" : "OF")}R{id:00}");
        return Ok;
    }

    public Response SetPhonic(int id, Phonic value) {
        switch (value) {
            case Phonic.Stereo:
                Send($"`SSTROR{id:00}");
                break;
            case Phonic.MonoLeft:
                Send($"`SMINLR{id:00}");
                break;
            case Phonic.MonoRight:
                Send($"`SMINRR{id:00}");
                break;
        }
        return Ok;
    }


    public Response SetInput(int id, int value) {
        Send($"`SAD{value:00}R{id:00}");
        return Ok;
    }

    public Response SetOn(int id, int input) {
        Send($"`SAD{input:00}R{id:00}");
        return Ok;
    }

    public Response SetOff(int id) {
        Send($"`SRMOFR{id:00}");
        return Ok;
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