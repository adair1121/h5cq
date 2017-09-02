function startStory()
	--showBG("joybk",1);
	showDialog("<h1>神秘人</h1>","<h1>我是谁，你不需要知道</h1>");
	showDialog("<h1>神秘人</h1>","<h1>我是你大爷</h1>");
	showDialog("<h1>神秘人</h1>","<h1>什么？你不知道自己是谁？</h1>");
	showDialog("<h1>神秘人</h1>","<h1>你是……</h1>");
	showOption("test","我是你舅舅","我是山中包治百病的板蓝根");
	showDialog("<h1>神秘人</h1>","<h1>你的职业是……</h1>");
	showOption("test","蓝翔高级技工","新东方厨师");
	if getsel("test")==0 then
		showDialog("<h1>神秘人</h1>","<h1>你是我舅舅</h1>");
	else
		showDialog("<h1>神秘人</h1>","<h1>你是板蓝根</h1>");
	end
	
end
----开始对话--------
start(startStory);