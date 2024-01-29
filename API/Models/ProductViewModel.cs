using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations.Schema;

namespace MitraKaryaSystem.Models
{
    public class ProductViewModel
    {
        [BindNever]
        public CategoryModel? CategoryModel { get; set; } = new CategoryModel();
        [BindNever]
        public UnitModel? UnitModel { get; set; } = new UnitModel();
        [BindNever]
        public SupplierModel? SupplierModel { get; set; } = new SupplierModel();
        public ProductModel ProductModel { get; set; } = new ProductModel();
    }
}
