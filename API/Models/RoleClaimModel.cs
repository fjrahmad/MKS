namespace MitraKaryaSystem.Models
{
	public class RoleClaimModel
	{
		public int ID { get; set; }
		public int RoleID { get; set; }
		public string? ClaimType { get; set; }
		public string? ClaimValue { get; set; }
	}
}
