using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using System;
namespace QuanLyThuChi.Application
{
    public class TagAppService : AsyncCrudAppService<Tag, Tag, Guid>
    {
        private readonly IRepository<Tag, Guid> _repository;
        private readonly IAbpSession _session;

        public TagAppService(IRepository<Tag, Guid> repository, IAbpSession session) : base(repository)
        {
            _repository = repository;
            GetAllPermissionName = "aa";
            _session = session;
        }
    }
}
