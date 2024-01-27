using API.Models;
using API.Repository.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task DeleteProduct(int id)
        {
            await _productRepository.DeleteProduct(id);
        }
        public async Task<ProductModel> FillFormProduct(int id)
        {
            return await _productRepository.FillFormProduct(id);
        }

        public async Task<object> GetProductList()
        {
            return await _productRepository.GetProductList();
        }
        public async Task SaveProduct(ProductModel product)
        {
            await _productRepository.SaveProduct(product);
        }
    }
}
