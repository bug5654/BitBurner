/** @param {NS} ns */
export async function main(ns) {
  var x = 1;
  var y = 1;


  if(ns.args.length > 0) {
    x = ns.args[0];
    y = ns.args[1];
  }

  ns.go.makeMove(x,y,false);

  var board = ns.go.getBoardState();
  var disp = "\n\t012345678901234";
  var output = ""
  for(var i=0; i<board.length; i++) {
    disp = disp + "\n" + i + "\t"  + board[i];
  }
  //ns.tprint(disp);
  //ns.tprint(ns.go.cheat);
  output = output + disp + "\n\n";
  //output = output + "cheat success chance: " + ns.go.cheat.getCheatSuccessChance() + "\n";
  

  ns.tprint(output);
}