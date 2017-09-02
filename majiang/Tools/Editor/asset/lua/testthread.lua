function setCorouttine(func)
print('setco',func);
	local function tracestack(err)
		print("========");
		print(err);
		print(debug.traceback());
		print("=======end====");
	end
	local function xp_call()
	 xpcall(func,tracestack);
	end
	main=coroutine.creat(xcall);
end
function startCoroutine(...)
	print('start excute lua');
	coroutine.resume(main,...);
end