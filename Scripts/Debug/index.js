/// <reference path="./definitions/index.d.ts" />

"notrust"; // tells latite api to not trust this script so it won't be abused
let cmd = new Command("execute", "Execute JavaScript code.", "$ [...]", ["exec"]);

client.getCommandManager().registerCommand(cmd);

let colors = {
    "undefined": TextColor.GRAY,
    "null": TextColor.DARK_BLUE,
    "number": TextColor.MINECOIN_GOLD,
    "object": TextColor.WHITE,
    "string": TextColor.DARK_GREEN,

    // this will never happen but its just there because why not
    "bigint": TextColor.MINECOIN_GOLD,

    "function": TextColor.BLUE,
    "boolean": TextColor.MINECOIN_GOLD
}

function stringify(val) {
	if (typeof val === "string") {
		return JSON.stringify(val);
	}
	
	return val + '';
}

cmd.on("execute", (label, args, commandLine) => {
    if (args.length === 0) return false;

    let code = commandLine.trim().substring(client.getCommandManager().getPrefix().length + label.length).trimStart();
    script.log(TextColor.GRAY + "> " + code)
    try {
        let ret = eval(code);
        script.log(`${colors[typeof ret]}${stringify(ret)}`)
    } catch (e) {
        script.log(`${TextColor.RED}` + e);
    }
    return true;
})

client.on("unload-script", scr => {
    if (scr.scriptName == script.name) {
        client.getCommandManager().deregisterCommand(cmd);
    }
});