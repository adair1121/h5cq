class View_rank extends Base_view{
	public roleWing:eui.Group;
	public roleModuleGroup:eui.Group;
	private wingMc:MovieClip;
	private roleMc:MovieClip;
	private weaponMc:MovieClip;
	public rank_first:Rank_roleInfo_item;
	public scroller:eui.Scroller;
	public itemList:eui.List;
	public returnBtn:eui.Image;
	public btnGroup:eui.Group;
	public playerRank:eui.Label;
	public worShipBtn:eui.Button;
	public getMoney:eui.Label;
	public getExp:eui.Label;
	private curModule:Module_rank;
	private itemArr:eui.ArrayCollection;
	private curBtn:Btn2;
	// private rankBtn:string[];
	private index:number = 0;
	private firstData:any;
	private firstPlayerId:string;
	public constructor() {
		super();
		this.skinName = "View_rank_skin";
	}
	protected childrenCreated():void{
		// this.rankBtn = ["战力榜","等级榜","神翼榜","王者榜","遭遇榜","战圣榜","法神榜","道尊榜","神功榜"];
		this.curModule = this.module as Module_rank;
		this.wingMc = new MovieClip();
		this.weaponMc = new MovieClip();
		this.roleMc = new MovieClip();
		this.itemArr = new eui.ArrayCollection();
		this.itemList.itemRenderer = Rank_roleInfo_item;
		this.itemList.dataProvider = this.itemArr;
		this.scroller.viewport = this.itemList;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.roleModuleGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowOtherPanel,this);
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.rank_first.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowOtherPanel,this);
		this.dealWithRankBtn();
		if(DataCenter.shipList.length){
			var count:number = -1;
			for(var key in DataCenter.rankGather){
				count++;
				if(parseInt(key) === this.index){
					break;
				}
			}
			var boo:boolean = DataCenter.shipList[count];
			boo?this.refreshMoBaiBtnState("disabled"):this.refreshMoBaiBtnState("up");
		}
	}
	private dealWithRankBtn():void{
		var rankData:any = DataCenter.rankGather;
		var num:number = 0;
		for(var key in rankData){
			var btnLabel:string = DataCenter.rankData[key][0].name;
			var rankBtn:Btn2 = new Btn2();
			rankBtn.label = btnLabel;
			rankBtn.order = parseInt(key);
			this.btnGroup.addChild(rankBtn);
		}
		if(this.btnGroup.numChildren){
			this.curBtn = this.btnGroup.getChildAt(0) as Btn2;
			this.index = this.curBtn.order;
			this.curBtn.currentState = "down";
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(evt.target.parent instanceof Btn2){
			this.index = evt.target.parent.order;
			// if(this.index === 3 || this.index === 4 || this.index === 8){
			// 	return;
			// }
			if(DataCenter.shipList.length){
				var count:number = -1;
				for(var key in DataCenter.rankGather){
					count++;
					if(parseInt(key) === this.index){
						break;
					}
				}
				var boo:boolean = DataCenter.shipList[count];
				boo?this.refreshMoBaiBtnState("disabled"):this.refreshMoBaiBtnState("up");
			}
			this.changeBtnState(evt.target.parent);
			this.curModule.getRankData({type:this.index});
			return;
		}
		switch(evt.target){
			case this.returnBtn:
				this.curModule.removeView();
				break;
			case this.worShipBtn:
				this.curModule.worShip(this.index);
				break;
			default:
				break;
		}
	}
	public refreshMoBaiBtnState(state:string):void{
		if(state === "disabled"){
			this.worShipBtn.touchEnabled = false;
			this.worShipBtn.label = "已膜拜";
		}else{
			this.worShipBtn.touchEnabled = true;
			this.worShipBtn.label = "膜拜";
		}
		this.worShipBtn.currentState = state;
	}
	private set worShipExp(value:number){
		var str:string = "";
		if(value > 10000){
			str = (value/10000).toFixed(1) + "万";
		}else{
			str = value+"";
		}
		this.getExp.text = str;
	}
	private set worShipMoney(value:number){
		var str:string = "";
		if(value > 10000){
			str = (value/10000).toFixed(1)+"万";
		}else{
			str = value+"";
		}
		this.getMoney.text = str;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.curModule.getRankInfo(evt.item.playerId);
	}
	private onShowOtherPanel(evt:egret.TouchEvent):void{
		this.curModule.getRankInfo(this.firstPlayerId);
	}
	/**更新角色模型 */
	public refreshRoleMode(roleModePath:string = "",roleWeaponPath:string = ""):void{
		this.weaponMc.loadFile(roleWeaponPath,true,-1,null,this);
        this.roleModuleGroup.addChild(this.weaponMc);
		this.roleMc.loadFile(roleModePath,true,-1,null,this);
		this.roleModuleGroup.addChild(this.roleMc);
		this.roleMc.x = (this.roleModuleGroup.width >> 1);
		this.roleMc.y = (this.roleModuleGroup.height >> 1) + 25;
		this.weaponMc.x = this.roleMc.x;
		this.weaponMc.y = this.roleMc.y;
	}
	/**更新翅膀模型 */
	public refreshWingMode(roleWingPath:string = ""):void{
		this.wingMc.loadFile(roleWingPath,true,-1,null,this)
        this.roleWing.addChild(this.wingMc);
		this.wingMc.x = (this.roleWing.width >> 1)
		this.wingMc.y = (this.roleWing.height >>1) + 25;
	}
	/**更新排行榜数据 */
	public refreshRankData(dataObj:any[]):void{
		this.firstData= dataObj.shift();
		this.rank_first.userLev = this.firstData.uLev;
		this.rank_first.userName = this.firstData.uName;
		this.rank_first.userFightValue = this.firstData.uFightValue;
		this.rank_first.stateName = this.firstData.firstState;
		this.rank_first.rankLabel = this.firstData.rankLabel;
		this.firstPlayerId = this.firstData.playerId;
		this.itemArr.source = dataObj;
	}
	/**更新玩家当前排名 */
	public refreshCurRank(cnt:string):void{
		this.playerRank.text = cnt;
	}
	private changeBtnState(button:Btn2):void{
		this.scroller.stopAnimation();
		this.scroller.viewport.scrollV = 0;
		this.curBtn.currentState = "up";
		this.curBtn = button;
		this.curBtn.currentState = "down";
	}
	public remove():void{
		this.wingMc.gotoAndStop(0);
		this.wingMc = null;
		this.roleMc.gotoAndStop(0);
		this.roleMc = null;
		this.weaponMc.gotoAndStop(0);
		this.weaponMc = null;
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.rank_first.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowOtherPanel,this);
		this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}