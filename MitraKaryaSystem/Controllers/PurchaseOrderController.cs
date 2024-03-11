using API.Context.Table;
using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;

namespace MitraKaryaSystem.Controllers
{
    public class PurchaseOrderController : Controller
    {
        private readonly IPurchaseOrderService _purchaseOrderService;

        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            _purchaseOrderService = purchaseOrderService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> ScanBarcode(string barcode)
        {
            return Json(await _purchaseOrderService.ScanBarcode(barcode));
        }
        public async Task<IActionResult> FillFormProduct(int id)
        {
            try
            {
                return PartialView("_FormDetail", await _purchaseOrderService.FillFormDetail(id)); // Return the "Form" view with the filled data
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
                return PartialView("_FormHeader", await _purchaseOrderService.FillForm(id));
            }
            catch (Exception e)
            {
                return Json(new { success = false, error = e.Message });
            }
        }

        public async Task<JsonResult> Save(PurchaseOrderModel purchaseOrder)
        {
            try
            {
                return Json(await _purchaseOrderService.Save(purchaseOrder));
            }
            catch (Exception e)
            {
                return Json(new { success = false, error = e.Message });
            }
        }
        public async Task<JsonResult> GetDetailListById(int id)
        {
            return Json(await _purchaseOrderService.GetDetailListById(id));
        }
        public async Task<object> GetTradeList()
        {
            return Json(await _purchaseOrderService.GetTradeList());
        }
        public async Task<object> DeleteItem(int id)
        {
            return Json(await _purchaseOrderService.DeleteProductById(id));
        }
    }
}
