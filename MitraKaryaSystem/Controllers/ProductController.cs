using API.Models;
using API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MitraKaryaSystem.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService _service;
        private readonly ICategoryService _categoryService;
        private readonly IUnitService _unitService;

        public ProductController(IProductService service, ICategoryService categoryService, IUnitService unitService)
        {
            _service = service;
            _categoryService = categoryService;
            _unitService = unitService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Form()
        {
            return View();
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
        public async Task SaveProduct(ProductModel product)
        {
            await _service.SaveProduct(product);
        }

        public async Task SaveCategory(CategoryModel category)
        {
            await _categoryService.SaveCategory(category);
        }

        public async Task SaveUnit(UnitModel unit)
        {
            await _unitService.SaveUnit(unit);
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

        public async Task<object> FillFormCategory(int id)
        {
            return await _categoryService.FillFormCategory(id);
        }

        public async Task<object> FillFormUnit(int id)
        {
            return await _unitService.FillFormUnit(id);
        }
        public async Task<object> FillFormProduct(int id)
        {
            return await _service.FillFormProduct(id);
        }
    }
}
