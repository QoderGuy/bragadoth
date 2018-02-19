var selected = {};
function getProperty(unit)
{
    'use strict';
    var properties = 
    {
        width :parseInt(window.getComputedStyle(unit).getPropertyValue("width")),
        height:parseInt(window.getComputedStyle(unit).getPropertyValue("height")),
        top:parseInt(window.getComputedStyle(unit).getPropertyValue("top")),
        left:parseInt(window.getComputedStyle(unit).getPropertyValue("left"))
    };
    return properties;
}

function genMap()
{
  
  for(var x=0;x<20;x++)
  {
    for(var y=0;y<20;y++)
    {
      var div = document.createElement('div');
      document.getElementsByClassName("map_holder")[0].appendChild(div);
      div.setAttribute('class','tile');
      div.style.left = 31*x + 1 + 'px';
      div.style.top  = 31*y + 1 + 'px';
    }
  }
  var player = document.createElement('div');
  document.getElementsByClassName("tile")[0].appendChild(player);
  player.setAttribute('class','player');

}

function handleMove()
{
    var td;

    for(var i=0;i<400;i++)
    {
        document.getElementsByClassName('tile')[i].addEventListener('click',function(e)
        {
          selected = getProperty(e.target);
        });
    }
}

var height = 10;
var lock   = false;
var thing = 0;
var my = 0;
genMap();
handleMove();
window.onload=function ticker()
{
  var player = document.getElementsByClassName('player')[0];
  
  if(selected.left != undefined && getProperty(player).left < selected.left+4)
  {
      thing+=1;
      player.style.left = thing + 'px'
  }

  if(selected.left != undefined && getProperty(player).left > selected.left+4)
  {
      thing-=1;
      player.style.left = thing + 'px'
  }

  if(selected.top != undefined && getProperty(player).top < selected.top+4)
  {
      my+=1;
      player.style.top = my + 'px'
  }

  if(selected.top != undefined && getProperty(player).top > selected.top+4)
  {
      my-=1;
      player.style.top = my + 'px'
  }


    document.getElementsByClassName('action')[0].addEventListener('click',function()
    {
    	if(lock == false)
    	{
    		height = 0;
    		document.getElementsByClassName('action_indicator')[0].style.height = height + "px";
    		lock = true;
    	}
    	
    })

   	if(getProperty(document.getElementsByClassName('action_indicator')[0]).height < 200)
   	{
   		lock = true;
   		height+=5;
   		document.getElementsByClassName('action_indicator')[0].style.height = height + "px"
   	}

   	if(getProperty(document.getElementsByClassName('action_indicator')[0]).height >= 200)
   	{
   		lock = false;
   	}

    setTimeout(function()
    {
        window.requestAnimationFrame(ticker);
    },1);
 }
