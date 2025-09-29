namespace AblakKft.Models
{
    public class termek
    {
        private int _id {  get; set; }
        private string _category { get; set; }
        private string _dimension { get; set; }
        private string _type_code { get; set; }
        private int _price { get; set; }
        private string _note { get; set; }

        private ICollection<Rendeles> _rendelesek {  get; set; }
    }
}
