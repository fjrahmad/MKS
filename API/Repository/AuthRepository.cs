using API.Context.SP;
using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using API.Context.SP;

namespace API.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly MKSTableContext _db;
        private readonly MKSSPContextProcedures _sp;
        public static CurrentUser CurrentUser { get; set; }
        public AuthRepository(MKSTableContext db, IHttpContextAccessor contextAccessor, MKSSPContextProcedures sp)
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
                CurrentUser = new CurrentUser
                {
                    UserName = uspUserLogin?.Username,
                    FullName = uspUserLogin?.FullName,
                    Email = uspUserLogin?.Email,
                    PhoneNumber = uspUserLogin?.PhoneNumber,
                    KTP = uspUserLogin?.KTP
                };
            return isLogin;
        }

        public async Task<CurrentUser> GetCurrentUser()
        {
            return await Task.FromResult(CurrentUser);
        }
    }
}
