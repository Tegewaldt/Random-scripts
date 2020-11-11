var formatstr ="";
var oldtext=document.getElementById("bakeryName").innerHTML;
var indmad=[];
function getColor(value){
    //value from 0 to 1
    var hue=((1-value)*270).toString(10);
    return ["hsl(",hue,",60%,50%)"].join("");
}




function CalcIndmad(){
  for (var i_waldt = 0; i_waldt < Game.ObjectsById.length; i_waldt++) {
    indmad[i_waldt]=[Math.log10((Game.ObjectsById[i_waldt].price)/((Game.ObjectsById["6"].storedTotalCps/Game.ObjectsById["6"].amount)*Game.globalCpsMult)+1)];
  }
    var ranks = arr.map(function(v){ return indmad.slice().sort(function(a,b){return a-b}).indexOf(v)+1 });
    ranks.forEach((item, i) => {
      item=(item-1)/(ranks.length-1);
    });
    for (var i_waldt = 0; i_waldt < Game.ObjectsById.length; i_waldt++) {
      Game.ObjectsById[i_waldt].desc=Game.ObjectsById[i_waldt].desc.split(".")[0]+".<br><span style='font-weight:bold;font-size:12px;color:"+getColor(ranks[i_waldt])";'> Efficiency Ranking"+indmad[i_waldt]+"</span>"
    }
}

function Breakpointcalc(){
  if(document.getElementById("bakeryName")){
    if (Game.cookies>=84000*Game.cookiesPsRaw) {
      formatstr="<span style='font-weight:bold;font-size:14px;color:#90EE90;'>"
    }
    else {
      formatstr="<span style='font-weight:bold;font-size:14px;color:#70a;'>"
    };
    document.getElementById("bakeryName").innerHTML=oldtext+"<br>"+formatstr+Beautify(Game.cookiesPsRaw*84000)+"</span>";
  }
}

setInterval(function(){
  breakpointcalc();
  CalcIndmad();
},300);
