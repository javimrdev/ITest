using InterviewTest.Core.Entities;
using InterviewTest.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace InterviewTest.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeesController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [HttpGet("{name}")]
        public async Task<IActionResult> Get(string name)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployeByName(name);

                if (employee == null)
                    return NotFound($"Employee with Name = {employee.Name} not found");

                return Ok(employee);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error getting data");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
            try
            {
                var newEmployee = await _employeeRepository.SaveEmployee(employee);

                return Ok(newEmployee);
            }
            catch (Exception ex)
            {
                var mess = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error saving data");
            }
        }

        [HttpPut("{oldName}")]
        public async Task<IActionResult> Put(string oldName, [FromBody] Employee employee)
        {
            try
            {

                var employeeToUpdate = await _employeeRepository.GetEmployeByName(oldName);

                if (employeeToUpdate == null)
                    return NotFound($"Employee with Name = {oldName} not found");

                var updatedEmployee = await _employeeRepository.EditEmployee(employee, oldName);

                return Ok(updatedEmployee);
            }
            catch (Exception ex)
            {
                var mess = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> Delete(string name)
        {
            try
            {

                var employeeToDelete = await _employeeRepository.GetEmployeByName(name);

                if (employeeToDelete == null)
                    return NotFound($"Employee with Name = {name} not found");

                var updatedEmployee = await _employeeRepository.DeleteEmployee(name);

                return Ok(updatedEmployee);
            }
            catch (Exception ex)
            {
                var mess = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting user");
            }
        }
    }
}
