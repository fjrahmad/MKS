using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;

namespace MitraKaryaSystem.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> GetList()
        {
            var data = await _customerService.GetList();
            return Json(data);
        }
        [HttpPost]
        public async Task<IActionResult> Save(CustomerModel customer)
        {
            return Json(await _customerService.Save(customer));
        }

        [HttpPost]
        public async Task<IActionResult> FillForm(int id)
        {
            var data = await _customerService.FillForm(id);
            return PartialView("_CustomerModal", data);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            await _customerService.Delete(id);
            return Json(new { success = true });
        }
    }
}
