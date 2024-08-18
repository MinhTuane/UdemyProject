using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.AttendenceChecks
{
    public class ScheduleValidator : AbstractValidator<AttendenceCheck>
    {
        public ScheduleValidator()
        {
            
        }
    }
}