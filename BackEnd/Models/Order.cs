namespace AblakKft.Models
{
    public class Order
    {
        public int Id {  get; set; }
        public int User_id{  get; set; }
        public User User { get; set; }

        public int Product_id{  get; set; }
        public Product Product { get; set; }

        public int Quantity {  get; set; }
        public string Shipping_adress{  get; set; }
        public string Status{ get; set; }
        public DateTime Order_date{ get; set; }
        
        
    }
}
