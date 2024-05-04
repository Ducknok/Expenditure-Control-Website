using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class Client : Entity<Guid>, IEntityDto<Guid>
    {
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public decimal Budget { get; set; }
    }
}
