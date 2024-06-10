
using Application.PurchaseOrders;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PurchaseOrdersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProductLines() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductLine(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductLine([FromBody]PurchaseOrder PurchaseOrder)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {PurchaseOrder=PurchaseOrder}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductLine(Guid id, PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder.Id = id;
            await Mediator.Send(new Edit.Command {PurchaseOrder = PurchaseOrder});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductLine(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}