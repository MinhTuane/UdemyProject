

namespace Domain
{
    public class Material
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Quantity { get; set; }
        public int? QuantityRequired { get; set; }
        public double? Weight { get; set; }
        public double? WeightRequired { get; set; }
        public double Price { get; set; }
        public DateTime Date {get; set;}
        public string Country { get; set; }
        public string Factory { get; set; }
        public bool IsManufactoring { get; set; }
        public List<MaterialProduct> MaterialProducts { get; set; }
    }
}