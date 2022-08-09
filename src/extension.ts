// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { GitAPI } from "./git_api";
import { SimpleGitAPI } from "./simple-git-api";
function registerCommand(name:string,context: vscode.ExtensionContext,action:()=>void){
  let disposable=vscode.commands.registerCommand(name,action);
  context.subscriptions.push(disposable);
}
let git:GitAPI|null=null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    git=new SimpleGitAPI(vscode.workspace.workspaceFolders![0]!.uri.fsPath);
 registerCommand(
    "code-browsing.git-prev",context,
    async () => {
      await git!.backward();
    }   
  );
  registerCommand("code-browsing.git-next",context,async ()=>{
    await git!.forward();
  });
}
