using MitraKaryaSystem.Models;

namespace API.Repository.Interfaces
{
	public interface IUnitRepository
	{
		Task<object> GetUnitList();
		Task<object> DeleteUnit(int id);
		Task<UnitModel> FillFormUnit(int id);
		Task<object> SaveUnit(UnitModel unit);
	}
}
