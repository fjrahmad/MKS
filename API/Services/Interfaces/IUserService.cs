namespace API.Services.Interfaces
{
	public interface IUserService
	{
		public Task<object> GetUserList();
	}
}
