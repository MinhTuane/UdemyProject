using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.PurchaseOrders
{
    public class GetCountry
    {
        public class Query : IRequest<Result<ChartProductDto>> 
        { 
            public Guid PruductId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ChartProductDto>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<ChartProductDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.PurchaseOrders
                .Where(po => po.ProductId == request.PruductId)
                .GroupBy(po => po.ExportCountry)
                .Select(g=> new {Country = g.Key,Count =g.LongCount()}).ToListAsync();

                var chartProductDto = new ChartProductDto(){Labels = result.Select(r=>r.Country).ToArray(),Data =result.Select(r=>r.Count).ToArray()};

                return Result<ChartProductDto>.Success(chartProductDto);
            }
        }
    }
}