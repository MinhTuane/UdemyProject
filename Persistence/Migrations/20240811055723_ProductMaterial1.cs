using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ProductMaterial1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaterialProduct");

            migrationBuilder.AddColumn<int>(
                name: "ProductStatus",
                table: "ProductionRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "ProductionRecordId",
                table: "Materials",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "MaterialProducts",
                columns: table => new
                {
                    MaterialId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialProducts", x => new { x.MaterialId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_MaterialProducts_Materials_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MaterialProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Materials_ProductionRecordId",
                table: "Materials",
                column: "ProductionRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_MaterialProducts_ProductId",
                table: "MaterialProducts",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_ProductionRecords_ProductionRecordId",
                table: "Materials",
                column: "ProductionRecordId",
                principalTable: "ProductionRecords",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_ProductionRecords_ProductionRecordId",
                table: "Materials");

            migrationBuilder.DropTable(
                name: "MaterialProducts");

            migrationBuilder.DropIndex(
                name: "IX_Materials_ProductionRecordId",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "ProductStatus",
                table: "ProductionRecords");

            migrationBuilder.DropColumn(
                name: "ProductionRecordId",
                table: "Materials");

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
    }
}
