
using Application.Companies;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class CompaniesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCompanies() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody]Company company)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {Company=company}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompany(Guid id, Company company)
        {
            company.Id = id;
            await Mediator.Send(new Edit.Command {Company = company});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}