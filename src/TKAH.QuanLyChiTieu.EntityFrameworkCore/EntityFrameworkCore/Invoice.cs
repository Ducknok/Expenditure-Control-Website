using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class Invoice : Entity<Guid>, IEntityDto<Guid>
    {
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public string Code { get; set; }
        public DateTime IssueDate { get; set; }
        public string Note { get; set; }
        public decimal Amount { get; set; }
    }
}
