using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface IUserService
    {
        public Task<object> GetUserList();
        public Task<object> SaveUser(UserModel user);
        public Task<UserModel> FillForm(int id);
        public Task<object> DeleteUser(int id);
    }
}
