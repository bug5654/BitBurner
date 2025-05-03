/** @param {NS ns */
export async function main(ns) {
  if(ns.args[0] == "--help"){
    ns.tprint("takes 2 arguments, (1) the server to be renamed and (2) the new name of the server.  No spaces!")
  }else {
    var succeeded = ns.renamePurchasedServer(ns.args[0],ns.args[1]);
    if(succeeded) {
      ns.tprint("SUCCESS!  Script server ",ns.args[0]," is now ",ns.args[1]);
    } else {
      ns.tprint("\n!!!FAILED!!! Script server ",ns.args[0]," is still ",ns.args[0]);
    }
  }
}