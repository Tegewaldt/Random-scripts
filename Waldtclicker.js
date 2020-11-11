var formatstr ="";
var oldtext=document.getElementById("bakeryName").innerHTML;
var indmad=[];
var ranks=[];

function getColor(value){
    var h=((1-value)*120).toString(10);
    var s=60/100;
    var l=50/100;


  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  return "#" + r + g + b;
}

function CalcIndmad(){
  for (var i_waldt = 0; i_waldt < Game.ObjectsById.length; i_waldt++) {
    indmad[i_waldt]=[Math.log10((Game.ObjectsById[i_waldt].price)/((Game.ObjectsById["6"].storedTotalCps/Game.ObjectsById["6"].amount)*Game.globalCpsMult)+1)];
  }
    ranks = indmad.map(function(v){ return indmad.slice().sort(function(a,b){return a-b}).indexOf(v)+1 });
    ranks.forEach((item, i) => {
      ranks[i]=(item-1)/(ranks.length-1);
    });
    for (var i_waldt = 0; i_waldt < Game.ObjectsById.length; i_waldt++) {
      Game.ObjectsById[i_waldt].desc=Game.ObjectsById[i_waldt].desc.split(".")[0]+".<br><span style='font-weight:bold;font-size:12px;color:"+String(getColor(ranks[i_waldt]))+";'> Efficiency Ranking"+Math.round(indmad[i_waldt] * 10) / 10+"</span>";
    }
}

function Breakpointcalc(){
  if(document.getElementById("bakeryName")){
    if (Game.cookies>=84000*Game.cookiesPsRaw) {
      formatstr="<span style='font-weight:bold;font-size:14px;color:#90EE90;'>";
    }
    else {
      formatstr="<span style='font-weight:bold;font-size:14px;color:#70a;'>";
    };
    document.getElementById("bakeryName").innerHTML=oldtext+"<br>"+formatstr+Beautify(Game.cookiesPsRaw*84000)+"</span>";
  }
}
function initWaldt(){
setInterval(function(){
  Breakpointcalc();
  CalcIndmad();
},300);
}
Game.registerMod("WaldtMod", initWaldt);


