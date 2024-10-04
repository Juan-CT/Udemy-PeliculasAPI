using PeliculasAPI.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Pelicula
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 100)]
        public string Nombre { get; set; }
        public bool EnCines { get; set; }
        public DateTime FechaLanzamiento { get; set; }
        public string Trailer { get; set; }
        public string Poster { get; set; }

        public List<PeliculasActores> PeliculasActores { get; set; }
        public List<PeliculasGeneros> PeliculasGeneros { get; set; }
        public List<PeliculasCines> PeliculasCines { get; set; }
    }
}
