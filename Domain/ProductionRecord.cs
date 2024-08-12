using System;
using Domain.Enum;

namespace Domain
{
    public class ProductionRecord
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public DateTime ProductionDateTime { get; set; }
        public string ProductStatus { get; set; }
    }
}
