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
        public class Query : IRequest<Result<List<Schedule>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Schedule>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Schedule>>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return null;
            }
        }
    }
}