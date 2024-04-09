using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using System;
namespace QuanLyThuChi.Application
{
    public class ClientAppService : AsyncCrudAppService<Client, Client, Guid>
    {
        private readonly IRepository<Client, Guid> _repository;
        private readonly IAbpSession _session;

        public ClientAppService(IRepository<Client, Guid> repository, IAbpSession session) : base(repository)
        {
            _repository = repository;
            GetAllPermissionName = "aa";
            _session = session;
        }
    }
}
