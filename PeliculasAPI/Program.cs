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

// Este archivo es el punto de entrada principal de la aplicaci�n,
// donde se configura y se inicia el servidor web.

//En ASP.NET Core, este archivo tiene el siguiente objetivo:

//Crear y configurar el host de la aplicaci�n: Define el entorno en el que correr� la aplicaci�n,
//como el servidor, los puertos y cualquier otra configuraci�n de infraestructura.

//Establecer el patr�n de dise�o "Host": Usa un objeto HostBuilder o WebHostBuilder para configurar
//los servicios que usar� la aplicaci�n y construir la instancia de IHost o IWebHost.
