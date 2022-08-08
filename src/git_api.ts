import LinkedList from 'ts-linked-list';
import LinkedListNode from 'ts-linked-list/dist/LinkedListNode';
export class GitCommit{
    public hash:string;
    public date:Date;
    public message:string;
    public constructor(hash:string,date:Date,msg:string){
        this.hash=hash;
        this.date=date;
        this.message=msg;
    }
}
export interface GitAPI{
     getCommits():Promise<LinkedList<GitCommit>>;
     getCurrCommit():Promise<LinkedListNode<GitCommit>>;
    forward():Promise<boolean>;
    backward():Promise<boolean>


    
}