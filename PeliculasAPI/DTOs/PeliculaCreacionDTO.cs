using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PeliculasAPI.Utilidades;

namespace PeliculasAPI.DTOs
{
    public class PeliculaCreacionDTO
    {
        [Required]
        [StringLength(maximumLength: 100)]
        public string Nombre { get; set; }
        public bool EnCines { get; set; }
        public DateTime FechaLanzamiento { get; set; }
        public string Trailer { get; set; }
        public IFormFile Poster { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenerosIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CinesIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<ActorPeliculaCreacionDTO>>))]
        public List<ActorPeliculaCreacionDTO> Actores { get; set; }
    }
}
