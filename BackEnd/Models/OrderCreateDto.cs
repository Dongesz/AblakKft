using System.ComponentModel.DataAnnotations;

namespace AblakKft.Models
{
    public class OrderCreateDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "A mennyisegnek pozitivnak kell lennie!" )]
        public int Quantity { get; set; }
        [Required]
        [StringLength(100)]
        public string Shipping_adress { get; set; }
        [Required]
        [StringLength(20)]
        public string Status { get; set; }
        [Required]
        public DateTime Order_date { get; set; }
    }
}