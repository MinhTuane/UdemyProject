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
        public List<Material> Materials { get; set; } = new List<Material>();
        public List<PurchaseOrder> PurchaseOrders { get; set; }= new List<PurchaseOrder>();
        public List<ProductionRecord> ProductionRecords { get; set; } = new List<ProductionRecord>();      
    }
}
