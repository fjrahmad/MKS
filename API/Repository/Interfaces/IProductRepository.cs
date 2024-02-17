using MitraKaryaSystem.Models;
using System.Threading.Tasks;

namespace API.Repository.Interfaces
{
    public interface IProductRepository
    {
        Task<object> GetProductList();
        Task<object> SaveProduct(ProductModel product);
        Task<object> DeleteProduct(int id);
        Task<ProductModel> FillFormProduct(int id);
        Task<object> GetProductComboList();
    }
}
