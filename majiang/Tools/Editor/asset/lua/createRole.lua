local thread;
function start(func)
	thread=coroutine.create(func);
	coroutine.resume(thread);
end

function resumeDialog()
	coroutine.resume(thread);
end


function gamestart()
  local sex=0;--性别
  local name="";--name
  local gift=0;--天赋武功
  
  
end

start(gamestart);