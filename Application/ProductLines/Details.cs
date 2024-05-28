using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.ProductLines
{
    public class Details
    {
        public class Query : IRequest<Result<ProductLine>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<ProductLine>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<ProductLine>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ProductLine = await _context.ProductLines.FindAsync(request.Id);
                return Result<ProductLine>.Success(ProductLine);
            }
        }
    }
}