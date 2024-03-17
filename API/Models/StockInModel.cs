namespace MitraKaryaSystem.Models
{
    public class StockInModel
    {
        public int ID { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public short? StatusID { get; set; }
        public string No { get; set; }
        public List<StockInDetailModel> StockInDetails { get; set; }
    }
}
