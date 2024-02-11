using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
	public interface ICustomerRepository
	{
		public Task<object> GetList();
		public Task<object> Save(CustomerModel user);
		public Task<CustomerModel> FillForm(int id);
		public Task<object> Delete(int id);
	}
}
