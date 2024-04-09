using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using TKAH.QuanLyChiTieu.Configuration;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.Configuration;

namespace TKAH.QuanLyChiTieu.Web.Startup
{
    [DependsOn(
        typeof(QuanLyChiTieuApplicationModule), 
        typeof(QuanLyChiTieuEntityFrameworkCoreModule), 
        typeof(AbpAspNetCoreModule))]
    public class QuanLyChiTieuWebModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public QuanLyChiTieuWebModule(IWebHostEnvironment env)
        {
            _appConfiguration = AppConfigurations.Get(env.ContentRootPath, env.EnvironmentName);
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(QuanLyChiTieuConsts.ConnectionStringName);

            Configuration.Navigation.Providers.Add<QuanLyChiTieuNavigationProvider>();

            Configuration.Modules.AbpAspNetCore()
                .CreateControllersForAppServices(
                    typeof(QuanLyChiTieuApplicationModule).GetAssembly()
                );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(QuanLyChiTieuWebModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(QuanLyChiTieuWebModule).Assembly);
        }
    }
}
