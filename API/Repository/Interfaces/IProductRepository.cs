using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface IProductRepository
    {
        Task<object> GetProductList();
        Task SaveProduct(ProductModel product);
        Task DeleteProduct(int id);
        Task<ProductModel> FillFormProduct(int id);
    }
}
