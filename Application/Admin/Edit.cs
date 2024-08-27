
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Admin
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public AppUser AppUser { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.AppUser).SetValidator(new UserValidator());
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
                var user = await _context.Users.FindAsync(request.AppUser.Id);

                if(user ==null) return null;

                _mapper.Map(request.AppUser,user);

                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update User");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}