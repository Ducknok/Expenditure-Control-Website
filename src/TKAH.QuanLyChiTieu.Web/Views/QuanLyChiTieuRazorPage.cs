using Abp.AspNetCore.Mvc.Views;

namespace TKAH.QuanLyChiTieu.Web.Views
{
    public abstract class QuanLyChiTieuRazorPage<TModel> : AbpRazorPage<TModel>
    {
        protected QuanLyChiTieuRazorPage()
        {
            LocalizationSourceName = QuanLyChiTieuConsts.LocalizationSourceName;
        }
    }
}
