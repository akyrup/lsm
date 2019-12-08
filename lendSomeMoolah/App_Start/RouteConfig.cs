using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace lendSomeMoolah
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

           
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "login", id = UrlParameter.Optional }
            );
             routes.MapRoute(
                name: "Default2",
                url: "{controller}/{action}/{loanId}/{fundedBy}",
                defaults: new { controller = "Home", action = "login", loanId = UrlParameter.Optional, fundedBy = UrlParameter.Optional }
            );
           
            routes.MapRoute(
               name: "Default3",
               url: "{action}/{loanId}/{fundedBy}",
               defaults: new { controller = "Home", action = "login", loanId = UrlParameter.Optional, fundedBy = UrlParameter.Optional }
           );
        }
    }
}
