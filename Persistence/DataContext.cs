
using System.Net.NetworkInformation;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser,IdentityRole,string>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=MINHTUAN\\SQLEXPRESS;Database=lineproduction;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;");
            }
        }    

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>()
                .HasMany(p => p.Materials)
                .WithMany(m => m.Products)
                .UsingEntity<Dictionary<string, object>>(
                    "MaterialProduct",
                    j => j.HasOne<Material>().WithMany().HasForeignKey("MaterialId"),
                    j => j.HasOne<Product>().WithMany().HasForeignKey("ProductId")
                );
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ProductLine> ProductLines { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Material> Materials { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<ProductionRecord> ProductionRecords { get; set; }
        public DbSet<AttendenceCheck> AttendenceChecks { get; set; }
        public DbSet<Salary> Salaries { get; set;}
    }
}