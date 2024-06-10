using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Products
{
    public class Details
    {
        public class Query : IRequest<Result<Product>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Product>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Products
            .Include(p => p.ProductionRecords) // Include related ProductionRecords
            .FirstOrDefaultAsync(p => p.Id == request.Id);

                if (product == null)
                {
                    return Result<Product>.Failure("Product not found.");
                }

                return Result<Product>.Success(product);
            }
        }
    }
}