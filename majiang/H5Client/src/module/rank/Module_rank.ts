class Module_rank extends Base_module{
	private static rankData:any[];
	private curRankType:number;
	private openState:boolean;
	private shipIndex:number;
	private worShipExpWatcher:eui.Watcher;
	private worShipMoneyWatcher:eui.Watcher;
	public constructor() {
		super();
	}
	protected bindData():void{
		Module_rank.rankData = [];
		eui.Binding.bindHandler(Module_rank,["rankData"],this.rankDataChange,this);
	}
	private rankDataChange(value:any[]):void{
		if(value && value.length && this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.refreshRankData(value);
		}
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.OPENRANKPANEL:
				this.createView();
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
			case proto.MessageType.s_GetRankInfo:
				var roleDetail_msg:proto.s_GetRankInfo = msg as proto.s_GetRankInfo;
				if(roleDetail_msg.isSuccess){
					this.showRankPeopleData(roleDetail_msg.rankInfo.roleInfoList);
				}else{
					var obj:any = {type:TipsEnum.TYPE_WARN,label:roleDetail_msg.errMsg};
					PopTipsManager.showPopTips(obj);
				}
				break;
			case proto.MessageType.s_RankChange:
				var changeMsg:proto.s_RankChange = msg as proto.s_RankChange;
				this.dealWithRankChangeData(changeMsg);
				break;
			case proto.MessageType.s_GetRankList:
				var rankList_msg:proto.s_GetRankList = msg as proto.s_GetRankList;
				this.dealWithRankData(rankList_msg);
				break;
			case proto.MessageType.s_RankWorship:
				var shipList_msg:proto.s_RankWorship = msg as proto.s_RankWorship;
				DataCenter.shipList = shipList_msg.isWorshipList;
				break;
			case proto.MessageType.s_Worship:
				var ship_msg:proto.s_Worship = msg as proto.s_Worship;
				if(!ship_msg.isSuccess){
					var obj:any = {type:TipsEnum.TYPE_WARN,label:ship_msg.errMsg};
					PopTipsManager.showPopTips([obj]);
				}else{
					if(DataCenter.shipList.length){
						var count:number = -1;
						for(var key in DataCenter.rankGather){
							count++;
							if(parseInt(key) === this.shipIndex){
								break;
							}
						}
						DataCenter.shipList[count] = true;
						this.view.refreshMoBaiBtnState("disabled");
					}
				}
				break;
			default:
				break;
		}
	}
	private dealWithRankData(rankList:proto.s_GetRankList):void{
		var order:number = rankList.order;
		var rankData:proto.RankInfo[] = rankList.RankInfoList;
		var arr:any[] = [];
		for(var i:number = 0,len:number = rankData.length,item:proto.RankInfo;i<len;i++){
			item = rankData[i];
			arr.push(this.createSingelRoleInfo(item,i,order,"get"));
		}
		DataCenter.rankGather[order] = GlobalFunc.deepCopy(arr);
		GlobalFunc.sortByKey(DataCenter.rankGather);
	}
	private dealWithRankChangeData(changeData:proto.s_RankChange):void{
		var curRankData:any[] = DataCenter.rankGather[changeData.order];
		var pid:string = changeData.playerId;
		var curIndex:number = -1;
		var obj:any = this.createSingelRoleInfo(changeData,changeData.index,changeData.order,"change");
		for(var i:number = 0;i<curRankData.length;i++){
			if(pid === curRankData[i].playerId){
				curIndex = i;
				break;
			}
		}
		curRankData.splice(changeData.index,0,obj);
		if(curIndex === -1){
			//当前玩家未在榜内 移除最后一名的玩家
			curRankData.pop();
		}else{
			//在榜内  移除源玩家数据
			curRankData.splice(curIndex+1,1);
		}
		for(var j:number = 0;j<curRankData.length;j++){
			curRankData[j]["order"] = j+1;
		}
		if(this.openState && this.curRankType === changeData.order){
			//如果在当前排行榜 刷新数据
			this.setRankData(this.curRankType);
		}
	}
	/**创建排行榜单个人物信息 */
	private createSingelRoleInfo(item:any,index:number,order:number,type:string):void{
		var obj:any = {};
		var baseObj:any = this.createStaticBaseInfo(order);
		var searchGather:number[] = [data.PlayerAttr.FightValue,data.PlayerAttr.rebornID,data.PlayerAttr.levID,data.PlayerAttr.VIP];
		var searchData:any = GlobalFunc.searchMoreAttrValue(searchGather,item.playerAttrList);
		obj.uName = item.playerName;
		obj.playerId = item.playerId;
		obj.order = index+1;
		if(obj.playerId === DataCenter.playerId){
			DataCenter.curPlayerRank[order] = obj.order;
		}
		obj.rankType = order;
		obj.roleFightValueList = [];
		obj.uFightValue = searchData[data.PlayerAttr.FightValue]
		obj.roleInfo = item.roleInfoList;
		this.calculChangeValue(obj,type,item);
		var rebornTemple:data.RebornTemple = temple.TempleManager.select(searchData[data.PlayerAttr.rebornID]) as data.RebornTemple;
		var rebornLev:number = rebornTemple?rebornTemple.RELev:0;
		var playerLev:number = searchData[data.PlayerAttr.levID];
		var str:string = rebornLev?rebornLev+"转"+playerLev+"级":playerLev+"级";
		obj.uLev = str;
		obj.designation = "";//称号
		var vipNum:number = searchData[data.PlayerAttr.VIP];
		obj.vipNum = vipNum?vipNum:0;
		obj.rankLabel = baseObj.rankLabel;
		obj.state = baseObj.listItemSkin;
		if(!index){
			obj.firstState = baseObj.firstRankSkin;
		}
		return obj;
	}
	private index:number;
	public getRankData(dataObj:any):void{
		this.curRankType = dataObj.type;
		this.setRankData(this.curRankType);
	}
	public showRankPeopleData(clientRoleInfo:proto.Client_RoleInfo[]):void{
		this.sendMsgToModule([ModuleEnum.ROLEINFO],MainNotify.OPENROLEPANEL,{type:1,roleInfo:clientRoleInfo});
	}
	protected createView():void{
		this.view = new View_rank();
        super.createView();
		// this.view.refreshRoleMode(Config.path_man_in + "50012_a_0",Config.path_weapon_in + "51021_a_0");
		// this.view.refreshWingMode(Config.path_wing_in + "70000_a_0");
		this.setRankData(1);
		this.curRankType = 1;
		this.openState = true;
		this.worShipExpWatcher =  eui.Binding.bindProperty(DataCenter,["worShipExp"],this.view,"worShipExp");
		this.worShipMoneyWatcher = eui.Binding.bindProperty(DataCenter,["worShipMoney"],this.view,"worShipMoney");
	}
	private setRankData(value:number):void{
		this.refreshRoleModel(value);
		Module_rank.rankData = [];
		var curRank:number = DataCenter.curPlayerRank[value];
		var str:string = "";
		if(curRank){
			str = curRank + "";
		}else{
			str = "未入榜";
		}
		this.view.refreshCurRank(str);
		Module_rank.rankData = GlobalFunc.deepCopy(DataCenter.rankGather[value]);
	}
	private refreshRoleModel(value:number):void{
		var clientRoleInfo:proto.Client_RoleInfo[] = DataCenter.rankGather[value][0].roleInfo;
		var defaultRole:proto.Client_RoleInfo;
		if(value === 6 || value === 7 || value === 8){
			var job:number = DataCenter.rankData[value][0].profess;
			for(var j:number = 0;j<clientRoleInfo.length;j++){
				if(clientRoleInfo[j].job === job){
					defaultRole = clientRoleInfo[j];
					break;
				}
			}
		}else{
			defaultRole = clientRoleInfo[0];
		}
		var equips:proto.ItemData[] = defaultRole.equips;
		var rolePath:string;
		var weaponPath:string;
		var sex:number = defaultRole.roleAttr[data.RoleAttr.sex];
		if(equips.length){
			for(var i:number = 0;i<equips.length;i++){
				var equipPos:number = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos,equips[i].attrList);
				var itemTemple:data.ItemTemple = temple.TempleManager.select(equips[i].TempleID) as data.ItemTemple;
				// var sex:number = itemTemple.SEX;
				if(equipPos === data.EquipPos.weapon){
					weaponPath = (sex === 1)?Config.path_weapon_in + itemTemple.maleInIcon+"_a_0":Config.path_weapon_in + itemTemple.femaleInIcon+"_a_0";
				}
				if(equipPos === data.EquipPos.body){
					rolePath = (sex === 1)?Config.path_role_in + itemTemple.maleInIcon+"_a_0":Config.path_role_in + itemTemple.femaleInIcon+"_a_0";
				}
			}
		}
		var obj:any = DataCenter.jobInitData[defaultRole.job]
		if(!weaponPath){
			var weaponId:number = sex === 1?obj.maleWeaponID : obj.femaleWeaponID;
			weaponPath = Config.path_weapon_in + weaponId + "_a_0";
		}
		if(!rolePath){
			var clothId:number = sex === 1?obj.maleInIcon : obj.femaleInIcon;
			rolePath = Config.path_role_in + clothId + "_a_0";
		}
		
		this.view.refreshRoleMode(rolePath,weaponPath);
	}
	private calculChangeValue(obj,type,item):void{
		var rankType:number[] = DataCenter.rankData[obj.rankType][0].rankType;
		var job:number = DataCenter.rankData[obj.rankType][0].profess;
			//当前为排行榜数据获取
		switch(job){
			case data.JobAttr.Player:
				obj.uFightValue = GlobalFunc.searchAttrValue(data.PlayerAttr.FightValue,item.playerAttrList);
				break;
			case data.JobAttr.JS:
			case data.JobAttr.DS:
			case data.JobAttr.FS:
				if(type === "get"){
					var clientRoleInfo:proto.Client_RoleInfo[] = obj.roleInfo;
					for(var i:number = 0;i<clientRoleInfo.length;i++){
						if(clientRoleInfo[i].job === job){
							obj.uFightValue = clientRoleInfo[i].roleAttr[data.RoleAttr.FightValue];
							break;
						}
					}
				}else{
					for(var j:number = 0;j<item.RoleChangeList.length;j++){
						if(item.RoleChangeList.Job === job){
							var attrList:proto.AttrValue[] = item.RoleChangeList[j].AttrChangeList;
							obj.uFightValue = GlobalFunc.searchAttrValue(data.RoleAttr.FightValue,attrList);
							break;
						}
					}
				}
				break;
		}
	}
	public removeView():void{
		//关闭角色面板
		this.view.remove();
		this.view.parent.removeChild(this.view);
		this.openState = false;
		if(this.worShipExpWatcher){
			this.worShipExpWatcher.unwatch();
		}
		if(this.worShipMoneyWatcher){
			this.worShipMoneyWatcher.unwatch();
		}
	}
	//--------------------------向服务器获取消息----------------------
	public getRankInfo(playerId:string):void{
		var rankInfoMsg:proto.c_GetRankInfo = new proto.c_GetRankInfo();
		rankInfoMsg.playerId = playerId;
		SocketManager.getInstance().sendProto(rankInfoMsg);
	}
	public worShip(order:number):void{
		var ship_msg:proto.c_Worship = new proto.c_Worship();
		ship_msg.order = order;
		this.shipIndex = order;
		SocketManager.getInstance().sendProto(ship_msg);
	}
	//----------------------------------------------------------------
	/**
	 * 生成排行榜静态信息
	 * param--------
	 * listItemSkil item皮肤
	 * rankLabel 比较值
	 */
	private createStaticBaseInfo(order):any{
		var obj:any = {};
		obj.firstRankSkin = "rank_first";
		obj.job = data.JobAttr.Player;
		switch(order){
			case 2:
				//等级
				obj.listItemSkin = "lev_rank";
				obj.rankLabel = "";
				obj.firstRankSkin = "rank_first2"
				break;
			case 6:
				//战士
				obj.listItemSkin = "other_rank";
				obj.rankLabel = "战士战力:";
				obj.job = data.JobAttr.JS;
				break;
			case 7:
				//法师
				obj.listItemSkin = "other_rank";
				obj.rankLabel = "法师战力:";
				obj.obj = data.JobAttr.FS;
				break;
			case 8:
				//道士
				obj.listItemSkin = "other_rank";
				obj.rankLabel = "道士战力:";
				obj.job = data.JobAttr.DS;
				break;
			case 1:
				//战力
				obj.listItemSkin = "other_rank";
				obj.rankLabel = "战斗力:";
				break;
		}
		return obj;
	}
}