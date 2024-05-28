
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.ProductLines
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public ProductLine ProductLine { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.ProductLine).SetValidator(new ProductLineValidator());
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
                var ProductLine = await _context.ProductLines.FindAsync(request.ProductLine.Id);

                if(ProductLine ==null) return null;

                _mapper.Map(request.ProductLine,ProductLine);

                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Product Line");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}