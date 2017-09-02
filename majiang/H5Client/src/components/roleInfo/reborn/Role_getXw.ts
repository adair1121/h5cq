class Role_getXw extends eui.Component{

	private degraderemaincount:number;
	private gaojizhuanshengdan:number;
	private chaojizhuanshengdan:number;
	private type:number;
	private storeShop:Store_shop;
	private TYPE_1:number = 1;
	private TYPE_2:number = 2;
	private TYPE_3:number = 3;
	private layer:eui.Component;
	private gaojiId:number;
	private chaojiId:number;
	private buyChaojiCount:number = 0;
	private buyGaojiCount:number = 0;
	public constructor() {
		super();
		this.skinName="Role_getXw_skin";
	}
	public item1:Role_xwExchange_item;
	public item2:Role_xwExchange_item;
	public item3:Role_xwExchange_item;
	protected childrenCreated():void{
		var gaojiItemTemple:data.ItemTemple = temple.TempleManager.select(this.gaojiId) as data.ItemTemple;
		var chaojiItemTemple:data.ItemTemple = temple.TempleManager.select(this.chaojiId) as data.ItemTemple;
		var gaojiShopTemple:data.ShopTemple = temple.TempleManager.select(DataCenter.storeGoods[this.gaojiId]) as data.ShopTemple;
		var chaojijiShopTemple:data.ShopTemple = temple.TempleManager.select(DataCenter.storeGoods[this.chaojiId]) as data.ShopTemple;
		this.item1.setxw(66000,0x04fe10);
		this.item2.setxw(gaojiItemTemple.UseVaule,0x04fe10);
		this.item3.setxw(chaojiItemTemple.UseVaule,0xd21eff);
		this.calculHasGoods();
		this.item1.state = "exchangeXw";
		this.item2.state = "buyXw";
		this.item3.state = "buyXw";
		this.item2.item = gaojiItemTemple.name;
		this.item3.item = chaojiItemTemple.name;
		this.item2.icost = gaojiShopTemple.sellPrice[0]+"";
		this.item3.icost = chaojijiShopTemple.sellPrice[0]+"";
		this.storeShop = new Store_shop();
		this.item1.setItemData({quality:1,imgS:Config.path_public + "40000001.png"});
		this.item2.setItemData({quality:gaojiItemTemple.itemQuality,imgS:Config.path_goods + gaojiItemTemple.icon+".png"});
		this.item3.setItemData({quality:chaojiItemTemple.itemQuality,imgS:Config.path_goods+chaojiItemTemple.icon+".png"});
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.degraderemaincount+""],this.item1DataChange,this);
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.gaozhuan_remaincount+""],this.item2DataChange,this);
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.chaozhuan_remaincount+""],this.item3DataChange,this);
		eui.Binding.bindHandler(DataCenter,["changeItemNum"],this.changeXuWei,this);
		eui.Binding.bindHandler(DataCenter,["buyItemState"],this.buyItemState,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.layer = ViewController.getInstance().getContainer().layer_popup;
	}
	public setGoodsTemple(temple:number[]):void{
		this.gaojiId = temple[0];
		this.chaojiId = temple[1];
	}
	private buyItemState(value:string):void{
		if(value){
			this.calculHasGoods();
		}
	}
	private changeXuWei(value:any):void{
		if(value && value.id){
			this.calculHasGoods();
		}
	}

	/**计算当前是否拥有换取修为的物品 */
	private calculHasGoods():void{
		var uid1:number = DataCenter.goodsUIDgather.get(this.gaojiId+"");
		var uid2:number = DataCenter.goodsUIDgather.get(this.chaojiId+"");
		if(uid1){
			var gaojiNum:number = DataCenter.goodsSource.get(uid1+"");
			if(gaojiNum){
				this.gaojizhuanshengdan = gaojiNum;
				this.item2.setBtnState("使用","up");
			}else{
				this.gaojizhuanshengdan = 0;
				this.item2.setBtnState("购买","up");
			}
		}else{
			this.gaojizhuanshengdan = 0;
			this.item2.setBtnState("购买","up");
		}
		if(uid2){
			var chaojiNum:number = DataCenter.goodsSource.get(uid2+"");
			if(chaojiNum){
				this.chaojizhuanshengdan = chaojiNum;
				this.item3.setBtnState("使用","up");
			}else{
				this.chaojizhuanshengdan = 0;
				this.item3.setBtnState("购买","up");
			}
		}else{
			this.chaojizhuanshengdan = 0;
			this.item3.setBtnState("购买","up");
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.item1.commonBtn:
				if(this.degraderemaincount){
					this.type = this.TYPE_1;
					this.exchangeXuewei();
				}
				break;
			case this.item2.commonBtn:
				this.dealWithShopHandler(this.gaojizhuanshengdan,this.TYPE_2,this.buyChaojiCount,this.gaojiId,this.item2);
				break;
			case this.item3.commonBtn:
				this.dealWithShopHandler(this.chaojizhuanshengdan,this.TYPE_3,this.buyChaojiCount,this.chaojiId,this.item3);
				break;
		}
		
	}
	/**处理购买材料函数 */
	private dealWithShopHandler(goodsNum:number,shopType:number,buyCount:number,curTempleId:number,curItem:Role_xwExchange_item):void{
		if(goodsNum){
			this.type = shopType;
			this.sendToServer(curTempleId);
		}else{
			if(buyCount){
				curItem.setBtnState("购买","up");
				//购买
				var tid:number = DataCenter.storeGoods[curTempleId];
				var itemTemple:data.ItemTemple = temple.TempleManager.select(curTempleId) as data.ItemTemple;
				var shopTemple:data.ShopTemple = temple.TempleManager.select(tid) as data.ShopTemple;
				var itmeObj:any = {quality:itemTemple.itemQuality,itemName:itemTemple.name,imgS:Config.path_goods + itemTemple.icon+".png"};
				itmeObj.tid = tid;
				itmeObj.singleCost = shopTemple.sellPrice[0];
				if(shopType === this.TYPE_2){
					itmeObj.maxNum = DataCenter.playerAttr[data.PlayerAttr.gaozhuan_remaincount];
				}else{
					itmeObj.maxNum = DataCenter.playerAttr[data.PlayerAttr.chaozhuan_remaincount];
				}
				this.popShop(itmeObj);
			}else{
				curItem.setBtnState("购买","disabled");
			}
			
		}
	}
	private popShop(dataObj:any):void{
		PopUpManager.addPopUp(this.storeShop,true,this.storeShop.skinName,this.layer,0);
		this.storeShop.initData({maxNum:dataObj.maxNum,tid:dataObj.tid,singleCost:dataObj.singleCost,itemData:dataObj});
		PopUpManager.startClickHidden(this.storeShop.skinName,()=>{
			PopUpManager.removePopUp(this.storeShop.skinName,0);
		},this);
	}
	private exchangeXuewei():void{
		Global.dispatchEvent(MainNotify.USE_XIUWEI);
	}
	private sendToServer(templeID:number):void{
		Global.dispatchEvent(MainNotify.USE_GOODS,{useCount:1,templateId:templeID});
	}
	private item1DataChange(value:number):void{
		this.degraderemaincount = value;
		if(value){
			this.item1.count = value;
			this.item1.setBtnState("兑换","up");
			this.item1.commonBtn.touchEnabled = true;
		}else{
			this.item1.count = 0;
			this.item1.setBtnState("兑换","disabled");
			this.item1.commonBtn.touchEnabled = false;
		}
	}
	private item2DataChange(value:number):void{
		this.buyGaojiCount = value;
		if(value){
			this.item2.count = value;
			this.item2.commonBtn.touchEnabled = true;
		}else{
			this.item2.count = 0;
			this.item2.setBtnState("购买","disabled");
			this.item2.commonBtn.touchEnabled = false;
		}
	}
	private item3DataChange(value:number):void{
		this.buyChaojiCount = value;
		if(value){
			this.item3.count = value;
			this.item3.commonBtn.touchEnabled = true;
		}else{
			this.item3.count = 0
			this.item3.setBtnState("购买","disabled");
			this.item3.commonBtn.touchEnabled = false;
		}
	}
}