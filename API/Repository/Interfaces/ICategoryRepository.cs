using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface ICategoryRepository
    {
        Task<object> GetCategoryList();
        Task<object> SaveCategory(CategoryModel category);
        Task<object> DeleteCategory(int id);
        Task<CategoryModel> FillFormCategory(int id);
    }
}
