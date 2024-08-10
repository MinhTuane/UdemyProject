using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Salary
    {
        public Guid  Id { get; set; }
        public DateTime Date { get; set; }
        public double SalaryRecieved { get; set; }
        [ForeignKey(nameof(AppUser))]
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public bool IsPaid { get; set; }
    }
}