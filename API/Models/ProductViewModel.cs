using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations.Schema;

namespace MitraKaryaSystem.Models
{
	public class ProductViewModel
	{
		public CategoryModel? CategoryModel { get; set; } = new CategoryModel();
		public UnitModel? UnitModel { get; set; } = new UnitModel();
		public ProductModel ProductModel { get; set; } = new ProductModel();
	}
}
