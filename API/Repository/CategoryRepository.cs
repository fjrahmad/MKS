using API.Context.Table;
using API.Models;
using API.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MKSTableContext _context;

        public CategoryRepository(MKSTableContext context)
        {
            _context = context;
        }
        public async Task DeleteCategory(int id)
        {
            _context.Categories.Remove(await _context.Categories.FindAsync(id));
            await _context.SaveChangesAsync();
        }
        public async Task<CategoryModel> FillFormCategory(int id)
        {
            Category? category = await _context.Categories.FindAsync(id);
            CategoryModel? categoryModel = null;
            if (category == null)
            {
                categoryModel = new CategoryModel();
            }
            else
            {
                categoryModel = new CategoryModel
                {
                    ID = category.ID,
                    Name = category.Name
                };
            }
            return categoryModel;
        }
        public async Task<object> GetCategoryList()
        {
            return Task.FromResult<object>(await _context.Categories.ToListAsync());

        }
        public async Task SaveCategory(CategoryModel categoryModel)
        {
            if (categoryModel.ID == 0)
            {
                _context.Categories.Add(new Category
                {
                    Name = categoryModel.Name
                });
            }
            else
            {
                Category category = await _context.Categories.FindAsync(categoryModel.ID);
                category.Name = categoryModel.Name;
                _context.Categories.Update(category);
            }
            await _context.SaveChangesAsync();
        }
    }
}
