
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.ProductLines
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ProductLine ProductLine { get; set; }
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
                _context.ProductLines.Add(request.ProductLine);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create product line");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }


}