using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Admin
{
    public class Detail
    {
        public class Query : IRequest<Result<AppUser>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<AppUser>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<AppUser>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x=> x.Id == request.Id);
                return Result<AppUser>.Success(user);
            }
        }
    }
}