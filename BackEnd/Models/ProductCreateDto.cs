using System.ComponentModel.DataAnnotations;

namespace AblakKft.Models
{
    public class ProductCreateDto
    {
        [Required]
        public string Category { get; set; }
        [Required]
        public string Dimension { get; set; }
        [Required]
        public string Type_code { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Az ár legalább 1 legyen!")]
        public int Price { get; set; }
        [Required]
        [StringLength(150)]
        public string Note { get; set; }
    }
}