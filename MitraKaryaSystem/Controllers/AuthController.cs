using API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;
using System.Security.Claims;

namespace MitraKaryaSystem.Controllers
{
    [Authorize]
    public class AuthController : Controller
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [AllowAnonymous]
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
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel user)
        {
            if (ModelState.IsValid)
            {
                if (await _authService.Login(user.UserName, user.Password))
                {
                    var currentUser = await _authService.GetCurrentUser();
                    var claims = new[]
                    {
                            new Claim(ClaimTypes.Name, currentUser.Email),
                            new Claim(ClaimTypes.Role, "User")
                    };

                    // Create the identity and principal
                    var identity = new ClaimsIdentity(claims, "AuthScheme");
                    var principal = new ClaimsPrincipal(identity);

                    // Create authentication properties as needed
                    var authenticationProperties = new AuthenticationProperties
                    {
                        IsPersistent = false // You can set this based on your requirements
                    };

                    // Create the authentication ticket
                    var ticket = new AuthenticationTicket(principal, "MKS");
                    // Sign in the user using the specified scheme
                    await HttpContext.SignInAsync("AuthScheme", principal, authenticationProperties);
                    AuthenticateResult.Success(ticket);

                    // Redirect to the secure area
                    return RedirectToAction("Index", "Home");

                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Invalid credentials, please try again.");
                    return View();
                }
            }
            return View();
        }

        public IActionResult AccessDenied()
        {
            return View();
        }
    }
}
