//Old Style

var hackedserver = "helios";
/** @param {NS} ns */
export async function main(ns) {
  while(true) {
    await ns.weaken(hackedserver);
  }
}