
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.AttendenceChecks
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public AttendenceCheck  AttendenceCheck{ get; set; }
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
                var attendenceCheck = await _context.AttendenceChecks.FindAsync(request.AttendenceCheck);

                if(attendenceCheck == null) return null;

                _mapper.Map(request.AttendenceCheck,attendenceCheck);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Fail to update attendence check");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}