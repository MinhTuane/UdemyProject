using Application.Admin;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles ="Admin,Manager")]
    [Route("api/[controller]")]
    public class AdminController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetUsers() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id) 
        {
            return HandleResult(await Mediator.Send(new Detail.Query{Id = id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command(){UserId = id}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditUser(string id,AppUser user) 
        {
            user.Id = id;
            await Mediator.Send(new Edit.Command(){AppUser=user});
            return Ok();
        }
    }
}