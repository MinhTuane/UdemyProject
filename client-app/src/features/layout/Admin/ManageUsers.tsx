
import { Header, Item, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react/jsx-runtime';
import { useStore } from '../../../app/stores/store';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import UserItem from './UserItem';


export default observer(function ManageUsers() {
    const { adminStore } = useStore();
    const { loadUsers,loadingInitial,users ,groupUsers} = adminStore;

    useEffect(()=> {
        if(users.size <1) loadUsers();
    },[adminStore,users]);

    if(loadingInitial) return <LoadingComponent/>

    return (
        <>
            {groupUsers.map(([group,users]) => (
                <Fragment key={group}>
                <Header sub color='teal'>
                    {group}
                </Header>
                {users.map(user => (
                    <UserItem user={user}/>
                ))}
            </Fragment>
            ))}
        </>

    )
})