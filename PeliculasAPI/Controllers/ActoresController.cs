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
    [Route("api/actores")]
    [ApiController]
    public class ActoresController : ControllerBase
    {
        private readonly ApplicationDBContext context;
        private readonly IMapper mapper;
        private readonly IAlmacenadorArchivos almacenadorArchivos;
        private readonly string contenedor = "actores";

        public ActoresController(ApplicationDBContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
        {
            this.context = context;
            this.mapper = mapper;
            this.almacenadorArchivos = almacenadorArchivos;
        }

        // POST

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = mapper.Map<Actor>(actorCreacionDTO);

            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await almacenadorArchivos.GuardarArchivo(contenedor, actorCreacionDTO.Foto);
            }

            context.Add(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null) { return NotFound(); }

            if (!string.IsNullOrEmpty(actor.Foto))
            {
                await almacenadorArchivos.BorrarArchivo(actor.Foto, contenedor);
            }

            context.Remove(actor);
            await context.SaveChangesAsync();
            return NoContent();
        }

        // PUT

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreacionDTO actorCreacionDTO)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null) { return NotFound(); };

            if (actorCreacionDTO.Foto != null)
            {
                actor.Foto = await almacenadorArchivos.EditarArchivo(contenedor, actorCreacionDTO.Foto, actor.Foto);
            }

            actor = mapper.Map(actorCreacionDTO, actor);
            await context.SaveChangesAsync();
            return NoContent();

        }

        // GET

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
        {
            var queryable = context.Actores.AsQueryable();
            await HttpContext.InsertarParamPagEnCabecera(queryable);
            var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
            return mapper.Map<List<ActorDTO>>(actores);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int id)
        {
            var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null) { return NotFound(); }
            return mapper.Map<ActorDTO>(actor);
        }
    }
}
