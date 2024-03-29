using API.Context.Table;
using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
    public class RoleService : IRoleService
    {
        private readonly MKSTableContext _context;
        private readonly IRoleRepository _roleRepository;
        public RoleService(MKSTableContext context, IRoleRepository roleRepository)
        {
            _context = context;
            _roleRepository = roleRepository;
        }
        public async Task<object> DeleteRole(int id)
        {
            return await _roleRepository.DeleteRole(id);
        }

        public async Task<RoleViewModel> FillFormRole(int id)
        {
            return await _roleRepository.FillFormRole(id);
        }

        public async Task<object> GetRoleList()
        {
            return await _roleRepository.GetRoleList();
        }

        public async Task<object> SaveRole(RoleViewModel role)
        {
            return await _roleRepository.SaveRole(role);
        }
    }
}
