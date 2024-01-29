using System.ComponentModel.DataAnnotations;

namespace MitraKaryaSystem.Models
{
    public class UnitModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string? UnitName { get; set; }
    }
}
