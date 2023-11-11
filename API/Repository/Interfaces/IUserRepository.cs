using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
	public interface IUserRepository
	{

		public Task<object> GetUserList();
		public Task SaveUser(UserModel user);
		public Task<UserModel> FillForm(int id);
	}
}
