class Boss_world_tab extends eui.Component{
	public scroller:eui.Scroller;
	public list:eui.List;
	public challengeNum:eui.Label;
	public bossPrompt:UI_ConnectWord;
	public time:eui.Label;
	public timeGroup:eui.Group;
	private collection:eui.ArrayCollection;
	private itemData:any;
	private curItemBtn:eui.Button;
	private curValue:number;
	private totalValue:number;
	private watcher:eui.Watcher;
	private countTimer:egret.Timer;
	private remainWatcher:eui.Watcher;
	private globalTemple:data.GlobalDefineTemple;
	private refreshTime:number;
	private count:number;
	public constructor() {
		super();
		this.skinName = "Boss_world_tab_skin";
	}
	protected childrenCreated():void{
		this.countTimer = new egret.Timer(1000);
		this.collection = new eui.ArrayCollection();
		this.list.itemRenderer = Boss_personal_item;
		this.list.dataProvider = this.collection;
		this.scroller.viewport = this.list;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this,false,2);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this,false,1);
		var globalTemple:data.GlobalDefineTemple = temple.TempleManager.select(DataCenter.worldBossTotalNum) as data.GlobalDefineTemple;
		this.totalValue = globalTemple.argument;
		this.timeGroup.visible = false;
		globalTemple  = temple.TempleManager.select(DataCenter.worldBossCountAddTime) as data.GlobalDefineTemple;
		this.refreshTime = globalTemple.argument;
		this.watcher = eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.boss_remaincount+""],this.countChange,this);
		this.remainWatcher = eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.boss_remainSeconds+""],this.bossCountChange,this);
		this.countTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.count -= 1
		this.time.text = GlobalFunc.formatTime(this.count,false,true);
	}
	private bossCountChange(value:number):void{
		if(this.curValue != this.totalValue){
			this.count = this.refreshTime - value;
			this.timeGroup.visible = true;
			this.time.text = GlobalFunc.formatTime(this.count,false,true);
			this.countTimer.start();
		}else{
			this.timeGroup.visible = false;
			this.countTimer.stop();
		}
	}
	private countChange(value:number):void{
		this.curValue = value;
		this.challengeNum.text = this.curValue+"/"+this.totalValue;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		var item:Boss_personal_item = this.list.getChildAt(evt.itemIndex) as Boss_personal_item;
		this.curItemBtn = item.challengeBtn;
		this.itemData = evt.item;
	}
	public setBossSource(source:any):void{
		this.collection.source = source;
		this.curValue = DataCenter.playerAttr[data.PlayerAttr.boss_remaincount];
		this.challengeNum.text = this.curValue+"/"+this.totalValue;
	}
	public setBossItem(item:any,index:number):void{
		this.collection.replaceItemAt(item,index);
		this.collection.refresh();
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.curItemBtn:
				if(this.curValue <= 0){
					PopTipsManager.showPopTips([{type:TipsEnum.TYPE_WARN,label:"boss挑战次数不足"}]);
					return;
				}
				if(this.curItemBtn.currentState === "up"){
					Global.dispatchEvent(MainNotify.CHALLENGE_WORLD_BOSS,this.itemData);
				}
				break;
		}
	}
	public remove():void{
		for(var i:number = 0;i<this.list.numChildren;i++){
			var item:Boss_personal_item = this.list.getChildAt(i) as Boss_personal_item;
			if(item && item.parent && item.parent.contains(item)){
				item.remove();
			}
		}
		if(this.watcher){
			this.watcher.unwatch();
		}
		if(this.remainWatcher){
			this.remainWatcher.unwatch();
		}
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.countTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		if(this.parent && this.parent.contains(this)){
			this.parent.removeChild(this);
		}
	}
}