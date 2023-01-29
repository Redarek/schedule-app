export enum ObjectType {
    DIRECTORY = 'directory',
    FILE = 'file'
}

export enum FileBrowserVoids {
    CREATE_DIRECTORY = 'create-directory',
    CREATE_FILE = 'create-file',
    UPLOAD_FILE = 'upload-file',
    DELETE = 'delete',
    RENAME = 'rename'
}

export interface IObject {
    id: string,
    type: ObjectType
    name: string;
    uri: string;
    content: IObject[]
}


export class FileBrowser {
    protected currentDirectoryAddress: string[];
    protected content: IObject[]
    private error: string;

    constructor(objects: IObject[], newAddress?: string) {
        this.error = '';
        this.currentDirectoryAddress = ['Files'];
        if (newAddress) this.currentDirectoryAddress = newAddress.split(',')
        this.content = objects;
    }

    public getCurrentDirectoryAddress() {
        return this.currentDirectoryAddress
    }

    public setDirectoryAddress(str: string) {
        let index = this.currentDirectoryAddress.findIndex(obj => obj === str) + 1
        this.currentDirectoryAddress = this.currentDirectoryAddress.slice(0, index)
    }

    public getContent() {
        return this.content
    }

    private deleteContent(object: IObject) {
        // console.log(name)
        // console.log(this.content.filter((obj) => obj.name !== object.name))
        this.content = this.content.filter((obj) => obj.name !== object.name)
    }

    private createDirectory(name: string) {
        if (-1 === this.content.findIndex(obj => obj.name === name)) {
            if (name.includes('.')) {
                this.error = 'Имя папки не может содержать `.`'
            } else {
                this.content.push({
                    id: `${new Date().getTime()}`,
                    type: ObjectType.DIRECTORY,
                    name: name,
                    uri: '',
                    content: []
                })
            }
        } else {
            this.error = 'Папка с таким именем уже существует'
        }
    }

    private createFile(name: string) {
        if (!name.includes('.')) {
            this.error = 'Имя файла должно содержать `.`'
        } else if (-1 === this.content.findIndex(obj => obj.name === name)) {
            this.content.push({
                id: `${new Date().getTime()}`,
                type: ObjectType.FILE,
                name: name,
                uri: '',
                content: [],
            })
        } else {
            this.error = 'Файл с таким именем уже существует'
        }
    }

    private renameContent(object: IObject, name: string) {
        this.content[this.content.findIndex(obj => obj.name === object.name)].name = name
    }

    public clickOption(type: FileBrowserVoids, name: string, object?: IObject) {
        this.error = ''
        switch (type) {
            case FileBrowserVoids.CREATE_DIRECTORY:
                this.createDirectory(name)
                this.error.length > 0 ? console.log(this.error) : this.error = ''
                break;
            case FileBrowserVoids.CREATE_FILE:
                this.createFile(name)
                this.error.length > 0 ? console.log(this.error) : this.error = ''
                break;
            case FileBrowserVoids.DELETE:
                if (object) this.deleteContent(object)
                break;
            case FileBrowserVoids.RENAME:
                if (object) this.renameContent(object, name)
                break;
        }
    }
}
