using Abp.Application.Services;

namespace TKAH.QuanLyChiTieu
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class QuanLyChiTieuAppServiceBase : ApplicationService
    {
        protected QuanLyChiTieuAppServiceBase()
        {
            LocalizationSourceName = QuanLyChiTieuConsts.LocalizationSourceName;
        }
    }
}