import React from 'react';
import { getEmployeeList, getListValuesSum } from './api/api';
import { mapEmployeeListToVM, mapEmployeeToVM } from './employee-list.mappers';
import { Employee } from './employee-list.vm';
import { EmployeeListComponent } from './employee-list.component';
import { addEmployee, deleteEmployee, saveEmployee } from './api/api';
import { ButtonComponent } from '../../common/components/button';
import { useStyles } from '../../common/styles/button.styles';
import { DialogComponent } from '../../common/components/dialog';
import { TextField } from '@material-ui/core';
import { InfoComponent } from '../../common/components/info';

const actionOptions = {
        edit: 'edit',
        delete: 'delete',
        new: 'new'
    }

export const EmployeeListContainer: React.FC = () => {
    const [updateList, setUpdateList] = React.useState<boolean>(true);
    const [list, setList] = React.useState<Employee[]>([]);
    const [dialogTitle, setDialogTitle] = React.useState<string>('');
    const [oldName, setOldName] = React.useState<string>('');
    const [employee, setEmployee] = React.useState<Employee>({name: '', value: 0});
    const [action, setAction] = React.useState<string>('');
    const [ listValuesSum, setListValuesSum ] = React.useState<number>(0);
    const styles = useStyles();


    const editHandlerClick = (name: string, value: number) => {
        setAction(actionOptions.edit);
        setEmployee({name: name, value: value});
        setOldName(name);
        setDialogTitle('Edit Employee');
    }

    const deleteHandlerClick = (name: string, value: number) => {
        setAction(actionOptions.delete);
        setEmployee({name: name, value: value});
        setDialogTitle('Delete Employee');
    }

    const addHandlerClick = () => {
        setAction(actionOptions.new);
        setDialogTitle('New Employee');
    }

    const employeeChange = (prop: string, value: string | number) => {
        setEmployee({
            ...employee,
            [prop]: value
        })
    }

    const onSaveHandler = async () => {
        await saveEmployee(employee, oldName)
        .then(mapEmployeeToVM)
        .then((obj: Employee) => {
            setUpdateList(false);
            setEmployee({name: '', value: 0});
            setOldName('');
            setAction('');
        })
    }

    const onDeleteHandler = async () => {
        await deleteEmployee(employee.name)
        .then(() => {
            setAction('');
            setEmployee({name: '', value: 0});
            setOldName('');
            setUpdateList(true);
        })
    }

    const onAddHandler = async () => {
        await addEmployee(employee)
        .then(mapEmployeeToVM)
        .then((obj: Employee) => {
            console.log(obj);
            setAction('');
            setUpdateList(true);
            setEmployee({name: '', value: 0});
            setOldName('');
        })
    }

    React.useEffect(() => {
        if(updateList){
            getEmployeeList()
                .then(mapEmployeeListToVM)
                .then(list => setList(list.sort((a, b) => a.name.localeCompare(b.name))))
                setUpdateList(false);

            getListValuesSum()
                .then(setListValuesSum)
        }
    }, [updateList]);

    return (<>
                {listValuesSum > 11171 &&
                    <InfoComponent title={'List value sum:'} value={listValuesSum.toString()} />
                }
                <ButtonComponent classes={styles.btnGreen} onClickHandler={addHandlerClick} text={'Add Employee'}/>
                <EmployeeListComponent list={list} onEdit={editHandlerClick} onDelete={deleteHandlerClick} />
                <DialogComponent title={dialogTitle} open={action}  onClose={() => setAction('')}>
                    { action === actionOptions.edit || action === actionOptions.new ?
                        <>
                            <TextField type="text" name="name" value={employee.name} 
                                onChange={(e: any) => employeeChange(e.target.name, e.target.value)} required/>
                            <TextField type="number" name="value" value={employee.value} 
                                onChange={(e: any) => employeeChange(e.target.name, Number.parseInt(e.target.value))} required/>
                            <ButtonComponent 
                                classes={styles.btnBlue}
                                onClickHandler={action === actionOptions.edit ? onSaveHandler : action === actionOptions.new && onAddHandler} 
                                text={action === actionOptions.edit ? actionOptions.edit : action === actionOptions.new ? 'add' : ''} />
                        </>
                        : action === actionOptions.delete &&
                        <>
                            <span>Delete user: {employee.name}</span>
                                <ButtonComponent 
                                    classes={styles.btnBlue}
                                    onClickHandler={onDeleteHandler} 
                                    text={actionOptions.delete} />
                        </>
                    }
                </DialogComponent>
            </>
        )
}