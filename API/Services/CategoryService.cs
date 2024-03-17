using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task<object> DeleteCategory(int id)
        {
            return await _categoryRepository.DeleteCategory(id);
        }
        public async Task<CategoryModel> FillFormCategory(int id)
        {
            return await _categoryRepository.FillFormCategory(id);
        }
        public async Task<object> GetCategoryList()
        {
            return await _categoryRepository.GetCategoryList();
        }
        public async Task<object> SaveCategory(CategoryModel category)
        {
            return await _categoryRepository.SaveCategory(category);
        }
    }
}
