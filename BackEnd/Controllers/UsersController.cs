using AblakKft.Data;
using AblakKft.Models;
using Microsoft.AspNetCore.Mvc;

namespace AblakKft.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataBaseContext _context;

        public UsersController(DataBaseContext context)
        {
            _context = context;
        }

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDto dto)
        {
            var user = new User
            {
                Username = dto.Username,
                PasswordHash = dto.PasswordHash,
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Role = dto.Role,
                CreatedAt = dto.CreatedAt
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        //Read
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(o => o.Id == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpGet]
        public IActionResult GetAllUser()
        {
            var user = _context.Users.ToList();
            return Ok(user);
        }

        //Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserById(int id, [FromBody] UserCreateDto dto)
        {
            var user = _context.Users.FirstOrDefault(o => o.Id == id);
            if (user == null) return NotFound();

            user.Username = dto.Username;
            user.PasswordHash = dto.PasswordHash;
            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.Role = dto.Role;
            user.CreatedAt = dto.CreatedAt;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(o => o.Id == id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}