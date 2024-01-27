using API.Models;
using API.Repository.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        public async Task DeleteCategory(int id)
        {
            await _categoryRepository.DeleteCategory(id);
        }
        public async Task<CategoryModel> FillFormCategory(int id)
        {
            return await _categoryRepository.FillFormCategory(id);
        }
        public async Task<object> GetCategoryList()
        {
            return await _categoryRepository.GetCategoryList();
        }
        public async Task SaveCategory(CategoryModel category)
        {
            await _categoryRepository.SaveCategory(category);
        }
    }
}
