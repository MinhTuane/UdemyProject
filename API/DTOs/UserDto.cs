using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string DisplayName { get; set; } 
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}