using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductionRecords
{
    public class List
    {
        public class Query : IRequest<Result<List<ProductionRecord>>> 
        {
            public Guid ProductId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProductionRecord>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<ProductionRecord>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return Result<List<ProductionRecord>>
                .Success(await _context.ProductionRecords.Where(x=> x.ProductId == request.ProductId).ToListAsync());
            }
        }
    }
}