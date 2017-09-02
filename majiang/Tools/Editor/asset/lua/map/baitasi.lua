

function startGuide()
	setPic("test","image_60060062");
	setDialog("白塔寺是附近著名的景区，你确定要进入么");
	setSelect("进入,门票300","离开");
	if as3.tolua(this.result)=="a" then
		setDialog("你环顾四周，什么也没有发现");
	else
		this.hideDialog();
	end
	this.hideDialog();
end

start(startGuide);