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
        private readonly IHttpContextAccessor _httpContextAccessor;
        public PurchaseOrderRepository(MKSTableContext context, MKSSPContextProcedures procedure, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _procedure = procedure;
            _httpContextAccessor = httpContextAccessor;
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
        public async Task<object> DeleteProductById(int id)
        {
            try
            {

                var product = await _context.PurchaseOrderItems.FindAsync(id);
                if (product == null)
                {
                    return new { success = false, result = "Purchase order item not found." };
                }
                _context.PurchaseOrderItems.Remove(product);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                await Task.FromResult<object>(new { success = false, result = e.Message });
            }
            return new { success = true };
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
                        Quantity = 1
                    };
                };
            }
            catch (Exception e)
            {
                await Task.FromResult<object>(new { success = false, result = e.Message });
            }
            return purchaseOrderDetail;
        }
        public async Task<object> GetTradeList()
        {
            return await _context.Trades.Select(x => new
            {
                ID = x.ID,
                No = x.No,
                Date = x.Date.ToString("dd-MM-yyyy"),
                Amount = x.Amount,
            }).ToListAsync();
        }
        public Task<List<uspGetDetailListByIdResult>> GetDetailListById(int id)
        {
            return _procedure.uspGetDetailListByIdAsync(id);
        }
        public Task<List<Trade>> GetPurchaseOrderBySearch()
        {
            throw new NotImplementedException();
        }
        public async Task<object> Save(PurchaseOrderModel purchaseOrderModel)
        {
            try
            {
                int tradeID = 0;
                if (purchaseOrderModel.ID == 0)
                {
                    var newTrade = new Trade
                    {
                        Date = purchaseOrderModel.Date,
                        StatusID = 0,
                        No = _procedure.uspGenerateNoAsync("PO").Result.FirstOrDefault().NewPONumber,
                        CreatedBy = _httpContextAccessor.HttpContext.User.Identity.Name,
                        TradeTypeID = 1
                    };
                    _context.Trades.Add(newTrade);
                    await _context.SaveChangesAsync();
                    tradeID = newTrade.ID;
                }
                else
                {
                    var existingTrade = await _context.Trades.FindAsync(purchaseOrderModel.ID);
                    if (existingTrade != null)
                    {
                        existingTrade.Date = purchaseOrderModel.Date;
                        existingTrade.UpdatedBy = _httpContextAccessor.HttpContext.User.Identity.Name;
                        existingTrade.UpdatedAt = DateTime.Now;
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        return new { success = false, result = "Purchase order not found." };
                    }
                }
                foreach (var product in purchaseOrderModel.PurchaseOrderDetails)
                {
                    await SaveProduct(product, purchaseOrderModel.ID == 0 ? tradeID : purchaseOrderModel.ID);
                }


                return new { success = true };
            }
            catch (Exception e)
            {
                return new { success = false, result = e.Message };
            }
        }

        public async Task<object> SaveProduct(PurchaseOrderDetailModel purchaseOrderDetailModel, int tradeID)
        {
            try
            {
                if (purchaseOrderDetailModel.ID == 0)
                {
                    var newProduct = new PurchaseOrderItem
                    {
                        TradeID = tradeID,
                        ProductID = purchaseOrderDetailModel.ProductID,
                        Quantity = purchaseOrderDetailModel.Quantity
                    };

                    _context.PurchaseOrderItems.Add(newProduct);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    var existingProduct = await _context.PurchaseOrderItems.FindAsync(purchaseOrderDetailModel.ID);
                    if (existingProduct != null)
                    {
                        existingProduct.ProductID = purchaseOrderDetailModel.ProductID;
                        existingProduct.Quantity = purchaseOrderDetailModel.Quantity;
                        await _context.SaveChangesAsync();
                    }
                    else
                    {
                        return new { success = false, result = "Purchase order item not found." };
                    }
                }

                return new { success = true };
            }
            catch (Exception e)
            {
                return new { success = false, result = e.Message };
            }
        }

        public async Task<object> ScanBarcode(string barcode) => (await _procedure.uspBarcodeScanAsync(barcode)) == null ? await Task.FromResult<object>(new { success = false, result = "Barcode not found" }) : (await _procedure.uspBarcodeScanAsync(barcode)).FirstOrDefault();
    }
}
