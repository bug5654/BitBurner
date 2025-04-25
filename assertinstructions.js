/** @param {NS} ns */
export async function main(ns) {
  var server = ns.args[0];

  var remoteScriptName = "hack.js";
  var targetServer = "foodnstuff";

  if(ns.args.length > 1) {
    targetServer = ns.args[1];
  }

   if(ns.args.length > 2) {
    remoteScriptName = ns.args[2];
    if(!remoteScriptName.endsWith(".js")) {
      remoteScriptName = remoteScriptName + ".js"
    }
  }

  if(server == "help" || server == "--help") {
    ns.tprint( 
      "\nUsage: run assertinstructions.js host <target> <script>"
      +"\n\thost\t\tMandatory.  The server with root access to run the scripts on"
      +"\n\t<target>\tOptional.  The argument provided to the script.  Required to be specified to specify a script."
      +"\n\t<script>\tOptional.  Requires <target> to be specified.  The script to be run with maximum threads on host.  Default: " + remoteScriptName
      );
    return 0;
  }

  //default to home servers
  var ram = 0;
  var threadcount = 0;
  var host = null;
  var output = "";
  var success = null;
  if (server == null) {
    for (host of ns.getPurchasedServers()) {
      output = output + "\n  " + host;
      success = ns.scp(remoteScriptName,host);
       output = output + "\n   " + remoteScriptName + " copied." + success;
      success = ns.killall(host);
       output = output + "\n   " + "scripts killed." + success;
      ram = ns.getServerMaxRam(host);
      threadcount = Math.floor( ram/ns.getScriptRam(remoteScriptName)); //ns ram expectations of remoteScriptName
      success = ns.exec(remoteScriptName,host,threadcount,targetServer);
      if(success == 0) {
        //fail to launch
        output = output + "\n!!!FAILED!!!  could not launch " + threadcount + " threads of " + remoteScriptName;
      } else {
        //returned the PID of the 
        output = output + "\n   " + threadcount + " threads of " + remoteScriptName +  " running.  PID:" + success;
      }
      //ns.tprint(output);
    }
  } else {
    host = server;
    output = output + "\n Server: " + host;
    if(host == "home") {
      output = output + "\n   " + "Not attempting to copy - home is source server."
      output = output + "\n   " + "Not attempting to kill - stops this script too."
    }else {
      success = ns.scp(remoteScriptName,host);
      if(success) {
        output = output + "\n   " + remoteScriptName + " copied.";
      } else {
        output = output + "\n!!!FAILED!!!  " + remoteScriptName + " Failed to copy.";
      }
      success = ns.killall(host);
      if(success) {
        output = output + "\n   " + "All processes killed.";
      } else {
        output = output + "\n!!!FAILED!!!  Processes not killed, may not have been any to kill.";
      }
    }
    ram = ns.getServerMaxRam(host) - ns.getServerUsedRam(host); //home requires getServerUsedRam for this script to not get killed
    threadcount = Math.floor( ram/ns.getScriptRam(remoteScriptName)); //ns ram expectations of remoteScriptName
    if(threadcount == 0) {
      output = output + "\n   " + "No processes launched, no RAM on server."
    } else {
      success = ns.exec(remoteScriptName,host,threadcount,targetServer);
      if(success == 0) {
        //fail to launch
        output = output + "\n!!!FAILED!!!  could not launch " + threadcount + " threads of " + remoteScriptName;
      } else {
        //returned the PID of the 
        output = output + "\n   " + threadcount + " threads of " + remoteScriptName +  " running.  PID:" + success;
      }
    }
  }
  ns.tprint(output);
}