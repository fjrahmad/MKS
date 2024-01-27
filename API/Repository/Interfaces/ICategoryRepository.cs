using API.Models;

namespace API.Repository.Interfaces
{
    public interface ICategoryRepository
    {
        Task<object> GetCategoryList();
        Task SaveCategory(CategoryModel category);
        Task DeleteCategory(int id);
        Task<CategoryModel> FillFormCategory(int id);
    }
}
