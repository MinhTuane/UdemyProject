using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;

namespace Application.Schedules
{
    public class Details
    {
        public class Query : IRequest<Result<AttendenceCheck>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<AttendenceCheck>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<AttendenceCheck>> Handle(Query request, CancellationToken cancellationToken)
            {
                var attendenceCheck = await _context.AttendenceChecks.FindAsync(request.Id);

                return Result<AttendenceCheck>.Success(attendenceCheck);
            }
        }
    }
}