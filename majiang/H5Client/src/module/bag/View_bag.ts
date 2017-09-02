class View_bag extends Base_view{
	
	public returnBtn:eui.Image;
	public addBtn:eui.Image;
	public itemList:eui.List;
	public scroller:eui.Scroller;
	public equipBtn:BagBtn;
	public propBtn:BagBtn;
	public bagCapacity:eui.Group;
	public smeltBtn:Btn1;
	
	public equipNum:eui.Label;
	public arrayCollection:eui.ArrayCollection;
	private curModule:Module_bag;
	private addGridPop:Bag_addGrid;
	private sourceLen:number = 0;

	//判断装备数据源还是道具数据源 true or false;
	public state:boolean = true;
	public constructor() {
		super();
		this.skinName = "View_bag_skin";
	}
	protected childrenCreated():void{
		this.curModule = this.module as Module_bag;
		this.equipBtn.setAttr({text:"装备",currentState:"down"});
		this.propBtn.setAttr({text:"道具",currentState:"up"});
		this.smeltBtn.label = "熔炼";
		this.addGridPop = new Bag_addGrid();
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.arrayCollection = new eui.ArrayCollection()
		// this.refreshDataGroup({num:180,equipSource:"head_0_0_png"});
		this.itemList.dataProvider = this.arrayCollection;
		
		this.itemList.itemRenderer = GoodsItem;
		this.scroller.viewport = this.itemList;
		this.equipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.equipOper,this);
		this.propBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.propOper,this);
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		Global.addEventListener(MainNotify.USE_GOODS,this.onUseGoods,this);
		Global.addEventListener(MainNotify.HANDSHAKE_ADDBOXNUM,this.addBoxNum,this);
	}
	private equipOper(evt:egret.TouchEvent):void{
		//显示装备
		this.state = true;
		this.setStateChange([this.equipBtn,this.propBtn],["down","up"]);
		this.curModule.sendMsgToModule([ModuleEnum.BAG],MainNotify.SHOWEQUIP);
	}	
	private propOper(evt:egret.TouchEvent):void{
		//显示道具
		this.state = false;
		this.setStateChange([this.equipBtn,this.propBtn],["up","down"]);
		this.curModule.sendMsgToModule([ModuleEnum.BAG],MainNotify.SHOWPROP);
	}
	/**物品使用 */
	private onUseGoods(evt:lcp.ChangeEvent):void{
		this.curModule.sendUseGoodsDataToS(evt.c_data);
	}
	/**增加背包格子 */
	private addBoxNum(evt:lcp.ChangeEvent):void{
		this.curModule.sendAddBoxNumToS(evt.c_data);
	}
	/**物品item点击 */
	private onItemTap(evt:eui.ItemTapEvent):void{
		if(this.state){
			var itemInfoPop:Bag_itemInfo = new Bag_itemInfo();
			this.curModule.setItemInfo(itemInfoPop,evt.item);
		}else{
			var goodsItemInfo:Pop_goodsInfo = new Pop_goodsInfo();
			this.curModule.setItemInfo(goodsItemInfo,evt.item);
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				//点击返回
				this.removeView(1);
				break;
			case this.addBtn:
				//点击增加
				var layer = ViewController.getInstance().getContainer().layer_popup;
				var w:number = this.addGridPop.width;
				var h:number = this.addGridPop.height;
				PopUpManager.addPopUp(this.addGridPop,true,this.addGridPop.skinName,layer,0);
				break;
			case this.smeltBtn.button:
				this.curModule.sendMsgToModule([ModuleEnum.BAG_SMELT],MainNotify.OPENBAGSMELT);
				break;
			default :
				break;
		}
	}
	public removeView(closeState:number):void{
		this.curModule.removeView(closeState);
	}
	/**刷新背包dataGroup数据 */
	public refreshDataGroup(sourceLen:number):void{
		this.sourceLen = sourceLen;
		this.scroller.stopAnimation();
		this.scroller.validateNow();
		this.scroller.viewport.scrollV = 0;
		this.refreshBoxNum(this.sourceLen,DataCenter.playerAttr[data.PlayerAttr.bagcount]);
	}
	/**初始化背包按钮状态 */
	public initBtnState():void{
		this.equipBtn.setAttr({currentState:"down"});
		this.propBtn.setAttr({currentState:"up"});
		this.bagCapacity.visible = true;
	}
	/**设置按钮状态改变 */
	private setStateChange(btnArr:BagBtn[],btnState:string[]):void{
		for(var i:number = 0;i<btnArr.length;i++){
			btnArr[i].setAttr({currentState:btnState[i]});
			if(btnState[0] === "down"){
				this.bagCapacity.visible = true;
			}else{
				this.bagCapacity.visible = false;
			}
		}
	}
	/**更新背包格子数 */
	public refreshBoxNum(sourceLen:number,value:number):void{
		DataCenter.curBoxNum = sourceLen;
		this.equipNum.text = sourceLen+"/"+value;
	}
	public removeEvent():void{
		Global.removeEventListener(MainNotify.USE_GOODS,this.onUseGoods,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.equipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.equipOper,this);
		this.propBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.propOper,this);
		this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		Global.removeEventListener(MainNotify.HANDSHAKE_ADDBOXNUM,this.addBoxNum,this);
		this.curModule = null;
		this.addGridPop  = null;
	}
	
}