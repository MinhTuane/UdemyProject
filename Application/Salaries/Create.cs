
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.Salaries
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Salary Salary { get; set; }
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
                _context.Salaries.Add(request.Salary);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create Salary");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }


}