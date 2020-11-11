//EXAMPLE MOD
Game.registerMod('test mod',{


  init:function(){
    Game.registerHook('reincarnate',function(){Game.mods['test mod'].addIntro();});
    Game.registerHook('check',function(){if (!Game.playerIntro){Game.mods['test mod'].addIntro();}});
    Game.registerHook('click',function(){Game.Notify(choose(['A good click.','A solid click.','A mediocre click.','An excellent click!']),'',0,0.5);});
    Game.registerHook('cps',function(cps){return cps*2;});
  },
  save:function(){},
  load:function(){},
  addIntro:function(text){
    //note: this is not a mod hook, just a function that's part of the mod
    Game.playerIntro=text||choose(['oh snap, it\'s','watch out, it\'s','oh no! here comes','hide your cookies, for here comes','behold! it\'s']);
    if (!l('bakerySubtitle')) l('bakeryName').insertAdjacentHTML('afterend','<div id="bakerySubtitle" class="title" style="text-align:center;position:absolute;left:0px;right:0px;bottom:32px;font-size:12px;pointer-events:none;text-shadow:0px 1px 1px #000,0px 0px 4px #f00;opacity:0.8;"></div>');
    l('bakerySubtitle').textContent='~'+Game.playerIntro+'~';
  },
});
