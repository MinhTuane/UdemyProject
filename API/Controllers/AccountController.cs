using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.Include(p => p.Photos)
                        .FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if(user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            var role = await _userManager.GetRolesAsync(user);
            if(result)
            {
                return new UserDto
                {
                    DisplayName= user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x=>x.IsMain)?.Url,
                    Token =await _tokenService.CreateToken(user),
                    Username = user.UserName,
                    Role = role.FirstOrDefault(),
                    DateOfBirth = user.DateOfBirth
                };
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x=>x.Email == registerDto.Email)) 
            {
                ModelState.AddModelError("email","Email taken");
                return BadRequest(ModelState);             
            }
            if(await _userManager.Users.AnyAsync(x=> x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username","Usernane taken");
                return BadRequest("Username is alreadey taken");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Username,
                DateOfBirth = registerDto.DateOfBirth
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            await _userManager.AddToRoleAsync(user,registerDto.Role);

            if(result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x=>x.IsMain)?.Url,
                    Token = await _tokenService.CreateToken(user),
                    Username = user.UserName,
                    Role = registerDto.Role,
                    DateOfBirth= registerDto.DateOfBirth
                };
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x=> x.Email == User.FindFirstValue(ClaimTypes.Email));
            var role =await  _userManager.GetRolesAsync(user);
            return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = user?.Photos?.FirstOrDefault(x=>x.IsMain)?.Url,
                    Token = await _tokenService.CreateToken(user),
                    Username = user.UserName,
                    Role = role.FirstOrDefault(),
                    DateOfBirth = user.DateOfBirth
                };
        }
    }
}