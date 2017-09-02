
function startGuide()
	setPic("wangjia","image_6006000c");
	setDialog("破庙里昏暗无光，旁边有一个奇怪的和尚");
	setSelect("和他说话","离开");
	if as3.tolua(this.result)=="a" then
		setDialog("小兄弟，给口吃的吧");
		setSelect("给","不给");
	else
		this.hideDialog();
		return;
	end
	if as3.tolua(this.result)=="a" then
		setDialog("你失去了一个包子");
		setDialog("谢谢小哥，这本书就送给你了");
		setDialog("你得到了一本易筋经");
	else
		this.hideDialog();
		return;
	end
	this.hideDialog();
end

start(startGuide);