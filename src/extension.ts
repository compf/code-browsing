// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { GitAPI } from "./git_api";
import { SimpleGitAPI } from "./simple-git-api";
let git:GitAPI|null=null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage(vscode.workspace.workspaceFolders![0]!.uri.fsPath);
    git=new SimpleGitAPI(vscode.workspace.workspaceFolders![0]!.uri.fsPath);
  let disposable = vscode.commands.registerCommand(
    "code-browsing.git-prev",
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      
      
      
      
      
      
      
      
      
      
      
      await git!.backward();
    }
   
  );
  context.subscriptions.push(disposable);
  disposable=vscode.commands.registerCommand("code-browsing.git-next",async ()=>{
    await git!.forward();
  });
}
