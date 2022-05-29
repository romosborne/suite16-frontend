using Microsoft.AspNetCore.Mvc;

namespace Suite16.Controllers;

[ApiController]
[Route("[controller]")]
public class RoomController : ControllerBase {
    private readonly IStateService stateService;
    private readonly ISuite16ComService comService;
    private readonly ILogger<RoomController> _logger;

    public RoomController(
        IStateService stateService,
        ISuite16ComService comService,
        ILogger<RoomController> logger) {
        this.stateService = stateService;
        this.comService = comService;
        _logger = logger;
    }

    [HttpGet]
    public State Get() {
        return stateService.GetState();
    }

    [HttpGet]
    [Route("{id}")]
    public Room Get(int id) {
        var state = stateService.GetState();
        return state.Rooms[id];
    }

    [HttpPost]
    [Route("{id}/toggleMute")]
    public void Post(int id) {
        comService.ToggleMute(id);
    }
}
