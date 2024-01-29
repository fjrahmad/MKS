
using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface ISupplierRepository
    {
        Task<object> GetSupplierList();
        Task SaveSupplier(SupplierModel category);
        Task DeleteSupplier(int id);
        Task<SupplierModel> FillFormSupplier(int id);
    }
}
