using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PeliculasAPI.Entidades
{
    public class Cine
    {
        public int Id { get; set; }

        [Required]
        [StringLength(maximumLength:100)]
        public string Nombre { get; set; }
        public List<PeliculasCines> PeliculasCines { get; set; }
    }
}
