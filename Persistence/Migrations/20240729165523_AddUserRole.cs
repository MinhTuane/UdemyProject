using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddUserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductLines_ProductLineId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductLineId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductLines_ProductLineId",
                table: "AspNetUsers",
                column: "ProductLineId",
                principalTable: "ProductLines",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_ProductLines_ProductLineId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProductLineId",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_ProductLines_ProductLineId",
                table: "AspNetUsers",
                column: "ProductLineId",
                principalTable: "ProductLines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
