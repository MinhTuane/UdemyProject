using System;
using System.Collections.Generic;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long? Quantity { get; set; }
        public int? Price { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public bool IsProducing { get; set; }
        public List<MaterialProduct> MaterialProducts { get; set; }
        public List<PurchaseOrder> PurchaseOrders { get; set; }
        public List<ProductionRecord> ProductionRecords { get; set; }     
    }
}
