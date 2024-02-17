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
    }
}
