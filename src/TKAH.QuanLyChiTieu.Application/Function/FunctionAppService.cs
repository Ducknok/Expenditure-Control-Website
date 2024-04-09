using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using System;
namespace QuanLyThuChi.Application
{
    public class FunctionAppService : AsyncCrudAppService<Function, Function, Guid>
    {
        private readonly IRepository<Function, Guid> _repository;
        private readonly IAbpSession _session;

        public FunctionAppService(IRepository<Function, Guid> repository, IAbpSession session) : base(repository)
        {
            _repository = repository;
            GetAllPermissionName = "aa";
            _session = session;
        }
    }
}
