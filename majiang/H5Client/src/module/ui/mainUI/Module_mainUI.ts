class Module_mainUI extends Base_module{
	
	private skinState:number;
	private buyItemId:number;
	private buyItemNum:number;
	private entrance:number;
	public autoChallengeState:boolean = false;
	private levelId:number = 0;
	public constructor() {
		super();
	}

	protected bindData():void{
		DataCenter.curFuBen = data.SenceType.YeWai;
		eui.Binding.bindHandler(DataCenter,["playerAttr"],this.dealWithMainUIData,this);
		eui.Binding.bindHandler(DataCenter,["count"],this.onCountChange,this);
		eui.Binding.bindHandler(DataCenter,["playerInfo","curHp"],this.hpChangeHandler,this);
		eui.Binding.bindHandler(this,["skinState"],this.senceChange,this);
		eui.Binding.bindHandler(DataCenter,["curFuBen"],this.curSenceChange,this);
	}

	//////////////////////////////数据绑定函数///////////////
	private curSenceChange(value:number):void{
		this.skinState = value;
		var levId:number = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
		this.refreshLevelInfo(levId);
	}
	private dealWithMainUIData(value:Array<number>):void{
		if(value!=null){
			DataCenter.playerPower = value[data.PlayerAttr.FightValue];
			DataCenter.playerInfo.curHp = DataCenter.playerInfo.tolHp;
			DataCenter.playerInfo.curMp = DataCenter.playerInfo.tolMp;
		}
	}
	private onCountChange(value):void{
		if(value != null){
			var len = DataCenter.bag.curDropGroup.length;
			if( len && (value >= len)){
				DataCenter.count = 0;
				PopTipsManager.showPopTips(DataCenter.bag.curDropGroup);
			}
		}
	}
	private hpChangeHandler(value):void{
		if(value != null && this.view){
			this.view.changeHpPoll(value);
			// if(value === DataCenter.playerInfo.tolHp){
			// 	this.view.changeHpPoll(DataCenter.playerInfo.tolHp);
			// }else{
			// 	this.view.changeHpPoll(this.damage);
			// }
		}
	}
	private senceChange(value:number):void{
		if(!isNaN(value) && this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.changeScene(value);
		}
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
	private damage:number;
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.INITNAVFOCUS:
				this.view.initNavFocus(null);
				break;
			case MainNotify.REDUCE_POLLBALL:
				this.damage = dataRes.damage;
				DataCenter.playerInfo.curHp -= this.damage;
				break;
			case MainNotify.RESET_POOLBALL:
				DataCenter.playerInfo.curHp = DataCenter.playerInfo.tolHp;
				break;
			// case MainNotify.INITDATA:
			// 	break;
			case MainNotify.ADDCHAT:
				var msg:proto.s_ChatInfo = null;
				if(dataRes){
					msg = dataRes.msg;
				}
				if(this.view && this.view.parent && this.view.parent.contains(this.view)){
					this.view.showChat(msg);
				}
				break;
			case MainNotify.CHANGESCENE:
				this.createView();
				this.view.showChat();
				break;
			case MainNotify.TIMESTART:
				this.view.startTime();
				break;
			case MainNotify.TIMEEND:
				this.view.stopTime();
				break;
			default:
				break;
		}
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_BuyItem:
				var buyMsg:proto.s_BuyItem = msg as proto.s_BuyItem;
				DataCenter.buyItemState = buyMsg.isSuccess+"@@"+Math.random();
				if(!buyMsg.isSuccess){
					var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"购买失败"}];
					PopTipsManager.showPopTips(obj);temple
					return;
				}else{
					var template:data.ShopTemple = temple.TempleManager.select(this.buyItemId) as data.ShopTemple;
					var itemTemplate:data.ItemTemple = temple.TempleManager.select(template.ItemID) as data.ItemTemple;
					var obj:any[] = [{type:TipsEnum.TYPE_EQUIP,quality:itemTemplate.itemQuality,label:itemTemplate.name,num:this.buyItemNum}];
					PopTipsManager.showPopTips(obj);
					if(this.entrance){
						//从神秘商店购买材料
						this.sendMsgToModule([ModuleEnum.STORE],MainNotify.DEALBUYITEMDATA);
					}
				}
				break;
			case proto.MessageType.s_SyncTime:
				var time_msg:proto.s_SyncTime = msg as proto.s_SyncTime;
				var clientTime:number = time_msg.clientTime;
				var serverTime:number = time_msg.serverTime;
				var delayTime = serverTime - clientTime;
				DataCenter.serverTimer = serverTime + delayTime;
				break;
			case proto.MessageType.s_LeaveBossRoom:
				var leave_msg:proto.s_LeaveBossRoom = msg as proto.s_LeaveBossRoom;
				if(leave_msg.isSuccess){
					this.sendMsgToModule([ModuleEnum.ACTION],MainNotify.INITDATA);
					DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
					GlobalFunc.changeSence(DataCenter.curSceneId,this);
					// SocketManager.getInstance().sendProto(new proto.c_move());
				}else{
					PopTipsManager.showPopTips([{type:TipsEnum.TYPE_WARN,label:leave_msg.errMsg}]);
					return;
				}
				break;
			default:
				break;
		}
	}
	// private dealWithAttr(attrMsg:proto.s_setAttr):void{
	// 	var attrValue:proto.AttrValue[] = attrMsg.setAttr;
	// 	for(var i:number = 0;i<attrValue.length;i++){
	// 		switch(attrValue[i].type){
	// 			case 0:
	// 				DataCenter.basePlayerInfo.playerAttr[attrValue[i].attrID] = attrValue[i].myvalue;
	// 				break;
	// 			case 1:
	// 				break;
	// 			case 2:
	// 				break;
	// 			case 3:
	// 				break;
	// 		}
	// 	}
		
	// }
	protected createView():void{
		if(this.view){
			return;
		}
		this.view = new View_mainUI();
		DataCenter.challengeNum = DataCenter.playerAttr[data.PlayerAttr.LevelCount]+"@@"+Math.random();
        ViewController.getInstance().getContainer().layer_ui.addChild(this.view);
		eui.Binding.bindProperty(DataCenter.playerAttr,[data.PlayerAttr.FightValue+""],this.view,"power");
		eui.Binding.bindProperty(DataCenter.playerAttr,[data.PlayerAttr.money+""],this.view,"money");
		eui.Binding.bindProperty(DataCenter,["playerName"],this.view,"uname");
		eui.Binding.bindProperty(DataCenter.playerAttr,[data.PlayerAttr.gold+""],this.view,"gold");
		eui.Binding.bindProperty(DataCenter.playerAttr,[data.PlayerAttr.VIP+""],this.view,"vip");
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.levID+""],this.levelChange,this);
		eui.Binding.bindHandler(DataCenter,["challengeNum"],this.levelCountChange,this);
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.levelStageID+""],this.levelIdChange,this);
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.exp+""],this.playerCurHpChange,"this");
		this.view.refreshRoleInfoData();
		this.syncTime();
	}
	private levelChange(value:number):void{
		this.view.level = value;
		DataCenter.playerMaxExp = DataCenter.levelData[value].Exp;
		DataCenter.worShipExp = DataCenter.levelData[value].worshipExp;
		DataCenter.worShipMoney = DataCenter.levelData[value].worshipMoney;
	}
	private playerCurHpChange(value:number):void{
		DataCenter.playerCurExp = value;
	}
	private levelCountChange(value:string):void{
		if(value){
			var count:number = parseInt(value.split("@@").shift());
			this.view.refreshChallengeNum(count);
			if(this.autoChallengeState && DataCenter.curFuBen === data.SenceType.YeWai && count >= 3){
				//开启自动挑战状态
				GlobalFunc.changeSence(this.levelId,this);
			}
		}
		
	}
	private levelIdChange(value:number):void{
		if(value){
			this.refreshLevelInfo(value);
		}
	}
	private refreshLevelInfo(levelId:number):void{
		var obj:any = {};
		var template:data.LevelStageTemple = temple.TempleManager.select(levelId) as data.LevelStageTemple;
		this.levelId = template.BossMap;
		var template2:data.LevelStageTemple = temple.TempleManager.select(template.BossMap) as data.LevelStageTemple;
		switch(DataCenter.curFuBen){
			case data.SenceType.YeWai:
				obj = {
					levName:"第"+template.LevelNum+"关\t"+template.Name,
					getMoney:template.Money,
					getExp:template.Exp,
					skinState:"mainState"
				}
				break;
			case data.SenceType.GuanQia:
				obj = {
					levName:"关卡守卫:\t"+template2.LevelNum+"关",
					fDesc:template2.Desc,
					skinState:"fubenState"
				}
				break;
			case data.SenceType.GeRenBoss:
				obj = {
					levName:"个人boss",
					fDesc:"奖励:金币、经验、精魄、装备、道具",
					skinState:"fubenState"
				}
				break;
			case data.SenceType.FuBen:
				obj = {
					levName:"个人boss",
					fDesc:"奖励:金币、经验、精魄、装备、道具",
					skinState:"fubenState"
				}
				break;
			default:
				break;
		}
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.refreshLevelInfo(obj);
		}
	}
	public syncTime():void{
		var time_msg:proto.c_SyncTime = new proto.c_SyncTime();
		var time:number = Math.floor(new Date().getTime()/1000);
		time_msg.clientTime = time;
		SocketManager.getInstance().sendProto(time_msg);
	}
	public leaveBossRoom():void{
		var leave_msg:proto.c_LeaveBossRoom = new proto.c_LeaveBossRoom();
		leave_msg.bossTemplateId = DataCenter.curBossRoomId;
		SocketManager.getInstance().sendProto(leave_msg);
	}
	public sendToSByItem(dataObj:any):void{
		var shopTemple:data.ShopTemple = temple.TempleManager.select(dataObj.ID) as data.ShopTemple;
		var itemTemple:data.ItemTemple = temple.TempleManager.select(shopTemple.ItemID) as data.ItemTemple;
		var boxNum:number = DataCenter.playerAttr[data.PlayerAttr.bagcount];
		if(DataCenter.curBoxNum >= boxNum && itemTemple.itemtype1 === 2){
			//背包数据已满无法购买装备
			var popObj:any = {type:TipsEnum.TYPE_WARN,label:"背包已满"};
			PopTipsManager.showPopTips([popObj]);
			return;
		}
		DataCenter.buyItemState = "false@@"+Math.random()
		var cBuyItemMsg:proto.c_BuyItem = new proto.c_BuyItem();
		cBuyItemMsg.ID = dataObj.ID;
		this.buyItemId = dataObj.ID;
		cBuyItemMsg.num = dataObj.num;
		this.buyItemNum = dataObj.num;
		this.entrance = dataObj.entrance;
		SocketManager.getInstance().sendProto(cBuyItemMsg);
	}
}