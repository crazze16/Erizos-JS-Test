export interface IFile {
    mime: string;
    name: string;
    type: string;
}

export interface IFolder {
    children: (IFolder | IFile)[];
    name: string;
    type: string;
}