using Microsoft.EntityFrameworkCore;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public static class DbContextOptionsConfigurer
    {
        public static void Configure(
            DbContextOptionsBuilder<QuanLyChiTieuDbContext> dbContextOptions, 
            string connectionString
            )
        {
            /* This is the single point to configure DbContextOptions for QuanLyChiTieuDbContext */
            dbContextOptions.UseSqlServer(connectionString);
        }
    }
}
