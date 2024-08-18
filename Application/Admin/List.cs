
using Application.Core;
using Application.Profiles;
using AutoMapper;

using Domain;
using MediatR;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Persistence;

namespace Application.Admin
{
    public class List
    {
        public class Query : IRequest<Result<List<Profiles.Profile>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
        {
        
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
            
            public Handler(DataContext context,IMapper mapper,UserManager<AppUser> userManager)
            {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
            }

            public async Task<Result<List<Profiles.Profile>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var users = await _context.Users.Include(x => x.Photos).ToListAsync();

                var profileList = new List<Profiles.Profile>();

                foreach (var user in users)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    var profile = _mapper.Map<Profiles.Profile>(user);
                    profile.Role = roles.FirstOrDefault(); 
                    profileList.Add(profile);
                }

                return Result<List<Profiles.Profile>>.Success(profileList);
            }
        }
    }
}