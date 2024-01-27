using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class CategoryModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
    }
}
