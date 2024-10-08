
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.ProductionRecords
{
    public class Create
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

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.ProductionRecords.Add(request.ProductionRecord);
                Console.WriteLine(request.ProductionRecord.ProductionDateTime);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create Production Record");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }


}