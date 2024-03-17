using API.Repository.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        public AuthService(IAuthRepository repository)
        {
            _authRepository = repository;
        }
        public async Task<bool> Login(string username, string password)
        {
            return await _authRepository.Login(username, password);
        }
    }
}
