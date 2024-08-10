using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        [ForeignKey("ProductLine")]
        public Guid? ProductLineId { get; set; }
        public ProductLine ProductLine { get; set; }
        public DateOnly DateOfBirth { get; set; }
    }
}