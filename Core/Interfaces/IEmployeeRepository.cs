using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using InterviewTest.Core.Entities;

namespace InterviewTest.Core.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> GetEmployeByName(string name);
        Task<Employee> SaveEmployee(Employee employee);
        Task<Employee> EditEmployee(Employee employee, string oldName);
        Task<string> DeleteEmployee(string name);

    }
}
