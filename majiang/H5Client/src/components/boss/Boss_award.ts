class Boss_award extends eui.Component{
	public list:eui.List;
	public scroller:eui.Scroller;
	public sureBtn:eui.Button;
	private arrayCollect:eui.ArrayCollection;
	private timer:egret.Timer;
	private arg:any;
	private count:number = 5;
	private _openModule:string;
	private _openMsg:string = "";
	private _dataObj:any;
	public constructor() {
		super();
		this.skinName = "Boss_award_skin";
	}
	protected childrenCreated():void{
		this.arrayCollect = new eui.ArrayCollection();
		this.scroller.viewport = this.list;
		this.list.dataProvider = this.arrayCollect;
		this.list.itemRenderer = CommonItem;
		this.timer = new egret.Timer(1000,5);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.start();
		this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSureTouch,this);
	}
	public setData(itemData:any[],arg:any,openModule:string = "",openMsg:string = "",dataObj:any = {}):void{
		this.arg = arg;
		this._openModule = openModule;
		this._openMsg = openMsg;
		this._dataObj = dataObj;
		this.arrayCollect.source = itemData;
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.count -= 1;
		this.sureBtn.label = "确定("+this.count+")";
	}
	private onTimerCom(evt:egret.TimerEvent):void{
		this.remove();
		this.requestExit();
	}
	private onSureTouch(evt:egret.TouchEvent):void{
		this.remove();
		this.requestExit();
	}
	private requestExit():void{
		DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
		GlobalFunc.changeSence(DataCenter.curSceneId,this.arg,this._openModule,this._openMsg,this._dataObj);
		PopUpManager.removePopUp(this.skinName,0);
	}
	private remove():void{
		this.timer.stop();
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSureTouch,this);
	}
}