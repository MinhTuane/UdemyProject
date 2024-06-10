import { Dimmer, Loader } from "semantic-ui-react";

interface Props{
    inverted?: boolean;
    content?:string;
    style?:string
}

export default function LoadingComponent({inverted = true,content ='Loading ...'}:Props) {
    return (
        <Dimmer active={true} inverted ={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}