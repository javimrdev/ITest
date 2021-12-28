import * as am from './api.model';
import * as vm from '../employee-list.vm';
import axios from 'axios';

export const getEmployeeList = (): Promise<am.Employee[]> => {
  return fetch('/list/').then((r) => r.json());
};

export const getEmployeeByName = async (name: string): Promise<am.Employee> => {
  return await fetch(`/employees/${name}`).then((r) => r.json());
};

export const saveEmployee = async (
  employee: vm.Employee,
  oldName: string
): Promise<am.Employee> => {
  return await axios
    .put(
      `/employees/${oldName}`,
      {
        Name: employee.name,
        Value: employee.value,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((r) => r.data);
};

export const deleteEmployee = async (name: string): Promise<am.Employee> => {
  return await axios.delete(`/employees/${name}`).then((r) => r.data);
};

export const addEmployee = async (
  employee: vm.Employee
): Promise<am.Employee> => {
  console.log(employee);
  return await axios
    .post(
      `/employees/`,
      {
        Name: employee.name,
        Value: employee.value,
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((r) => r.data);
};

export const getListValuesSum = async (): Promise<number> => {
  return await fetch(`/listValuesSum/`).then((r) => r.json());
};
