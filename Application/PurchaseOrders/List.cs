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

namespace Application.PurchaseOrders
{
    public class List
    {
        public class Query : IRequest<Result<List<ProductLine>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ProductLine>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<ProductLine>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return Result<List<ProductLine>>.Success(await _context.ProductLines.ToListAsync());
            }
        }
    }
}