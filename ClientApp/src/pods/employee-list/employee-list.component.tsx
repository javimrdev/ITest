import React from 'react';
import { Employee } from './employee-list.vm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { EmployeeRowComponent } from './components/employee-row.component';
import { Typography } from '@material-ui/core';

interface Props {
    list: Employee[];
    onEdit: (name: string, value: number) => void;
    onDelete: (name: string, value: number) => void;
}

export const EmployeeListComponent: React.FC<Props> = (props) => {
    const { list, onEdit, onDelete } = props;

    return (<>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <Typography variant="h5">Name</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h5">Points</Typography>
                        </TableCell>
                        <TableCell align="center">
                            <Typography variant="h5">Actions</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((employee) => (
                        <EmployeeRowComponent key={ employee.name } onEdit={onEdit} onDelete={onDelete} employee={employee} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}