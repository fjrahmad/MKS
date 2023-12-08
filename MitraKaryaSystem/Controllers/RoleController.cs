using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;

namespace MitraKaryaSystem.Controllers
{
	public class RoleController : Controller
	{
		private readonly IRoleService _roleService;

		public RoleController(IRoleService roleService)
		{
			_roleService = roleService;
		}
		public IActionResult Index()
		{
			return View();
		}

		[Route("FillGridRole")]
		public async Task<JsonResult> FillGridRole()
		{
			var data = await _roleService.GetRoleList();
			return Json(data);
		}
		[HttpPost]
		[Route("SaveRole")]
		public async Task<IActionResult> SaveRole(RoleModel role)
		{
			if (ModelState.IsValid)
			{
				await _roleService.SaveRole(role);
			}
			// Return success as JSON
			return Json(new { success = true });
		}
		[Route("FillFormRole")]
		[HttpPost]
		public async Task<IActionResult> FillFormRole(int id)
		{
			var data = await _roleService.FillFormRole(id);
			return PartialView("_RoleModal", data);
		}
	}
}
