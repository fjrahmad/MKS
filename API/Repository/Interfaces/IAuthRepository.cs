namespace API.Repository.Interfaces
{
	public interface IAuthRepository
	{
		Task<bool> Login(string username, string password);
	}
}
