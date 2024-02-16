using API.Context.SP;
using API.Context.Table;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using MitraKaryaSystem.Models;

namespace API.Repository
{
	public class PurchaseOrderRepository : IPurchaseOrderRepository
	{
		private readonly MKSTableContext _context;
		private readonly MKSSPContextProcedures _procedure;

		public PurchaseOrderRepository(MKSTableContext context, MKSSPContextProcedures procedure)
		{
			_context = context;
			_procedure = procedure;
		}
		public Task<Trade> FillForm(int id)
		{
			//PurchaseOrder purchaseOrder = await _context.PurchaseOrders.FindAsync(id);
			//PurchaseOrderModel purchaseOrderModel = null;
			//if(purchaseOrder == null)
			//{
			//    purchaseOrderModel = new PurchaseOrder();
			//}else
			//{
			//    purchaseOrderModel = new PurchaseOrderModel
			//    {
			//        ID = purchaseOrder.ID,
			//        No = purchaseOrder.PurchaseOrderNo,
			//        SupplierID = purchaseOrder.SupplierID,
			//        SupplierName = purchaseOrder.Supplier.Name,
			//        Date = purchaseOrder.Date,
			//        Total = purchaseOrder.Total,
			//        Status = purchaseOrder.Status
			//    };
			//}
			throw new NotImplementedException();

		}

		public Task<List<Trade>> GetPurchaseOrderBySearch()
		{
			throw new NotImplementedException();
		}

		public async Task<object> ScanBarcode(string barcode)
		{
			var product = await _context.Products.Where(x => x.Barcode == barcode).FirstOrDefaultAsync();
			if (product == null)
			{
				return Task.FromResult<object>(new { success = false, result = "Barcode not found" });
			}
			return product;
		}
	}
}
