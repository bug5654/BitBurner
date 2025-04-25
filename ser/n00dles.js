//Old style
var hackedserver = "n00dles";
/** @param {NS} ns */
export async function main(ns) {
  while(true) {
    await ns.weaken(hackedserver);
    await ns.grow(hackedserver);
    await ns.weaken(hackedserver);
    await ns.hack(hackedserver);
  }
}