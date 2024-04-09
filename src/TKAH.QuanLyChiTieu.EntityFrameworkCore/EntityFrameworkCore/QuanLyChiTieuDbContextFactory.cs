using TKAH.QuanLyChiTieu.Configuration;
using TKAH.QuanLyChiTieu.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    /* This class is needed to run EF Core PMC commands. Not used anywhere else */
    public class QuanLyChiTieuDbContextFactory : IDesignTimeDbContextFactory<QuanLyChiTieuDbContext>
    {
        public QuanLyChiTieuDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<QuanLyChiTieuDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            DbContextOptionsConfigurer.Configure(
                builder,
                configuration.GetConnectionString(QuanLyChiTieuConsts.ConnectionStringName)
            );

            return new QuanLyChiTieuDbContext(builder.Options);
        }
    }
}