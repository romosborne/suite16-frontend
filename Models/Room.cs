public class Room {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool On { get; set; }
    public bool Mute { get; set; }
    public int InputNumber { set; get; }
    public int Volume { get; set; }
    public int MaxVol { get; set; } = 40;
    public int Bass { get; set; }
    public int Treble { get; set; }
    public int Balance { get; set; }

    public Room(int id) {
        this.Id = id;
        this.Name = $"Room {id}";
    }

    public void VolumeUp() => Volume = Math.Min(Volume + 1, MaxVol);
    public void VolumeDown() => Volume = Math.Max(Volume - 1, 0);

    public void InputUp() => Input(1);
    public void InputDown() => Input(-1);

    private void Input(int e) {
        InputNumber = (InputNumber + e) % 16;
    }
}