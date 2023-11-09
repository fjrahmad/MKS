namespace MitraKaryaSystem.Middleware
{
	// You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
	public class AuthenticationMiddleware
	{
		private readonly RequestDelegate _next;

		public AuthenticationMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public Task Invoke(HttpContext httpContext)
		{
			if (httpContext.User.Identity?.IsAuthenticated == true)
			{
			}
			return _next(httpContext);
		}
	}

	// Extension method used to add the middleware to the HTTP request pipeline.
	public static class AuthenticationMiddlewareExtensions
	{
		public static IApplicationBuilder UseAuthenticationMiddleware(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<AuthenticationMiddleware>();
		}
	}
}
