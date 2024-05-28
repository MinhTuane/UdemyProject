using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMaterial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "QuantityRequired",
                table: "Materials",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "WeightRequired",
                table: "Materials",
                type: "REAL",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuantityRequired",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "WeightRequired",
                table: "Materials");
        }
    }
}
