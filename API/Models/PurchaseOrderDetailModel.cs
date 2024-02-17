namespace MitraKaryaSystem.Models
{
    public class PurchaseOrderDetailModel
    {
        public int ID { get; set; }
        public short SupplierID { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string Barcode { get; set; }
    }
}
