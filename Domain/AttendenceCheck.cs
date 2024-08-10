using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enum;

namespace Domain
{
    public class AttendenceCheck
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public WorkStatus WorkStatus {get; set;}
        [ForeignKey(nameof(AppUser))]
        public string UserId { get; set; }
        public AppUser User { get; set; }
    }
}