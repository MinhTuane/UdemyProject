
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ProductionRecords
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public ProductionRecord ProductionRecord { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {         
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
                
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var productionRecord = await _context.ProductionRecords.FindAsync(request.ProductionRecord.Id);

                if(productionRecord ==null) return null;

                _mapper.Map(request.ProductionRecord,productionRecord);

                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Production Record");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}