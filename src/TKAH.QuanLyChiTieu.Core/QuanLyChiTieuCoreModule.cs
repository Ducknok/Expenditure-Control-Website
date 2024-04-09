using Abp.Modules;
using Abp.Reflection.Extensions;
using TKAH.QuanLyChiTieu.Localization;

namespace TKAH.QuanLyChiTieu
{
    public class QuanLyChiTieuCoreModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Auditing.IsEnabledForAnonymousUsers = true;

            QuanLyChiTieuLocalizationConfigurer.Configure(Configuration.Localization);
            
            Configuration.Settings.SettingEncryptionConfiguration.DefaultPassPhrase = QuanLyChiTieuConsts.DefaultPassPhrase;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(QuanLyChiTieuCoreModule).GetAssembly());
        }
    }
}