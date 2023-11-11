using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;

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
		[Route("SaveUser")]
		[HttpPost]
		public async Task<IActionResult> SaveUser(UserModel user)
		{
			if (ModelState.IsValid)
			{
				await _userService.SaveUser(user);
				// Return success as JSON
				return Json(new { success = true });

			}
			return PartialView("_UserModal");
		}

		[Route("FillForm")]
		[HttpPost]
		public async Task<IActionResult> FillForm(int id)
		{
			var data = await _userService.FillForm(id);
			return PartialView("_UserModal", data);
		}
	}
}
