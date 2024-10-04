using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PeliculasAPI.Utilidades
{
    public static class HttpContextExtensions
    {
        public async static Task InsertarParamPagEnCabecera<T>(this HttpContext httpContext,
            IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double cantidad = await queryable.CountAsync(); //Esto cuenta la cantidad de reg de una tabla
            httpContext.Response.Headers.Add("cantidadTotalRegistros", cantidad.ToString());
        }
    }
}
