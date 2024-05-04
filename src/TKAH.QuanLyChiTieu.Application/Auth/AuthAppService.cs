using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using TKAH.QuanLyChiTieu.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using TKAH.QuanLyChiTieu.Auth;
using Microsoft.EntityFrameworkCore;
using Castle.Windsor.Installer;

namespace QuanLyThuChi.Application
{
    public class AuthAppService : AsyncCrudAppService<Account, Account, Guid>
    {
        private readonly IRepository<Account, Guid> _repository;
        private readonly IRepository<Client, Guid> _clientRepository;
        private readonly IAbpSession _session;

        public AuthAppService(IRepository<Account, Guid> repository, IAbpSession session, IRepository<Client, Guid> clientRepository) : base(repository)
        {
            _repository = repository;
            GetAllPermissionName = "aa";
            _session = session;
            _clientRepository = clientRepository;
        }
        
        public async Task<string> CreateAccount(RegisterRequest request)
        {
            if(request != null) 
            {
                if(String.IsNullOrEmpty(request.Name) && String.IsNullOrEmpty(request.Email))
                {
                    if(request.Password == request.ComfirmPassword)
                    {
                        var client = new Client()
                        {
                            Id = Guid.NewGuid(),
                            Name = request.Name,
                            Budget = 0,
                        };
                        await _clientRepository.InsertAsync(client);
                        return "ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM";
                    }
                }
            }
            return "";
        }

        public async Task<string> CheckExistAccount(Account request)
        {
            if (request != null)
            {
                var listAccount = await _repository.GetAll().AsNoTracking().FirstOrDefaultAsync(x => x.Email == request.Email && x.Password == request.Password);
                if(listAccount != null)
                {
                    return "ByYM000OLlMQG6VVVp1OH7Xzyr7gHuw1qvUC5dcGt3SNM";
                }
            }
            return "";
        }
    }
}
