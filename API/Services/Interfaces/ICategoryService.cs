using API.Models;
using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<object> GetCategoryList();
        Task SaveCategory(CategoryModel category);
        Task DeleteCategory(int id);
        Task<CategoryModel> FillFormCategory(int id);
    }
}
