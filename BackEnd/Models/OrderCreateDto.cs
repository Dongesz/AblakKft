namespace AblakKft.Models
{
    public class OrderCreateDto
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string Shipping_adress { get; set; }
        public string Status { get; set; }
        public DateTime Order_date { get; set; }
    }
}