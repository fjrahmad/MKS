using API.Models;

namespace API.Repository.Interfaces
{
    public interface IUnitRepository
    {
        Task<object> GetUnitList();
        Task DeleteUnit(int id);
        Task<UnitModel> FillFormUnit(int id);
        Task SaveUnit(UnitModel unit);
    }
}
