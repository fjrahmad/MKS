using API.Repository.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;
		public UserService(IUserRepository userRepository) { _userRepository = userRepository; }

		public async Task<object> GetUserList()
		{
			return await _userRepository.GetUserList();
		}
	}
}
