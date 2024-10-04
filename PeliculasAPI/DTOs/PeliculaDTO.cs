using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System;

namespace PeliculasAPI.DTOs
{
    public class PeliculaDTO
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool EnCines { get; set; }
        public DateTime FechaLanzamiento { get; set; }
        public string Trailer { get; set; }
        public string Poster { get; set; }
    }
}
