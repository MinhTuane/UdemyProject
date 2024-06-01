
namespace Domain
{
    public class PurchaseOrder
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public string Customer { get; set; }
        public long Quantity { get; set; }
        public DateTime ContractDate { get; set; }
        public DateTime ExportDate { get; set; }
        public string ExportCountry { get; set; }
    }
}