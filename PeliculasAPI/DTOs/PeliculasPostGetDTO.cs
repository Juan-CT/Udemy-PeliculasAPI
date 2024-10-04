using System.Collections.Generic;

namespace PeliculasAPI.DTOs
{
    public class PeliculasPostGetDTO
    {
        public List<GeneroDTO> Generos {  get; set; }
        public List<CineDTO> Cines { get; set; } 
    }
}
