
using Application.PurchaseOrders;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class PurchaseOrdersController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPurchaseOrders() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchaseOrder(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePurchaseOrder([FromBody]PurchaseOrder PurchaseOrder)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {PurchaseOrder=PurchaseOrder}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPurchaseOrder(Guid id, PurchaseOrder PurchaseOrder)
        {
            PurchaseOrder.Id = id;
            await Mediator.Send(new Edit.Command {PurchaseOrder = PurchaseOrder});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseOrder(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }

        [HttpGet("/country/{id}")]
        public async Task<IActionResult> GetCountries(Guid id) 
        {
            return HandleResult(await Mediator.Send(new GetCountry.Query{PruductId = id}));
        }
    }
}