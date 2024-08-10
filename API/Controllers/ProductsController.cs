using Application.Products;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
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
        public async Task<IActionResult> CreateProductLine([FromBody]Product product)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {Product=product}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProductLine(Guid id, Product product)
        {
            product.Id = id;
            await Mediator.Send(new Edit.Command {Product = product});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductLine(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}