/** @param {NS} ns **/
export async function main(ns) {
	const args = ns.flags([["help", false]]);
	if (args.help) {
		ns.tprint("Copies and deploys 'hack.js' and 'share-ram.js' to destination server,");
		ns.tprint("Runs them according to a RAM multiple (default 1*share-ram+6*hack/16GB).");
		return;
	}
  
	const dest = args._[0];
	
	if (!ns.serverExists(dest)) {
		ns.tprint(`Server '${dest}' does not exist. Aborting.`);
		return;
	}

	/* const threads = Math.floor((ns.getServerMaxRam(dest) - ns.getServerUsedRam(dest)) / ns.getScriptRam(script)); */
	/*const threads = Math.floor(ns.getServerMaxRam(dest)/16);*/
  const hackthreads = Math.floor(ns.getServerMaxRam(dest)/16)*8; //mathematically equivalent to * 2 but backwards compatibility
	
	ns.tprint(`copying scripts to ${dest}`);
	await ns.scp('share-ram.js', dest, ns.getHostname());
	await ns.scp('hack.js', dest,  ns.getHostname());
 	await ns.scp('grow.js', dest,  ns.getHostname()); 
  await ns.scp('hackonly.js', dest,  ns.getHostname());
	/*ns.tprint(`Launching script 'share-ram.js' on server '${dest}' with ${threads} threads`);
	ns.exec("share-ram.js", dest, threads, dest);*/
	ns.tprint(`Launching script 'grow.js' on server '${dest}' with ${hackthreads} threads`);
	ns.exec("grow.js", dest, hackthreads, dest);
}