using MitraKaryaSystem.Models;

namespace API.Services.Interfaces
{
    public interface IUnitService
    {
        Task<object> GetUnitList();
        Task<object> DeleteUnit(int id);
        Task<UnitModel> FillFormUnit(int id);
        Task<object> SaveUnit(UnitModel unit);
    }
}
