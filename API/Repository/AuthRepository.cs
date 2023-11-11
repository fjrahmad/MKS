using API.Context.SP;
using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using API.SP;

namespace API.Repository
{
	public class AuthRepository : IAuthRepository
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly MKSContext _db;
		private readonly SPContextProcedures _sp;
		public static UserModel CurrentUser { get; set; }
		public AuthRepository(MKSContext db, IHttpContextAccessor contextAccessor, SPContextProcedures sp)
		{
			_httpContextAccessor = contextAccessor;
			_db = db;
			_sp = sp;
		}
		public async Task<bool> Login(string username, string password)
		{
			var users = await _sp.uspUserLoginAsync(username, password);
			uspUserLoginResult? uspUserLogin = users.FirstOrDefault();
			var isLogin = users.Count > 0;
			if (isLogin)
				CurrentUser = new UserModel
				{
					UserName = uspUserLogin?.UserName,
					FullName = uspUserLogin?.FullName,
					Email = uspUserLogin?.Email,
					PhoneNumber = uspUserLogin?.PhoneNumber,
					KTP = uspUserLogin?.KTP
				};
			return isLogin;
		}

		public async Task<UserModel> GetCurrentUser()
		{
			return await Task.FromResult(CurrentUser);
		}
	}
}
