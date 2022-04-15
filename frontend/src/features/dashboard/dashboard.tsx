import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { fetchAllUser } from '../../common/redux/resources/userResources';

import { Button, Divider, ButtonGroup, ButtonToolbar } from 'rsuite';

function Dashboard() {

    const dispatch = useDispatch()
    const userInfo = useSelector((state: RootStateOrAny) => state.userInfo)
    // const {allUser}:any = userInfo

    useEffect(() => {
        dispatch(fetchAllUser())
    }, [])

    const columns = [
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
                <Button color="red" appearance="subtle">Delete</Button>
                <Button color="orange" appearance="subtle">Deactivate</Button>
            </ButtonToolbar>,
        },
    ];

    return (
        <>
            <DataTable
                title='All User'
                columns={columns}
                data={userInfo.allUser?userInfo.allUser:[]}
            />
            <Divider/>
        </>
    );
}

export default Dashboard;
