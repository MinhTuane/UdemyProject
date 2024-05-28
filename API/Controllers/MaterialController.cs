using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Materials;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MaterialController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetMaterials() 
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterial(Guid id) 
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateMaterial([FromBody]Material material)
        {
            
            return HandleResult(await Mediator.Send(new Create.Command {Material=material}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditMaterial(Guid id, Material material)
        {
            material.Id = id;
            await Mediator.Send(new Edit.Command {Material = material});
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
           return HandleResult( await Mediator.Send(new Delete.Command{Id=id}));
        }
    }
}