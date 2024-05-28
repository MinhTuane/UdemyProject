using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.ProductLines
{
    public class ProductLineValidator : AbstractValidator<ProductLine>
    {
        public ProductLineValidator()
        {
            RuleFor(x=> x.Product).NotEmpty();
        }
    }
}