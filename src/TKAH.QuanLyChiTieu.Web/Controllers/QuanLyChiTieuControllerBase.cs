using Abp.AspNetCore.Mvc.Controllers;

namespace TKAH.QuanLyChiTieu.Web.Controllers
{
    public abstract class QuanLyChiTieuControllerBase: AbpController
    {
        protected QuanLyChiTieuControllerBase()
        {
            LocalizationSourceName = QuanLyChiTieuConsts.LocalizationSourceName;
        }
    }
}