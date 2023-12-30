using API.Context.SP;
using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using API.Context.SP;
using Microsoft.EntityFrameworkCore;
using MitraKaryaSystem.Models;
namespace API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MKSTableContext _context;
        private readonly MKSSPContextProcedures _sp;
        public UserRepository(MKSTableContext context, MKSSPContextProcedures procedures)
        {
            _context = context;
            _sp = procedures;
        }

        public async Task<object> GetUserList()
        {
            return await _context.Users.Select(x => new
            {
                ID = x.ID,
                UserName = x.UserName,
                Password = x.Password,
                FullName = x.FullName,
                KTP = x.KTP,
                Email = x.Email,
                Active = x.Active ? "Active" : "Inactive"
            })
        .ToListAsync();
        }

        public async Task SaveUser(UserModel user)
        {
            if (user.ID == 0)
            {
                await _sp.uspUserAddAsync(user.FullName, user.PhoneNumber, user.UserName, user.Email, user.Password, user.IsActive, user.KTP);
            }
            else
            {
                await _sp.uspUserUpdateAsync(user.ID, user.FullName, user.PhoneNumber, user.UserName, user.Email, user.Password, user.IsActive, user.KTP);
            }
            await _context.SaveChangesAsync();
        }
        public async Task<UserModel> FillForm(int id)
        {
            List<uspUserGetResult> users = await _sp.uspUserGetAsync(id);
            UserModel userModel = null;
            if (users.Count == 0)
            {
                userModel = new UserModel();
            }
            else
            {
                var user = users.FirstOrDefault();
                userModel = new UserModel
                {
                    ID = user.ID,
                    UserName = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    KTP = user.KTP,
                    IsActive = user.Active,
                    PhoneNumber = user.PhoneNumber
                };
            }
            return userModel;
        }

        public async Task DeleteUser(int id)
        {
            User user = await _context.Users.FindAsync(id);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

        }
    }
}
