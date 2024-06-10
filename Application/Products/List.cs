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

namespace Application.Products
{
    public class List
    {
        public class Query : IRequest<Result<List<Product>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Product>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Product>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var products = await _context.Products
                    .Include(p => p.ProductionRecords)
                    .ToListAsync(cancellationToken);

                return Result<List<Product>>.Success(products);
            }
        }
    }
}