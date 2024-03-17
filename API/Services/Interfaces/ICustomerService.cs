using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface ICustomerService
    {
        public Task<object> GetList();
        public Task<object> Save(CustomerModel customer);
        public Task<CustomerModel> FillForm(int id);
        public Task<object> Delete(int id);
    }
}
