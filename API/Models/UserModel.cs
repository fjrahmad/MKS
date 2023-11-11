using System.ComponentModel.DataAnnotations;

namespace MitraKaryaSystem.Models
{
	public class UserModel
	{
		public int ID { get; set; }
		[Required(ErrorMessage = "UserName is required")]
		public string? UserName { get; set; }
		[Required(ErrorMessage = "Email is required")]
		[EmailAddress(ErrorMessage = "Invalid email address")]
		public string? Email { get; set; }

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
