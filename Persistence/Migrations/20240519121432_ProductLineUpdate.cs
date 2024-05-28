using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ProductLineUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductLines_Products_ProductId",
                table: "ProductLines");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "ProductLines",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLines_Materials_ProductId",
                table: "ProductLines",
                column: "ProductId",
                principalTable: "Materials",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductLines_Materials_ProductId",
                table: "ProductLines");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "ProductLines",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductLines_Products_ProductId",
                table: "ProductLines",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
