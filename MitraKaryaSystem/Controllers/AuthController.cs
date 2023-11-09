using API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MitraKaryaSystem.Controllers
{
	public class AuthController : Controller
	{
		private readonly IAuthService _authService;
		public AuthController(IAuthService authService)
		{
			_authService = authService;
		}
		public IActionResult Login()
		{

			return View();
		}

		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync("AuthScheme");
			return RedirectToAction("Login", "Auth");
		}
		[HttpPost]
		public async Task<IActionResult> Login(string username, string password)
		{
			if (await _authService.Login(username, password))
			{
				var claims = new[]
				{
			new Claim(ClaimTypes.Name, "Username"),
			new Claim(ClaimTypes.Role, "User")
		};

				// Create the identity and principal
				var identity = new ClaimsIdentity(claims, "AuthScheme");
				var principal = new ClaimsPrincipal(identity);

				// Create authentication properties as needed
				var authenticationProperties = new AuthenticationProperties
				{
					IsPersistent = true // You can set this based on your requirements
				};

				// Create the authentication ticket
				var ticket = new AuthenticationTicket(principal, "MKS");
				// Sign in the user using the specified scheme
				await HttpContext.SignInAsync("AuthScheme", principal, authenticationProperties);
				AuthenticateResult.Success(ticket);

				// Redirect to the secure area
				return RedirectToAction("Index", "Home");

			}


			return View();
		}

	}
}
