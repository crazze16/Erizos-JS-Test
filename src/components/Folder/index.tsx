import {Component, Fragment} from "react";
import {File} from "../File";
import {IFile, IFolder} from "../../interfaces/disk.interface";

interface IFolderProps {
    folderData: IFolder;
    searchQuery: string;
    expanded: string[];
}

interface IFolderState {
    isOpened: boolean;
}

export class Folder extends Component<IFolderProps, IFolderState> {
    state = { isOpened: false };

    componentDidMount() {
        const { folderData, expanded } = this.props;

        const slicedPaths = expanded.map((path) => path.slice(0, path.indexOf('/', 1)))

        if (slicedPaths.some(path => `/${folderData.name}`.startsWith(path))) {
            this.setState({ isOpened: true });
        }
    }

    handleOpen = () => {
        this.setState(prevState => ({ isOpened: !prevState.isOpened }));
    };

    filterFolderItems = (items: (IFolder | IFile)[], searchQuery: string): (IFolder | IFile)[] => {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.type === 'FOLDER')
        );
    };

    render() {
        const { folderData, searchQuery, expanded } = this.props;
        const { isOpened } = this.state;
        const filteredChildren = this.filterFolderItems(folderData.children, searchQuery);
        const shouldOpen = isOpened
        return (
            <li className='folderWrapper'>
                <h3 className={`folder${shouldOpen ? '-opened' : ''}`} onClick={this.handleOpen}>{folderData.name}</h3>
                {shouldOpen && (
                    <ul>
                        {filteredChildren.map((item, index) => (
                            <Fragment key={item.name}>
                                {item.type === 'FOLDER' ? (
                                    <Folder
                                        folderData={item as IFolder}
                                        searchQuery={searchQuery}
                                        expanded={this.props.expanded.map((path) => path.slice(path.indexOf('/', 1), -1)).filter((path) => path)}
                                    />
                                ) : (
                                    <File name={item.name} />
                                )}
                            </Fragment>
                        ))}
                    </ul>
                )}
            </li>
        );
    }
}