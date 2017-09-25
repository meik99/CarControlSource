/**
 * Created by michael on 9/25/17.
 */
export class File {
    public name: String;
    public path: String;
    public type: FileType;
    public extname: String;
    public stats: any;

    constructor() {}

}

export enum FileType {
    File, Folder, None
}
