using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Companies
{
    public class List
    {
        public class Query : IRequest<Result<List<Company>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Company>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Company>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return Result<List<Company>>.Success(await _context.Companies.ToListAsync());
            }
        }
    }
}