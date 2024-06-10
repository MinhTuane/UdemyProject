
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<ProductLine> ProductLines { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Material> Materials { get; set; }

        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }

        public DbSet<Company> Companies { get; set; }

        public DbSet<ProductionRecord> ProductionRecords { get; set; }
    }
}