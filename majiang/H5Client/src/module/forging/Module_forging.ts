class Module_forging extends Base_module{
	public constructor() {
		super();
		this.p_type = PanelType.MAINNAV;
	}

	public curJob:number;
	public curState:string;
	public curForgingType:number;

	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_Strengthen:
				if(this.curForgingType != DataCenter.forginType){
					return;
				}
				var curMsg:proto.s_Strengthen=msg as proto.s_Strengthen;
				if(curMsg.isSuccess){
					this.qianghuaHandler(curMsg);
				}else{
					var obj:any = {type:TipsEnum.TYPE_WARN,label:"锻造失败"};
					PopTipsManager.showPopTips([obj]);
				}
				break;
			default:
				break;
		}
	}


	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,data:any=null):void{
		switch(msgType){
			case MainNotify.OPENFORGINGPANEL:
				//打开锻造面板
				this.createView();
				break;
			default :
				break;
		}
	}

	private qianghuaHandler(msg:proto.s_Strengthen):void{
		if(msg.isSuccess){
			var arr:Array<any>=DataCenter.forgingData.get(this.curJob+"").get(this.curState);
			var fightValueUp:number = 0;
			for(var i:number=0;i<arr.length;i++){
				var any:any=arr[i];
				if(any.pos==DataCenter.forgingPos.get(this.curJob+"")[this.curForgingType]){
					switch(this.curState){
						case "qianghua":
							var oldT:data.StrengthenTemple=temple.TempleManager.select(any.value) as data.StrengthenTemple;
							var newT:data.StrengthenTemple=temple.TempleManager.select(msg.newID) as data.StrengthenTemple;
							fightValueUp=newT.FightValue-oldT.FightValue;
							
						break;
						case "gem":
							var oldT1:data.GemstoneTemple=temple.TempleManager.select(any.value) as data.GemstoneTemple;
							var newT1:data.GemstoneTemple=temple.TempleManager.select(msg.newID) as data.GemstoneTemple;
							fightValueUp=newT1.FightValue-oldT1.FightValue;
						break;
						case "zhuling":
							var oldT2:data.ZhuLingTemple=temple.TempleManager.select(any.value) as data.ZhuLingTemple;
							var newT2:data.ZhuLingTemple=temple.TempleManager.select(msg.newID) as data.ZhuLingTemple;
							fightValueUp=newT2.FightValue-oldT2.FightValue;
						break;
					}
					any.value = msg.newID;
				}
			}
			

		}
		var template:data.StrengthenTemple = temple.TempleManager.select(msg.nextStrengthId) as data.StrengthenTemple;
		DataCenter.forgingPos.get(this.curJob+"")[this.curForgingType]=template.pos;
		DataCenter.forginPower.get(this.curJob+"")[this.curForgingType] += fightValueUp;
		GlobalFunc.showPowerUpTips(DataCenter.forginPower.get(this.curJob+"")[this.curForgingType],[fightValueUp]);
			var num:number;
			switch(template.pos){
				case 1:num=0;
				break;
				case 2:num=1;
				break;
				case 3:num=2;
				break;
				case 4:num=3;
				break;
				case 5:num=4;
				break;
				case 6:num=5;
				break;
				case 7:num=6;
				break;
				case 8:num=7;
				break;
			}
			DataCenter.forgingUIPos.get(this.curJob+"")[this.curForgingType]=num;
			this.view.changeView(this.curState);

	}

	protected createView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView(1);
		}else{
			//打开角色面板
			this.view = new View_forging();
			super.createView();
			// this.view.refreshHeadIcon(Module_roleInfo.headIconSource);
			this.refreshView();
		}
	}
	public removeView(closeState):void{
		//关闭角色面板
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
		}
	} 
	/*** 刷新界面数据显示*/
	public refreshView():void{
		//
		// this.view.refreshRoleMode(Module_roleInfo.clothPath,Module_roleInfo.weaponPath);
		// this.view.refreshEquipData({leftSourceArr:Module_roleInfo.leftEquipArr,rightSourceArr:Module_roleInfo.rightEquipArr});
		// this.view.changePower(DataCenter.role1Info.roleAttr[data.RoleAttr.FightValue]);

		this.view.changeView();
	}


	public sendUpgradeMsg(type:number):void{
		this.curForgingType=type;
		var forging_msg:proto.c_Strengthen = new proto.c_Strengthen();
		forging_msg.job = this.curJob;
		forging_msg.type = type+1;
		DataCenter.forginType = type;
		forging_msg.pos = DataCenter.forgingPos.get(this.curJob+"")[type];
		SocketManager.getInstance().sendProto(forging_msg);
	}
}