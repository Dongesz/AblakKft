namespace AblakKft.Models
{
    public class felhasznalo
    {
        private int id {  get; set; }
        private string _username { get; set; }
        private string _password_hash { get; set; }
        private string _full_name { get; set; }
        private string _email {  get; set; }
        private string _phone { get; set; }
        private string _role { get; set; }
        private DateTime _created_at { get; set; }

        private ICollection<Rendeles> _rendelesek { get; set; }
    }
}
