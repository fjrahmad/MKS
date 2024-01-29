using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _repository;

        public SupplierService(ISupplierRepository repository)
        {
            _repository = repository;
        }
        public async Task DeleteSupplier(int id)
        {
            await _repository.DeleteSupplier(id);
        }

        public async Task<SupplierModel> FillFormSupplier(int id)
        {
            return await _repository.FillFormSupplier(id);
        }

        public async Task<object> GetSupplierList()
        {
            return await _repository.GetSupplierList();
        }

        public async Task SaveSupplier(SupplierModel category)
        {
            await _repository.SaveSupplier(category);
        }
    }
}
