using Domain;
using FluentValidation;

namespace Application.Companies
{
    public class CompanyValidator : AbstractValidator<Company>
    {
        public CompanyValidator()
        {
            RuleFor(x=> x.Name).NotEmpty();
            RuleFor(x=> x.Address).NotEmpty();
        }
    }
}