using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Schedules
{
    public class List
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
                
                return Result<List<AttendenceCheck>>.Success(await _context.AttendenceChecks.Where(x=> x.UserId == request.UserId).ToListAsync());
            }
        }
    }
}