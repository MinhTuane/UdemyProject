using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.PurchaseOrders
{
    public class Details
    {
        public class Query : IRequest<Result<PurchaseOrder>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<PurchaseOrder>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<PurchaseOrder>> Handle(Query request, CancellationToken cancellationToken)
            {
                var PurchaseOrder = await _context.PurchaseOrders.FindAsync(request.Id);
                return Result<PurchaseOrder>.Success(PurchaseOrder);
            }
        }
    }
}