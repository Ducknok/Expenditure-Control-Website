using Abp.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class QuanLyChiTieuDbContext : AbpDbContext
    {
        //Add DbSet properties for your entities...
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<Function> Functions { get; set; }
        public virtual DbSet<Invoice> Invoices { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public QuanLyChiTieuDbContext(DbContextOptions<QuanLyChiTieuDbContext> options) 
            : base(options)
        {

        }
    }
}
