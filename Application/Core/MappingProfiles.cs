using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
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
            CreateMap<AppUser,Profiles.Profile>()
                .ForMember(d => d.Image, o=> o.MapFrom(s =>s.Photos.FirstOrDefault(x =>x.IsMain).Url));  
        }
    }
}