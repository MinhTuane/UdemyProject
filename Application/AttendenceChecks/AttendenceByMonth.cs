using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AttendenceChecks
{
    public class AttendenceByMonth
    {
        public class Query : IRequest<Result<List<AttendenceCheck>>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<AttendenceCheck>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<AttendenceCheck>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var firstDayOfMonth = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

                var attendanceChecks = await _context.AttendenceChecks
                    .Where(x => x.UserId == request.UserId) 
                    .ToListAsync();

                return Result<List<AttendenceCheck>>.Success(attendanceChecks);
            }
        }
    }
}