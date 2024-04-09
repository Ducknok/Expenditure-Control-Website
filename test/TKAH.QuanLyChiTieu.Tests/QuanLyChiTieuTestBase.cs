using System;
using System.Threading.Tasks;
using Abp.TestBase;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using TKAH.QuanLyChiTieu.Tests.TestDatas;

namespace TKAH.QuanLyChiTieu.Tests
{
    public class QuanLyChiTieuTestBase : AbpIntegratedTestBase<QuanLyChiTieuTestModule>
    {
        public QuanLyChiTieuTestBase()
        {
            UsingDbContext(context => new TestDataBuilder(context).Build());
        }

        protected virtual void UsingDbContext(Action<QuanLyChiTieuDbContext> action)
        {
            using (var context = LocalIocManager.Resolve<QuanLyChiTieuDbContext>())
            {
                action(context);
                context.SaveChanges();
            }
        }

        protected virtual T UsingDbContext<T>(Func<QuanLyChiTieuDbContext, T> func)
        {
            T result;

            using (var context = LocalIocManager.Resolve<QuanLyChiTieuDbContext>())
            {
                result = func(context);
                context.SaveChanges();
            }

            return result;
        }

        protected virtual async Task UsingDbContextAsync(Func<QuanLyChiTieuDbContext, Task> action)
        {
            using (var context = LocalIocManager.Resolve<QuanLyChiTieuDbContext>())
            {
                await action(context);
                await context.SaveChangesAsync(true);
            }
        }

        protected virtual async Task<T> UsingDbContextAsync<T>(Func<QuanLyChiTieuDbContext, Task<T>> func)
        {
            T result;

            using (var context = LocalIocManager.Resolve<QuanLyChiTieuDbContext>())
            {
                result = await func(context);
                context.SaveChanges();
            }

            return result;
        }
    }
}
