using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
	public interface IUserService
	{
		public Task<object> GetUserList();
		public Task SaveUser(UserModel user);
		public Task<UserModel> FillForm(int id);
	}
}
