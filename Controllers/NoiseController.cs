using Microsoft.AspNetCore.Mvc;

namespace Suite16.Controllers;

[ApiController]
[Route("[controller]")]
public class NoiseController : ControllerBase
{

    private readonly ILogger<NoiseController> _logger;
    private readonly IStateService _service;

    public NoiseController(
        IStateService service,
        ILogger<NoiseController> logger)
    {
        _logger = logger;
        _service = service;
    }

    [HttpGet()]
    public State Get()
    {
        return _service.GetState();
    }
}
