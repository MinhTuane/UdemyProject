using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ChartProductDto
    {
        public long[] Data { get; set; }
        public string[] Labels { get; set; }
    }
}