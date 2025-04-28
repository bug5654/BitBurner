

/** @param {NS} ns */
export async function main(ns) {
  if(ns.args.length>0) {
    ns.tprint("runs hack.js on all initially available servers that don't need ports opened.")
    return 0;
  }

    var initservers = ["foodnstuff","joesguns","n00dles","hong-fang-tea","sigma-cosmetics","harakiri-sushi"]; //undefended servers

    for(var server of initservers){
      await ns.exec("openserver.js","home",1,server);
    }
}