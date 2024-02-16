using API.Context.Table;
using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
	public interface IPurchaseOrderRepository
	{
		Task<Trade> FillForm(int id);
		Task<List<Trade>> GetPurchaseOrderBySearch();
		Task<object> ScanBarcode(string barcode);
	}
}
