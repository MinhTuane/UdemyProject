using Microsoft.AspNetCore.Mvc;
using System.Globalization;

[ApiController]
[Route("api/[controller]")]
public class CountryController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCountryNames()
    {
        var countryNames = new List<string>();

        var cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

        foreach (var culture in cultures)
        {
            var region = new RegionInfo(culture.Name);
            var countryName = region.EnglishName;

            if (!countryNames.Contains(countryName))
            {
                countryNames.Add(countryName);
            }
        }

        countryNames.Sort();

        return Ok(countryNames);
    }
}
