
using Application.ProductLines;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductLinesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProductLines() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductLine(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProductLine([FromBody]ProductLine productLine)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {ProductLine=productLine}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductLine(Guid id, ProductLine productLine)
        {
            productLine.Id = id;
            await Mediator.Send(new Edit.Command {ProductLine = productLine});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductLine(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}