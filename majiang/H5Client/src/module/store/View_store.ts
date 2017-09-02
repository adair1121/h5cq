class View_store extends Base_view{
	public scroller:eui.Scroller;
	public itemList:eui.List;
	public mySteryBtn:BagBtn;
	public gongxunBtn:BagBtn;
	public propBtn:BagBtn;
	public exchangeWord:UI_ConnectWord;
	public getGongxun:UI_ConnectWord;
	public gongxunValue:eui.Label;
	public jifen:eui.Label;
	public prompt:eui.Label;
	public buyAllBtn:eui.Image;
	public refreshBtn:eui.Image;
	public refreshTime:eui.Label;
	public myScroe:eui.Label;
	public returnBtn:eui.Image;
	private curBtn:BagBtn;
	private curModule:Module_store;
	private arrayCollect:eui.ArrayCollection;
	private myTimer:egret.Timer;
	private pop_goods:Pop_goodsInfo;
	private storeShop:Store_shop;
	private static curItemData:any;
	private layer:eui.Component;
	private itemInfoPop:Bag_itemInfo;
	public constructor() {
		super();
		this.skinName = "View_store_skin";
	}
	protected childrenCreated():void{
		this.curModule = this.module as Module_store;
		this.arrayCollect = new eui.ArrayCollection();
		this.itemList.itemRenderer = Store_item;
		this.itemList.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.itemList;
		this.mySteryBtn.setAttr({text:"神秘商店",size:18});
		this.propBtn.setAttr({text:"道具商城",size:18});
		this.gongxunBtn.setAttr({text:"功勋商城",size:18});
		this.curBtn = this.mySteryBtn;
		this.changeTap(this.mySteryBtn);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this,false,2);
		this.itemList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onListTouch,this,false,1);
		// Global.addEventListener(MainNotify.STOREBUYITEM,this.buyItem,this);
		this.myTimer = new egret.Timer(1000);
		this.myTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.myTimer.start();
		this.pop_goods = new Pop_goodsInfo();
		this.storeShop = new Store_shop();
		this.itemInfoPop = new Bag_itemInfo();
		this.layer = ViewController.getInstance().getContainer().layer_popup;
		this.getGongxun.setClickFunction(this.getGongxunHandler,this);
		this.exchangeWord.setClickFunction(this.injifengStore,this);
		//测试使用==============================================
		// this.curModule.getStoreData({type:0,isRefresh:false});
		var jifenNum:number = DataCenter.playerAttr[data.PlayerAttr.shopScore];
		this.myScroe.text = jifenNum?jifenNum+"":0+"";
	}
	private getGongxunHandler():void{
		var getGoods1:Get_Goods_pop= new Get_Goods_pop();
		PopUpManager.addPopUp(getGoods1,true,getGoods1.skinName,ViewController.getInstance().getContainer().layer_popup,0);
		PopUpManager.startClickHidden(getGoods1.skinName);
		var obj:any = {quality:5,itemName:"功勋",imgS:"king_title_png",state:1};
		getGoods1.refreshItem({shopData:obj,itemData:[{itemWay:"王者争霸",icon:"popup_box_png"}]});
	}
	private injifengStore():void{
		this.skin.currentState = "jifen";
		Module_store.storeType = 3;
		var jifenNum:number = DataCenter.playerAttr[data.PlayerAttr.shopScore];
		this.jifen.text =jifenNum?jifenNum+"": 0+"";
		this.prompt.x = this.jifen.x+this.jifen.width + 10;
		this.curModule.getStoreData({type:3,isRefresh:false});
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.mySteryBtn.button:
				this.changeTap(this.mySteryBtn);
				this.skin.currentState = "myStery";
				var jifenNum:number = DataCenter.playerAttr[data.PlayerAttr.shopScore];
				this.myScroe.text = jifenNum?jifenNum+"":0+"";
				Module_store.storeType = 0;
				this.curModule.getStoreData({type:0,isRefresh:false});
				break;
			case this.propBtn.button:
				this.changeTap(this.propBtn);
				this.skin.currentState = "prop";
				Module_store.storeType = 1;
				this.curModule.getStoreData({type:1,isRefresh:false});
				break;
			case this.gongxunBtn.button:
				this.changeTap(this.gongxunBtn);
				this.skin.currentState = "gongxun";
				Module_store.storeType = 2;
				var gongxun:number = DataCenter.playerAttr[data.PlayerAttr.gongxun];
				this.gongxunValue.text =gongxun?gongxun+ "":0+"";
				this.curModule.getStoreData({type:2,isRefresh:false});
				break;
			// case this.buyAllBtn:
			// 	this.curModule.buyAll();
			// 	break;
			case this.refreshBtn:
				var costTemple:data.GlobalDefineTemple = temple.TempleManager.select(DataCenter.steryRefreshCost) as data.GlobalDefineTemple;
				var curGold:number = DataCenter.playerAttr[data.PlayerAttr.gold];
				if(curGold < costTemple.argument){
					var obj:any = {type:TipsEnum.TYPE_WARN,label:"元宝不足"};
					PopTipsManager.showPopTips([obj]);
					return;
				}
				this.curModule.refreshSteryShop();
				break;
			case this.returnBtn:
				if(Module_store.storeType === 3){
					this.changeTap(this.mySteryBtn);
					this.skin.currentState = "myStery";
					Module_store.storeType = 0;
					this.curModule.getStoreData({type:0,isRefresh:false});
					return;
				}
				this.curModule.removeView();
				break;
			default:
				break;
		}
	}
	// private buyItem(evt:lcp.ChangeEvent):void{
	// 	PopUpManager.removePopUp(this.storeShop.skinName,0);
	// 	var dataObj:any = {
	// 		num:evt.c_data.num,
	// 		ID:View_store.curItemData.itemId,
	// 		entrance:evt.c_data.entrance
	// 	}
	// 	Module_store.buyItemId = View_store.curItemData.itemId;
	// 	Global.dispatchEvent(MainNotify.BUYITEM,dataObj);
	// }
	private onListTouch(evt:egret.TouchEvent):void{
		if(evt.target === this.targetItem.buyBtn){
			switch(this.skin.currentState){
				case "myStery":
					var msg:string = "";
					var type:number = View_store.curItemData.moneyType[0];
					var hasNum:number = DataCenter.playerAttr[type];
					if(type === data.PlayerAttr.gold){
						//道具购买
						msg = "元宝不足"
					}else{
						//装备购买
						msg = "金币不足";
					}
					if(View_store.curItemData.cost[0] > hasNum){
						var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:msg}];
						PopTipsManager.showPopTips(obj);
						return;
					}else{
						Module_store.buyItemId = View_store.curItemData.itemId;
						Global.dispatchEvent(MainNotify.BUYITEM,{ID:View_store.curItemData.itemId,num:1,entrance:1});
					}
					// var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"神秘商店点击购买"}];
					// PopTipsManager.showPopTips(obj);
					break;
				case "prop":
					PopUpManager.addPopUp(this.storeShop,true,this.storeShop.skinName,this.layer,0);
					var itemObj:any = {
						quality:View_store.curItemData.quality,
						itemName:View_store.curItemData.itemName,
						imgS:View_store.curItemData.imgS,
					};
					this.storeShop.initData({tid:View_store.curItemData.itemId,singleCost:View_store.curItemData.cost[0],itemData:itemObj});
					PopUpManager.startClickHidden(this.storeShop.skinName,()=>{
						PopUpManager.removePopUp(this.storeShop.skinName,0);
					},this);
					break;
				case "gongxun":
					var gongxunNum:number = DataCenter.playerAttr[data.PlayerAttr.gongxun];
					if(View_store.curItemData.cost[0] > gongxunNum){
						var tipsObj:any = {type:TipsEnum.TYPE_WARN,label:"功勋值不足,无法兑换物品"};
						PopTipsManager.showPopTips([tipsObj]);
						return;
					}
					Global.dispatchEvent(MainNotify.BUYITEM,{ID:View_store.curItemData.itemId,num:1,entrance:0});
					break;
				case "jifen":
					// var jifenNum:number = DataCenter.playerAttr[data.PlayerAttr.jifen]
					var len:number = View_store.curItemData.moneyType.length;
					var type:number = 0;
					var sellPrice:number[] = View_store.curItemData.cost;
					var msg:string = "";
					for(var i:number = 0;i<len;i++){
						type = View_store.curItemData.moneyType[i];
						var curHas:number = DataCenter.playerAttr[type];
						var price:number = sellPrice[i];
						if(curHas < price){
							type === data.PlayerAttr.gold?msg = "货币不足":msg = "积分不足";
							PopTipsManager.showPopTips([{type:TipsEnum.TYPE_WARN,label:msg}]);
							return;
						}
					}
					Global.dispatchEvent(MainNotify.BUYITEM,{ID:View_store.curItemData.itemId,num:1,entrance:0});
					break;
				default:
					break;
			}
		}
		// else{
		// 	if(View_store.curItemData.type){
		// 		//道具
		// 		PopUpManager.addPopUp(this.pop_goods,true,this.pop_goods.skinName,this.layer,0);
		// 		var popInfo:any = {
		// 			quality:View_store.curItemData.quality,
		// 			equipSource:View_store.curItemData.imgS,
		// 			num:View_store.curItemData.goodsNum,
		// 			level:View_store.curItemData.lev,
		// 			skinType:0,
		// 			canUse:0,
		// 			itemName:View_store.curItemData.itemName,
		// 			itemDesc:[{desc:View_store.curItemData.desc}]
		// 		};
		// 		this.pop_goods.setGoodsPopInfo(popInfo);
		// 		PopUpManager.startClickHidden(this.pop_goods.skinName,()=>{
		// 			PopUpManager.removePopUp(this.pop_goods.skinName,0);
		// 		},this);
		// 	}else{
		// 		//装备
		// 		this.curModule.setItemInfo(this.itemInfoPop,View_store.curItemData);
		// 	}
		// }
		
	}
	private targetItem:Store_item;
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.targetItem = this.itemList.getChildAt(evt.itemIndex) as Store_item;
		View_store.curItemData = evt.item;
	}
	private onTimer(evt:egret.Timer):void{
		if(Module_store.timeSpan){
			Module_store.timeSpan -= 1;
			this.refreshCurTime(Module_store.timeSpan);
		}
	}
	public refreshData(source:any[]):void{
		this.arrayCollect.source = source;
	}
	public refreshCurTime(refreshTime:number):void{
		this.refreshTime.text = this.formatTime(Module_store.timeSpan);
		if(Module_store.timeSpan === 0){
			this.curModule.getStoreData({type:0,isRefresh:true});
		}
	}
	public refreshMyScore(score:number):void{
		this.myScroe.text = score+"";
		this.jifen.text = score+"";
	}
	public refreshGongxunValue(score:number):void{
		this.gongxunValue.text = score + "";
	}
	private formatTime(tipmspan:number):string{
		// var data = new Date(tipmspan);
		var hour:number = (tipmspan/3600)>>0;
		var minutes:number = (tipmspan%3600/60)>>0;
		var seconds:number = (tipmspan%3600%60)>>0;
		var str:string = (hour<10?"0"+hour:hour)+":"+(minutes<10?"0"+minutes:minutes)+":"+(seconds < 10?"0"+seconds:seconds);
		return str;
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn){
		this.scroller.stopAnimation();
		this.scroller.viewport.scrollV = 0;
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
	}
	public removeEvent():void{
		this.myTimer.stop();
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		// Global.removeEventListener(MainNotify.STOREBUYITEM,this.buyItem,this);
		this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this,false);
		this.itemList.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onListTouch,this,false);
		this.myTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.myTimer = null;
	}
}