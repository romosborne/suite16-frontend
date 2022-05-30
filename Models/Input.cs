public class Input {
    public int Id { get; set; }
    public string Name { get; set; }

    public Input(int id) {
        this.Id = id;
        this.Name = $"Input {id}";
    }

}