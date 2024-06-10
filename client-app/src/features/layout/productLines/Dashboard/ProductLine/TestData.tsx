
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react/jsx-runtime';


export default observer(function TestData() {
    const { productStore } = useStore();
    const { ProductionByHourToday } = productStore;

    return (
        <>
            {ProductionByHourToday.map(([hour, quantity]) => (
                <Fragment >
                    <Header sub color='teal'>
                        {hour}
                    </Header>
                    <Header sub color='teal'>
                        {quantity}
                    </Header>
                </Fragment>
            ))}
        </>

    )
})