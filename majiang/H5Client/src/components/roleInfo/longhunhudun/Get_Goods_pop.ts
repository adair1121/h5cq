class Get_Goods_pop extends eui.Component{
	public shopItem:Way_shop_item;
	public otherItem:Way_other_item;
	public returnBtn:eui.Image;
	private commonItem:CommonItem;
	public reChargeBtn:Btn1;
	public buyBtn:Btn1;
	private templateId:number;
	public constructor() {
		super();
		this.skinName = "Get_Goods_pop_skin"
	}
	protected childrenCreated():void{
		this.reChargeBtn.label = "充值";
		this.buyBtn.label = "购买";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	public refreshItem(dataObj:any):void{
		var state:number = dataObj.shopData.state;
		if(state === data.StrengthenType.ST_HD || state === data.StrengthenType.ST_MB || state === data.StrengthenType.ST_HS || state === 1){
			this.skin.currentState = "hudun";
			this.commonItem.equipBox.source = GlobalFunc.setBgData(dataObj.shopData.quality).boxS;
			this.commonItem.equipImg.source = dataObj.shopData.imgS;
			this.commonItem.iName = dataObj.shopData.itemName;
			this.commonItem.iNameColor = DataCenter.bag.qualityColor[dataObj.shopData.quality];
		}else if(dataObj.shopData.state === data.StrengthenType.ST_LH || state === 0){
			this.skin.currentState = "longhun";
			this.shopItem.costNum = 1;
			this.shopItem.allCost = dataObj.shopData.singleCost * 1;
			this.shopItem.singleCost = dataObj.shopData.singleCost;
			this.shopItem.setItemData(dataObj.shopData);
			this.templateId = dataObj.shopData.tid;
		}
		this.otherItem.refreshOtherWay(dataObj.itemData);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				this.closeView();
				break;
			case this.reChargeBtn.button:
				break;
			case this.buyBtn.button:
				var goldNum:number = DataCenter.playerAttr[data.PlayerAttr.gold];
				var cost:number = Way_shop_item.m_singleCost * Way_shop_item.costValue;
				if(goldNum < cost){
					var tipObj:any[] = [{type:TipsEnum.TYPE_WARN,label:"元宝不足"}];
					PopTipsManager.showPopTips(tipObj);
					return;
				}
				var obj:any = {ID:DataCenter.storeGoods[this.templateId],num:this.shopItem.costNum,entrance:0};
				Global.dispatchEvent(MainNotify.BUYITEM,obj);
				this.closeView();
				break;
			default:
				break;
		}
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
}