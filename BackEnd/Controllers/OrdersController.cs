using AblakKft.Data;
using AblakKft.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace AblakKft.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public OrdersController(DataBaseContext context)
        {
            _context = context;
        }

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderCreateDto dto)
        {
            var order = new Order
            {
                UserId = dto.UserId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Shipping_adress = dto.Shipping_adress,
                Status = dto.Status,
                Order_date = dto.Order_date
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }

        //Read
        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (order == null) return NotFound();
            return Ok(order);
        }

        [HttpGet]
        public IActionResult GetAllOrder()
        {
            var order = _context.Orders.ToList();
            return Ok(order);
        }

        //Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrderById(int id, [FromBody] OrderCreateDto dto)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (order == null) return NotFound();

            order.UserId = dto.UserId;
            order.ProductId = dto.ProductId;
            order.Quantity = dto.Quantity;
            order.Shipping_adress = dto.Shipping_adress;
            order.Status = dto.Status;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletOrderById(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (order == null) return NotFound();

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}