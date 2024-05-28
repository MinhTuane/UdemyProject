using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Schedule
    {
        public Guid Id { get; set; }
        public DateTime OnTime { get; set; }
        public DateTime Late { get; set; }
        public DateTime AuthorizedAbsence { get; set; }
        public DateTime UnauthorizedAbsence { get; set; }
    }
}