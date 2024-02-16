using API.Repository.Interfaces;

namespace API.Services.Interfaces
{
	public interface IPurchaseOrderService
	{
		Task<object> ScanBarcode(string barcode);
	}
}
