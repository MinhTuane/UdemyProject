using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMaterial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_Products_ProductId",
                table: "Materials");

            migrationBuilder.DropIndex(
                name: "IX_Materials_ProductId",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Salary");

            migrationBuilder.DropColumn(
                name: "ManufactoringDate",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Materials");

            migrationBuilder.AddColumn<bool>(
                name: "IsPaid",
                table: "Salary",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "WorkStatus",
                table: "Salary",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsManufactoring",
                table: "Materials",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "MaterialProduct",
                columns: table => new
                {
                    MaterialsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialProduct", x => new { x.MaterialsId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_MaterialProduct_Materials_MaterialsId",
                        column: x => x.MaterialsId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialProduct_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MaterialProduct_ProductsId",
                table: "MaterialProduct",
                column: "ProductsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialProduct");

            migrationBuilder.DropColumn(
                name: "IsPaid",
                table: "Salary");

            migrationBuilder.DropColumn(
                name: "WorkStatus",
                table: "Salary");

            migrationBuilder.DropColumn(
                name: "IsManufactoring",
                table: "Materials");

            migrationBuilder.AddColumn<double>(
                name: "MyProperty",
                table: "Salary",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ManufactoringDate",
                table: "Materials",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "ProductId",
                table: "Materials",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Materials_ProductId",
                table: "Materials",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_Products_ProductId",
                table: "Materials",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
