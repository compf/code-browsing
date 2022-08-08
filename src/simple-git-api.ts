import LinkedList from "ts-linked-list";

import { GitAPI, GitCommit } from "./git_api";
import simpleGit, { SimpleGit } from "simple-git";
import LinkedListNode from "ts-linked-list/dist/LinkedListNode";
export class SimpleGitAPI implements GitAPI {
  private commitsCache: LinkedList<GitCommit> | null = null;
  private currCommitCache: LinkedListNode<GitCommit> | null = null;
  private git: SimpleGit;
  constructor(path: string) {
    this.git = simpleGit(path);
  }
  async getCommits(): Promise<LinkedList<GitCommit>> {
    if (this.commitsCache !== null) {
      return this.commitsCache;
    }
    let log = await this.git.log();
    let list = new LinkedList<GitCommit>();
    for (let l of log.all) {
      let commit = new GitCommit(
        l.hash,
        new Date(Date.parse(l.date)),
        l.message
      );
      if (list.head === null) {
        list.append(commit);
      } else {
        list.insertBefore(list.head, commit);
      }
    }
    this.commitsCache = list;
    return list;
  }
  async getCurrCommit(): Promise<LinkedListNode<GitCommit>> {
    if (this.commitsCache === null) {
      await this.getCommits();
    }
    let head = await this.git.revparse("HEAD");
    if (
      this.currCommitCache !== null &&
      this.currCommitCache.value.hash === head
    ) {
      return this.currCommitCache;
    }
    //console.log(this.commitsCache);
    let currCommit = this.commitsCache!.findNode((c) => c.hash == head)!;
    return currCommit;
  }
  async forward(): Promise<boolean> {
    let currCommit = await this.getCurrCommit().then((c) => c.next);

    if (currCommit !== null) {
      this.git.checkout(currCommit.data.hash);
      this.currCommitCache = currCommit;
      return true;
    }
    return false;
  }
  async backward(): Promise<boolean> {
    let currCommit = await this.getCurrCommit().then((c) => c.prev);

    if (currCommit !== null) {
      this.git.checkout(currCommit.data.hash);
      this.currCommitCache = currCommit;
      return true;
    }
    return false;
  }
}
