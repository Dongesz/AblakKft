using System.ComponentModel.DataAnnotations;

namespace AblakKft.Models
{
    public class UserCreateDto
    {
        [Required]
        [StringLength(20)]
        public string Username { get; set; }
        [StringLength(20, MinimumLength = 8, ErrorMessage = "A jelszónak legalább 8 karakter hosszúnak kell lennie.")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$",
        ErrorMessage = "A jelszónak tartalmaznia kell legalább egy nagybetűt, egy kisbetűt és egy számot.")]
        public string PasswordHash { get; set; }
        [Required]
        [StringLength(20)]
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
        [Required]
        [RegularExpression(@"^(megrendelo|munkas|admin)$", ErrorMessage = "A jogosultsági szint csak megrendelo, munkas vagy admin lehet.")]
        public string Role { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
    }
}