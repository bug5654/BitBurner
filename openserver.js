/** @param {NS} ns */
export async function main(ns) {
  if(ns.args.length == 0) {
    ns.tprint(" try `openserver.js help`");
    return 0;
  }
    var host = ns.args[0];
    var output = "";

    if(host.toLowerCase() == "--help" || host.toLowerCase() == "help") {
      output = output + "\n\n" + fixedPad("  Argument",10) + "   " + "Effect";
      output = output + "\n" + fixedPad(" ----------",10) + "  " + "-----------------";
      output = output + "\n" + fixedPad("server",10) + "   " + "(mandatory)Which server to hack";
      output = output + "\n" + fixedPad("<hackServer>",10) + "  " + "(optional)Server to target after takeover";
      ns.tprint(output);
      return 0;
    }

    var serverToHack = "foodnstuff";
    if(ns.args.length > 1 ) {
      serverToHack = ns.args[1]
    }
   
    if(ns.fileExists("BruteSSH.exe")) {
      await ns.brutessh(host);
      //output = output + "\n SSH:  Open"
    }
    if(ns.fileExists("FTPCrack.exe")) {
      await ns.ftpcrack(host);
      //output = output + "\n FTP:  Open"
    }
    if(ns.fileExists("RelaySMTP.exe")) {
      await ns.relaysmtp(host);
      //output = output + "\n SMTP: Open"
    }
    if(ns.fileExists("HTTPWorm.exe")) {    
      await ns.httpworm(host);
      //output = output + "\n HTTP: Open"
    }
    if(ns.fileExists("SQLInject.exe")) {
      await ns.sqlinject(host);
      //output = output + "\n SQL:  Open"
    }
    var nukesuccess;
    nukesuccess = await ns.nuke(host);
    if(nukesuccess) {
      ns.tprint("\nSuccess!  Server: ",host," hacked.",output );
      await ns.sleep(100);
      ns.exec("assertinstruction.js", "home", 1, host,serverToHack);
    } else {
      ns.tprint("\n!!!FAILED!!!   ",host," Not hacked.",output);
    }

}


function fixedPad(str,pad) {
  return str + padTo(str,pad);
}

function padTo(str,overallLength) {
  var padding = overallLength - str.length;
  var output = "";
  for(var i = 0; i <= padding ; i++) {
    output = output + " ";
  }
  return output;
}