namespace AblakKft.Models
{
    public class Rendeles
    {
        private int _id {  get; set; }
        private int _user_id {  get; set; }
        private felhasznalo _felhasznalo { get; set; }

        private int _product_id {  get; set; }
        private termek _termek { get; set; }

        private int _quantity {  get; set; }
        private string _shipping_adress {  get; set; }
        private string _status { get; set; }
        private DateTime _order_date { get; set; }
        
        
    }
}
