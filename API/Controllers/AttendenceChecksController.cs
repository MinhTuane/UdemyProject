using Application.AttendenceChecks;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles ="Admin,Manager")]
    public class AttendenceChecksController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetAttendenceChecks() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAttendenceCheck(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAttendenceCheck([FromBody]AttendenceCheck AttendenceCheck)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {AttendenceCheck=AttendenceCheck}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAttendenceCheck(Guid id, AttendenceCheck attendenceCheck)
        {
            attendenceCheck.Id = id;
            await Mediator.Send(new Edit.Command {AttendenceCheck = attendenceCheck});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendenceCheck(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}