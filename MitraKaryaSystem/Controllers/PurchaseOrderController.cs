using Microsoft.AspNetCore.Mvc;

namespace MitraKaryaSystem.Controllers
{
    public class PurchaseOrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
