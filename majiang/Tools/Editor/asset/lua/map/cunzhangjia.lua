
function startGuide()
	setPic("cunzhangjia","100");
	selectDialog("小子,我看你骨骼惊奇,必是练武奇才,将来维护宇宙正义与和平的重任就交给你了!我这有几本秘籍,原价200元宝,算你100元宝一本","易经经","洗髓金","如来神掌");
	if as3.tolua(this.result)=="a" then
		selectDialog("果然有眼光,这本易经经就交给你了","谢谢","混蛋,你骗我钱");
	elseif as3.tolua(this.result)=="b" then
		selectDialog("果然有眼光,这本洗髓金就交给你了","谢谢","混蛋,你骗我钱");
	else
		selectDialog("果然有眼光,这本如来神掌就交给你了","谢谢","混蛋,你骗我钱");
	end
	this.hideDialog();
	addGuide("点击这里",100,265,65,90);
	
	this.hideGuide();
end

start(startGuide);