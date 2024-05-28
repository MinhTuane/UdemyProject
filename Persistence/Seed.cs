using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!context.Materials.Any())
            {
                var Materials = new List<Material>
                {
                    new Material
                    {
                        Name = "Case",
                        Description="Medal",
                        Quantity=1000,
                        Price=20.5,
                        Date= DateTime.UtcNow.AddMonths(-2),
                        Country="Japan",
                        Factory="Toyota"
                    },
                    new Material
                    {
                        Name = "Chain",
                        Description="Steel",
                        Quantity=400,
                        Price=20.5,
                        Date= DateTime.UtcNow.AddMonths(-2),
                        Country="Japan",
                        Factory="Toyota"
                    },
                    new Material
                    {
                        Name = "Aluminum",
                        Description = "Lightweight metal",
                        Quantity = 600,
                        Price = 15.75,
                        Date = DateTime.UtcNow.AddMonths(-3),
                        Country = "USA",
                        Factory = "Ford"
                    },
                    new Material
                    {
                        Name = "Copper",
                        Description = "Conductive metal",
                        Quantity = 450,
                        Price = 18.25,
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Country = "China",
                        Factory = "General Motors"
                    },
                    new Material
                    {
                        Name = "Plastic",
                        Description = "Versatile polymer",
                        Quantity = 800,
                        Price = 10.50,
                        Date = DateTime.UtcNow.AddMonths(-4),
                        Country = "Germany",
                        Factory = "BMW"
                    },
                    new Material
                    {
                        Name = "Steel",
                        Description = "Strong metal alloy",
                        Quantity = 700,
                        Price = 20.00,
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Country = "Japan",
                        Factory = "Toyota"
                    },
                    new Material
                    {
                        Name = "Rubber",
                        Description = "Flexible polymer",
                        Quantity = 550,
                        Price = 12.30,
                        Date = DateTime.UtcNow.AddMonths(-5),
                        Country = "India",
                        Factory = "Tata"
                    },
                    new Material
                    {
                        Name = "Glass",
                        Description = "Transparent material",
                        Quantity = 300,
                        Price = 25.50,
                        Date = DateTime.UtcNow.AddMonths(-6),
                        Country = "Italy",
                        Factory = "Fiat"
                    },
                    // Uncountable materials with weight
                    new Material
                    {
                        Name = "Water",
                        Description = "Transparent liquid",
                        Weight = 500.5,
                        Price = 0.10,
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Country = "Canada",
                        Factory = "N/A"
                    },
                    new Material
                    {
                        Name = "Oil",
                        Description = "Viscous liquid",
                        Weight = 350.75,
                        Price = 30.25,
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Country = "Saudi Arabia",
                        Factory = "N/A"
                    },
                    new Material
                    {
                        Name = "Sand",
                        Description = "Granular material",
                        Weight = 1000.25,
                        Price = 5.75,
                        Date = DateTime.UtcNow.AddMonths(-3),
                        Country = "Australia",
                        Factory = "N/A"
                    },
                };
                await context.Materials.AddRangeAsync(Materials);
                await context.SaveChangesAsync();
            }

            if (!context.ProductLines.Any())
            {
                var productLines = new List<ProductLine>
                {
                    new ProductLine{IdProduct = new Guid("044bb1e2-1b54-4b4c-b995-330b08a605ff"),Status="Idle",Title="Line 1"},
                    new ProductLine{IdProduct = new Guid("18e5f2ed-fe14-4e34-a4c2-f15c3480179e"),Status="Idle",Title="Line 2"},
                    new ProductLine{IdProduct = new Guid("3d61d61d-680f-476d-a560-7f3eaad212bb"),Status="Idle",Title="Line 3"},
                    new ProductLine{IdProduct = new Guid("40e1969a-247b-47ba-aa59-00dbe2d40697"),Status="Idle",Title="Line 4"},
                };
                await context.ProductLines.AddRangeAsync(productLines);
                await context.SaveChangesAsync();
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Tuan", UserName = "Tuan", Email = "tuan@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "Tom", Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Activities.Any()) return;

            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Future Activity 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Activity 1 month in future",
                    Category = "culture",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Future Activity 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Activity 2 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Future Activity 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Activity 3 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Future Activity 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Activity 4 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Future Activity 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Activity 5 months in future",
                    Category = "drinks",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Future Activity 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Activity 6 months in future",
                    Category = "music",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Future Activity 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Activity 2 months ago",
                    Category = "travel",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Future Activity 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Activity 8 months in future",
                    Category = "film",
                    City = "London",
                    Venue = "Cinema",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}