import LinkedList from 'ts-linked-list';
import LinkedListNode from 'ts-linked-list/dist/LinkedListNode';
export class GitCommit{
    public  readonly hash:string;
    public  readonly date:Date;
    public readonly  message:string;
    public readonly changes:string[]
    public constructor(hash:string,date:Date,msg:string,changes:string[]){
        this.hash=hash;
        this.date=date;
        this.message=msg;
        this.changes=changes;
    }
}
export interface GitAPI{
     getCommits():Promise<LinkedList<GitCommit>>;
     getCommitsByPath(path:string):Promise<LinkedList<GitCommit>>;
     getCurrCommit():Promise<LinkedListNode<GitCommit>>;
    forward():Promise<boolean>;
    backward():Promise<boolean>;


    
}