using API.Models;

namespace API.Services.Interfaces
{
    public interface IUnitService
    {
        Task<object> GetUnitList();
        Task DeleteUnit(int id);
        Task<UnitModel> FillFormUnit(int id);
        Task SaveUnit(UnitModel unit);
    }
}
