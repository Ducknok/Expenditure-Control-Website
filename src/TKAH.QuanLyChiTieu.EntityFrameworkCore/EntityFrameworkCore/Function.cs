using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class Function : Entity<Guid>, IEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public Guid? ParentId { get; set; }
    }
}
