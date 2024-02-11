using System.ComponentModel.DataAnnotations;

namespace MitraKaryaSystem.Models
{
	public class CustomerModel
	{
		public int ID { get; set; }
		[Required]
		public string Name { get; set; }
		public string ContactPerson { get; set; }
		[Required]
		public string ContactNumber { get; set; }
		[Required]
		public string Address { get; set; }
		public string Note { get; set; }
		[Required]
		public bool IsSupplier { get; set; }
	}
}
