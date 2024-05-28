using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Materials
{
    public class Details
    {
        public class Query : IRequest<Result<Material>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Material>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<Material>> Handle(Query request, CancellationToken cancellationToken)
            {
                var material = await _context.Materials.FindAsync(request.Id);
                return Result<Material>.Success(material);
            }
        }
    }
}