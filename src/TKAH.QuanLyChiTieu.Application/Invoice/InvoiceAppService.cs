using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using System;
namespace QuanLyThuChi.Application
{
    public class InvoiceAppService : AsyncCrudAppService<Invoice, Invoice, Guid>
    {
        private readonly IRepository<Invoice, Guid> _repository;
        private readonly IAbpSession _session;

        public InvoiceAppService(IRepository<Invoice, Guid> repository, IAbpSession session) : base(repository)
        {
            _repository = repository;
            GetAllPermissionName = "aa";
            _session = session;
        }
    }
}
