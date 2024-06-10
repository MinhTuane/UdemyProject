
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Company Company { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.Company).SetValidator(new CompanyValidator());
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
                var Company = await _context.Companies.FindAsync(request.Company.Id);

                if(Company ==null) return null;

                _mapper.Map(request.Company,Company);

                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Company");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}