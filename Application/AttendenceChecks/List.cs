using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AttendenceChecks
{
    public class List
    {
        public class Query : IRequest<Result<List<AttendenceCheck>>> 
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<AttendenceCheck>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<AttendenceCheck>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Date = DateTime.Today;
                return Result<List<AttendenceCheck>>
                .Success(await _context.AttendenceChecks
                .ToListAsync());
            }
        }
    }
}