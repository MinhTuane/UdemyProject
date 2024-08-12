using API.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductionRecords
{
    public class GetProductEachHour
    {
        public class Query : IRequest<Result<ChartProductDto>> 
        {
            public Guid ProductId { get; set; }
            public DateTime Date { get; set;}
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
                var Products = await _context.ProductionRecords
                                .Where(x=> x.ProductId == request.ProductId).ToListAsync();
                long[] ProductEachHour = new long[24];
                string[] Labels = new string[24];
                for(int i=0;i<24;i++) {
                    DateTime StartDate = new DateTime(request.Date.Year,request.Date.Month,request.Date.Day,i,0,0);
                    DateTime EndDate = StartDate.AddHours(1);
                    long count =await _context.ProductionRecords.Where(x=> x.ProductId == request.ProductId)
                                .Where(x=> x.ProductionDateTime < EndDate && x.ProductionDateTime >= StartDate).LongCountAsync();
                    ProductEachHour[i] = count;
                    Labels[i] = (i).ToString();
                }
                
                return Result<ChartProductDto>
                .Success(new ChartProductDto {Data= ProductEachHour,Labels=Labels});
            }
        }
    }
}