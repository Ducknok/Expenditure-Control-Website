using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TKAH.QuanLyChiTieu.Web.Startup;
namespace TKAH.QuanLyChiTieu.Web.Tests
{
    [DependsOn(
        typeof(QuanLyChiTieuWebModule),
        typeof(AbpAspNetCoreTestBaseModule)
        )]
    public class QuanLyChiTieuWebTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(QuanLyChiTieuWebTestModule).GetAssembly());
        }
    }
}