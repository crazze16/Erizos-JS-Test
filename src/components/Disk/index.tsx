import React, {Component} from 'react';
import mockData from '../../data/mockData.json'
import {Folder} from "../Folder";
import {IFile, IFolder} from "../../interfaces/disk.interface";

interface IData extends IFolder {

}

interface IDiskState {
    data: IData[]
    searchQuery: string;
}

interface IDiskProps {
    expanded: string[]
}

export class Disk extends Component<IDiskProps, IDiskState> {
    state = { data: [], searchQuery: '' };

    componentDidMount() {
        this.setState({data: mockData})
    }

    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchQuery: e.target.value });
    };

    filterData = (data: IData[], searchQuery: string): IData[] => {
        return data.map(folder => ({
            ...folder,
            children: this.filterFolder(folder, searchQuery)
        })).filter(folder => folder.children.length > 0);
    };

    filterFolder = (folder: IFolder, searchQuery: string): (IFolder | IFile)[] => {
        return folder.children.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.type === 'FOLDER' && this.filterFolder(item as IFolder, searchQuery).length > 0)
        );
    };

    render() {
        const { searchQuery, data } = this.state;
        const { expanded } = this.props;
        const filteredData = this.filterData(data, searchQuery);

        return (
            <>
                <input
                    type="text"
                    placeholder="Search files"
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                />
                <ul>
                    {filteredData.map((folderData) => <Folder expanded={expanded} key={folderData.name} searchQuery={searchQuery} folderData={folderData} />)}
                </ul>
            </>
        );
    }
}