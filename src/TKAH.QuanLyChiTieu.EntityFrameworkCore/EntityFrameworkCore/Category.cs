using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class Category : Entity<Guid>, IEntityDto<Guid>

    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}
