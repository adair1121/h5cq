class Forging_getStone extends eui.Component {
	public constructor() {
		super();
		this.skinName="Forging_getStone_skin";
	}

	public returnBtn:eui.Image;
	public closeBtn:eui.Image;
	public item:RoleEquipRenderer;
	public btn_ronglian:UI_ConnectWord;

	protected childrenCreated():void{
		this.touchEnabled = true;
		this.item.data={equipSource:Config.path_goods+20003003+".png"}
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.btn_ronglian.setClickFunction(()=>{
			this.dispatchEvent(new egret.Event("openRonglianPanel"));
			PopUpManager.removePopUp(this.skinName);
		},this)
	}

	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				//点击返回
			case this.closeBtn:
				PopUpManager.removePopUp(this.skinName,0);
				//点击关闭
				break;
			
			
			default :
				break;
		}
	}
	
}