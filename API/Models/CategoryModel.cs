using System.ComponentModel.DataAnnotations;

namespace MitraKaryaSystem.Models
{
    public class CategoryModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string? CategoryName { get; set; }
    }
}
