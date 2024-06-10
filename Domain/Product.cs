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
        public List<Material> Materials { get; set; }
        public List<PurchaseOrder> PurchaseOrders { get; set; }
        public List<ProductionRecord> ProductionRecords { get; set; }
        public Product()
        {
            Materials = new List<Material>();
            PurchaseOrders = new List<PurchaseOrder>();
            ProductionRecords = new List<ProductionRecord>();
        }

        public Dictionary<(DateTime Date, int Hour), int> GetProductionByHour()
        {
            return ProductionRecords
                .GroupBy(record => (record.ProductionDate.Date, record.ProductionDate.Hour))
                .ToDictionary(g => g.Key, g => g.Sum(record => record.QuantityProduced));
        }

        // Method to get production data by day
        public Dictionary<DateTime, int> GetProductionByDay()
        {
            return ProductionRecords
                .GroupBy(record => record.ProductionDate.Date)
                .ToDictionary(g => g.Key, g => g.Sum(record => record.QuantityProduced));
        }

        // Method to get production data by month
        public Dictionary<(int Year, int Month), int> GetProductionByMonth()
        {
            return ProductionRecords
                .GroupBy(record => (record.ProductionDate.Year, record.ProductionDate.Month))
                .ToDictionary(g => g.Key, g => g.Sum(record => record.QuantityProduced));
        }

        // Method to get production data by year
        public Dictionary<int, int> GetProductionByYear()
        {
            return ProductionRecords
                .GroupBy(record => record.ProductionDate.Year)
                .ToDictionary(g => g.Key, g => g.Sum(record => record.QuantityProduced));
        }
    }
}
