using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;

namespace MitraKaryaSystem.Controllers
{
    public class StockInController : Controller
    {
        private readonly IStockInService _stockInService;

        public StockInController(IStockInService stockInService)
        {
            _stockInService = stockInService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> ScanBarcode(string barcode)
        {
            return Json(await _stockInService.ScanBarcode(barcode));
        }
        public async Task<IActionResult> FillFormProduct(int id)
        {
            try
            {
                return PartialView("_FormDetail", await _stockInService.FillFormDetail(id)); // Return the "Form" view with the filled data
            }
            catch (Exception e)
            {
                return Json(new { success = false, error = e.Message });
            }
        }

        public async Task<IActionResult> FillForm(int id)
        {
            try
            {
                return PartialView("_FormHeader", await _stockInService.FillForm(id));
            }
            catch (Exception e)
            {
                return Json(new { success = false, error = e.Message });
            }
        }
        [HttpPost]
        public async Task<JsonResult> Save(StockInModel stockIn)
        {
            try
            {
                return Json(await _stockInService.Save(stockIn));
            }
            catch (Exception e)
            {
                return Json(new { success = false, error = e.Message });
            }
        }
        public async Task<JsonResult> GetDetailListById(int id)
        {
            return Json(await _stockInService.GetDetailListById(id));
        }
        public async Task<object> GetTradeList()
        {
            return Json(await _stockInService.GetTradeList());
        }
        public async Task<object> DeleteItem(int id)
        {
            return Json(await _stockInService.DeleteProductById(id));
        }
        public async Task<object> Delete(int id)
        {
            return Json(await _stockInService.DeleteById(id));
        }
    }
}
