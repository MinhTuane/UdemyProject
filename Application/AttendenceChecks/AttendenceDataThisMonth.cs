using Application.Core;
using Application.DTOs;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AttendenceChecks
{
    public class AttendenceDataThisMonth
    {
        public class Query : IRequest<Result<AttendenceData>>
        {
            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<AttendenceData>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<AttendenceData>> Handle(Query request, CancellationToken cancellationToken)
            {
                DateTime today = DateTime.Now;
                var firstDayOfMonth = new DateTime(today.Year, today.Month, 1);
                var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

                var attendanceChecks = await _context.AttendenceChecks
                    .Where(x => x.UserId == request.UserId)
                    .Where(x => x.Date >= firstDayOfMonth && x.Date <= lastDayOfMonth)
                    .ToListAsync();

                

                int daysSinceLastSunday = (int)today.DayOfWeek;

                var lateCount = attendanceChecks.Count(x => x.WorkStatus == "late");
                var offCount = attendanceChecks.Count - lateCount;
                var sunday = (today.Day - daysSinceLastSunday)/7;
                if((today.Day - daysSinceLastSunday)%7 == 0) sunday++;
                var workedCount = DateTime.Now.Day - offCount -sunday;

                var data = new AttendenceData
                {
                    Late = lateCount,
                    Off = offCount,
                    Worked = workedCount
                };

                return Result<AttendenceData>.Success(data);
            }
        }
    }
}