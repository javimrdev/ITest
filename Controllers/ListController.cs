using System.Threading.Tasks;
using InterviewTest.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;
using Microsoft.AspNetCore.Http;


namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public ListController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var employees = await _employeeRepository.GetEmployees();
                return Ok(employees);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [Route("/listValuesSum")]
        [HttpGet]
        public async Task<IActionResult> ListValuesSum()
        {
            try
            {
                var employees = await _employeeRepository.GetEmployees();
                decimal totalValues = employees.Where(e => e.Name.StartsWith('A') || e.Name.StartsWith('B') || e.Name.StartsWith('C')).Sum(e => e.Value);
                return Ok(totalValues);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
    }
}
