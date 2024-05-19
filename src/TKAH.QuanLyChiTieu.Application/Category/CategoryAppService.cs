using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace QuanLyThuChi.Application
{
    public class CategoryAppService : AsyncCrudAppService<Category, Category, Guid>
    {
        private readonly IRepository<Category, Guid> _repository;
        private readonly IAbpSession _session;

        public CategoryAppService(IRepository<Category, Guid> repository, IAbpSession session) : base(repository)
        {
            _repository = repository;
            GetAllPermissionName = "aa";
            _session = session;
        }
    }
}
