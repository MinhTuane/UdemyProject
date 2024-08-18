import { Label, MenuItem, Segment, SegmentGroup, Tab, TabPane } from "semantic-ui-react";
import DetailUSer from "./DetailUser";
import Schedule from "./Salary";

export default function Profile() {

    const panes = [
        {
          menuItem: { key: 'users', icon: 'users', content: 'Users' },
          render: () => <TabPane>
                            <DetailUSer/>
                        </TabPane>,
        },
        {
          menuItem: { key: 'users', icon: 'schedule', content: 'Schedule' },
          render: () => <TabPane>
                            <Schedule/>
                        </TabPane>,
        },       
      ]
    return (
        <Tab panes={panes}>
        </Tab>
    )
}
