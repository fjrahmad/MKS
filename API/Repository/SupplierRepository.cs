using API.Context.Table;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using MitraKaryaSystem.Models;

namespace API.Repository
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly MKSTableContext _context;

        public SupplierRepository(MKSTableContext context)
        {
            _context = context;
        }

        public async Task DeleteSupplier(int id)
        {
            _context.Suppliers.Remove(await _context.Suppliers.FindAsync(id));
            await _context.SaveChangesAsync();
        }

        public async Task<SupplierModel> FillFormSupplier(int id)
        {
            Supplier? supplier = await _context.Suppliers.FindAsync(id);
            SupplierModel? supplierModel = null;
            if (supplier == null)
            {
                supplierModel = new SupplierModel();
            }
            else
            {
                supplierModel = new SupplierModel
                {
                    ID = supplier.ID,
                    SupplierName = supplier.Name,
                    ContactPerson = supplier.ContactPerson,
                    ContactNumber = supplier.ContactNumber
                };
            }
            return supplierModel;
        }

        public async Task<object> GetSupplierList()
        {
            return Task.FromResult<object>(await _context.Suppliers.Select(x => new { x.ID, SupplierName = x.Name, x.ContactPerson, x.ContactNumber }).ToListAsync());
        }

        public async Task SaveSupplier(SupplierModel supplierModel)
        {
            if (supplierModel.ID == 0)
            {
                _context.Suppliers.Add(new Supplier
                {
                    Name = supplierModel.SupplierName,
                    ContactPerson = supplierModel.ContactPerson,
                    ContactNumber = supplierModel.ContactNumber
                });
            }
            else
            {
                Supplier supplier = await _context.Suppliers.FindAsync(supplierModel.ID);
                supplier.Name = supplierModel.SupplierName;
                supplier.ContactPerson = supplierModel.ContactPerson;
                supplier.ContactNumber = supplierModel.ContactNumber;
                _context.Suppliers.Update(supplier);
            }
            await _context.SaveChangesAsync();
        }
    }
}
