//Old Style
/** @param {NS} ns */
export async function main(ns) {
  while(true) {
    await ns.hack("foodnstuff");
    await ns.weaken("foodnstuff");
    await ns.grow("foodnstuff");
    await ns.weaken("foodnstuff");
  }
}