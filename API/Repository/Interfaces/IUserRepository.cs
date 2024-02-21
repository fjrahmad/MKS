using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface IUserRepository
    {

        public Task<object> GetUserList();
        public Task<object> SaveUser(UserModel user);
        public Task<UserModel> FillForm(int id);
        public Task<object> DeleteUser(int id);
    }
}
