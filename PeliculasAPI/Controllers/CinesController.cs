using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using PeliculasAPI.Entidades;
using PeliculasAPI.Utilidades;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Controllers
{
    [Route("api/cines")]
    [ApiController]
    public class CinesController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;

        public CinesController(ApplicationDBContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        // POST

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = mapper.Map<Cine>(cineCreacionDTO);

            context.Add(cine);
            await context.SaveChangesAsync();
            return NoContent();
        }

        // GET

        [HttpGet]
        public async Task<ActionResult<List<CineDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Cines.AsQueryable();
            await HttpContext.InsertarParamPagEnCabecera(queryable);
            var cines = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<CineDTO>>(cines);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CineDTO>> Get(int Id)
        {
            var cine = await context.Cines.FirstOrDefaultAsync(x => x.Id == Id);

            if (cine == null)
            {
                return NoContent();
            }

            return mapper.Map<CineDTO>(cine);
        }

        // DELETE

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existe = await context.Cines.AnyAsync(x => x.Id == id);

            if (!existe) { return NotFound(); }

            context.Remove(new Cine() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }

        // PUT

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int Id, [FromBody] CineCreacionDTO cineCreacionDTO)
        {
            var cine = await context.Cines.FirstOrDefaultAsync(x => x.Id == Id);

            if (cine == null) { return NotFound(); }

            cine = mapper.Map(cineCreacionDTO, cine);

            await context.SaveChangesAsync();
            return NoContent();
        }


    }
}
