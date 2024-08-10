using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Salaries
{
    public class SetPaidByPeriod
    {
        public class Command : IRequest<Result<Unit>> 
        { 
            public string UserId { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Salaries = await _context.Salaries.Where(x => x.UserId == request.UserId)
                                .Where(x => x.Date >=request.StartDate && x.Date < request.EndDate).ExecuteUpdateAsync(s => s.SetProperty(x=>x.IsPaid,true));
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}