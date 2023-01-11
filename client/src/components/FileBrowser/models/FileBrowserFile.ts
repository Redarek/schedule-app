export class FileBrowserFile {
    name: string;
    type: 'file' | 'directory';

    constructor(name: string, type: "file" | "directory") {
        this.name = name;
        this.type = type;
    }
}
