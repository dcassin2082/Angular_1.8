using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpGet]
        public JsonResult GetCustomers()
        {
            List<Customer> customers = new List<Customer>();

            using(SqlConnection cn = new SqlConnection("server=localhost;initial catalog=jungledb;integrated security=true;"))
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand("select * from customer", cn))
                {
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while(reader.Read())
                        {
                            var customer = new Customer
                            {
                                CustomerID = Convert.ToInt32(reader["CustomerId"]),
                                FirstName = reader["FirstName"].ToString(),
                                LastName = reader["LastName"].ToString(),
                                Address = reader["Address"].ToString(),
                                City = reader["City"].ToString(),
                                State = reader["State"].ToString(),
                                Zip = reader["Zip"].ToString(),
                                Phone = reader["Phone"].ToString(),
                            };
                            customers.Add(customer);
                        }
                    }
                }
            }
            return Json(customers, JsonRequestBehavior.AllowGet);
        }
    }
}