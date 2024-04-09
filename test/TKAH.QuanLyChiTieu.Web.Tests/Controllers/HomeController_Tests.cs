using System.Threading.Tasks;
using TKAH.QuanLyChiTieu.Web.Controllers;
using Shouldly;
using Xunit;

namespace TKAH.QuanLyChiTieu.Web.Tests.Controllers
{
    public class HomeController_Tests: QuanLyChiTieuWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}
