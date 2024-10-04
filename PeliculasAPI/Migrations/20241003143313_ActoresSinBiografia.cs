using Microsoft.EntityFrameworkCore.Migrations;

namespace PeliculasAPI.Migrations
{
    public partial class ActoresSinBiografia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Biografia",
                table: "Actores");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Biografia",
                table: "Actores",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
