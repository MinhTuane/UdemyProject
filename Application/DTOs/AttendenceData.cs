using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class AttendenceData
    {
        public int Worked { get; set; }
        public int Late { get; set; }
        public int Off { get; set; }
    }
}