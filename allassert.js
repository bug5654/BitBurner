var hackedServer = "max-hardware";
var script = "hack.js";

/** @param {NS} ns */
export async function main(ns) {
  var debug;
  for (var host of ns.getPurchasedServers()) {
    ns.tprint("asserting on ",host);
    debug = await ns.exec("assertinstruction.js","home",1,host,hackedServer,script); //await allows 1 execution at a time, not limited by RAM
    ns.tprint(debug);
  }
}