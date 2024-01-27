using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class ProductModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public byte CategoryID { get; set; }
        [Required(ErrorMessage = "Unit is required")]
        public short UnitID { get; set; }
        public string? Description { get; set; }
        [Required(ErrorMessage = "Unit Price is required")]
        public decimal UnitPrice { get; set; }
        public int StockQuantity { get; set; }
        public short SupplierID { get; set; }
    }
}
