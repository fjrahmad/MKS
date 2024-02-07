namespace MitraKaryaSystem.Models
{
    public class PurchaseOrderModel
    {
        public int ID { get; set; }

        public short SupplierID { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public short StatusID { get; set; }
        public string No { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
