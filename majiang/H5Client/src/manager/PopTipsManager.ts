module PopTipsManager{
	var typeGather:any[] = []; 
	//{0:[{},{}],1:[{}]}
	var moveGather:any[] = [];
	var nullNum:number = 0;
	function callBackFunc(data):void{
		var target = moveGather[data.index]
		moveGather.splice(data.index,1);
		// if(target && target.parent && target.parent.contains(target)){
		// 	target.parent.removeChild(target);
		// }
		// nullNum +=1;
		// if(nullNum >= moveGather.length){
		// 	nullNum = 0;
		// 	moveGather = [];
		// 	// console.log("=================>>>>>>>>this tips gather is empty<<<<<<<<==================");
		// }
	}
	function moveStep(){
		var arr:any[] = []
		for(var j:number = 0;j<moveGather.length;j++){
			if(!moveGather[j].moveEnd){
				arr.push(moveGather[j]);
			}
		}
		var step:number = arr.length;
		for(var i = 1;i <= arr.length ;i++){
			if(arr[i-1] != null){
				step = step === 0?1:step;
				egret.Tween.removeTweens(arr[i-1].moveObj);
				arr[i-1].move(arr[i-1],300 - 35*step,callBackFunc,this,i-1);
				step-=1;
			}
		}
	}
	
	function showEquipTips(group:any){
		var pop:PopTips = new PopTips(group.quality);
		ViewController.getInstance().getContainer().layer_popup.addChild(pop);
		moveGather.push(pop);
		pop.labelTxt = "C:0XFFFFFF&T:获得|C:"+pop.curQualityColor+"&T:"+group.label + " x " + group.num;
		moveStep()
	}
	function showWarnTips(group:any){
		var pop:PopTips = new PopTips(group.quality);
		ViewController.getInstance().getContainer().layer_popup.addChild(pop);
		moveGather.push(pop);
		pop.labelTxt = ColorTipsEnum.COLOR_WARN + group.label;
		moveStep()
	}
	function showExpTips(group:any){
		var pop:PopTips = new PopTips(group.quality);
		ViewController.getInstance().getContainer().layer_popup.addChild(pop);
		moveGather.push(pop);
		pop.labelTxt = ColorTipsEnum.COLOR_EXPERIENCE +"  +"+ group.num;
		moveStep()
	}
	function showGoldTips(group:any){
		var pop:PopTips = new PopTips(group.quality);
		ViewController.getInstance().getContainer().layer_popup.addChild(pop);
		moveGather.push(pop);
		pop.labelTxt = ColorTipsEnum.COLOR_GOLD +group.label+"  +"+ group.num;
		moveStep()
	}
	function showDefaultTips(group:any){
		var pop:PopTips = new PopTips(group.quality);
		ViewController.getInstance().getContainer().layer_popup.addChild(pop);
		moveGather.push(pop);
		pop.labelTxt = ColorTipsEnum.COLOR_DEFAULT + group.label +"  +"+ group.num;
		moveStep()
	}
	function divideBlock(obj:any):void{
		switch(obj.type){
			case TipsEnum.TYPE_EQUIP:
				showEquipTips(obj);
				break;
			case TipsEnum.TYPE_DEFAULT:
				showDefaultTips(obj);
				break;
			case TipsEnum.TYPE_EXPERIENCE:
				showExpTips(obj);
				break;
			case TipsEnum.TYPE_GOLD:
				showGoldTips(obj);
				break;
			case TipsEnum.TYPE_WARN:
				showWarnTips(obj)
				break;
		}
	}

	function createLabel(configObj,parentCon,callBack,arg):void{
		var upGradeLabel:eui.BitmapLabel = new eui.BitmapLabel();
		parentCon.addChild(upGradeLabel);
		upGradeLabel.font = RES.getRes("greenFont_fnt");
		upGradeLabel.text = configObj.text;
		upGradeLabel.width = configObj.w;
		upGradeLabel.height = configObj.h;
		upGradeLabel.x = configObj.x;
		upGradeLabel.y =  configObj.y
		egret.Tween.get(upGradeLabel).to({y:upGradeLabel.y - 30},800).to({alpha:0},500).call(function(){
			egret.Tween.removeTweens(upGradeLabel);
			upGradeLabel.parent.removeChild(upGradeLabel);
			tipsGather.shift();
			if(callBack && arg && !tipsGather.length){
				callBack.call(arg);
			}
		})
	}
	//==============================================================================

	/**弹出物品获得tips */
	export function showPopTips(arr){
		var array:any[] = GlobalFunc.deepCopy(arr);
		for(var i:number = 0;i<array.length;i++){
			divideBlock(array[i]);
		}
		
	}

	/**
	 * 显示增长值相关tips
	 * 
	 * 如：技能升级后的增长值显示,强化的增长值显示
	 * 
	 * @:configObj {any} {w:number,h:number,x:number,y:number,text:number}
	 * @:parentCon {egret.DisplayObjectContainer} {父级容器}
	 *
	 * */
	var tipsGather:any = [];
	export function showUpGradeTips(configObj:any,parentCon:egret.DisplayObjectContainer,callBack:Function,arg:any){
		tipsGather.push(configObj);
		createLabel(configObj,parentCon,callBack,arg);
	}

	/**显示增长后的战力值tips显示 */

	export function showPowerTips(x:number,y:number,value:number,callBack:Function,arg:any){
		var pop:PowerTips = new PowerTips(callBack,arg);
		var con = ViewController.getInstance().getContainer().layer_popup;
		ViewController.getInstance().addView(con,pop,x,y);
		pop.letterScroll(value);
	}
	
	
}