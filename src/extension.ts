// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function toggle(target: vscode.ConfigurationTarget) {
	const config = vscode.workspace.getConfiguration();
	const currentSetting = config.get<string>("editor.inlayHints.enabled");

	let newSetting = currentSetting;
	switch (currentSetting) {
		case 'on': newSetting = 'off'; break;
		case 'off': newSetting = 'on'; break;
		case 'offUnlessPressed': newSetting = 'onUnlessPressed'; break;
		case 'onUnlessPressed': newSetting = 'offUnlessPressed'; break;
	}

	config.update("editor.inlayHints.enabled", newSetting, target);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Register a command that cycles through the cursor styles
	let disposable = vscode.commands.registerCommand('inlay-toggle.toggleInlayGlobal', () => {
		toggle(vscode.ConfigurationTarget.Global);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
