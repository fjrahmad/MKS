using API.Context.SP;
using API.Context.Table;
using API.Repository.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface IPurchaseOrderService
    {
        Task<PurchaseOrderModel> FillForm(int id);
        Task<PurchaseOrderDetailModel> FillFormDetail(int id);
        Task<List<Trade>> GetPurchaseOrderBySearch();
        Task<object> ScanBarcode(string barcode);
        Task<object> Save(PurchaseOrderModel purchaseOrderModel);
        Task<object> GetTradeList();
        Task<List<uspGetDetailListByIdResult>> GetDetailListById(int id);
        Task<object> DeleteProductById(int id);
    }
}
