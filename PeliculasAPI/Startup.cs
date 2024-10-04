using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using PeliculasAPI.Filtros;
using PeliculasAPI.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        
        //Aquí se agregan los servicios que la aplicación utilizará, como inyecciones de dependencias,
        //configuración de CORS, configuración de bases de datos, Swagger, etc.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            
            services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosLocal>();

            services.AddHttpContextAccessor();

            services.AddDbContext<ApplicationDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("defaultConnection"))); 
            
            services.AddCors(options =>
            {
                var frontendURL = Configuration.GetValue<string>("frontend_URL");
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader()
                        .WithExposedHeaders(new string[] {"cantidadTotalRegistros"});
                });
            });

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();            
            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(FiltroDeExcepcion));
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "PeliculasAPI", Version = "v1" });
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        
        // Aquí se define el middleware de la aplicación (cómo se manejan las solicitudes y respuestas HTTP).
        // Puedes agregar autenticación, manejo de excepciones, configuración de rutas, entre otros.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
              
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "PeliculasAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
