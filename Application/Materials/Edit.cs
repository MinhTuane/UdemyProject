
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Materials
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Material Material { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.Material).SetValidator(new MaterialValidator());
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
                var material = await _context.Materials.FindAsync(request.Material.Id);

                if(material ==null) return null;

                _mapper.Map(request.Material,material);

                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Material");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}