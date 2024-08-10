using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Salaries
{
    public class SalariesValidator : AbstractValidator<Salary>
    {
        public SalariesValidator()
        {
         
        }
    }
}