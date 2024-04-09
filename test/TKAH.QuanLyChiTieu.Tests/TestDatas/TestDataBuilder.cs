using TKAH.QuanLyChiTieu.EntityFrameworkCore;

namespace TKAH.QuanLyChiTieu.Tests.TestDatas
{
    public class TestDataBuilder
    {
        private readonly QuanLyChiTieuDbContext _context;

        public TestDataBuilder(QuanLyChiTieuDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            //create test data here...
        }
    }
}