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
        public async Task<PurchaseOrderModel> FillForm(int id)
        {
            Trade trade = await _context.Trades.FindAsync(id);
            PurchaseOrderModel purchaseOrder = null;
            if (trade == null)
            {
                purchaseOrder = new PurchaseOrderModel();
            }
            else
            {
                purchaseOrder = new PurchaseOrderModel
                {
                    ID = trade.ID,
                    Date = trade.Date,
                    StatusID = trade.StatusID,
                    No = trade.No
                };
            }
            return purchaseOrder;
        }

        public async Task<PurchaseOrderDetailModel> FillFormDetail(int id)
        {
            var product = await _context.Products.FindAsync(id);
            var purchaseOrderDetail = new PurchaseOrderDetailModel();
            try
            {
                if (product == null)
                {
                    return new PurchaseOrderDetailModel();
                }
                else
                {
                    purchaseOrderDetail = new PurchaseOrderDetailModel
                    {
                        ID = product.ID,
                        SupplierID = product.SupplierID,
                        Name = product.Name,
                        UnitPrice = product.UnitPrice,
                        Quantity = 1,
                        Barcode = product.Barcode
                    };
                };
            }
            catch (Exception e)
            {
                await Task.FromResult<object>(new { success = false, result = e.Message });
            }
            return purchaseOrderDetail;
        }

        public Task<List<Trade>> GetPurchaseOrderBySearch()
        {
            throw new NotImplementedException();
        }

        public async Task<object> ScanBarcode(string barcode) => (await _procedure.uspBarcodeScanAsync(barcode)) == null ? await Task.FromResult<object>(new { success = false, result = "Barcode not found" }) : (await _procedure.uspBarcodeScanAsync(barcode)).FirstOrDefault();
    }
}
