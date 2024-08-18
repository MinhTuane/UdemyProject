import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { Checkbox, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { AttendenceCheck } from "../../../app/models/attendenceCheck";
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify";

export default observer(function AttendanceCheckForm() {
    const { adminStore, attendenceCheckStore } = useStore();
    const { loadingInitial, users, loadUsers } = adminStore;
    const { createAttendenceCheck, deleteAttendenceCheck, loadattendenceChecks, attendenceChecksRegister, updateAttendenceCheck } = attendenceCheckStore;

    const [selectedValues, setSelectedValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const loadData = async () => {
            if (users.size <= 1) await loadUsers();
            
            Array.from(users.values()).map(user => console.log(user)
            )
            if (attendenceChecksRegister.size <= 1) await loadattendenceChecks();

            const selectedValuesFromChecks: { [key: string]: string } = {};
            Array.from(attendenceChecksRegister.values()).forEach(at => {
                selectedValuesFromChecks[at.userId] = at.workStatus;
            });

            setSelectedValues(selectedValuesFromChecks);
        };

        loadData();
    }, [users, loadUsers, attendenceChecksRegister, loadattendenceChecks]);

    const handleChecked = async (userId: string, value: string) => {
        const currentStatus = selectedValues[userId];
        const attendenceCheck = Array.from(attendenceChecksRegister.values()).find(x => x.userId === userId);

        if (currentStatus === value) {
            setSelectedValues(prevState => ({
                ...prevState,
                [userId]: ''
            }));
            if (attendenceCheck) {
                await deleteAttendenceCheck(attendenceCheck.id);
                toast.warn('Deleted');
            }
        } else {
            setSelectedValues(prevState => ({
                ...prevState,
                [userId]: value
            }));
            try {
                if (!attendenceCheck) {
                    const attendence: AttendenceCheck = {
                        id: uuid(),
                        date: new Date(),
                        userId: userId,
                        workStatus: value,
                    };
                    await createAttendenceCheck(attendence);
                } else {
                    await updateAttendenceCheck({
                        ...attendenceCheck,
                        workStatus: value
                    });
                }
                toast.info('Checked');
            } catch (error) {
                toast.error('Error: ' + error);
            }
        }
    };

    if (loadingInitial) return <LoadingComponent />;

    return (
        <Table celled structured>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell width='5'>Id</TableHeaderCell>
                    <TableHeaderCell width='4'>Name</TableHeaderCell>
                    <TableHeaderCell>Late</TableHeaderCell>
                    <TableHeaderCell>Off</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from(users.values()).map((user) => (              
                    <TableRow key={user.id}>
                        <TableCell positive>{user.id}</TableCell>
                        <TableCell positive>{user.displayName} </TableCell>
                        <TableCell>
                            <Checkbox
                                name={`checkboxRadioGroup_${user.id}`}
                                checked={selectedValues[user.id] === 'late'}
                                onChange={() => handleChecked(user.id, 'late')}
                            />
                        </TableCell>
                        <TableCell>
                            <Checkbox
                                name={`checkboxRadioGroup_${user.id}`}
                                checked={selectedValues[user.id] === 'off'}
                                onChange={() => handleChecked(user.id, 'off')}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
});
