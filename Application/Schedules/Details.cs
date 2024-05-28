using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Schedules
{
    public class Details
    {
        public class Query : IRequest<Result<Schedule>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query,Result<Schedule>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
                
            }

            public async Task<Result<Schedule>> Handle(Query request, CancellationToken cancellationToken)
            {
                
                return null;
            }
        }
    }
}