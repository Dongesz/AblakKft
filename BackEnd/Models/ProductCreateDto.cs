namespace AblakKft.Models
{
    public class ProductCreateDto
    {
        public string Category { get; set; }
        public string Dimension { get; set; }
        public string Type_code { get; set; }
        public int Price { get; set; }
        public string Note { get; set; }
    }
}