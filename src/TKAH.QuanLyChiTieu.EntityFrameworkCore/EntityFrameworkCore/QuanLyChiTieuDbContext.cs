using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class QuanLyChiTieuDbContext : AbpDbContext
    {
        //Add DbSet properties for your entities...
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Function> Functions { get; set; }
        public virtual DbSet<Invoice> Invoice { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<Account> Account { get; set; }
        public QuanLyChiTieuDbContext(DbContextOptions<QuanLyChiTieuDbContext> options) 
            : base(options)
        {

        }
    }
}
