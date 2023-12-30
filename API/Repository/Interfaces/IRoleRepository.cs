using API.Context.Table;
using API.Models;
using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface IRoleRepository
    {
        public Task<object> GetRoleList();
        public Task SaveRole(RoleViewModel role);
        public Task DeleteRole(int id);
        public Task<RoleViewModel> FillFormRole(int id);
    }
}
