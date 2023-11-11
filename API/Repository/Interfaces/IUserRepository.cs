namespace API.Repository.Interfaces
{
	public interface IUserRepository
	{
		public Task<object> GetUserList();
	}
}
