using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Threading.Tasks;

namespace PeliculasAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}

// Este archivo es el punto de entrada principal de la aplicación,
// donde se configura y se inicia el servidor web.

//En ASP.NET Core, este archivo tiene el siguiente objetivo:

//Crear y configurar el host de la aplicación: Define el entorno en el que correrá la aplicación,
//como el servidor, los puertos y cualquier otra configuración de infraestructura.

//Establecer el patrón de diseño "Host": Usa un objeto HostBuilder o WebHostBuilder para configurar
//los servicios que usará la aplicación y construir la instancia de IHost o IWebHost.
