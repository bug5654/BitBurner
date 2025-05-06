/** @param {NS} ns */
export async function main(ns) {
  var names = ns.gang.getMemberNames();
  var upgrades = ns.gang.getEquipmentNames();
  var output = "";
  for(var name in names) {
    for(var gear in upgrades) {
      output = output + "\nattempting to buy " + gear + " for " + name + "\n";
      output = output + ns.gang.purchaseEquipment(name, gear);
    }
  }
  ns.tprint(output);
}