class Store_shop extends eui.Component{
	public shopItem:Way_shop_item;
	public buyBtn:Btn1;
	public returnBtn:eui.Image;
	private singleCost:number;
	private tid:number;
	public constructor() {
		super();
		this.skinName = "Store_shop_skin"
	}
	protected childrenCreated():void{
		this.buyBtn.label = "购买";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				this.closeView();
				break;
			case this.buyBtn.button:
				var cost:number = this.singleCost*this.shopItem.costNum;
				if(cost > DataCenter.playerAttr[data.PlayerAttr.gold]){
					var tipObj:any[] = [{type:TipsEnum.TYPE_WARN,label:"元宝不足"}];
					PopTipsManager.showPopTips(tipObj);
				}
				PopUpManager.removePopUp(this.skinName,0);
				Global.dispatchEvent(MainNotify.BUYITEM,{ID:this.tid,num:this.shopItem.costNum,entrance:0});
				break;
		}
	}
	public initData(obj:any){
		this.tid = obj.tid;
		this.singleCost = obj.singleCost;
		this.shopItem.singleCost = obj.singleCost;
		this.shopItem.costNum = 1;
		this.shopItem.allCost = obj.singleCost * 1;
		if(obj.maxNum){
			this.shopItem.maxNum = obj.maxNum;
		}
		this.shopItem.setItemData(obj.itemData);
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
	public refreshItem(dataObj:any):void{
		this.shopItem.setItemData(dataObj.shopData);
	}
}