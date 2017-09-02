class Module_action extends Base_module{
	private timer:egret.Timer;
	private msgGather:any[];
	private curType:string;
	private layer:eui.Component;
	private moduleEnum:string;
	private moduleMsg:string;
	public constructor() {
		super();
		this.stage=new egret.Stage();
		this.msgGather = [];
		this.layer = ViewController.getInstance().getContainer().layer_ui;
		this.timer = new egret.Timer(DataCenter.frameRate);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
		eui.Binding.bindHandler(DataCenter,["curFightState"],this.fightStateChange,this);
		// eui.Binding.bindHandler(DataCenter,["curExecActionState"],this.fightStateChange,this);
	}
	private fightStateChange(value:boolean):void{
		if(value && Module_action.curMsg.length <= 0 && Config.connectState){
			DataCenter.curFightState = false;
			this.resetTimer();
			DataCenter.challengeNum = DataCenter.playerAttr[data.PlayerAttr.LevelCount] + "@@"+Math.random();
			if(DataCenter.curFuBen == data.SenceType.GuanQia || this.curType == ActionUtil.TYPE_EXTRA){
				// DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
				// GlobalFunc.changeSence(DataCenter.curSceneId,this);
				var awardPanel:Boss_award = new Boss_award();
				var itemData:any[] = GlobalFunc.deepCopy(DataCenter.bag.curDropGroup);
				for(var i:number = 0,len = itemData.length;i<len;i++){
					var itemTemple:data.ItemTemple = temple.TempleManager.select(itemData[i].tid) as data.ItemTemple;
					if(itemTemple.itemtype1 === 1 || itemTemple.itemtype1 === 3){
						itemData[i].imgSource = Config.path_goods + itemTemple.icon+".png";
					}else{
						itemData[i].imgSource = Config.path_equip + itemTemple.icon+".png";
					}
					itemData[i].itemName = itemTemple.name;
					itemData[i].color = DataCenter.bag.qualityColor[itemData[i].quality];
					itemData[i].boxS = GlobalFunc.setBgData(itemData[i].quality).boxS;
				}
				PopUpManager.addPopUp(awardPanel,true,awardPanel.skinName,this.layer,0);
				awardPanel.setData(itemData,this,this.moduleEnum,this.moduleMsg,{type:"personal"});
				return;
			}
			if(!DataCenter.changeSenceState && DataCenter.curFuBen == data.SenceType.YeWai){
				SocketManager.getInstance().sendProto(new proto.c_move()); 
			}
		}
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.EXTRACTIONLIST:
				this.resetTimer();
				this.curType = ActionUtil.TYPE_EXTRA;
				this.moduleEnum = ModuleEnum.BOSS;
				this.moduleMsg = MainNotify.OPENPERSONALBOSSPANEL;
				this.dealWithActionList(dataRes.actionList);
				break;
			case MainNotify.INITDATA:
				Module_action.flag = false;
				Module_action.curMsg = [];
				this.resetTimer();
				break;
			default :
				break;
		}
	}
	private stage:egret.Stage;
		/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		
  		switch (msg.S) {
			
			case proto.MessageType.s_SendMessbox:
				var msg2:proto.s_SendMessbox=msg as proto.s_SendMessbox;
				if(DataCenter.endAction){
					DataCenter.endAction.clear();
				}
				this.resetTimer();
				this.curType = ActionUtil.TYPE_NORMAL;
				this.moduleEnum = "";
				this.moduleMsg = ""
				this.dealWithActionList(msg2.messList);
				break;
			case proto.MessageType.s_NotifyAction:
				var notify_msg:proto.s_NotifyAction = msg as proto.s_NotifyAction;
				this.resetTimer();
				this.curType = ActionUtil.TYPE_OTHER;
				this.dealWithActionList(notify_msg.actionList);
				break;
			case proto.MessageType.s_SyncBossPlayer:
				var sync_msg:proto.s_SyncBossPlayer = msg as proto.s_SyncBossPlayer;
				this.resetTimer();
				this.curType = ActionUtil.TYPE_ADD;
				this.dealWithActionList(sync_msg.addUnitList);
				break;
			default:
				break;
		}
	}

	private curTime:number = 0;
	private firstElement:proto.MyAction;
	public static flag:boolean = true;
	public static curMsg:proto.MyAction[];
	/**处理动作列表 */
	private dealWithActionList(msg:Array<proto.MyAction>,type:string = ""):void{
		Module_action.curMsg = [];
		Module_action.curMsg = msg;
		DataCenter.curFightState = false;
		// if(!type){
		// 	this.resetTimer();
		// }
		
		while(Module_action.flag){
			if(!this.firstElement && Module_action.curMsg.length){
				this.firstElement = Module_action.curMsg.shift();
			}
			if(this.firstElement.timeSpan <= this.curTime){
				Module_action.flag = true;
				if(!DataCenter.endAction){
					DataCenter.endAction = new Dictionary("DataCenterEndAction");
				}
				if(this.firstElement.actionType === 0){
					if(!DataCenter.endAction.hasKey(this.firstElement.InstanceId)){
						DataCenter.endAction.add(this.firstElement.InstanceId,true);
					}else{
						DataCenter.endAction.modify(this.firstElement.InstanceId,true);
					}
					this.calculEndAction(this.firstElement.InstanceId);
				}
				if(Module_action.curMsg.length){
					DataCenter.curExecAction = this.firstElement;
				}else{
					DataCenter.lastOfAction = this.firstElement;
					Module_action.flag = false;
					return;
				}
				this.firstElement = null;
			}else{
				Module_action.flag = false;
				this.timer.start();
				return;
			} 
		}
		// if(this.firstElement){
		// 	// DataCenter.curExecAction = this.firstElement;
		// 	DataCenter.lastOfAction = this.firstElement;
		// 	this.firstElement = null;
		// }
		// if(Module_action.curMsg.length <= 0 && Config.connectState){
		// 	this.resetTimer();
		// 	// DataCenter.challengeNum = DataCenter.playerAttr[data.PlayerAttr.LevelCount] + "@@"+Math.random();
		// 	// if(DataCenter.curFuBen != data.SenceType.YeWai){
		// 	// 	DataCenter.curSceneId = DataCenter.playerAttr[data.PlayerAttr.levelStageID];
		// 	// 	GlobalFunc.changeSence(DataCenter.curSceneId,this);
		// 	// 	return;
		// 	// }
		// 	// if(!DataCenter.changeSenceState){
		// 	// 	SocketManager.getInstance().sendProto(new proto.c_move()); 
		// 	// }
		// }
	}
	private calculEndAction(insId:string):void{
		for(var i:number = 0;i<Module_action.curMsg.length;i++){
			if(insId === Module_action.curMsg[i].InstanceId && DataCenter.endAction.hasKey(insId)){
				DataCenter.endAction.modify(insId,false);
				return;
			}
		}
	}
	public resetTimer():void{
		this.timer.stop();
		Module_action.flag = true;
		this.curTime = 0;
		this.firstElement = null;
	}
	private onTimerHandler(evt:egret.TimerEvent):void{
		Module_action.flag = true;
		this.timer.stop();
		this.curTime+=DataCenter.frameRate;
		this.dealWithActionList(Module_action.curMsg);
	}
	private resetPoolBall():void{
		this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.RESET_POOLBALL);
	}
}
