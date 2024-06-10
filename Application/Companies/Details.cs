using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Details
    {
        public class Query : IRequest<Result<Company>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Company>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<Company>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Company = await _context.Companies.FindAsync(request.Id);
                return Result<Company>.Success(Company);
            }
        }
    }
}