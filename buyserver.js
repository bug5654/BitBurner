/** @param {NS} ns */
export async function main(ns) {
  //can easily convert any of these to args, but don't want to memorize huge command
  var hackserver = "foodnstuff";
  var ram = 8; // Minimum amount of RAM for purchased server
  var remoteScriptName = "hack.js"; //script to run
  const maxmoney = ns.getServerMoneyAvailable("home");
  var moneyallowed = 0;
    moneyallowed = maxmoney; //USE ALL THE MONEY!
  if(ns.args.length > 0) {
    moneyallowed = ns.args[0];
  }
    //uncomment below if you want to use less than ALL your money
    //moneyallowed=10*Math.pow(10,6); //helps with too many 0s, allows not spending ALL money
  
  //arguments and formatting
  var serverName = "";
  //if( ns.args.length == 0 ) {
    var servers = ns.getPurchasedServers();
    for(var i = 0; i<25; i++) {
      serverName = "home" + i;
      if( servers.includes(serverName) ){} else {  //not is not a keyword?!
        break;
      }
    }
    if ( servers.length == 25 ) {     //hacky, should check for getpurchasedservers().count == 24 or something 
      ns.tprint("already purchased all available servers");
      return;
    }
  //} else {
  //  serverName = ns.args[0];
  //} 

  ns.tprint("New Server Name: ",serverName);
  while(moneyallowed > ns.getPurchasedServerCost(ram)) {
    ram = ram * 2;
  }
  ram = ram/2; //breakout loop leaves 2x desired ram
  
  //everything set, make human readable with ns.formatX()
  var printableRam = ns.formatRam(ram);
  var price = ns.getPurchasedServerCost(ram);
  var printablePrice = ns.formatNumber(price,3,1000,true); //fixed 3 precision, default, when to  suffix, don't care about cents
  
  
  var threadcount = Math.floor( ram/ns.getScriptRam(remoteScriptName)); //ns ram expectations of remoteScriptName
  //math.floor to eliminate fractional problems

  //while (i < ns.getPurchasedServerLimit()) {
  let hostname = ns.purchaseServer(serverName, ram);
  if (hostname !== "") {
      ns.tprint("SUCCESS!\n  Bought server: ",hostname.toString()," ",printableRam,"\n  Price: ",printablePrice);
      
      ns.scp(remoteScriptName, hostname);
      
      //could break into multiple ns.tprint, but the repeated script.js: in output looks sloppy
      ns.tprint("Running remote script...\n  Script: ",remoteScriptName,"\n  Server: ",hostname,"\n  Threads: ",threadcount,
        "\n  Target: ", hackserver);
      ns.exec(remoteScriptName, hostname, threadcount, hackserver);
  } else {
    //looks better as one long tprint with \n 
    ns.tprint("\n!!!FAILED!!! Did not buy server: ",hostname.toString()," ",printableRam,"\n!!!FAILED!!! Price: $", 
      printablePrice);
  }
}
