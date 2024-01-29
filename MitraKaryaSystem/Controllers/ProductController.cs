using API.Models;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MitraKaryaSystem.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace MitraKaryaSystem.Controllers
{
    [Authorize]
    public class ProductController : Controller
    {
        private readonly IProductService _service;
        private readonly ICategoryService _categoryService;
        private readonly IUnitService _unitService;
        private readonly ISupplierService _supplierService;
        public ProductController(IProductService service, ICategoryService categoryService, IUnitService unitService, ISupplierService supplierService)
        {
            _service = service;
            _categoryService = categoryService;
            _unitService = unitService;
            _supplierService = supplierService;
        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Form(int id)
        {
            var data = new ProductViewModel();
            if (id != 0)
            {
                data.ProductModel = await _service.FillFormProduct(id);
                return View(data);
            }
            return View(data);
        }
        public async Task<object> GetProductList()
        {
            return await _service.GetProductList();
        }
        public async Task<object> GetCategoryList()
        {
            return await _categoryService.GetCategoryList();
        }
        public async Task<object> GetUnitList()
        {
            return await _unitService.GetUnitList();
        }
        public async Task<object> GetSupplierList()
        {
            return await _supplierService.GetSupplierList();
        }
        public async Task<IActionResult> SaveProduct(ProductViewModel product)
        {
            try
            {
                var model = ModelState.GetFieldValidationState("ProductModel");
                if (model == ModelValidationState.Valid)
                {
                    await _service.SaveProduct(product.ProductModel);
                    return Json(new { success = true });
                }
                return PartialView("_FormProduct", product);

            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }
        public async Task<IActionResult> SaveCategory(CategoryModel category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _categoryService.SaveCategory(category);
                    return Json(new { success = true });
                }
                return PartialView("_TableCategory");
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }
        public async Task<IActionResult> SaveUnit(UnitModel unit)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _unitService.SaveUnit(unit);
                    return Json(new { success = true });

                }
                return PartialView("_TableUnit");
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message });
            }
        }
        public async Task<IActionResult> SaveSupplier(SupplierModel supplier)
        {
            if (ModelState.IsValid)
            {
                await _supplierService.SaveSupplier(supplier);
                return Json(new { success = true });

            }
            return PartialView("_FormSupplier");
        }
        public async Task DeleteProduct(int id)
        {
            await _service.DeleteProduct(id);
        }
        public async Task DeleteCategory(int id)
        {
            await _categoryService.DeleteCategory(id);
        }
        public async Task DeleteUnit(int id)
        {
            await _unitService.DeleteUnit(id);
        }
        public async Task DeleteSupplier(int id)
        {
            await _supplierService.DeleteSupplier(id);
        }
        public async Task<object> FillFormCategory(int id)
        {
            var data = await _categoryService.FillFormCategory(id);
            return PartialView("_TableCategory", data);
        }
        public async Task<object> FillFormUnit(int id)
        {
            var data = await _unitService.FillFormUnit(id);
            return PartialView("_TableUnit", data);
        }
        public async Task<IActionResult> FillFormProduct(int id)
        {
            try
            {
                var data = await _service.FillFormProduct(id);
                var viewModel = new ProductViewModel
                {
                    ProductModel = data
                };
                return PartialView("Form", viewModel); // Return the "Form" view with the filled data
            }
            catch (Exception ex)
            {
                // Handle the exception, you might want to log it or return an error view
                return View("Error");
            }
        }

        public async Task<object> FillFormSupplier(int id)
        {
            var data = await _supplierService.FillFormSupplier(id);
            return PartialView("_FormSupplier", data);
        }
    }
}
