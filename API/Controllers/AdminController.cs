using Application.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles ="Admin")]
    [Route("api/[controller]")]
    public class AdminController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetUsers() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

    }
}