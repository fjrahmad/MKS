using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using MitraKaryaSystem.Models;

namespace API.Repository
{
	public class RoleRepository : IRoleRepository
	{
		private readonly MKSContext _context;
		public RoleRepository(MKSContext context) { _context = context; }

		public async Task DeleteRole(int id)
		{
			_context.Roles.Remove(await _context.Roles.FindAsync(id));
			await _context.SaveChangesAsync();
		}

		public async Task DeleteRoleClaim(int id)
		{
			_context.RoleClaims.Remove(await _context.RoleClaims.FindAsync(id));
			await _context.SaveChangesAsync();
		}

		public async Task<object> GetRoleById(int id)
		{
			return await _context.Roles.FindAsync(id);
		}

		public async Task<object> GetRoleClaimList()
		{
			return await _context.RoleClaims.ToListAsync();
		}

		public async Task<object> GetRoleList()
		{
			return await _context.Roles.ToListAsync();
		}

		public async Task SaveRole(RoleModel role)
		{
			await _context.Roles.AddAsync(new Role { Name = role.Name, Description = role.Description });
			await _context.SaveChangesAsync();
		}

		public async Task SaveRoleClaim(RoleClaim roleClaim)
		{
			await _context.RoleClaims.AddAsync(roleClaim);
			await _context.SaveChangesAsync();
		}

		public async Task<RoleModel> FillFormRole(int id)
		{
			Role roles = await _context.Roles.FindAsync(id);
			RoleModel roleModel = null;
			if (roles == null)
			{
				roleModel = new RoleModel();
			}
			else
			{
				roleModel = new RoleModel
				{
					Name = roles.Name,
					Description = roles.Description
				};
			}
			return roleModel;
		}
	}
}
