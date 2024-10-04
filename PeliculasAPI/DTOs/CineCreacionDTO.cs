using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.DTOs
{
    public class CineCreacionDTO
    {
        [Required]
        [StringLength(maximumLength: 100)]
        public string Nombre { get; set; }
    }
}
