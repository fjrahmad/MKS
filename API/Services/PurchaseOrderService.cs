using API.Context.Table;
using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _repository;

        public PurchaseOrderService(IPurchaseOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<PurchaseOrderModel> FillForm(int id)
        {
            return await _repository.FillForm(id);
        }

        public async Task<PurchaseOrderDetailModel> FillFormDetail(int id)
        {
            return await _repository.FillFormDetail(id);
        }

        public async Task<List<PurchaseOrderDetailModel>> GetDetailListById(int id)
        {
            return await _repository.GetDetailListById(id);
        }

        public async Task<List<Trade>> GetPurchaseOrderBySearch()
        {
            return await _repository.GetPurchaseOrderBySearch();
        }

        public async Task<List<Trade>> GetTradeList()
        {
            return await _repository.GetTradeList();
        }

        public async Task<object> Save(PurchaseOrderModel purchaseOrderModel)
        {
            return await _repository.Save(purchaseOrderModel);
        }

        public async Task<object> ScanBarcode(string barcode)
        {
            return await _repository.ScanBarcode(barcode);
        }
    }
}
