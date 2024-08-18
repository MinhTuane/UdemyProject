
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
namespace Application.AttendenceChecks
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AttendenceCheck AttendenceCheck { get; set; }
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
                 _context.AttendenceChecks.Add(request.AttendenceCheck);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to Add Attendence Check");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }


}