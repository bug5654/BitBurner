
/** @param {NS} ns */
export async function main(ns) {
  var hackedserver = ns.args[0];
  while(true) {
    await ns.weaken(hackedserver);
    await ns.hack(hackedserver);
  }
}