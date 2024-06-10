using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductionRecords
{
    public class Details
    {
        public class Query : IRequest<Result<ProductionRecord>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProductionRecord>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<ProductionRecord>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ProductionRecord = await _context.ProductionRecords.FindAsync(request.Id);
                return Result<ProductionRecord>.Success(ProductionRecord);
            }
        }
    }
}