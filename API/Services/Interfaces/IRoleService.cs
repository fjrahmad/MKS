using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface IRoleService
    {
        public Task<object> GetRoleList();
        public Task<object> SaveRole(RoleViewModel role);
        public Task<object> DeleteRole(int id);
        public Task<RoleViewModel> FillFormRole(int id);
    }
}
