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
        return state.Rooms.Single(r => r.Id == id);
    }

    [HttpPost]
    [Route("{id}/toggleMute")]
    public ActionResult ToggleMute(int id) {
        comService.ToggleMute(id);
        return Ok();
    }

    [HttpPost]
    [Route("{id}/vol/{value}")]
    public ActionResult SetVol(int id, int value) {
        comService.SetVolume(id, value);
        return Ok();
    }

    [HttpPost]
    [Route("{id}/treble/{value}")]
    public ActionResult SetTreble(int id, int value) {
        comService.SetTreble(id, value);
        return Ok();
    }

    [HttpPost]
    [Route("{id}/bass/{value}")]
    public ActionResult SetBass(int id, int value) {
        comService.SetBass(id, value);
        return Ok();
    }

    [HttpPost]
    [Route("{id}/input/{value}")]
    public ActionResult SetInput(int id, int value) {
        comService.SetInput(id, value);
        return Ok();
    }
}
