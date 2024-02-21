using API.Context.Table;
using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
    public interface IPurchaseOrderRepository
    {
        Task<PurchaseOrderModel> FillForm(int id);
        Task<PurchaseOrderDetailModel> FillFormDetail(int id);
        Task<List<Trade>> GetPurchaseOrderBySearch();
        Task<object> ScanBarcode(string barcode);
        Task<object> Save(PurchaseOrderModel purchaseOrderModel);
        Task<List<Trade>> GetTradeList();
        Task<List<PurchaseOrderDetailModel>> GetDetailListById(int id);
    }
}
