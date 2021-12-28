using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using InterviewTest.Core.Entities;
using InterviewTest.Core.Interfaces;
using Microsoft.Data.Sqlite;

namespace InterviewTest.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            var employees = new List<Employee>();

            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"SELECT 
                                            Name, 
                                            (CASE 
                                                WHEN Name LIKE 'E%' THEN Value + 1 
                                                WHEN Name LIKE 'G%' THEN Value + 10
                                                ELSE Value + 100
                                            END) as Value
                                        FROM 
                                            Employees 
                                        order by Name asc";
                using (var reader = await queryCmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        employees.Add(new Employee
                        {
                            Name = reader.GetString(0),
                            Value = reader.GetInt32(1)
                        });
                    }
                }
            }

            return employees;
        }

        public async Task<Employee> GetEmployeByName(string name)
        {
            var employee = new Employee();
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = string.Format(@"SELECT Name, Value FROM Employees WHERE Name='{0}'", name);
                using (var reader = await queryCmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        employee.Name = reader.GetString(0);
                        employee.Value = reader.GetInt32(1);
                    }
                }
            }

            return employee;
        }

        public async Task<Employee> SaveEmployee(Employee employee)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"INSERT INTO Employees (Name, Value) VALUES (@NAME,@VALUE)";
                queryCmd.Parameters.AddWithValue("@NAME", employee.Name);
                queryCmd.Parameters.AddWithValue("@VALUE", employee.Value);

                await queryCmd.ExecuteNonQueryAsync();
            }

            return employee;
        }

        public async Task<Employee> EditEmployee(Employee employee, string oldName)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"UPDATE Employees SET Name=@NAME,Value=@VALUE WHERE NAME=@OLDNAME";
                queryCmd.Parameters.AddWithValue("@NAME", employee.Name);
                queryCmd.Parameters.AddWithValue("@VALUE", employee.Value);
                queryCmd.Parameters.AddWithValue("@OLDNAME", oldName);

                await queryCmd.ExecuteNonQueryAsync();
            }

            return employee;
        }

        public async Task<string> DeleteEmployee(string name)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = "./SqliteDB.db" };
            using (var connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
            {
                connection.Open();

                var queryCmd = connection.CreateCommand();
                queryCmd.CommandText = @"DELETE FROM Employees WHERE Name=@NAME";
                queryCmd.Parameters.AddWithValue("@NAME", name);

                await queryCmd.ExecuteNonQueryAsync();
            }

            return name;
        }
    }
}
