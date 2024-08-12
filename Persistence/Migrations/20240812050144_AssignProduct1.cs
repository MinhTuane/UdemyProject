using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AssignProduct1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Materials_ProductionRecords_ProductionRecordId",
                table: "Materials");

            migrationBuilder.DropIndex(
                name: "IX_Materials_ProductionRecordId",
                table: "Materials");

            migrationBuilder.DropColumn(
                name: "ProductionRecordId",
                table: "Materials");

            migrationBuilder.AlterColumn<string>(
                name: "ProductStatus",
                table: "ProductionRecords",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ProductStatus",
                table: "ProductionRecords",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProductionRecordId",
                table: "Materials",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Materials_ProductionRecordId",
                table: "Materials",
                column: "ProductionRecordId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_ProductionRecords_ProductionRecordId",
                table: "Materials",
                column: "ProductionRecordId",
                principalTable: "ProductionRecords",
                principalColumn: "Id");
        }
    }
}
