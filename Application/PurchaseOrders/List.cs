
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PurchaseOrders
{
    public class List
    {
        public class Query : IRequest<Result<List<PurchaseOrder>>> { }

        public class Handler : IRequestHandler<Query, Result<List<PurchaseOrder>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<PurchaseOrder>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return Result<List<PurchaseOrder>>.Success(await _context.PurchaseOrders.ToListAsync());
            }
        }
    }
}