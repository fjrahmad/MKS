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
            return Json(await _userService.GetUserList());
        }
        [Route("SaveUser")]
        [HttpPost]
        public async Task<JsonResult> SaveUser(UserModel user)
        {
            return Json(await _userService.SaveUser(user));
        }

        [Route("FillForm")]
        [HttpPost]
        public async Task<IActionResult> FillForm(int id)
        {
            return PartialView("_UserModal", await _userService.FillForm(id));
        }

        [Route("DeleteUser")]
        [HttpPost]
        public async Task<JsonResult> DeleteUser(int id)
        {
            return Json(await _userService.DeleteUser(id));
        }
    }
}
