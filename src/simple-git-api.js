"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleGitAPI = void 0;
const ts_linked_list_1 = require("ts-linked-list");
const git_api_1 = require("./git_api");
const simple_git_1 = require("simple-git");
class SimpleGitAPI {
    constructor(path) {
        this.commitsCache = null;
        this.currCommitCache = null;
        this.git = (0, simple_git_1.default)(path);
    }
    async getCommits() {
        if (this.commitsCache !== null) {
            return this.commitsCache;
        }
        let log = await this.git.log();
        let list = new ts_linked_list_1.default();
        for (let l of log.all) {
            let commit = new git_api_1.GitCommit(l.hash, new Date(Date.parse(l.date)), l.message);
            if (list.head === null) {
                list.append(commit);
            }
            else {
                list.insertBefore(list.head, commit);
            }
        }
        this.commitsCache = list;
        return list;
    }
    async getCurrCommit() {
        let head = await this.git.revparse("HEAD");
        if (this.currCommitCache !== null &&
            this.currCommitCache.value.hash === head) {
            return this.currCommitCache;
        }
        let currCommit = this.commitsCache.findNode((c) => c.hash == head);
        return currCommit;
    }
    async forward() {
        let currCommit = await this.getCurrCommit().then((c) => c.next);
        if (currCommit !== null) {
            this.git.checkout(currCommit.data.hash);
            this.currCommitCache = currCommit;
        }
    }
    async backward() {
        let currCommit = await this.getCurrCommit().then((c) => c.prev);
        if (currCommit !== null) {
            this.git.checkout(currCommit.data.hash);
            this.currCommitCache = currCommit;
        }
    }
}
exports.SimpleGitAPI = SimpleGitAPI;
//# sourceMappingURL=simple-git-api.js.map