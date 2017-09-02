class MainUI_roleInfo extends eui.Component{
	public level:eui.Label;
	public vipNum:eui.BitmapLabel;
	public power:eui.BitmapLabel;
	public roleHead:eui.Image;
	public rankBtn:eui.Image;
	public constructor() {
		super();
		this.skinName = "MainUI_roleInfo_skin";
	}
	protected childrenCreated():void{
		this.rankBtn.touchEnabled = true;
		this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		Global.dispatchEvent(MainNotify.OPENRANKPANEL);
	}
	public refreshData(data:any):void{
		this.roleHead.source = "head_"+data.job+"_"+data.sex+"_png";
	}
	public setPower(str:string):void{
		this.power.text = str;
	}
	public refreshLelNum(value:number):void{
		this.level.text = value+"";
	}
	public refreshVipNum(value:number):void{
		this.vipNum.text = value+"";
	}
}