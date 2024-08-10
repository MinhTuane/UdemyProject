using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class EditProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schedule");

            migrationBuilder.DropColumn(
                name: "QuantityProduced",
                table: "ProductionRecords");


            migrationBuilder.CreateTable(
                name: "AttendenceChecks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WorkStatus = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendenceChecks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendenceChecks_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttendenceChecks_UserId",
                table: "AttendenceChecks",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttendenceChecks");

            migrationBuilder.RenameColumn(
                name: "ProductionDateTime",
                table: "ProductionRecords",
                newName: "ProductionDate");

            migrationBuilder.AddColumn<int>(
                name: "QuantityProduced",
                table: "ProductionRecords",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Schedule",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WorkStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Schedule_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schedule_UserId",
                table: "Schedule",
                column: "UserId");
        }
    }
}
