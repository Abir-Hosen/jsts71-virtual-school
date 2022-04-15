import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchAllUser, updateUser } from '../../common/redux/resources/userResources';

import { Button, Divider, ButtonGroup, ButtonToolbar, Row } from 'rsuite';

function Dashboard() {

    const dispatch = useDispatch()
    const userInfo = useSelector((state: RootStateOrAny) => state.userInfo)
    const authInfo = useSelector((state: RootStateOrAny) => state.authInfo)

    useEffect(() => {
        dispatch(fetchAllUser())
    }, [userInfo.change])

    const changeActivation = (row: any) => {
        let payload = {
            "id": row.id,
            "isActive": !row.isActive,
        }
        dispatch(updateUser(payload))
    }

    const makeTeacher = (row: any) => {
        let payload = {
            "id": row.id,
            "role": 'teacher',
        }
        dispatch(updateUser(payload))
    }

    var columns

    if (authInfo.role === 'admin') {
        columns = [
            {
                name: 'Name',
                selector: (row: any) => row.name,
            },
            {
                name: 'User Name',
                selector: (row: any) => row.user_name,
            },
            {
                name: 'Email',
                selector: (row: any) => row.email,
            },
            {
                name: 'Role',
                selector: (row: any) => row.role,
            },
            {
                name: 'Action',
                selector: (row: any) => <ButtonToolbar>
                    {row.role !== 'admin' ? <>
                        {/* <Button color="red" appearance="subtle" onClick={() => dispatch(deleteUser(row.id))}>Delete</Button> */}
                        <Button color="red" appearance="subtle" onClick={() => makeTeacher(row)}>Make Teacher</Button>
                        {row.isActive ? <Button color="orange" appearance="subtle" onClick={() => changeActivation(row)}>Deactivate</Button> :
                            <Button color="green" appearance="subtle" onClick={() => changeActivation(row)}>Activate</Button>}</> : ''}
                </ButtonToolbar>,
            },
        ];
    } else {
        columns = [
            {
                name: 'Name',
                selector: (row: any) => row.name,
            },
            {
                name: 'User Name',
                selector: (row: any) => row.user_name,
            },
            {
                name: 'Email',
                selector: (row: any) => row.email,
            },
            {
                name: 'Role',
                selector: (row: any) => row.role,
            }
        ];
    }

    return (
        <>
            <DataTable
                title='All User'
                columns={columns}
                data={userInfo.allUser ? userInfo.allUser : []}
            />
            <Divider />
        </>
    );
}

export default Dashboard;
