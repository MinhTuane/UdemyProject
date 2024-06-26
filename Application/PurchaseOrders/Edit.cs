
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.PurchaseOrders
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public PurchaseOrder PurchaseOrder { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=> x.PurchaseOrder).SetValidator(new PurchaseOrderValidator());
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
                var PurchaseOrder = await _context.PurchaseOrders.FindAsync(request.PurchaseOrder.Id);

                if(PurchaseOrder ==null) return null;

                _mapper.Map(request.PurchaseOrder,PurchaseOrder);

                var result =await _context.SaveChangesAsync()>0;

                if(!result) return Result<Unit>.Failure("Failed to update Purchase Order");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}