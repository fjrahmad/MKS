using API.Context.Table;
using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;
		private readonly MKSContext _context;
		public UserService(IUserRepository userRepository, MKSContext context)
		{
			_userRepository = userRepository;
			_context = context;
		}

		public async Task<UserModel> FillForm(int id)
		{
			return await _userRepository.FillForm(id);

		}

		public async Task<object> GetUserList()
		{
			return await _userRepository.GetUserList();
		}

		public async Task SaveUser(UserModel user)
		{
			await _userRepository.SaveUser(user);
		}
	}
}
