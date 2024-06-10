
using System.ComponentModel.DataAnnotations;


namespace Domain
{
    public class ProductLine
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid IdProduct { get; set; }
        public Product Product { get; set; }
        [Required]
        public string Status { get; set; }
    }
}