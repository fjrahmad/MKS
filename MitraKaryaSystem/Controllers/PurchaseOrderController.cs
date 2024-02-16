using API.Services;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
	}
}
