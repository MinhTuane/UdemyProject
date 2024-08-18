"use client"
import {Day,Inject, ScheduleComponent, ViewDirective} from "@syncfusion/ej2-react-schedule";
export default function Schedule() {
    const data =[
        {
            Id:1,
            Subject:"Sales Presentation",
            StartTime : new Date(2025,1,11,10,0),
            EndTime : new Date(2025,1,11,12,30),
            IsAllDay : false,
        }
    ]
    return(
        <ScheduleComponent eventSettings={{
            dataSource : data
        }}>
            <ViewDirective>
                <ViewDirective option="Day"/>
            </ViewDirective>

            <Inject services={[Day]}/>
        </ScheduleComponent>
    )
}