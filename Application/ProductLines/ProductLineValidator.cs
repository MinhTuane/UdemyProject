using Domain;
using FluentValidation;

namespace Application.ProductLines
{
    public class ProductLineValidator : AbstractValidator<ProductLine>
    {
        public ProductLineValidator()
        {
            RuleFor(x=> x.Title).NotEmpty();
            RuleFor(x=> x.Status).NotEmpty();
        }
    }
}