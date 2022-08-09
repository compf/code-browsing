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
export  abstract class GitAPI{
     abstract getCommits():Promise<LinkedList<GitCommit>>;
     abstract getCommitsByPath(path:string):Promise<LinkedList<GitCommit>>;
     abstract getCurrCommit():Promise<LinkedListNode<GitCommit>>;
    async forward():Promise<boolean>{
        let nextCommit= (await this.getCurrCommit()).next;
        if(nextCommit!==null){
            this.goto(nextCommit.data.hash);
            return true;
        }
        return false;
    }
   async backward():Promise<boolean>{
    let prevCommit= (await this.getCurrCommit()).prev;
    if(prevCommit!==null){
        this.goto(prevCommit.data.hash);
        return true;
    }
    return false;
    }
    abstract goto(hash:string):Promise<void>;


    
}