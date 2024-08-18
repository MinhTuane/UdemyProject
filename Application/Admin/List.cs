using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Admin
{
    public class List
    {
        public class Query : IRequest<Result<List<AppUser>>> { }

        public class Handler : IRequestHandler<Query, Result<List<AppUser>>>
        {
            
        private readonly UserManager<AppUser> _userManager;
            
            public Handler(UserManager<AppUser> userManager)
            {
            _userManager = userManager;

            }

            public async Task<Result<List<AppUser>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return Result<List<AppUser>>.Success(await _userManager.Users.ToListAsync());
            }
        }
    }
}