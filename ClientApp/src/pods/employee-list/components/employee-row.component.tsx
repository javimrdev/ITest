import React from 'react';
import { Employee } from '../employee-list.vm';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditButton from '@material-ui/icons/Edit';
import DeleteButton from '@material-ui/icons/Delete';


interface Props {
    employee: Employee;
    onEdit: (name: string, value: number) => void;
    onDelete: (name: string, value: number) => void;
}

export const EmployeeRowComponent: React.FC<Props> = (props) => {
    const { employee, onEdit, onDelete } = props;

    return (
        <TableRow key={employee.name}>
            <TableCell align="center">{employee.name}</TableCell>
            <TableCell align="center">{employee.value}</TableCell>
            <TableCell align="center">
                <IconButton onClick={() => onEdit(employee.name, employee.value)}>
                    <EditButton />
                </IconButton>
                 <IconButton onClick={() => onDelete(employee.name, employee.value)}>
                    <DeleteButton />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}