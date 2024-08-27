import { Tab } from "semantic-ui-react"
import ProfilePhotos from "./ProfilePhotos";
import SalarySummary from "./Salary";
import { Profile } from "../../../app/models/profile";
import ProfileDetail from "./ProfileDetail";
interface Props {
    profile : Profile
}
export default function ProfileContent({profile} : Props) {

    const panes = [
        {menuItem : { key: 'users', icon: 'users', content: 'Profile' }, render: () => <ProfileDetail/>},
        {menuItem : { key: 'photos', icon: 'photo', content: 'Photos' }, render:() =><ProfilePhotos profile = {profile}/>},
        {menuItem : 'Salary', render:() => <SalarySummary/>}
    ];

    return (
        <Tab
            menu={{fluit : true, vertical:true}}
            menuPosition="right"
            panes={panes}
        />
    )
}