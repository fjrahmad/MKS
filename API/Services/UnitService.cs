using API.Repository.Interfaces;
using API.Services.Interfaces;
using MitraKaryaSystem.Models;

namespace API.Services
{
	public class UnitService : IUnitService
	{
		private readonly IUnitRepository _unitRepository;

		public UnitService(IUnitRepository unitRepository)
		{
			_unitRepository = unitRepository;
		}
		public async Task<object> DeleteUnit(int id)
		{
			return await _unitRepository.DeleteUnit(id);
		}
		public async Task<UnitModel> FillFormUnit(int id)
		{
			return await _unitRepository.FillFormUnit(id);
		}
		public async Task<object> GetUnitList()
		{
			return await _unitRepository.GetUnitList();
		}
		public async Task<object> SaveUnit(UnitModel unit)
		{
			return await _unitRepository.SaveUnit(unit);
		}
	}
}
