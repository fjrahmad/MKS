using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class UnitRepository : IUnitRepository
    {
        private readonly MKSTableContext _context;

        public UnitRepository(MKSTableContext context)
        {
            _context = context;
        }

        public async Task SaveUnit(UnitModel unitModel)
        {
            if (unitModel.ID == 0)
            {
                _context.Units.Add(new Unit
                {
                    Name = unitModel.Name
                });
            }
            else
            {
                Unit unit = await _context.Units.FindAsync(unitModel.ID);
                unit.Name = unitModel.Name;
                _context.Units.Update(unit);
            }
            await _context.SaveChangesAsync();
        }
        public async Task<object> GetUnitList()
        {
            return Task.FromResult<object>(await _context.Units.ToListAsync());
        }
        public async Task<UnitModel> FillFormUnit(int id)
        {
            Unit? unit = await _context.Units.FindAsync(id);
            UnitModel? unitModel = null;
            if (unit == null)
            {
                unitModel = new UnitModel();
            }
            else
            {
                unitModel = new UnitModel
                {
                    ID = unit.ID,
                    Name = unit.Name
                };
            }
            return unitModel;
        }
        public async Task DeleteUnit(int id)
        {
            _context.Units.Remove(await _context.Units.FindAsync(id));
            await _context.SaveChangesAsync();
        }
    }
}
