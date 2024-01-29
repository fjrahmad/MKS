
using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<object> GetSupplierList();
        Task SaveSupplier(SupplierModel category);
        Task DeleteSupplier(int id);
        Task<SupplierModel> FillFormSupplier(int id);
    }
}
