using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MitraKaryaSystem.Controllers
{
	[Authorize]
	public class UserController : Controller
	{
		private readonly IUserService _userService;

		public UserController(IUserService service)
		{
			_userService = service;
		}

		public IActionResult Index()
		{
			return View();
		}
		[Route("GetUserList")]
		public async Task<JsonResult> GetUserList()
		{
			var data = await _userService.GetUserList();
			return Json(data);
		}
	}
}
