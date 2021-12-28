import * as am from './api/api.model';
import * as vm from './employee-list.vm';

export const mapEmployeeListToVM = (data: am.Employee[]): vm.Employee[] =>
  data.map(mapEmployeeToVM);

export const mapEmployeeToVM = (data: am.Employee): vm.Employee => ({
  name: data.name,
  value: data.value,
});
