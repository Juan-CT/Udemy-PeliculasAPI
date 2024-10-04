using PeliculasAPI.Validaciones;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace PeliculasAPI.DTOs
{
    public class GeneroCreacionDTO
    {
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 50)]
        [PrimeraLetraMayuscula]
        public string Nombre { get; set; }

    }
}
