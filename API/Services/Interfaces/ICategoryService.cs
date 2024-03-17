using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<object> GetCategoryList();
        Task<object> SaveCategory(CategoryModel category);
        Task<object> DeleteCategory(int id);
        Task<CategoryModel> FillFormCategory(int id);
    }
}
