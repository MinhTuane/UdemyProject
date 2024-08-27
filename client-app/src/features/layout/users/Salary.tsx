
import React, { useEffect, useState } from 'react';
import { Container, Header, Statistic, Segment, Item } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { AttendenceData } from '../../../app/models/attendenceData';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/loadingComponent';

export default observer (function SalarySummary() {

    const {attendenceCheckStore,userStore : {getUser,user}} = useStore();
    const {getData,loading,iniData} = attendenceCheckStore;

    const [data, setData] = useState<AttendenceData>({ worked: 0, late: 0, off: 0 });

    useEffect(()=> {
        if(!user) getUser();
    },[user,getUser]);

    useEffect(()=> {
        if(!iniData && user)  getData(user.id);
        if(iniData) setData(iniData)
        console.log(iniData);
        
    },[iniData,getData]);

    const [salaryDetails, setSalaryDetails] = useState({
        baseSalary: 300000,
        latePenalty: 50000,
        reward: data.worked > 24 ? 1500000 : 0,
    });

    if(loading) return <LoadingComponent content='loading'/>
    return (
        <>
            <Container  textAlign='center' className='salary-summary-container'>
                <Header style= {{color:'white'}} as='h2' textAlign='center' className='salary-summary-header'>
                    Salary Summary
                </Header>

                <Statistic.Group  widths='three' className='salary-summary-statistics'>
                    <Statistic className='salary-statistic' >
                        <Statistic.Value style= {{color:'white'}}>{data.worked}</Statistic.Value>
                        <Statistic.Label style= {{color:'white'}}>Days Worked</Statistic.Label>
                    </Statistic>

                    <Statistic className='salary-statistic'>
                        <Statistic.Value style= {{color:'white'}}>{data.late}</Statistic.Value>
                        <Statistic.Label style= {{color:'white'}}>Days Late</Statistic.Label>
                    </Statistic>

                    <Statistic className='salary-statistic'>
                        <Statistic.Value style= {{color:'white'}}>{data.off}</Statistic.Value>
                        <Statistic.Label style= {{color:'white'}}>Days Off</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Container>

            <Segment.Group>
                <Segment>
                    <Item>
                        <Item.Content>
                            <Header as='h4'>Salary : {salaryDetails.baseSalary * data.worked} Vnd</Header>
                            <Item.Extra>300.000 per day</Item.Extra>
                            <Header as='h4'>Penalty : {salaryDetails.latePenalty * (data.late + data.off*2)} Vnd</Header>
                            <Item.Extra>50.000 each</Item.Extra>
                            <Header as='h4'>Reward : {salaryDetails.reward } Vnd</Header>
                            <Item.Extra></Item.Extra>
                        </Item.Content>
                        <Item.Header>
                            <Header 
                            as='h4'>Total Salary :  {salaryDetails.baseSalary * data.worked - 
                            salaryDetails.latePenalty * (data.late + data.off*2) + salaryDetails.reward 
                            } Vnd</Header>
                        </Item.Header>
                    </Item>
                </Segment>
            </Segment.Group>
        </>
    );
});

