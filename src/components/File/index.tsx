import {PureComponent} from "react";

interface IFileProps {
    name: string
}

export class File extends PureComponent<IFileProps> {

    render() {
        return (
            <li>{this.props.name}</li>
        );
    }
}