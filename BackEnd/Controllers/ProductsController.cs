using AblakKft.Data;
using AblakKft.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AblakKft.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public ProductsController(DataBaseContext context)
        {
            _context = context;
        }

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateDto dto)
        {
            var product = new Product
            {
                Category = dto.Category,
                Dimension = dto.Dimension,
                Type_code = dto.Type_code,
                Price = dto.Price,
                Note = dto.Note
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        //Read
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Products.FirstOrDefault(o => o.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpGet]
        public IActionResult GetAllProduct()
        {
            var product = _context.Products.ToList();
            return Ok(product);
        }

        //Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductById(int id, [FromBody] ProductCreateDto dto)
        {
            var product = _context.Products.FirstOrDefault(o => o.Id == id);
            if (product == null) return NotFound();

            product.Category = dto.Category;
            product.Dimension = dto.Dimension;
            product.Type_code = dto.Type_code;
            product.Price = dto.Price;
            product.Note = dto.Note;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductById(int id)
        {
            var product = _context.Products.FirstOrDefault(o => o.Id == id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}