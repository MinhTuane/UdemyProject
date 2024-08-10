// using System;
// using System.Collections.Generic;
// using System.Diagnostics;
// using System.Linq;
// using System.Threading.Tasks;
// using Application.Admin;
// using Domain;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Logging;

// namespace API.Controllers
// {
//     [Authorize(Roles ="Admin")]
//     [Route("[Admin]")]
//     public class AdminController : BaseApiController
//     {

//         [HttpGet]
//         public async Task<IActionResult> GetActivities() 
//         {
//             return HandleResult(await Mediator.Send(new List.Query()));
//         }

//     }
// }