
namespace Domain
{
    public class PurchaseOrder
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Guid CompanyId { get; set; }
        public Company Company { get; set; }
        public long Quantity { get; set; }
        public DateTime ContractDate { get; set; }
        public DateTime ExportDate { get; set; }
        public string ExportCountry { get; set; }
    }
}