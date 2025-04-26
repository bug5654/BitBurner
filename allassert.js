//shouldn't work?  added to buyserver so not as much and issue

/** @param {NS} ns */
export async function main(ns) {
  for (var host of ns.getPurchasedServers()) {
    await ns.exec("assertinstructions.js","home",1,host);
  }
}