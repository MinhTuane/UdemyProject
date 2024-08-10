using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangeMaterial1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Salary");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Salary",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    WorkStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salary", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Salary_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Salary_AppUserId",
                table: "Salary",
                column: "AppUserId");
        }
    }
}
