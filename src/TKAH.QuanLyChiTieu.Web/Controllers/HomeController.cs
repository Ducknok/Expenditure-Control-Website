using Microsoft.AspNetCore.Mvc;

namespace TKAH.QuanLyChiTieu.Web.Controllers
{
    public class HomeController : QuanLyChiTieuControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
    }
}