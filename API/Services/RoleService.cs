using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
	public class RoleService : IRoleService
	{
		private readonly MKSContext _context;
		private readonly IRoleRepository _roleRepository;
		public RoleService(MKSContext context, IRoleRepository roleRepository)
		{
			_context = context;
			_roleRepository = roleRepository;
		}
		public async Task DeleteRole(int id)
		{
			await _roleRepository.DeleteRole(id);
		}

		public async Task DeleteRoleClaim(int id)
		{
			await _roleRepository.DeleteRoleClaim(id);
		}

		public async Task<RoleModel> FillFormRole(int id)
		{
			return await _roleRepository.FillFormRole(id);
		}

		public async Task<object> GetRoleById(int id)
		{
			return await _roleRepository.GetRoleById(id);
		}

		public async Task<object> GetRoleClaimList()
		{
			return await _roleRepository.GetRoleClaimList();
		}

		public async Task<object> GetRoleList()
		{
			return await _roleRepository.GetRoleList();
		}

		public async Task SaveRole(RoleModel role)
		{
			await _roleRepository.SaveRole(role);
		}

		public async Task SaveRoleClaim(RoleClaim roleClaim)
		{
			await _roleRepository.SaveRoleClaim(roleClaim);
		}
	}
}
