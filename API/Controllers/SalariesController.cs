using Application.Salaries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class SalariesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSalaries() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSalary(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSalary([FromBody]Salary salary)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {Salary=salary}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSalary(Guid id, Salary salary)
        {
            salary.Id = id;
            await Mediator.Send(new Edit.Command {Salary = salary});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalary(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }

        [HttpGet]
        public async Task<IActionResult> GetByPeriodOfTime(string UserId,DateTime StartDate,DateTime EndDate) 
        {
            return HandleResult(await Mediator.Send(new GetByPeriodOfTime.Query{UserId=UserId,StartDate=StartDate,EndDate=EndDate}));
        }

        [HttpPut]
        public async Task<IActionResult> EditSalary(string UserId,DateTime StartDate,DateTime EndDate)
        {
            await Mediator.Send(new SetPaidByPeriod.Command {UserId=UserId,StartDate=StartDate,EndDate=EndDate});
            return Ok();
        }
    }
}