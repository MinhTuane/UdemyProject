import React, { useEffect, useState } from 'react';
import { Container, Header, Statistic, Loader, Segment, Item } from 'semantic-ui-react';

export default function SalarySummary() {
    const [data, setData] = useState({ worked: 0, late: 0, off: 0 });
    const [salaryDetails, setSalaryDetails] = useState({
        baseSalary: 0,
        latePenalty: 0,
        reward: 0,
        totalSalary: 0,
    });
    return (
        <>
            <Container textAlign='center' className='salary-summary-container'>
                <Header as='h2' textAlign='center' className='salary-summary-header'>
                    Salary Summary
                </Header>

                <Statistic.Group widths='three' className='salary-summary-statistics'>
                    <Statistic className='salary-statistic'>
                        <Statistic.Value>{data.worked}</Statistic.Value>
                        <Statistic.Label>Days Worked</Statistic.Label>
                    </Statistic>

                    <Statistic className='salary-statistic'>
                        <Statistic.Value>{data.late}</Statistic.Value>
                        <Statistic.Label>Days Late</Statistic.Label>
                    </Statistic>

                    <Statistic className='salary-statistic'>
                        <Statistic.Value>{data.off}</Statistic.Value>
                        <Statistic.Label>Days Off</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Container>

            <Segment.Group>
                <Segment>
                    <Item>
                        <Item.Content>
                            <Header as='h4'>Salary : </Header>
                            <Item.Extra>300.000 per day</Item.Extra>
                            <Header as='h4'>Penalty : </Header>
                            <Item.Extra>50.000 each</Item.Extra>
                            <Header as='h4'>Reward : </Header>
                            <Item.Extra></Item.Extra>
                        </Item.Content>
                        <Item.Header>
                            <Header as='h4'>Total Salary : </Header>
                        </Item.Header>
                    </Item>
                </Segment>
            </Segment.Group>
        </>
    );
};

