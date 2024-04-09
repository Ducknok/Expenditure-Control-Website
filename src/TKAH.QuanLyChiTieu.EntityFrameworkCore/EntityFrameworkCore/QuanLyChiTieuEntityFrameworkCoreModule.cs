using Abp.EntityFrameworkCore;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    [DependsOn(
        typeof(QuanLyChiTieuCoreModule), 
        typeof(AbpEntityFrameworkCoreModule))]
    public class QuanLyChiTieuEntityFrameworkCoreModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(QuanLyChiTieuEntityFrameworkCoreModule).GetAssembly());
        }
    }
}