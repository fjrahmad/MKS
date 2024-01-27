using API.Models;

namespace API.Services.Interfaces
{
    public interface IProductService
    {
        Task<object> GetProductList();
        Task SaveProduct(ProductModel product);
        Task DeleteProduct(int id);
        Task<ProductModel> FillFormProduct(int id);
    }
}
