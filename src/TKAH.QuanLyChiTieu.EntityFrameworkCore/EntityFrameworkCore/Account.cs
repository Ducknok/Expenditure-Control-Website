using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace TKAH.QuanLyChiTieu.EntityFrameworkCore
{
    public class Account: Entity<Guid>, IEntityDto<Guid>
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
