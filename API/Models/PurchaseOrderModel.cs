namespace MitraKaryaSystem.Models
{
    public class PurchaseOrderModel
    {
        public int ID { get; set; }
        public int TradeID { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public short? StatusID { get; set; }
        public string No { get; set; }
        public List<PurchaseOrderDetailModel> PurchaseOrderDetails { get; set; }
    }
}
