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
            return Json(await _customerService.GetList());
        }
        [HttpPost]
        public async Task<IActionResult> Save(CustomerModel customer)
        {
            return Json(await _customerService.Save(customer));
        }

        [HttpPost]
        public async Task<IActionResult> FillForm(int id)
        {
            return PartialView("_CustomerModal", await _customerService.FillForm(id));
        }

        [HttpPost]
        public async Task<JsonResult> Delete(int id)
        {
            return Json(await _customerService.Delete(id));
        }
    }
}
