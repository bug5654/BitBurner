/** @param {NS} ns */
export async function main(ns) {
  //coded to rely on order of gang members to stay the same and use their job to advance.
  var names = ns.gang.getMemberNames();
  var respectFloor = 10*Math.pow(10,6);
  var chosenWork = "Human Trafficking";
  var ascend = true;
  
  if(ns.args.length > 0) {
    names = ns.args;
  }

  var output = "";
  var ascresults = "";
  var results;
  var ascended = false;
  //var meminfo;

  //read & analysis loop
  for (var member of names) {
    if(member == "banned" ) {
      output = output + "\nskipping loop for banned\n";
      continue;
    }
    //meminfo = ns.gang.getMemberInformation(member);
    results = ns.gang.getAscensionResult(member);
    ascresults = ""
    ascresults = ascresults + "H" + ns.formatNumber(results.hack,2);
    ascresults = ascresults + " S" + ns.formatNumber(results.str,2);
    ascresults = ascresults + " D" + ns.formatNumber(results.def,2);
    ascresults = ascresults + " D" + ns.formatNumber(results.dex,2);
    ascresults = ascresults + " A" + ns.formatNumber(results.agi,2);
    ascresults = ascresults + " C" + ns.formatNumber(results.cha,2);
    ascresults = ascresults + "\tRespect: " + ns.formatNumber(results.respect,2);
    output = output + "\n" + padTab(2,member + ":") + ascresults;

    output = output + "\n\t\t"
    if(results.str > 1.1) {
      output = output + "Combat: good"
      if(results.cha > 1.1) {
        output = output + "\tCharisma: good"
        if(results.hack > 1.1) {
          if(results.str > 1.2 || results.cha > 1.2 || results.hack > 1.2) {
              output = output + "\tHacking: good\n\t\tAction: Ascension?";
              if(ns.gang.getGangInformation().respect - results.respect > respectFloor) {
                if(ascend == true) {
                  ns.gang.setMemberTask(member, "Train Combat");
                  ns.gang.ascendMember(member);
                  output = output + "\n\t\tAction: Train Hacking" + "\n\t!!ASCENDED!!";
                  ascended = true;
                } else {
                  output = output + " !Ascension BLOCKED by flag!";
                }
              }
          } else {
            output = output + "\tHacking: good\n\t\tAction: " + chosenWork;
             ns.gang.setMemberTask(member, chosenWork);
             ns.gang.getMemberInformation(member).task
          }
        }else {
          output = output + "\n\t\tAction: Train Hacking"
           ns.gang.setMemberTask(member, "Train Hacking");
        }
      } else {
        output = output + "\n\t\tAction: Train Charisma"
         ns.gang.setMemberTask(member, "Train Charisma");
      }
    } else {
      output = output + "Combat: bad\n\t\tAction: Train Combat"
       ns.gang.setMemberTask(member, "Train Combat");
    }
    //totalRespect = totalRespect + 
    


    //ns.gang.ascendMember(member)
    //ns.gang.nextUpdate()  //waits for next gang update


    //ns.gang.setMemberTask(member,"Train Combat");
    //ns.gang.setMemberTask(member,"Train Charisma");
    //ns.gang.setMemberTask(member,"Train Hacking");
    // ns.gang.setMemberTask(member,"Human Trafficking");
    //
  }

  //output = output + "\n\nGang info: " + (ns.gang.getGangInformation().respect)
  //action loop
  if(ascended) {
    ns.exec("gangup.js", "home", 1);
  }
  ns.tprint(output);
}


function padTab(totalTabs, input) {
  var tabstaken = input.length/8; //length of a tab is 8 spaces
  var tabsToInsert = totalTabs - tabstaken;

  var output = input;
  for(var i=0; i<tabsToInsert; i++)
    output = output + "\t";

  return output;
}