using API.Context.Table;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
	public class UserRepository : IUserRepository
	{
		private readonly MKSContext _context;
		public UserRepository(MKSContext context) { _context = context; }

		public async Task<object> GetUserList()
		{
			return await _context.Users.Select(x => new
			{
				UserName = x.UserName,
				FullName = x.FullName,
				KTP = x.KTP,
				Email = x.Email,
				Active = x.Active ? "Active" : "Inactive"
			})
		.ToListAsync();
		}
	}
}
