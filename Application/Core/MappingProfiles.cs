using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity,Activity>();
            CreateMap<Material,Material>();
            CreateMap<Product,Product>();
            CreateMap<ProductLine,ProductLine>();
            CreateMap<AttendenceCheck,AttendenceCheck>();
            CreateMap<PurchaseOrder,PurchaseOrder>();
            CreateMap<ProductionRecord,ProductionRecord>();
            CreateMap<Salary,Salary>();
        }
    }
}