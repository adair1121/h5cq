class View_fuben extends Base_view{
	private curModule:Module_fuben;
	public returnBtn:eui.Image;
	public itemList:eui.List;
	public materialBtn:BagBtn;
	public challengeBtn:BagBtn;
	public xuWuBtn:BagBtn;
	private arrCollect:eui.ArrayCollection;
	private curBtn:BagBtn;
	public constructor() {
		super();
	}
	protected childrenCreated():void{
		this.curModule = this.module as Module_fuben;
		this.arrCollect = new eui.ArrayCollection();
		this.itemList.dataProvider = this.arrCollect;
		this.materialBtn.setAttr({text:"材料副本",size:20});
		this.challengeBtn.setAttr({text:"挑战副本",size:20});
		this.xuWuBtn.setAttr({text:"虚无境地",size:20});
		this.changeTap(this.materialBtn);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	public setViewData(dataObj:any):void{
		this.arrCollect.source = dataObj.itemSource;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				this.curModule.removeView();
				break;
			case this.materialBtn.button:
				if(this.curBtn != this.materialBtn){
					//更新到材料副本页面;
				}
				break;
			case this.challengeBtn.button:
				break;
			case this.xuWuBtn.button:
				break;
			default:
				break;
		}
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn){
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
	}
}