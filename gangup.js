/** @param {NS} ns */
export async function main(ns) {
  var names = ns.gang.getMemberNames();
  var upgrades = ns.gang.getEquipmentNames();
  var output = "";
  ns.tprint("Names:\n",names);
  ns.tprint("\n\nUpgrades:\n",upgrades);
  for(var name of names) {
    for(var gear of upgrades) {
      output = output + "\nattempting to buy " + gear + " for " + name + "\n";
      output = output + ns.gang.purchaseEquipment(name, gear);
    }
    return 0; //debug to ensure not spending all money on augments
  }
  ns.tprint(output);
}