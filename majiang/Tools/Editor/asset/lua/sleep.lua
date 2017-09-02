main=nil;

continue = as3.toas3(function() 
	print ("continuing coroutine")
	assert(coroutine.resume(main))
end)

local timer = as3.class.flash.utils.Timer.new(milliseconds, 1)
function sleep(milliseconds)
	print("adding resume timer for ", milliseconds, "ms")
	timer.delay=milliseconds;
	timer.addEventListener(as3.class.flash.events.TimerEvent.TIMER, continue)
	timer.start()
	print("pausing coroutine")
	coroutine.yield()
end
function start(func)
	main=coroutine.create(func);
	coroutine.resume(main);
end
function onstep()
  this.saveSO.__step=as3.tolua(this.saveSO.__step)+1;
  this.save();
end
function showBG(bgpic,showtype)
  onstep();
   canvas.showBG(bgpic,showtype);
end
function showFG(fgpic,showtype)
	onstep();
   canvas.showFG(fgpic,showtype);
end
function hideBG()
    onstep();
   canvas.hideBG();
end
function hideFG()
    onstep();
   canvas.hideFG();
end

function showDialog(name,content)
    onstep();
	canvas.showDialog(name,content);
	coroutine.yield();
end



function showOption(optionname,a,b,c,d,e)
    onstep();
	--print("showOption",optionname,a,b,c,d,e);
	if e then
		this.showOption(optionname,a,b,c,d,e);
	elseif d then
		this.showOption(optionname,a,b,c,d);
	elseif c then
		this.showOption(optionname,a,b,c);
	else
		this.showOption(optionname,a,b);
	end
	coroutine.yield();
	canvas.hideOption();
end
function getsel(optionname)
	return this.saveSO[optionname];
end


function addGuide(word,x,y,w,h)
    onstep();
	this.showGuide(word,x,y,w,h);
	coroutine.yield();
end

function addGuideMove(word,x1,y1,w1,h1,x2,y2,w2,h2)
    onstep();
	this.showGuide2(word,x1,y1,w1,h1,x2,y2,w2,h2);
	coroutine.yield();
end


function next()
	coroutine.resume(main);
end