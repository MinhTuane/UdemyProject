using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Admin
{
    public class Delete
    {
        public class  Command : IRequest<Result<Unit>>
        {
            public string  UserId { get; set; }
        }

        public class Handler : IRequestHandler<Command ,Result<Unit>>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstAsync(x=> x.Id == request.UserId);

                if(user == null) return null;
                
                _context.Users.Remove(user);

                var success = await _context.SaveChangesAsync() >0;
                if(success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Fail to deleting user");
            }
        }
    }
}