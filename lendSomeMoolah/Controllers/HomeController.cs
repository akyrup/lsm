using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using lendSomeMoolah.Models;

namespace lendSomeMoolah.Controllers
{
    [RoutePrefix("/")]
    [Route("{action=Login}")] //default action 
    [Route("{action=Loans}")] //default action 
    
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            RedirectPermanent("home/loan");
            return View();
        }
       
        [Route("")]
        [Route("Home")]
        [Route("Home/Login")]
        [Route("Login")] 
        public ActionResult Login()
        {
            return View();
        }
       

        public ActionResult Loans()
        {
            //LSMAPICall api = new LSMAPICall();
            //api.loans("abc");

            return View();
        }

        
        public ActionResult FundLoan(int loanId, string fundedBy)
        {
            ViewBag.loanId = loanId;
            ViewBag.fundedBy = fundedBy;
            return View();
        }
       
        public ActionResult RequestLoan()
        {
            return View();
        }
        
        
    }
}