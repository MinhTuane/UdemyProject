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
            public string  UserId { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
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
                return Result<List<AttendenceCheck>>.Success(await _context.AttendenceChecks
                .Where(x => x.UserId == request.UserId)
                .Where(x => x.Date <= request.StartDate && x.Date > request.EndDate)
                .ToListAsync());
            }
        }
    }
}