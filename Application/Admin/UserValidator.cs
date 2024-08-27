using Domain;
using FluentValidation;

namespace Application.Admin
{
    public class UserValidator: AbstractValidator<AppUser>
    {
        public UserValidator()
        {
            RuleFor(x=> x.Email);
            RuleFor(x=> x.DateOfBirth);
            RuleFor(x=> x.DisplayName);
            RuleFor(x=> x.UserName);
        }
    }
}