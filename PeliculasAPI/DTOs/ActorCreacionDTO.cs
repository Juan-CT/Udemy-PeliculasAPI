using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Http;

namespace PeliculasAPI.DTOs
{
    public class ActorCreacionDTO
    {
        
        [Required]
        [StringLength(maximumLength: 200)]
        public string Nombre { get; set; }
        public DateTime FechaNacimiento { get; set; }

        public IFormFile Foto {  get; set; }
    }
}
