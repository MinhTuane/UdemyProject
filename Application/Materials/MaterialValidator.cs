using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Materials
{
    public class MaterialValidator : AbstractValidator<Material>
    {
        public MaterialValidator()
        {
            
        }
    }
}