using System.Numerics;
using API.DTOs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ProductionRecords
{
    public class GetProductEachDay
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
                int MaxDay = GetMaxDay(request.Date.Month,request.Date.Year);
                long[] ProductEachDay = new long[MaxDay];
                string[] Labels = new string[MaxDay];
                for(int i=0;i<MaxDay;i++) {
                    DateTime StartDate = new DateTime(request.Date.Year,request.Date.Month,i+1);
                    DateTime EndDate = StartDate.AddDays(1);
                    long count = await _context.ProductionRecords.Where(x=> x.ProductId == request.ProductId)
                                .Where(x=> x.ProductionDateTime < EndDate && x.ProductionDateTime >= StartDate).LongCountAsync();
                    ProductEachDay[i] = count;
                    Labels[i] = (i+1).ToString();
                }
                
                return Result<ChartProductDto>
                .Success(new ChartProductDto{Data = ProductEachDay,Labels=Labels});
            }
            public int GetMaxDay(int month, int year) {
                int[] day31 = { 1, 3, 5, 7, 8, 10, 12 };
                int[] day30 = { 4, 6, 9, 11 };

                if (day31.Contains(month))
                    return 31;
                if (day30.Contains(month))
                    return 30;
                if (month == 2)
                {
                    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
                        return 29;
                    return 28;
                }
                throw new ArgumentException("Invalid month value");
            }

        }
    }
}