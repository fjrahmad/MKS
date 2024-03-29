using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface IRoleRepository
    {
        public Task<object> GetRoleList();
        public Task<object> SaveRole(RoleViewModel role);
        public Task<object> DeleteRole(int id);
        public Task<RoleViewModel> FillFormRole(int id);
    }
}
