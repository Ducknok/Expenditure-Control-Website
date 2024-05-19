using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class Tag : Entity<Guid>, IEntityDto<Guid>
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
        public string Note { get; set; }
    }
}
