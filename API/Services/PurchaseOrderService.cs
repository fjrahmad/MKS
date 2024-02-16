using API.Repository.Interfaces;
using API.Services.Interfaces;

namespace API.Services
{
	public class PurchaseOrderService : IPurchaseOrderService
	{
		private readonly IPurchaseOrderRepository _repository;

		public PurchaseOrderService(IPurchaseOrderRepository repository)
		{
			_repository = repository;
		}
		public async Task<object> ScanBarcode(string barcode)
		{
			return await _repository.ScanBarcode(barcode);
		}
	}
}
