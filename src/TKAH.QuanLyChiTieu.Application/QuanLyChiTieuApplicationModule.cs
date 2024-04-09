using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;

namespace TKAH.QuanLyChiTieu
{
    [DependsOn(
        typeof(QuanLyChiTieuCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class QuanLyChiTieuApplicationModule : AbpModule
    {
        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(QuanLyChiTieuApplicationModule).GetAssembly());
        }
    }
}