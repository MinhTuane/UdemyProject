using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Salaries
{
    public class List
    {
        public class Query : IRequest<Result<List<Salary>>> 
        { 
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Salary>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Salary>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return Result<List<Salary>>.Success(await _context.Salaries.Where(x => x.UserId == request.UserId).ToListAsync());
            }
        }
    }
}