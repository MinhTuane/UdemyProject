using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Salaries
{
    public class Details
    {
        public class Query : IRequest<Result<Salary>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Salary>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<Salary>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Salary = await _context.Salaries.FindAsync(request.Id);
                return Result<Salary>.Success(Salary);
            }
        }
    }
}