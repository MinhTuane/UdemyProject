using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class ProductLine
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid IdProduct { get; set; }
        public Material Product { get; set; }
        [Required]
        public string Status { get; set; }
    }
}