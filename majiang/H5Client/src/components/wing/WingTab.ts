class WingTab extends eui.Component{

	public roleWing:eui.Group;
	public autoUp:Btn1;
	public freeActive:BagBtn;
	public promoteBtn:Btn1;
	public changWing:Btn1;
	public featherUpBtn:Btn1
	public updateProgress:eui.ProgressBar;
	public costMoney:eui.Label;
	public feather:eui.Label;
	public starList:eui.List;

	private wingSource:string = "";
	// private starSp:egret.Sprite;
	private myTimer:egret.Timer;
	private m_curValue:number;
	private m_totalValue:number;
	private m_curStar:number;
	private clickState:boolean = false;
	private wingMc:MovieClip;
	public cAttrList:eui.List;
	public nextAttrList:eui.List;
	private c_arrayCollect:eui.ArrayCollection;
	private n_arrayCollect:eui.ArrayCollection;
	private arrayCollet:eui.ArrayCollection;
	private source:any[] = [];
	private cost:number;
	private no_star:string = "wing_star_0_png";
	private has_star:string = "wing_star_1_png";
	private attr:number[];
	public btnGroup:eui.Group;
	private watcher:eui.Watcher;
	private wingTempleId:number;
	private featherCount:number;
	private fUid:number;
	private featherWatcher:eui.Watcher;
	public constructor(type:number) {
		super();
		this.skinName = "WingTab_skin";
		if(type){
			this.btnGroup.visible = false;
			this.changWing.visible = false;
		}else{
			this.btnGroup.visible = true;
			this.changWing.visible = true;
		}
	}
	protected childrenCreated():void{
		this.initialize();
		this.starList.dataProvider = this.arrayCollet;
		this.starList.itemRenderer = Wing_star_item; 
		this.c_arrayCollect = new eui.ArrayCollection();
		this.n_arrayCollect = new eui.ArrayCollection();
		this.cAttrList.dataProvider = this.c_arrayCollect;
		this.nextAttrList.dataProvider = this.n_arrayCollect;
		this.cAttrList.itemRenderer = Role_specialItem;
		this.nextAttrList.itemRenderer = Role_specialItem;
		this.myTimer = new egret.Timer(200);
		this.myTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.attr = DataCenter.playerAttr;
		this.watcher = eui.Binding.bindHandler(DataCenter,["changeItemNum"],this.changeNeedFeather,this);
		// this.refreshFeatherColor();
	}
	private changeNeedFeather(value:any):void{
		if(value && value.id){
			var uid:number = DataCenter.goodsUIDgather.get(this.wingTempleId+"");
			if(uid && uid === value.id){
				this.featherNum = value.num;
			}
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		
		switch(evt.target){
			case this.freeActive.button:
				this.skin.currentState = "active";
				// this.roleWing.source = this.wingSource;
				// this.starList.visible = true;
				break;
			case this.autoUp.button:
				// if(attr[data.PlayerAttr.feather]<=0 && attr[data.PlayerAttr.money] < this.cost){
				// 	var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"金币不足"}];
				// 	PopTipsManager.showPopTips(obj);
				// 	this.clickState = false;
				// 	return;
				// }
				this.clickState = !this.clickState;
				if(this.clickState){
					this.autoUp.label = "停止";
					this.myTimer.start();
				}else{
					// this.myTimer.stop();
					// this.myTimer.reset();
					// this.autoUp.label = "自动升星";
					this.stopAutoUpgrade();
				}
				break;
			case this.promoteBtn.button:
				if(this.clickState){
					return;
				}
				if(this.attr[data.PlayerAttr.money] < this.cost){
					var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"金币不足"}];
					PopTipsManager.showPopTips(obj);
					return;
				}
				Global.dispatchEvent(MainNotify.EXPERIENCE_STAR,{type:1});
				break;
			case this.featherUpBtn.button:
				if(this.clickState){
					return;
				}
				if(this.featherCount<=0){
					var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"羽毛不足"}];
					PopTipsManager.showPopTips(obj);
					return;
				}
				Global.dispatchEvent(MainNotify.EXPERIENCE_STAR,{type:2});
				break;
			case this.changWing.button:
				//提升
				 Global.dispatchEvent(MainNotify.WINGCHANGE);
				break;
		}
	}
	private onTimer(evt:egret.TimerEvent):void{
		var attr:number[] = DataCenter.playerAttr;
		if(this.featherCount<=0 && attr[data.PlayerAttr.money] < this.cost){
			this.stopAutoUpgrade();
			return;
		}
		Global.dispatchEvent(MainNotify.EXPERIENCE_STAR,{type:3});
	}
	private initialize():void{
		this.source = [];
		this.arrayCollet = new eui.ArrayCollection();
		this.wingMc = new MovieClip();
		this.autoUp.label = "自动升星";
		this.promoteBtn.label = "提升";
		this.featherUpBtn.label = "羽毛提升";
		this.freeActive.setAttr({text:"免费激活",size:20});
		this.changWing.label = "升阶"
		for(var i:number = 0;i<10;i++){
			var obj:any ={img:this.no_star}
			this.source.push(obj)
		}
		this.arrayCollet.source = this.source;
	}
	/**更新翅膀模型 */
	public refreshWingMode(roleWingPath:string = ""):void{
		this.roleWing.removeChildren();
		this.wingMc.loadFile(roleWingPath,true,-1,null,this)
        this.roleWing.addChild(this.wingMc);
		this.wingMc.x = (this.roleWing.width >> 1)
		this.wingMc.y = (this.roleWing.height >>1) + 25;
	}
	public refreshStar(starNum:number):void{
		for(var i:number = 0;i<10;i++){
			this.source[i].img = this.no_star;
		}
		for(var i:number = 0;i<starNum;i++){
			this.source[i].img = this.has_star;
		}
		this.arrayCollet.source = this.source;
	}
	/**翅膀升星操作（包含羽毛提升以及金币提升） */
	public upGradeStar(dataObj:any):void{
		var num:number
		if(DataCenter.goodsSource.hasKey(this.fUid+"")){
			num = DataCenter.goodsSource.get(this.fUid+"");
		}else{
			num = 0;
		}
		this.featherNum = num?num:0;
		// this.refreshFeatherColor();
		this.curValue += dataObj.exp;
		this.costNum = dataObj.costMoney;
		var obj:any = {type:TipsEnum.TYPE_EXPERIENCE,num:dataObj.exp};
		PopTipsManager.showPopTips([obj]);

		//判断是否要升星
		if(this.curValue >= this.totalValue){
			// 升星
			this.stopAutoUpgrade();
			Global.dispatchEvent(MainNotify.STAR_UPGRADE);
		}
	}
	private stopAutoUpgrade():void{
		this.myTimer.stop();
		this.myTimer.reset();
		this.autoUp.label = "自动升星";
		this.clickState = false;
	}
	// private refreshFeatherColor():void{
	// 	if(this.featherCount<=0){
	// 		this.feather.textColor = 0xfc3434;
	// 	}else{
	// 		this.feather.textColor = 0xE6D8B3;
	// 	}
	// }
	// private refreshMoneyColor(num:number):void{
	// 	if(this.attr[data.PlayerAttr.money] < num){
	// 		this.costMoney.textColor = 0xfc3434;
	// 	}else{
	// 		this.costMoney.textColor = 0xE6D8B3;
	// 	}
	// }
   /**初始化星级 */
   public initLev(value:number){
	   this.m_curStar = value;
	   this.refreshStar(value);
	   if(value === 10){
		   //升阶界面
		   this.skin.currentState = "upGradeStar";
		   this.updateProgress["label"].visible = false;
	   }else{
		   this.skin.currentState = "active";
		   this.updateProgress["label"].visible = true;
	   }
   }
	public set curValue(value:number){
		this.m_curValue = value;
		this.updateProgress.value = this.m_curValue;
		this.updateProgress["label"].text = this.m_curValue + "/" + this.m_totalValue;
	}
	public get curValue():number{
		return this.m_curValue;
	}
	public set totalValue(value:number){
		this.m_totalValue = value;
		this.updateProgress.maximum = value;
		this.updateProgress["label"].text = this.m_curValue + "/" + this.m_totalValue;
	}
	public get totalValue():number{
		return this.m_totalValue;
	}
	public set featherNum(value:number){
		this.featherCount = value;
		this.feather.text = value + "/1";
	}
	public set costNum(value:number){
		// this.refreshMoneyColor(value);
		this.cost = value;
		this.costMoney.text = value+"";
	}
	public set cattrList(value:any[]){
		this.c_arrayCollect.source = value;
	}
	public set nattrList(value:any[]){
		this.n_arrayCollect.source = value;
	}
	public set fUID(value:number){
		this.fUid = value;
	}
	public remove():void{
		this.wingMc.gotoAndStop(0);
		this.wingMc = null;
		this.myTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		if(this.watcher){
			this.watcher.unwatch();
		}
	}
}