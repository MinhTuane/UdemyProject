using API.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductionRecords
{
    public class GetProductEachMonth
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
                long[] ProductEachMonth = new long[12];
                string[] Labels = new string[12];
                for(int i=0;i<12;i++) {
                    DateTime StartDate = new DateTime(request.Date.Year,i+1,1);
                    DateTime EndDate = StartDate.AddMonths(1);
                    long count =await _context.ProductionRecords.Where(x=>x.ProductId==request.ProductId)
                                .Where(x=> x.ProductionDateTime < EndDate && x.ProductionDateTime >= StartDate).LongCountAsync();
                    ProductEachMonth[i] = count;
                    Labels[i] =(1+i).ToString();
                }
                
                return Result<ChartProductDto>
                .Success(new ChartProductDto{ Data= ProductEachMonth,Labels=Labels});
            }
        }
    }
}