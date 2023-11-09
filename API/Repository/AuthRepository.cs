using API.Context;
using API.Repository.Interfaces;

namespace API.Repository
{
	public class AuthRepository : IAuthRepository
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly MKSContext _db;
		public AuthRepository(MKSContext db, IHttpContextAccessor contextAccessor)
		{
			_httpContextAccessor = contextAccessor;
			_db = db;
		}
		public async Task<bool> Login(string username, string password)
		{
			//var isLogin = _context.Users.ToListAsync().Result.Exists(x => x.UserName == username && x.Password == password);
			return true;
		}
	}
}
