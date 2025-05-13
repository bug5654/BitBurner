/** @param {NS} ns */
export async function main(ns) {
  var remoteScriptName = "assertinstruction.js";
  //var targetServer = "foodnstuff"; //defined in assertinstructions

  if(ns.args.length > 0) {
    remoteScriptName = ns.args[0];
    if(!( remoteScriptName.includes(".js"))) {
      remoteScriptName = remoteScriptName + ".js"
    }
  }

  var servers = getAllServers(ns); //recursively build server list
  ns.tprint("Serverlist: " + servers);  //DEBUG ONLY, COMMENT OUT IN PROD
  for(var server of servers) {
    if( !(server.includes("home")) && 
      desired(ns.hasRootAccess(server)) ) {/////////////////////
      ns.tprint("Running " + remoteScriptName + " " + server);
      await ns.exec(remoteScriptName,"home",1,server);
    }
  }
}

function getAllServers(ns) {
    const knownServers = new Set();
    const newServers = new Set();
    newServers.add("home");

    while (newServers.size > 0) {
        const server = newServers.values().next().value;
        newServers.delete(server);
        const neighbors = ns.scan(server);
        for (const neighbor of neighbors) {
            if (!knownServers.has(neighbor)) {
                knownServers.add(neighbor);
                newServers.add(neighbor);
            }
        }
    }
    return [...knownServers];
    //ns.tprint([...knownServers]);
}

function desired(rootAccess) {
  //flip if want to run on servers WITH or WITHOUT rootaccess
  return !rootAccess
  //rootAccess = run on owned servers !rootAccess = run on unowned servers
}


/*function getAllServers(_ns) {
  var seenList = []; //init blank list
  ScanServer("home", _ns, seenList); //recursively build server list tree from home
  return seenList;
}

function ScanServer(serverName, _ns , seenList) {
  //already in list?  Don't add
  _ns.tprint("Server: "+ serverName);
  _ns.tprint("seenList: " + seenList);
	if (seenList.includes(serverName)) { return; }
  //else
  
  //in list?  add and check for children
  var connectedservers = _ns.scan(serverName);
	seenList.push(serverName);

  //check each child server
  for(var node of connectedservers) {
    ScanServer(node);
  }
}*/