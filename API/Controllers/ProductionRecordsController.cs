
using Application.ProductionRecords;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductionRecordsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProductionRecords() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductionRecord(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductionRecord([FromBody]ProductionRecord ProductionRecord)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {ProductionRecord=ProductionRecord}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductionRecord(Guid id, ProductionRecord ProductionRecord)
        {
            ProductionRecord.Id = id;
            await Mediator.Send(new Edit.Command {ProductionRecord = ProductionRecord});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductionRecord(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }

        [Authorize]
        [HttpGet("year:{id}")]
        public async Task<IActionResult> GetProductByYear(Guid id,DateTime Date) 
        {
            return HandleResult(await Mediator.Send(new GetProductEachMonth.Query{ProductId = id,Date = Date}));
        }

        [Authorize]
        [HttpGet("month:{id}")]
        public async Task<IActionResult> GetProductByMonth(Guid id,DateTime Date) 
        {
            return HandleResult(await Mediator.Send(new GetProductEachDay.Query{ProductId = id,Date = Date}));
        }

        [Authorize]
        [HttpGet("day:{id}")]
        public async Task<IActionResult> GetProductByDay(Guid id,DateTime Date) 
        {
            return HandleResult(await Mediator.Send(new GetProductEachHour.Query{ProductId = id,Date = Date}));
        }
    }
}