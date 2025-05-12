/** @param {NS} ns */
export async function main(ns) {
  var names = ns.gang.getMemberNames();
  var upgrades = ns.gang.getEquipmentNames();
  var output = "";
  ns.tprint("Names:\n",names);
  ns.tprint("\n\nUpgrades:\n",upgrades);
  var augments = ["Bionic","Brachi","Nanofiber Weave","Synthetic Heart", "Synfibril","BitWire",
    "Neuralstimulator","DataJack", "Graphene Bone Lacings"];  //purchased separately
  var buyAugments = false;
  if(ns.args.length > 0) {
    if(ns.args[0] == "augment"){
      buyAugments = true;
      if(ns.args.length >1) {
        names = ns.args;
      }
    }
    else{
      names = ns.args;
    }
  }

  for(var name of names) {
    for(var gear of upgrades) {
      if((name != "augment") && (!(containedWithin(gear,augments))) || (buyAugments) ) {
        output = output + "\nattempting to buy " + gear + " for " + name + "\n";
        output = output + ns.gang.purchaseEquipment(name, gear);
      }
      if(containedWithin(gear,augments)) {
         output = output + "\nrejected '" + gear + "' labeled as augment"
      }
    }
    ns.tprint(output);  //debug
    output = "";  //debug
    return 0; //debug to ensure not spending all money on augments
  }
  ns.tprint(output);
  
}

function containedWithin(src, partialMatches) {
  for(var infix of partialMatches) {
    if (src.includes(infix)) {  //partialMatches fuzzy matching src
      return true;
    }
  }
  return false;
}