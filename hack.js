
/** @param {NS} ns */
export async function main(ns) {
  var hackedserver = ns.args[0];
  while(true) {
    await ns.hack(hackedserver);
    await ns.weaken(hackedserver);
    await ns.grow(hackedserver);
    await ns.weaken(hackedserver);
  }
}