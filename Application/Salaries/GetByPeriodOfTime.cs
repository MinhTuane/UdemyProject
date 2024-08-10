using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Salaries
{
    public class GetByPeriodOfTime
    {
        public class Query : IRequest<Result<List<Salary>>> 
        { 
            public string UserId { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
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
                var Salaries = await _context.Salaries.Where(x => x.UserId == request.UserId)
                                .Where(x => x.Date >=request.StartDate && x.Date < request.EndDate).ToListAsync();
                return Result<List<Salary>>.Success(Salaries);
            }
        }
    }
}