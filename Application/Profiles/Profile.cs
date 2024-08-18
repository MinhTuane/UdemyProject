using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Id { get; set; }
        public string DisplayName { get; set; } 
        public string Token { get; set; }
        public string Image { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Guid? ProductLineId { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}