// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require("path");
import * as vscode from "vscode";
import { GitAPI, GitCommit } from "./git_api";
import { SimpleGitAPI } from "./simple-git-api";
function registerCommand(name:string,context: vscode.ExtensionContext,action:()=>void){
  let disposable=vscode.commands.registerCommand(name,action);
  context.subscriptions.push(disposable);
}
function getClosestCommit(commits:Iterable<GitCommit>,compareCommit:GitCommit,latest:boolean):GitCommit{
  let minDiff=compareCommit.date.getTime(),min=null;
  const factor=latest?-1:+1;
  for(let c of commits){
      let diff=compareCommit.date.getTime()-c.date.getTime();
      if(diff*factor>0 && Math.abs(diff)<minDiff){
        minDiff=Math.abs(diff);
        min=c;
      }
  }
  return min??compareCommit;
}
let git:GitAPI|null=null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  
    git=new SimpleGitAPI(vscode.workspace.workspaceFolders![0]!.uri.fsPath);
    vscode.window.showErrorMessage("Hello");
    await git.getCommits();
    vscode.window.showErrorMessage("Finish");
 registerCommand(
    "code-browsing.git-prev",context,
    async () => {
      await git!.backward();
    }   
  );
  registerCommand("code-browsing.git-next",context,async ()=>{
    await git!.forward();
  });
  registerCommand("code-browsing.git-next-this-file",context,async ()=>{
    if(vscode.window.activeTextEditor!==undefined){
      const relativePath=path.relative(vscode.workspace.workspaceFolders![0]!.uri.fsPath,vscode.window.activeTextEditor?.document.fileName);
      let commits=await git!.getCommitsByPath(relativePath);
      let currCommit=await git!.getCurrCommit();
      
      let nextCommit=getClosestCommit(commits,currCommit.data,true);
      await git!.goto(nextCommit.hash);
    }
  });
  registerCommand("code-browsing.git-prev-this-file",context,async ()=>{
    if(vscode.window.activeTextEditor!==undefined){
      const relativePath=path.relative(vscode.workspace.workspaceFolders![0]!.uri.fsPath,vscode.window.activeTextEditor?.document.fileName);
      let commits=await git!.getCommitsByPath(relativePath);
      let currCommit=await git!.getCurrCommit();
      let nextCommit=getClosestCommit(commits,currCommit.data,false);
      await git!.goto(nextCommit.hash);
    }
  });
}
