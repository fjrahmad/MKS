using System.ComponentModel.DataAnnotations;

namespace MitraKaryaSystem.Models
{
	public class UserModel
	{
		[Required(ErrorMessage = "UserName is required")]
		public int ID { get; set; }
		public string? UserName { get; set; }
		[Required(ErrorMessage = "Email is required")]
		[EmailAddress(ErrorMessage = "Invalid email address")]
		public string? Email { get; set; }

		[Required(ErrorMessage = "Password is required")]
		public string? Password { get; set; }
		public bool IsActive { get; set; }
		[Required(ErrorMessage = "FullName is required")]
		public string? FullName { get; set; }
		[Required(ErrorMessage = "KTP is required")]

		public string KTP { get; set; }
		[Required(ErrorMessage = "PhoneNumber is required")]
		public string? PhoneNumber { get; set; }
	}
}
