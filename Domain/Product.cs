using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long? Quantity { get; set; }
        public int? Price { get; set; }
        public string Description { get; set; }
        
        public List<Material> Materials { get; set; }
        public List<PurchaseOrder> PurchaseOrders {get; set;}

        public void updateQuantity() {
            Quantity = PurchaseOrders.Sum(po => po.Quantity);
        }

    }
}