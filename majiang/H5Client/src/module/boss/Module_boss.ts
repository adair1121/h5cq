class Module_boss extends Base_module{
	private curBossId:number;
	private curFuBen:number;
	private bossList:proto.BossInfo[];
	private personBossData:any[];
	private worldBossData:any[];
	private BOSS_PERSONAL:number = 1;
	private BOSS_WORLD:number = 2;
	private BOSS_ZHUANSHENG:number = 3;
	private TYPE_PERSONAL:string = "personal";
	private TYPE_WORLD:string = "world";
	public constructor() {
		super();
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_PersonalBoss:
				var person_msg:proto.s_PersonalBoss = msg as proto.s_PersonalBoss;
				if(person_msg.isWin){
					//战斗胜利
					this.changePersonalBossData(this.curBossId);
					this.sendMsgToModule([ModuleEnum.ACTION],MainNotify.EXTRACTIONLIST,{actionList:person_msg.actList});
				}else{
					DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
					GlobalFunc.changeSence(DataCenter.curSceneId,this);
				}
				break;
			case proto.MessageType.s_WorldBoss:
				var world_msg:proto.s_WorldBoss = msg as proto.s_WorldBoss;
				var layer:eui.Component = ViewController.getInstance().getContainer().layer_ui;
				if(world_msg.isWin){
					var len:number = world_msg.DropList.length;
					var popArr:any[] = [];
					for(var i:number= 0,item:proto.ItemData;i<len;i++){
						item = world_msg.DropList[i];
						var obj:any = {}
						var template:data.ItemTemple = temple.TempleManager.select(item.TempleID) as data.ItemTemple;
						obj.quality = template.itemQuality,
						obj.num = GlobalFunc.searchAttrValue(data.ItemAttr.count,item.attrList);
						obj.type = TipsEnum.TYPE_EQUIP;
						obj.label = template.name;
						if(template.itemtype1 === 1 || template.itemtype1 === 3){
							obj.imgSource = Config.path_goods + template.icon+".png";
						}else{
							obj = Config.path_equip + template.icon+".png";
						}
						obj.itemName = template.name;
						obj.color = DataCenter.bag.qualityColor[obj.quality];
						obj.boxS = GlobalFunc.setBgData(obj.quality).boxS;
						popArr.push(obj);
					}
					PopTipsManager.showPopTips(popArr);
					var awardPanel:Boss_award = new Boss_award();
					PopUpManager.addPopUp(awardPanel,true,awardPanel.skinName,layer,0);
					awardPanel.setData(popArr,this,ModuleEnum.BOSS,MainNotify.OPENPERSONALBOSSPANEL,{type:"world"});
					// var bossTemple:data.BossTemple = temple.TempleManager.select(this.curBossId) as data.BossTemple;
					// this.changeWorldBossData(this.curBossId,false,bossTemple.refreshTime*60);
				}else{
					DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
					GlobalFunc.changeSence(DataCenter.curSceneId,this);
				}
				break;
			case proto.MessageType.s_PersonalBossList:
				var bossListMsg:proto.s_PersonalBossList = msg as proto.s_PersonalBossList;
				this.bossList = bossListMsg.bossInfoList;
				break;
			case proto.MessageType.s_WorldBossList:
				var worldBossList:proto.s_WorldBossList = msg as proto.s_WorldBossList;
				this.worldBossData = [];
				this.dealWithBossList(worldBossList.bossInfoList,worldBossList.serverTime);
				break;
			case proto.MessageType.s_BossAck:
				var ack_msg:proto.s_BossAck = msg as proto.s_BossAck;
				if(ack_msg.isSuccess){
					DataCenter.curFuBen = this.curFuBen;
					DataCenter.changeSenceState = true;
					var bossTemple:data.BossTemple = temple.TempleManager.select(this.curBossId) as data.BossTemple;
					this.sendMsgToModule([ModuleEnum.MAP,ModuleEnum.ACTION],MainNotify.INITDATA);
					this.sendMsgToModule([ModuleEnum.MAP],MainNotify.CHANGESCENE,{mapId:bossTemple.mapID});
					this.removeView();
				}else{
					PopTipsManager.showPopTips([{type:TipsEnum.TYPE_WARN,label:ack_msg.errMsg}]);
					return;
				}
				break;
			default:
				break;
		}
	}
	protected bindData():void{
		this.personBossData = [];
		this.worldBossData = [];
	}
	//////////////////////////////数据绑定函数///////////////
	
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.OPENPERSONALBOSSPANEL:
				this.createView(dataRes);
				break;
			default :
				break;
		}
	}
	//========================发送消息到服务器============================
	/**挑战个人boss */
	public challengePersonalBoss(dataObj:any):void{
		var msg:proto.c_PersonalBoss = new proto.c_PersonalBoss();
		msg.bossTemplateId = dataObj.bossId;
		this.curFuBen = data.SenceType.GeRenBoss;
		this.curBossId = dataObj.bossId;
		SocketManager.getInstance().sendProto(msg);
	}
	/**挑战全名boss */
	public challengeWorldBoss(dataObj:any):void{
		var boss_msg:proto.c_WorldBoss = new proto.c_WorldBoss();
		this.curFuBen = data.SenceType.FuBen;
		boss_msg.bossTemplateId = dataObj.bossId;
		this.curBossId = dataObj.bossId;
		SocketManager.getInstance().sendProto(boss_msg);
	}
	/**获取世界boss列表 */
	public getWorldBossData():void{
		var msg:proto.c_WorldBossList = new proto.c_WorldBossList();
		SocketManager.getInstance().sendProto(msg);
	}
	
	//=====================界面相关操作======================
	protected createView(dataRes:any = null):void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView();
		}else{
			//打开背包
			this.view = new View_boss();
			super.createView();
			if(dataRes === null || (dataRes &&dataRes.type === this.TYPE_PERSONAL)){
				this.view.changePersonalBossTap();
				this.personBossData = [];
				this.dealWithBossList(this.bossList);
			}else if(dataRes && dataRes.type === this.TYPE_WORLD){
				this.view.curPanelType = dataRes.type;
				this.view.changeWorldBossTap();
				this.getWorldBossData();
			}
			
		}
		
	}
	/**
	 * 关闭界面
	 * @param closeState 关闭状态  0为被动关闭 1为主动关闭
	 */
	public removeView(closeState:number = 0):void{
		//关闭背包
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
		}
	} 
	/**世界boss重生 */
	public bossRebirth(dataObj:any):void{
		this.changeWorldBossData(dataObj.bossId,true,0);
	}
	/**设置个人boss数据 */
	public setPersonalBossData():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.setPersonalBossData(this.personBossData);
		}
	}
	/**设置世界boss数据 */
	public setWorldBossData():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.setWorldBossData(this.worldBossData);
		}
	}
	/**修改个人boss数据 */
	private changePersonalBossData(id:number):void{
		for(var i:number = 0,len = this.bossList.length;i<len;i++){
			if(this.bossList[i].bossTemplateId === id){
				// this.bossList[i].challenged = true;
				this.bossList[i].isOpen = false;
				break;
			}
		}
	}
	/**修改世界boss数据 */
	private changeWorldBossData(id:number,isOpen:boolean,time:number):void{
		var bossTemple:data.BossTemple = temple.TempleManager.select(id) as data.BossTemple;
		for(var i:number = 0,len = this.worldBossData.length;i<len;i++){
			if(this.worldBossData[i].bossTemplateId === id){
				// this.bossList[i].challenged = true;
				this.worldBossData[i].time = time;
				this.worldBossData[i].isOpen = isOpen;
				break;
			}
		}
		this.sortBossSequence(this.worldBossData);
	}
	/**个人boss排序 */
	private sortBossSequence(bossData:any[]):void{
		var openGather:any[] = [];
		var notOpenGather:any[] = [];
		var challengeGather:any[] = [];
		var notChallengeGather:any[] = [];
		for(var i:number = 0,len = bossData.length;i<len;i++){
			if(bossData[i].challenged){
				openGather.push(bossData[i]);
			}else{
				notOpenGather.push(bossData[i]);
			}
		}
		for(var j:number = 0,len2 = openGather.length;j<len2;j++){
			if(openGather[j].isOpen){
				notChallengeGather.push(openGather[j]);
			}else{
				challengeGather.push(openGather[j]);
			}
		}
		challengeGather = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"bossLev",challengeGather);
		openGather = notChallengeGather.concat(challengeGather);
		bossData = openGather.concat(notOpenGather);
		if(this.view.curPanelType === this.TYPE_WORLD){
			this.worldBossData = bossData;
			this.setWorldBossData();
		}else{
			this.personBossData = bossData;
			this.setPersonalBossData();
		}
		
	}
	//===================数据解析处理========================
	private dealWithBossList(bossList:proto.BossInfo[],serverTime:number = 0):void{
		for(var i:number = 0,len = bossList.length,item:proto.BossInfo;i<len;i++){
			item = bossList[i];
			var obj:any = {};
			obj.bossId = item.bossTemplateId;
			var bossTemple:data.BossTemple = temple.TempleManager.select(obj.bossId) as data.BossTemple;
			var unitTemple:data.UnitTemple = temple.TempleManager.select(bossTemple.mosterId) as data.UnitTemple;
			obj.bossIcon = Config.path_monHead+ bossTemple.bossIcon+".png";
			obj.bossName = unitTemple.name;
			obj.dropIcon = ["","",""];
			obj.count = item.isOpen?1:0;
			obj.isOpen = item.isOpen;
			obj.playerCount = item.playerCount;
			obj.time = item.expireTime - serverTime;
			var rebornId:number = DataCenter.playerAttr[data.PlayerAttr.rebornID];
			var rebornTemple:data.RebornTemple = temple.TempleManager.select(rebornId) as data.RebornTemple;
			var lev:number = DataCenter.playerAttr[data.PlayerAttr.levID];
			if(bossTemple.bossReborn > 0){
				obj.bossLev = bossTemple.bossReborn + bossTemple.bossBeginlevel;
				if(rebornTemple.RELev < bossTemple.bossReborn){
					obj.challenged = false;
					obj.condition = bossTemple.bossReborn+"转开启";
				}else{
					obj.challenged = true;
				}
				new Date().setSeconds
			}else{
				obj.bossLev = bossTemple.bossBeginlevel;
				if(lev < bossTemple.bossBeginlevel){
					obj.challenged = false;
					obj.condition = bossTemple.bossBeginlevel+"级开启";
				}else{
					obj.challenged = true;
				}
			}
			if(bossTemple.bossType === this.BOSS_PERSONAL){
				obj.state = "personal";
				this.personBossData.push(obj);
			}else if(bossTemple.bossType === this.BOSS_WORLD){
				obj.state = "world";
				this.worldBossData.push(obj);
			}
		}
		if(this.view.curPanelType === this.TYPE_WORLD){
			this.sortBossSequence(this.worldBossData);
		}else{
			this.sortBossSequence(this.personBossData);
		}
	}
}