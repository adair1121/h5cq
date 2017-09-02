class Module_data extends Base_module{
	public constructor() {
		super();
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_Map_Player:
				var msg1:proto.s_Map_Player=msg as proto.s_Map_Player;
				this.dealWithInitData(msg1)
				break;
			case proto.MessageType.s_Login:
				var curMsg:proto.s_Login=msg as proto.s_Login;
				this.toDealWithLoginData(curMsg);
				break;
			case proto.MessageType.s_RoleAttrChange:
				var attrMsg:proto.s_RoleAttrChange = msg as proto.s_RoleAttrChange;
				this.dealWithAttr(attrMsg);
				break;
			case proto.MessageType.s_Kickout:
				var kickMsg:proto.s_Kickout = msg as proto.s_Kickout;
				alert(kickMsg.MsgReason);
				super.clearView();
				break;
			case proto.MessageType.s_CreateRole:
				var create_msg:proto.s_CreateRole = msg as proto.s_CreateRole;
				if(create_msg.roleInfo){
					this.crateRoleInfo(create_msg.roleInfo,true);
				}
				break;
			default:
				break;
		}
	}

	/**
	 * 处理初始化数据
	 */
	private dealWithInitData(initData:proto.s_Map_Player):void{
		DataCenter.roleAttrsArr=new Dictionary("DataCenter.roleAttrsArr");
		DataCenter.playerName=initData.playerName;
		DataCenter.playerId = initData.PlayerInstId;
		DataCenter.playerAttr=initData.playerAttr;
		for(var i:number=0,roleItem:proto.Client_RoleInfo;i<initData.client_roleinfo.length;i++){
			roleItem = initData.client_roleinfo[i];
			this.crateRoleInfo(roleItem);
			// var any:any={};
			// any.job=roleItem.job;
			// any.sex=roleItem.roleAttr[data.RoleAttr.sex];
			// any.initTempId=roleItem.templateId;
			// DataCenter.roleList=[];
			// DataCenter.roleList.push(any);
			// DataCenter["role"+(i+1)+"Info"] = roleItem as proto.Client_RoleInfo;
			// DataCenter["role"+(i+1)+"InfoVO_out"]=this.setRoleInfoVO(roleItem );
			// var roleEquip:any={};
			// for(var k:number=0;k<roleItem.equips.length;k++){
			// 	var item:proto.ItemData=roleItem.equips[k];
			// 	var template:data.ItemTemple = temple.TempleManager.select(item.TempleID) as data.ItemTemple;
			// 	var equipPos:number = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos,item.attrList);
			// 	if(equipPos==data.EquipPos.body){
			// 		roleEquip.clothId=item.TempleID;
			// 	}
			// 	if(equipPos==data.EquipPos.weapon){
			// 		roleEquip.weaponId=item.TempleID;
			// 	}
			// }
			// var initTemp:data.JobInitTemple=temple.TempleManager.select(any.initTempId) as data.JobInitTemple;
			// if(!roleEquip.clothId){
			// 	roleEquip.initClothId=any.sex==1?initTemp.maleResID:initTemp.femaleResID;
			// }
			// if(!roleEquip.weaponId){
			// 	roleEquip.initWeaponId=any.sex==1?initTemp.maleWeaponID:initTemp.femaleWeaponID;
			// }
			// DataCenter.moveSpeed=initTemp.moveTime;
			// DataCenter.roleEquip.add(any.job+"",roleEquip);
			// DataCenter.RoleInFoVo[any.job] = roleItem;
			// DataCenter.roleAttrsArr.add(any.job,roleItem.roleAttr);

			// if(!DataCenter.forgingData){
			// 	DataCenter.forgingData=new Dictionary();
			// }
			// DataCenter.forgingData.add(any.job+"",GlobalFunc.setForgingData(roleItem.strengthens));
			// this.dealWithStrengthenPos(any.job,roleItem.strengthens);
			// GlobalFunc.creteRolePowerObj(initData.client_roleinfo[i].equips,any.job);
		}
		// this.calculHPandMP();
		
		// DataCenter.role1Attr=initData.client_roleinfo[0].roleAttr;
		// if(initData.client_roleinfo[1]){
		// 	DataCenter.role2Attr=initData.client_roleinfo[1].roleAttr;
		// }
		// if(initData.client_roleinfo[2]){
		// 	DataCenter.role3Attr=initData.client_roleinfo[2].roleAttr;
		// }
		// DataCenter.time_stamps=initData.timeSpan-egret.getTimer();
		var  msg:proto.c_CreateNewSence=new proto.c_CreateNewSence();
		msg.levelStageID=DataCenter.playerAttr[data.PlayerAttr.levelStageID];
		DataCenter.curSceneId=msg.levelStageID;
		SocketManager.getInstance().sendProto(msg);
	}
	private crateRoleInfo(roleItem:proto.Client_RoleInfo,gameCreate:boolean = false):void{
		var any:any={};
		any.job=roleItem.job;
		any.sex=roleItem.roleAttr[data.RoleAttr.sex];
		any.insId = roleItem.instanceId;
		any.initTempId=roleItem.templateId;
		if(!DataCenter.roleList){
			DataCenter.roleList = [];
		}
		DataCenter.roleList.push(any);
		DataCenter["role"+roleItem.job+"Info"] = roleItem as proto.Client_RoleInfo;
		DataCenter["role"+roleItem.job+"InfoVO_out"]=this.setRoleInfoVO(roleItem );
		var roleEquip:any={};
		for(var k:number=0;k<roleItem.equips.length;k++){
			var item:proto.ItemData=roleItem.equips[k];
			var template:data.ItemTemple = temple.TempleManager.select(item.TempleID) as data.ItemTemple;
			var equipPos:number = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos,item.attrList);
			if(equipPos === data.EquipPos.fashion_wings){
				DataCenter.wingFashionState = true;
				DataCenter.curWingFashionId = item.TempleID;
			}else if(equipPos === data.EquipPos.fashion_weapon){
				DataCenter.weaponFashionState = true;
				DataCenter.weaponFashionId = item.TempleID;
			}else if(equipPos === data.EquipPos.fashion_role){
				DataCenter.roleFashionState = true;
				DataCenter.curRoleFahsionId = item.TempleID;
			}else if(equipPos==data.EquipPos.body){
				roleEquip.clothId=item.TempleID;
			}else if(equipPos==data.EquipPos.weapon){
				roleEquip.weaponId=item.TempleID;
			}
		}
		var initTemp:data.JobInitTemple=temple.TempleManager.select(any.initTempId) as data.JobInitTemple;
		if(!roleEquip.clothId){
			roleEquip.initClothId=any.sex==1?initTemp.maleResID:initTemp.femaleResID;
		}
		if(!roleEquip.weaponId){
			roleEquip.initWeaponId=any.sex==1?initTemp.maleWeaponID:initTemp.femaleWeaponID;
		}
		DataCenter.moveSpeed=initTemp.moveTime;
		DataCenter.roleEquip.add(any.job+"",roleEquip);
		DataCenter.RoleInFoVo[any.job] = roleItem;
		DataCenter.roleAttrsArr.add(any.job,roleItem.roleAttr);
		DataCenter["role"+roleItem.job+"Attr"] = roleItem.roleAttr;
		if(!DataCenter.forgingData){
			DataCenter.forgingData=new Dictionary("DataCenter.forgingData");
		}
		this.calculHPandMP();
		DataCenter.forgingData.add(any.job+"",GlobalFunc.setForgingData(roleItem.strengthens));
		this.dealWithStrengthenPos(any.job,roleItem.strengthens);
		GlobalFunc.creteRolePowerObj(roleItem.equips,roleItem.job);
		if(gameCreate){
			//在游戏中创建角色
			this.sendMsgToModule([ModuleEnum.MAP],MainNotify.CREATENEWROLE);
			this.sendMsgToModule([ModuleEnum.CREATEROLE],MainNotify.CLOSECRETEROLE);
			Global.dispatchEvent(MainNotify.JOBCHAGNE,{job:roleItem.job,add:true});
		}
	}
	private equipForginType(type:number):boolean{
		if(type === data.StrengthenType.ST_QH || type === data.StrengthenType.ST_BS || type === data.StrengthenType.ST_ZL || type=== data.StrengthenType.ST_JL){
			return true;
		}
		return false;
	}
	/**处理强化装备位置 */
	private dealWithStrengthenPos(job:number,strengthens:proto.StrengthenInfo[]):void{
		var arr2:proto.StrengthenInfo[] = [];
		for(var j:number = 0;j<strengthens.length;j++){
			if(this.equipForginType(strengthens[j].type)){
				arr2.push(strengthens[j]);
			}
		}
		var arr:proto.StrengthenInfo[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"type",GlobalFunc.deepCopy(arr2));
		if(!DataCenter.forgingUIPos){
			DataCenter.forgingUIPos=new Dictionary("DataCenter.forgingUIPos");
		}
		if(!DataCenter.forgingPos){
			DataCenter.forgingPos=new Dictionary("DataCenter.forgingPos");
		}
		if(!DataCenter.forginPower){
			DataCenter.forginPower = new Dictionary("DataCenter.forginPower");
		}
		var len:number = arr.length;
		var lightPos:number[] = [];
		var powerArr:number[] = [];
		var power:number = 0;
		for(var i:number = 0;i<len;i++){
			var id:number = arr[i].strengthId;
			var template:data.StrengthenTemple = temple.TempleManager.select(id) as data.StrengthenTemple;
			power += template.FightValue;
			if(i%8 === 0){
				lightPos.push(template.pos);
			}
			if((i+1)%8 === 0){
				powerArr.push(power);
				power = 0;
			}
		}
		DataCenter.forgingUIPos.add(job+"",this.setForgingPos(lightPos));
		DataCenter.forgingPos.add(job+"",lightPos);
		DataCenter.forginPower.add(job+"",powerArr);
	}
	

	private setForgingPos(arr:Array<number>):any{
		var arr1:Array<number>=[];
		for(var i:number=0;i<arr.length;i++){
			switch(arr[i]){
				case data.EquipPos.weapon:
					arr1.push(0);
					break;
				case data.EquipPos.head:
					arr1.push(1);
					break;
				case data.EquipPos.body:
					arr1.push(2);
					break;
				case data.EquipPos.neck:
					arr1.push(3);
					break;
				case data.EquipPos.left_bracelet:
					arr1.push(4);
					break;
				case data.EquipPos.right_bracelet:
					arr1.push(5);
					break;
				case data.EquipPos.left_ring:
					arr1.push(6);
					break;
				case data.EquipPos.right_ring:
					arr1.push(7);
					break;
			}
		}
		return arr1;
	}
	private sortArrByIndex(any1:any,any2:any):number{
		var a = any1.index;
		var b = any2.index;
		if(a > b){
			return 1;
		}else if(a<b){
			return -1;
		}else{
			return 0;
		}
	}
	private setRoleInfoVO(roleInfo:proto.Client_RoleInfo):RoleInfoVo{
		var roleVO=new RoleInfoVo();
		// roleVO.action=roleInfo.roleAttr.state;
		roleVO.col=roleInfo.roleAttr[data.RoleAttr.x];
		roleVO.row=roleInfo.roleAttr[data.RoleAttr.y];
		roleVO.job=roleInfo.roleAttr[data.RoleAttr.job];
		roleVO.look=5;
		// roleVO.mapid=roleInfo.roleAttr[data.RoleAttr.InstanceId] + "";
		roleVO.sex=roleInfo.roleAttr[data.RoleAttr.sex];
		// roleVO.uid=roleInfo.roleAttr.uid;
		// roleVO.clothId_in=roleInfo.roleAttr[data.RoleAttr.clothes] + "";
		// roleVO.weaponId_in=roleInfo.roleAttr[data.RoleAttr.weaponID] + "";
		roleVO.wingsId_in=roleInfo.roleAttr[data.RoleAttr.wingsID];
		// var c=temple.TempleManager.select(roleInfo.roleAttr[data.RoleAttr.clothes]);
		// roleVO.clothId_out=roleVO.sex==1?c["maleResId"]:c["femaleResId"];
		// var d=temple.TempleManager.select(roleInfo.roleAttr[data.RoleAttr.weaponID]);
		// roleVO.weaponId_out=roleVO.sex==1?d["maleResId"]:d["femaleResId"];
		var wingsId:number=roleInfo.roleAttr[data.RoleAttr.wingsID];
		var e:data.WingsTemple=temple.TempleManager.select(wingsId) as data.WingsTemple;
		if(e){
			roleVO.wingsId_out=e.maleResId;
		}

		return roleVO
	}

	/**
	 * 处理登录数据
	 */
	private toDealWithLoginData(curMsg:any):void{
		DataCenter.baseInfo.loginState = curMsg.state;
		switch(curMsg.state){
			case 0:
			case 1:
				alert(curMsg.mess)
			case 2:
				//无创建角色
				this.sendMsgToModule([ModuleEnum.SELECTROLE],MainNotify.OPENSELECTROLEPANEL);
				break;
		}
	}
	/**
	 * 处理属性改变
	 */
	private dealWithAttr(attrMsg:proto.s_RoleAttrChange):void{
		switch(attrMsg.Job){
			case 0:
				this.setAttrValue(attrMsg.AttrChangeList,attrMsg.Job);
				break;
			case 1:
			case 2:
			case 3:
				this.setAttrValue(attrMsg.AttrChangeList,attrMsg.Job);
				this.calculHPandMP();
				break;
		}
	}
	private setAttrValue(changeList:proto.AttrValue[],type:number):void{
		for(var i:number = 0,len = changeList.length,item:proto.AttrValue;i<len;i++){
			item = changeList[i];
			if(!type){
				DataCenter.playerAttr[item.attrID] = item.myvalue;
			}else{
				DataCenter.roleAttrsArr.get(type+"")[item.attrID] = item.myvalue;
			}
		}
	}
	/**计算最大血量法量值 */
	private calculHPandMP():void{
		var hp:number;
		var mp:number;
		if(!DataCenter.roleList){
			console.log("人物列表为空");
		}
		for(var i:number,len:number = DataCenter.roleList.length,item:any;i<len;i++){
			item = DataCenter.roleAttrsArr.get(i+"");
			hp += item[data.RoleAttr.MHP];
			mp += item[data.RoleAttr.MMP];
		} 
		DataCenter.playerInfo.tolMp = mp;
		DataCenter.playerInfo.tolHp = hp;
	}
	

}