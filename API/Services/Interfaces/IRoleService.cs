using API.Models;
using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
	public interface IRoleService
	{
		public Task<object> GetRoleList();
		public Task<object> GetRoleById(int id);
		public Task SaveRole(RoleModel role);
		public Task DeleteRole(int id);
		public Task<object> GetRoleClaimList();
		public Task SaveRoleClaim(RoleClaim roleClaim);
		public Task DeleteRoleClaim(int id);
		public Task<RoleModel> FillFormRole(int id);
	}
}
