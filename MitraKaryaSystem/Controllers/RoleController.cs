﻿using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;

namespace MitraKaryaSystem.Controllers
{
    [Authorize]
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
            return Json(await _roleService.GetRoleList());
        }
        [HttpPost]
        [Route("SaveRole")]
        public async Task<IActionResult> SaveRole([FromBody] RoleViewModel request)
        {
            return Json(await _roleService.SaveRole(request));
        }

        [Route("FillFormRole")]
        [HttpPost]
        public async Task<IActionResult> FillFormRole(int id)
        {
            return PartialView("_RoleModal", await _roleService.FillFormRole(id));
        }

        [Route("DeleteRole")]
        [HttpPost]
        public async Task<IActionResult> DeleteRole(int id)
        {
            return Json(_roleService.DeleteRole(id));
        }
    }
}
