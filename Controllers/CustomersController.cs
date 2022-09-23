using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class CustomersController : ApiController
    {
        [HttpGet]
        [Route("api/customers")]
        public IQueryable<Customer> GetCustomers()
        {
            JungleDBEntities db = new JungleDBEntities();

            return db.Customers;
        }
    }
}
