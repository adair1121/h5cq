class Module_roleInfo extends Base_module{
	private container:eui.Group;

	private static leftEquipPosList:number[] = [];
	private static rightEquipPosList:number[] = [];
	private static specialPos:number[] = [];
	private static specialPosObj:any = {};
	private static clothPath:string = "";
	private static weaponPath:string = "";
	private static wingPath:string = "";
	private static leftEquipArr:any[] = [];
	private static rightEquipArr:any[] = [];
	private static specialSourceArr:any[] = [];
	private static wingid:string;
	private roleWatcher:eui.Watcher;
	private static headIconSource:any[];
	public static curJob:number;
	private attr:number[];
	private static equips:any[] = [];
	private specialType:number;
	public static type:number = 0;
	// private weaponId:number = 0;
	// private clothesId:number = 0;
	private static stateAsset:any = {};
	// private roleEquip:any={};
	private fashionObj:any = {};
	public constructor() {
		super();
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataObj:any=null):void{
		switch(msgType){
			case MainNotify.OPENROLEPANEL:
				//打开人物面板
				// this.weaponId = 0;
				// this.clothesId = 0;
				if(dataObj && dataObj.type){
					DataCenter.OtherforgingData.clear();
					DataCenter.OtherRoleInfoVo = {};
					DataCenter.OtherRoleJobList = [];
					Module_roleInfo.type = dataObj.type;
					var roleInfo:proto.Client_RoleInfo[] = dataObj.roleInfo;
					for(var i:number = 0;i<roleInfo.length;i++){
						var obj:any = {job:roleInfo[i].job,sex:roleInfo[i].roleAttr[data.RoleAttr.sex]};
						DataCenter.OtherRoleInfoVo[roleInfo[i].job] = roleInfo[i];
						DataCenter.OtherRoleJobList.push(obj);
						DataCenter.OtherforgingData.add(roleInfo[i].job+"",GlobalFunc.setForgingData(roleInfo[i].strengthens));
					}
					
					Module_roleInfo.curJob = roleInfo[0].job;
					this.createView(roleInfo[0]);
				}else{
					Module_roleInfo.curJob = DataCenter.roleList[0].job;
					Module_roleInfo.type = 0;
					this.createView();
				}
				break;
			case MainNotify.CJ_ASSEMBLY_SUCCESS:
				var curRoleInfo:proto.Client_RoleInfo = DataCenter.RoleInFoVo[dataObj.job];
				var curEquips:proto.ItemData[] = curRoleInfo.equips;
				var boo:boolean = false;
				for(var j:number = 0;j<curEquips.length;j++){
					var pos:number = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos,curEquips[j].attrList);
					if(pos === dataObj.equipPos){
						boo = true;
						curEquips[j] = dataObj.equipItem;
						break;
					}
				}
				if(!boo){
					curEquips.push(dataObj.equipItem);
				}
				if(DataCenter.cjEquip && DataCenter.cjEquip.length){
					var len:number = DataCenter.cjEquip.length;
					for(var m:number = 0;m<len;m++){
						if(DataCenter.cjEquip[m].InstanceId === dataObj.equipItem.InstanceId){
							DataCenter.cjEquip.splice(m,1);
							this.sendMsgToModule([ModuleEnum.BAG],MainNotify.REMOVEBAGITEM,[dataObj.equipItem]);
							break;
						}
					}
				}
				if(dataObj.equipPos === data.EquipPos.weapon){
					// this.weaponId = dataObj.itemId;
					DataCenter.roleEquip.get(dataObj.job).weaponId = dataObj.itemId;
				}
				if(dataObj.equipPos === data.EquipPos.body){
					// this.clothesId = dataObj.itemId;
					DataCenter.roleEquip.get(dataObj.job).clothId = dataObj.itemId;
				}
				break;
			default :
				break;
		}
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_ChangeEquip:
				var changeEquip:proto.s_ChangeEquip = msg as proto.s_ChangeEquip;
				this.setreloadingClothData(changeEquip);
				break;
			case proto.MessageType.s_wings_up:
				var wingsUp:proto.s_wings_up = msg as proto.s_wings_up;
				if(wingsUp.isSuccess){
					this.starUpGradeRes(wingsUp);
				}
				break;
			case proto.MessageType.s_wings_levup:
				var wingsLevUp:proto.s_wings_levup = msg as proto.s_wings_levup;
				if(wingsLevUp.isSuccess){
					var template:data.WingsTemple = temple.TempleManager.select(wingsLevUp.wingsID) as data.WingsTemple;
					// DataCenter.role1InfoVO_out.wingsId_out = template.maleResId;
					DataCenter["role"+Module_roleInfo.curJob+"InfoVO_out"].wingsId_out = template.maleResId;
					this.resetWingStarData(wingsLevUp.wingsID);
				}
				break;
			case proto.MessageType.s_Reborn:
				var reborn_msg:proto.s_Reborn = msg as proto.s_Reborn;
				if(reborn_msg.isSuccess){
					this.refreshRebornData(reborn_msg.newRebornID);
				}
				break;
			case proto.MessageType.s_JingMai_Up:
				var jinmai_msg:proto.s_JingMai_Up = msg as proto.s_JingMai_Up;
				if(jinmai_msg.isSuccess){
					this.refreshMeridiansData(jinmai_msg.jingMaiID);
				}
				break;
			case proto.MessageType.s_JingMai_LvUp:
				var jinmaiLevUp_msg:proto.s_JingMai_LvUp = msg as proto.s_JingMai_LvUp;
				if(jinmaiLevUp_msg.isSuccess){
					this.refreshMeridiansData(jinmaiLevUp_msg.jingMaiID);
				}
				break;
			case proto.MessageType.s_Strengthen:
				if(this.specialType != DataCenter.forginType){
					return;
				}
				var special_smg:proto.s_Strengthen = msg as proto.s_Strengthen;
				if(special_smg.isSuccess){
					DataCenter.forgingData.get(Module_roleInfo.curJob+"").get("other")[this.specialType] = special_smg.newID;
					this.view.refreshLongHunOrHudun(special_smg.newID);
					this.resetSpecialData(special_smg.newID);
					this.view.refreshSpecialData({specialSourceArr:Module_roleInfo.specialSourceArr});
				}
				break;
			case proto.MessageType.s_GetXiuWei:
				var xuwei_msg:proto.s_GetXiuWei = msg as proto.s_GetXiuWei;
				var obj:any = {};
				if(xuwei_msg.isSuccess){
					obj = {type:TipsEnum.TYPE_DEFAULT,label:"提升修为成功"};
				}else{
					obj = {type:TipsEnum.TYPE_WARN,label:"提升修为失败"};
				}
				PopTipsManager.showPopTips(obj);
				break;
			case proto.MessageType.s_ActiveFashion:
				var fashion_msg:proto.s_ActiveFashion = msg as proto.s_ActiveFashion;
				if(fashion_msg.isSuccess){
					//开启时装倒计时
					if(!Object.keys(DataCenter.fashionActive).length){
						this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.TIMESTART);
					}
					//时装激活成功 通知时装界面激活显示激活效果
					var time:number = fashion_msg.fashionEquip.expireTime - DataCenter.serverTimer;
					var obj:any = {pos:this.fashionObj.pos,time:time,expireTime:fashion_msg.fashionEquip.expireTime,insId:fashion_msg.fashionEquip.InstanceId}
					Global.dispatchEvent(MainNotify.SJ_ACTIVATE_SUCCESS,obj);
					//发送消息到背包模块移除时装道具
					this.sendMsgToModule([ModuleEnum.BAG],MainNotify.REMOVEBAGITEM,[this.fashionObj.item]);
					//在人物界面显示相应时装
					this.changeFashionMode(true,this.fashionObj.clothId,this.fashionObj.pos);
				}else{
					PopTipsManager.showPopTips([{type:TipsEnum.TYPE_WARN,label:fashion_msg.errMsg}]);
					return;
				}
				break;
			case proto.MessageType.s_DressFashion:
				var dress_msg:proto.s_DressFashion = msg as proto.s_DressFashion;
				if(dress_msg.isSuccess){
					this.changeFashionMode(true,this.fashionObj.clothId,this.fashionObj.pos);
					this.sendMsgToModule([ModuleEnum.BAG],MainNotify.REMOVEBAGITEM,[this.fashionObj.item]);
					Global.dispatchEvent(MainNotify.SJ_DRESS_SUCCESS);
				}else{
					PopTipsManager.showPopTips([{type:TipsEnum.TYPE_WARN,label:fashion_msg.errMsg}]);
				}
				break;
			case proto.MessageType.s_FashionExpire:
				var expire_msg:proto.s_FashionExpire = msg as proto.s_FashionExpire;
				if(expire_msg.isSuccess){
					if(!this.expireGather.length){
						return;
					}
					this.fashionObj = this.expireGather.shift();
					Global.dispatchEvent(MainNotify.SJ_EXPIRE,{job:this.fashionObj.preJob,clothId:this.fashionObj.TempleID});
					//发送消息到背包模块移除到期时装道具
					if(this.fashionObj.bagExpire){
						this.sendMsgToModule([ModuleEnum.BAG],MainNotify.REMOVEBAGITEM,[this.fashionObj]);
					}
					//关闭时装倒计时
					if(!Object.keys(DataCenter.fashionActive).length){
						this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.TIMEEND);
					}
					this.changeFashionMode(false,this.fashionObj.preJob,this.fashionObj.pos);
				}else{
					if(!this.expireGather.length){
						return;
					}
					this.fashionObj = this.expireGather.shift();
					DataCenter.fashionActive[this.fashionObj.preJob][this.fashionObj.TempleID].time = expire_msg.remaindSeconds;
					var obj:any = {job:this.fashionObj.preJob,clothId:this.fashionObj.TempleID,time:expire_msg.remaindSeconds,pos:this.fashionObj.pos}
					Global.dispatchEvent(MainNotify.SYNCTIME,obj);
				}
				break;
			default:
				break;
		}
	}
	/**改变时装相关显示模型 */
	private changeFashionMode(state:boolean,clothId:number,pos:number):void{
		switch(pos){
			case data.EquipPos.fashion_wings:
				DataCenter.wingFashionState = state;
				DataCenter.curWingFashionId = clothId;
				this.view.refreshWingMode();
				break;
			case data.EquipPos.fashion_weapon:
				DataCenter.weaponFashionState = state;
				DataCenter.curWingFashionId = clothId;
				this.view.refreshWeaponMode();
				break;
			case data.EquipPos.fashion_role:
				DataCenter.roleFashionState = state;
				DataCenter.curRoleFahsionId = clothId;
				this.view.refreshRoleMode();
				break;
		}
	}
	//================================================================================
	protected bindData():void{
		Module_roleInfo.stateAsset = {};
		this.p_type = PanelType.MAINNAV;
		this.attr = DataCenter.playerAttr;
		Module_roleInfo.leftEquipPosList = [data.EquipPos.weapon,data.EquipPos.body,data.EquipPos.left_bracelet,data.EquipPos.left_ring];
		Module_roleInfo.rightEquipPosList = [data.EquipPos.head,data.EquipPos.neck,data.EquipPos.right_bracelet,data.EquipPos.right_ring];
		Module_roleInfo.specialPos = [data.StrengthenType.ST_MB,data.StrengthenType.ST_LH,-1,-2,data.StrengthenType.ST_HD,data.StrengthenType.ST_HS];
		Module_roleInfo.stateAsset[data.StrengthenType.ST_LH] = "14300020.png";
		Module_roleInfo.stateAsset[data.StrengthenType.ST_HD] = "14500012.png";
		Module_roleInfo.stateAsset[data.StrengthenType.ST_MB] = "13115061.png";
		Module_roleInfo.stateAsset[data.StrengthenType.ST_HS] = "13116071.png";
		for(var i:number = 0;i<Module_roleInfo.specialPos.length;i++){
			Module_roleInfo.specialPosObj[Module_roleInfo.specialPos[i]] = i;
		}
		eui.Binding.bindHandler(Module_roleInfo,["wingid"],this.wingsIdChange,this);
		eui.Binding.bindHandler(DataCenter,["serverTimer"],this.serverTimeChange,this);
	}
	//////////////////////////////数据绑定函数///////////////
	private wingsIdChange(value:number):void{
		if(value && this.view && this.view.parent && this.view.parent.contains(this.view)){
			var wingId:string = Module_roleInfo.wingid.split("@@").shift();
			DataCenter.roleEquip.get(Module_roleInfo.curJob+"").wingId = wingId;
			var wingTemple:data.WingsTemple = temple.TempleManager.select(parseInt(wingId)) as data.WingsTemple;
			var path:string = Config.path_wing_in + wingTemple.InIconResId + "_a_0";
			// var wingTemple:data.WingsTemple = temple.TempleManager.select(parseInt(wingId)) as data.WingsTemple;
			// if(wingTemple){
				// Module_roleInfo.wingPath = Config.path_wing_in + wingTemple.InIconResId + "_a_0";
			this.view.refreshWingMode(path);
			// }
		}
	}
	private curExpireJob:number = 0;
	private curExpireclothId:number = 0;
	private curExpirePos:number = 0;
	private bagExpire:boolean = false;
	private serverTimeChange(value:number):void{
		if(value){
			this.expireGather = [];
			var obj:any = DataCenter.fashionActive;
			for(var key in obj){
				for(var key2 in obj[key]){
					var time:number = 0;
					obj[key][key2].time = time = obj[key][key2].expireTime - value;
					this.curExpireJob = parseInt(key);
					this.curExpireclothId = parseInt(key2);
					this.curExpirePos = obj[key][key2].pos;
					if(time <= 0){
						var job:number = obj[key][key2].ifDress?parseInt(key):0;
						this.bagExpire = job === 0?true:false;
						this.fashionExpire({bagExpire:this.bagExpire,job:job,preJob:key,InstanceId:obj[key][key2].insId,TempleID:key2,pos:obj[key][key2].pos});
					}else{
						Global.dispatchEvent(MainNotify.SYNCTIME,{job:key,clothId:key2,time:time,pos:obj[key][key2].pos})
					}
				}
			}
		}
	}
	//================================角色信息相关处理======================================
	/*** 处理角色相关基础信息*/
	private toDealWithRoleInfoData(roleInfo:proto.Client_RoleInfo):void{
		this.initEquipData();
		this.initSpecialEquip();
		this.setEquipData(roleInfo);
	}
	/*** 初始化人物装备栏数据*/
	private initEquipData():void{
		var obj:any = {equipSource:"",label:"",equipIntensify:"",equipLv:"",quality:1};
		for(var i:number = 0;i<4;i++){
			Module_roleInfo.leftEquipArr[i] = {};
			Module_roleInfo.rightEquipArr[i] = {};
			for(var o in obj){
				Module_roleInfo.leftEquipArr[i][o] = obj[o];
				Module_roleInfo.rightEquipArr[i][o] = obj[o];
			}
		}
	}
	/**初始化人物特殊装备 */
	private initSpecialEquip():void{
		var otherArr:any;
		if(!Module_roleInfo.type){
			otherArr = DataCenter.forgingData.get(Module_roleInfo.curJob+"").get("other");
		}else{
			otherArr = DataCenter.OtherforgingData.get(Module_roleInfo.curJob+"").get("other");
		}
		var dragonSoulId:number = otherArr[data.StrengthenType.ST_LH];
		var shieldId:number = otherArr[data.StrengthenType.ST_HD];
		var mabiId:number = otherArr[data.StrengthenType.ST_MB];
		var hushenId:number = otherArr[data.StrengthenType.ST_HS];
		var dragonTemplate:data.StrengthenTemple = temple.TempleManager.select(dragonSoulId) as data.StrengthenTemple;
		var shieldTemplate:data.StrengthenTemple = temple.TempleManager.select(shieldId) as data.StrengthenTemple;
		var mabiTemplate:data.StrengthenTemple = temple.TempleManager.select(mabiId) as data.StrengthenTemple;
		var hushenTemplate:data.StrengthenTemple = temple.TempleManager.select(hushenId) as data.StrengthenTemple;
		var obj:any = {equipSource:"",label:"未激活",equipIntensify:"",equipLv:"",attr:{textColor:0xfbe709,size:16},quality:5,state:0};
		var len:number = Module_roleInfo.specialPos.length;
		for(var i:number = 0;i<len;i++){
			Module_roleInfo.specialSourceArr[i] = {};
			var item:any = Module_roleInfo.specialSourceArr[i];
			if(i===2 || i===3){
				item.state = 1;
				item.type = i;
				continue;
			}
			for(var o in obj){
				item[o] = obj[o];
			}
			//龙魂
			i===Module_roleInfo.specialPosObj[data.StrengthenType.ST_LH]?
			(item.type=data.StrengthenType.ST_LH,dragonTemplate.lev?
			(item.label = "",item.equipSource = Config.path_equip + Module_roleInfo.stateAsset[data.StrengthenType.ST_LH],
			item.equipIntensify = dragonTemplate.lev):item.label = "未激活"):0;
			//护盾
			i===Module_roleInfo.specialPosObj[data.StrengthenType.ST_HD]?
			(item.type=data.StrengthenType.ST_HD,shieldTemplate.lev?
			(item.label = "",item.equipSource=Config.path_equip + Module_roleInfo.stateAsset[data.StrengthenType.ST_HD],
			item.equipIntensify = shieldTemplate.lev):item.label="未激活"):0;
			//麻痹戒指
			i===Module_roleInfo.specialPosObj[data.StrengthenType.ST_MB]?
			(item.type=data.StrengthenType.ST_MB,mabiTemplate.lev?
			(item.label = "",item.equipSource = Config.path_equip + Module_roleInfo.stateAsset[data.StrengthenType.ST_MB],
			item.equipIntensify = mabiTemplate.lev):item.label = "未激活"):0;
			//护身戒指
			i===Module_roleInfo.specialPosObj[data.StrengthenType.ST_HS]?
			(item.type=data.StrengthenType.ST_HS,hushenTemplate.lev?
			(item.label = "",item.equipSource=Config.path_equip + Module_roleInfo.stateAsset[data.StrengthenType.ST_HS],
			item.equipIntensify = hushenTemplate.lev):item.label="未激活"):0;
		}
	}
	/*** 设置人物模型数据*/
	private setEquipData(curTarget:proto.Client_RoleInfo):void
	{
		var equip:any = curTarget.equips;
		Module_roleInfo.equips = equip;
		this.dealWithEquipData(equip);
		var sex:number = curTarget.roleAttr[data.RoleAttr.sex];
		var weaponId:number = DataCenter.roleEquip.get(Module_roleInfo.curJob+"").weaponId;
		var initWeaponId:number = DataCenter.roleEquip.get(Module_roleInfo.curJob+"").initWeaponId;
		var clothId:number = DataCenter.roleEquip.get(Module_roleInfo.curJob+"").clothId;
		var initClothId:number = DataCenter.roleEquip.get(Module_roleInfo.curJob+"").initClothId;
		var weaponTemple:data.ItemTemple;
		var clothTemple:data.ItemTemple;
		if(weaponId){
			weaponTemple = temple.TempleManager.select(weaponId) as data.ItemTemple;
			Module_roleInfo.weaponPath = Config.path_weapon_in+(sex === 2?weaponTemple.femaleInIcon:weaponTemple.maleInIcon)+"_a_0";
		}else{
			Module_roleInfo.weaponPath = Config.path_weapon_in+initWeaponId+"_a_0";
		}
		console.log("当前武器相关数据 ====>"+{path:Module_roleInfo.weaponPath,templeId:weaponId,sex:sex});
		if(clothId){
			clothTemple = temple.TempleManager.select(clothId) as data.ItemTemple;
			Module_roleInfo.clothPath = Config.path_role_in + (sex === 2?clothTemple.femaleInIcon:clothTemple.maleInIcon)+"_a_0";
		}else{
			Module_roleInfo.clothPath = Config.path_role_in + initClothId+"_a_0";
		}
		console.log("当前衣服相关数据 ====>"+{path:Module_roleInfo.clothPath,templeId:clothId,sex:sex});
	}
	/*** 解析人物装备数据*/
	private dealWithEquipData(equip:any[]):void{
		var qianghua:any[];
		var zhuling:any[];
		if(!Module_roleInfo.type){
			qianghua = DataCenter.forgingData.get(Module_roleInfo.curJob+"").get("qianghua");
			zhuling = DataCenter.forgingData.get(Module_roleInfo.curJob+"").get("zhuling");
		}else{
			qianghua = DataCenter.OtherforgingData.get(Module_roleInfo.curJob+"").get("qianghua");
			zhuling = DataCenter.OtherforgingData.get(Module_roleInfo.curJob+"").get("zhuling");
		}
		for(var i:number = 0;i<equip.length;i++){
			var template:data.ItemTemple = temple.TempleManager.select(equip[i].TempleID) as data.ItemTemple;
			var bgObj:any = GlobalFunc.setBgData(template.itemQuality);
			var searchData:any = GlobalFunc.searchMoreAttrValue([data.ItemAttr.equipPos,data.ItemAttr.score],equip[i].attrList);
			var path:string = Config.path_equip+template.icon+".png";
			var obj:any = {};
			obj.equipSource = path;
			obj.label = template.name;
			obj.quality = template.itemQuality;
			obj.job = template.JOB;
			// obj.sex = template.SEX;
			obj.icon = template.icon;
			obj.equipPos = searchData[data.ItemAttr.equipPos];
			obj.equipBoxSource = bgObj.boxS;
			obj.uid = equip[i].InstanceId;
			obj.TempleID = equip[i].TempleID;
			obj.level = template.needlev;
			obj.point = searchData[data.ItemAttr.score]?searchData[data.ItemAttr.score]:0;
			obj.attrStrAny = [];
			for(var j:number = 0,len:number = equip[i].attrList.length,itemAttr:proto.AttrValue;j<len;j++){
				itemAttr = equip[i].attrList[j];
				if(itemAttr.additional){
					obj.attrStrAny.push(GlobalFunc.formatTipsInfo(itemAttr.attrID)+ itemAttr.myvalue + " +"+itemAttr.additional);
				}
			}
			var num1 = Module_roleInfo.leftEquipPosList.indexOf(obj.equipPos);
			var num2 = Module_roleInfo.rightEquipPosList.indexOf(obj.equipPos);
			for(var j:number = 0;j<qianghua.length;j++){
				if(obj.equipPos === qianghua[j].pos){
					obj.equipIntensify = this.getTemple(qianghua[j].value).lev;
					obj.equipLv = this.getTemple(zhuling[j].value).lev;
					break;
				}
			}
			if(obj.equipPos === data.EquipPos.weapon){
				DataCenter.roleEquip.get(Module_roleInfo.curJob+"").weaponId = equip[i].TempleID;
			}else if(obj.equipPos === data.EquipPos.body){
				DataCenter.roleEquip.get(Module_roleInfo.curJob+"").clothId = equip[i].TempleID;
			}
			num1 != -1? Module_roleInfo.leftEquipArr[num1] = obj : Module_roleInfo.rightEquipArr[num2] = obj;
		}
	}
	protected createView(roleInfo:proto.Client_RoleInfo = null):void{
		if(!Module_roleInfo.type){
			//查看个人信息
			if(this.view && this.view.parent && this.view.parent.contains(this.view)){
				this.removeView(1);
			}else{
				//打开角色面板
				this.mainOfInView(DataCenter.RoleInFoVo[Module_roleInfo.curJob]);
			}
		}else{
			//从排行榜查看其它玩家信息
			// var obj:any = {};//存储其它玩家的相关id集合
			this.mainOfInView(roleInfo);
		}
	}
	/**进入人物界面入口函数 */
	private mainOfInView(roleInfo:proto.Client_RoleInfo):void{
		this.toDealWithRoleInfoData(roleInfo);
		this.view = new View_roleInfo();
		super.createView();
		this.refreshView(roleInfo);
	}
	public removeView(closeState:number):void{
		//关闭角色面板
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
			if(Module_roleInfo.type){
				DataCenter.OtherforgingData.clear();
				DataCenter.OtherRoleInfoVo = {};
				DataCenter.OtherRoleJobList = [];
			}
		}
	} 
	//==========================================请求操作========================================
	/** * 换装操作请求*/
	public realoadingCloth():void{
		// console.log("=========>>>>>>>>>>>>>change equips <<<<<<<<<==============");
		var msg_changeEquip:proto.c_ChangeEquip=new proto.c_ChangeEquip();
		msg_changeEquip.job = Module_roleInfo.curJob;
		SocketManager.getInstance().sendProto(msg_changeEquip);
	}
	/**翅膀升星请求 */
	public starUpGrade(data):void{
		var msg_star:proto.c_wings_up = new proto.c_wings_up();
		msg_star.type = data.type;
		msg_star.job = Module_roleInfo.curJob;
		SocketManager.getInstance().sendProto(msg_star);
	}
	/**翅膀升阶 */
	public wingUpgrade():void{
		var msg_wing:proto.c_wings_levup = new proto.c_wings_levup();
		msg_wing.job = Module_roleInfo.curJob;
		SocketManager.getInstance().sendProto(msg_wing);
	}
	/**使用修为 */
	public useXuewei():void{
		var msg_xiuwei:proto.c_ReduceLevel = new proto.c_ReduceLevel();
		SocketManager.getInstance().sendProto(msg_xiuwei);
	}
	/**转生 */
	public reborn():void{
		var reborn_msg:proto.c_Reborn = new proto.c_Reborn();
		SocketManager.getInstance().sendProto(reborn_msg);
	}
	/**经脉 */
	public jingmaiUp(data):void{
		var jingmai_msg:proto.c_JingMai_Up = new proto.c_JingMai_Up();
		jingmai_msg.type = data.type;
		jingmai_msg.job = Module_roleInfo.curJob;
		SocketManager.getInstance().sendProto(jingmai_msg);
	}
	/**经脉升阶 */
	public jingmaiLevUp(data):void{
		var jingmai_msg:proto.c_JingMai_LvUp = new proto.c_JingMai_LvUp();
		jingmai_msg.job = Module_roleInfo.curJob;
		SocketManager.getInstance().sendProto(jingmai_msg);
	}
	/**龙魂护盾 */
	public longhunhudunUp(data):void{
		var lh_hdMsg:proto.c_Strengthen = new proto.c_Strengthen();
		lh_hdMsg.job = data.job;
		lh_hdMsg.type = data.type;
		this.specialType = data.type;
		DataCenter.forginType = data.type;
		SocketManager.getInstance().sendProto(lh_hdMsg);
	}
	/**使用物品 */
	public useGoods(dataObj:any):void{
		var useGoodsMsg:proto.c_ItemUse = new proto.c_ItemUse();
		useGoodsMsg.templateId = dataObj.templateId;
		useGoodsMsg.useCount = dataObj.useCount;
		SocketManager.getInstance().sendProto(useGoodsMsg);
	}
	/**激活时装 */
	public activateFashion(dataObj:any):void{
		var fashion_msg:proto.c_ActiveFashion = new proto.c_ActiveFashion();
		fashion_msg.job = dataObj.job;
		this.fashionObj = dataObj;
		fashion_msg.itemTemplateId = dataObj.itemId;
		SocketManager.getInstance().sendProto(fashion_msg);
	}
	/**穿上时装 */
	public dressFashion(dataObj:any):void{
		var dress_msg:proto.c_DressFashion = new proto.c_DressFashion();
		dress_msg.job = dataObj.job;
		this.fashionObj = dataObj;
		dress_msg.ItemInstId = dataObj.insId;
		SocketManager.getInstance().sendProto(dress_msg);
	}
	private expireGather:any[] = [];
	/**时装到期 */
	public fashionExpire(dataObj:any):void{
		var expire_msg:proto.c_FashionExpire = new proto.c_FashionExpire();
		expire_msg.job = dataObj.job;
		expire_msg.itemInstId = dataObj.InstanceId;
		this.fashionObj = dataObj;
		this.expireGather.push(dataObj);
		SocketManager.getInstance().sendProto(expire_msg);
	}
	//====================================================================================

	//=======================================解析请求后的服务===========================================
	/*** 处理一键换装数据*/
	private setreloadingClothData(dataRes:any):void{
		var equips:proto.ItemData[] = dataRes.equips; 
		var curtRoleVo:proto.Client_RoleInfo = DataCenter.RoleInFoVo[Module_roleInfo.curJob];
		
		var len:number = equips.length;
		if(len <= 0){
			return;
		}
		var combatValue:number[] = [];
		for(var i:number = 0,item:proto.ItemData;i<len;i++){
			var index:number = -1;
			item = equips[i];
			if(!item){
				break;
			}
			var equipPos:number = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos,item.attrList);
			var equipPower:number = GlobalFunc.searchAttrValue(data.ItemAttr.score,item.attrList);
			if(equipPos === data.EquipPos.weapon){
				// this.weaponId = item.TempleID;
				DataCenter.roleEquip.get(Module_roleInfo.curJob+"").weaponId=item.TempleID;
				console.log("当前武器内观templeid ====>"+item.TempleID);
			}
			if(equipPos === data.EquipPos.body){
				// this.clothesId = item.TempleID;
				DataCenter.roleEquip.get(Module_roleInfo.curJob+"").clothId=item.TempleID;
				console.log("当前人物内观templeid ====>"+item.TempleID);
			}
			if(curtRoleVo.equips.length <= 0){
				curtRoleVo.equips.push(equips[i]);
				combatValue.push(equipPower);
				continue;
			}
			for(var j:number = 0,len2:number = curtRoleVo.equips.length,item2:proto.ItemData;j<len2;j++){
				item2 = curtRoleVo.equips[j];
				var obj:any = GlobalFunc.searchMoreAttrValue([data.ItemAttr.equipPos,data.ItemAttr.score],item2.attrList);
				if(obj[data.ItemAttr.equipPos] === equipPos){
					var powerChange:number = equipPower - obj[data.ItemAttr.score];
					combatValue.push(powerChange);
					curtRoleVo.equips[j] = equips[i];
					index = -1;
				}else{
					index = i;
				}
			}
			if(index >= 0){
				combatValue.push(equipPower);
				curtRoleVo.equips.push(equips[index]);
			}
		}
		GlobalFunc.creteRolePowerObj(curtRoleVo.equips,Module_roleInfo.curJob);
		this.sendMsgToModule([ModuleEnum.BAG],MainNotify.REMOVEBAGITEM,equips);
		// DataCenter.roleEquip.modify(Module_roleInfo.curJob+"",this.roleEquip);
		this.setEquipData(curtRoleVo);
		this.view.refreshWeaponMode(Module_roleInfo.weaponPath);
		this.view.refreshRoleMode(Module_roleInfo.clothPath);
		this.view.refreshEquipData({leftSourceArr:Module_roleInfo.leftEquipArr,rightSourceArr:Module_roleInfo.rightEquipArr});
		this.view.changePower(curtRoleVo.roleAttr[data.RoleAttr.FightValue]);
		if(combatValue.length){
			GlobalFunc.showPowerUpTips(curtRoleVo.roleAttr[data.RoleAttr.FightValue],combatValue);
		}
	}
	/**处理翅膀升星操作 */
	private starUpGradeRes(dataRes:proto.s_wings_up):void{
		if(!dataRes.isSuccess){
			return;
		}
		var wingId:string = Module_roleInfo.wingid.split("@@").shift();
		var template:data.WingsTemple = this.getTemple(parseInt(wingId)) as data.WingsTemple;
		var uid:number = DataCenter.goodsUIDgather.get(template.needItem+"");
		var obj:any = {exp : dataRes.exp,fUid:uid,costMoney:template.costMoney};
		this.view.upGradeStar(obj);
	}
	//========================================界面相关操作==============================================
	/**刷新转生数据 */
	public refreshRebornData(id:number):void{
		var template:data.RebornTemple = temple.TempleManager.select(id) as data.RebornTemple;
		var obj:any = {};
		obj.reLev = template.RELev;
		obj.reExp = template.REExp;
		obj.cAttr = this.createBaseAttr(template.Value,template.ValueArgument);
		obj.fightValue = template.FightAdd;
		obj.addItem = template.addItem;
		if(!template.nextReborn){
			//当前转生已到顶级
			obj.nAttr = obj.cAttr;
			obj.changeValue = 0;
			obj.rebornLev = 1;
		}else{
			var template2:data.RebornTemple = temple.TempleManager.select(template.nextReborn) as data.RebornTemple;
			obj.nAttr = this.createBaseAttr(template2.Value,template2.ValueArgument);
			obj.changeValue = template2.FightAdd - template.FightAdd;
			obj.rebornLev = 0;
		}
		this.view.refreshRebornData(obj);
	}
	/**创建基础属性字段 */
	private createBaseAttr(value,valueArgument):any[]{
		var arr:any[] = [];
		for(var i:number = 0;i<value.length;i++){
			var obj:any = {};
			obj.attr = GlobalFunc.formatTipsInfo(value[i]);
			obj.value = valueArgument[i];
			arr.push(obj);
		}
		return arr;
	}
	/**刷新技能数据 */
	public refreshSkillData(dataObj:any):void{
		var skillData:any = dataObj.UpInfo;
		var arr:any[] = [];
		for(var i = 0;i<skillData.length;i++){
			var template:data.SkillTemple = temple.TempleManager.select(parseInt(skillData[i].SkillID)) as data.SkillTemple;
			var obj:any = {};
			obj.skillName = template.name;
			obj.skillDesc = template.describe;
			obj.skillIcon = Config.path_skillIcon+ template.icon + ".png";
			obj.lv = template.needLev;
			obj.skillID = skillData[i].SkillID;
			arr.push(obj);
		}
		this.view.refreshSkillSource(arr);
	}
	/*** 刷新界面数据显示*/
	public refreshView(roleInfo:proto.Client_RoleInfo = null):void{
		Module_roleInfo.wingid = roleInfo.roleAttr[data.RoleAttr.wingsID] + "@@"+Math.random()*999;
		this.view.changePower(roleInfo.roleAttr[data.RoleAttr.FightValue]);
		this.view.refreshWeaponMode(Module_roleInfo.weaponPath)
		this.view.refreshRoleMode(Module_roleInfo.clothPath);
		this.view.refreshEquipData({leftSourceArr:Module_roleInfo.leftEquipArr,rightSourceArr:Module_roleInfo.rightEquipArr});
		this.view.refreshSpecialData({specialSourceArr:Module_roleInfo.specialSourceArr});
	}
	/**刷新人物特殊装备 */
	public resetSpecialData(id:number):void{
		var index:number;
		index = index = Module_roleInfo.specialPosObj[this.specialType];
		var strengtherTemple:data.StrengthenTemple = temple.TempleManager.select(id) as data.StrengthenTemple;
		Module_roleInfo.specialSourceArr[index].equipSource = Config.path_equip + Module_roleInfo.stateAsset[this.specialType];
		Module_roleInfo.specialSourceArr[index].equipIntensify = strengtherTemple.lev;
		Module_roleInfo.specialSourceArr[index].label = "";
	}
	/**重置翅膀星级数据 */
	public resetWingStarData(id:number):void{ 
		// DataCenter.role1Info.roleAttr[data.RoleAttr.wingsID] = id;
		Module_roleInfo.wingid = id +"@@"+Math.random()*999;
		var template:data.WingsTemple = this.getTemple(id) as data.WingsTemple;
		var uid:number = DataCenter.goodsUIDgather.get(template.needItem+"");
		var featherNum:number = 0;
		if(uid){
			featherNum = DataCenter.goodsSource.get(uid+"");
		}
		var curRole:proto.Client_RoleInfo;
		if(!Module_roleInfo.type){
			curRole = DataCenter.RoleInFoVo[Module_roleInfo.curJob];
		}else{
			curRole = DataCenter.OtherRoleInfoVo[Module_roleInfo.curJob];
		}
		var obj:any = {
			curValue:curRole.roleAttr[data.RoleAttr.wingsexp],
			totalValue:template.levExp,
			starLev:template.star,
			costMoney:template.costMoney,
			featherNum:featherNum?featherNum:0,
			uid:uid,
	 	};
		 obj.cattr = this.createBaseAttr(template.Value,template.ValueArgument);
		 if(!template.nextID){
			//当前翅膀已到顶级
			obj.nattr = obj.cattr;
		}else{
			var template2:data.WingsTemple = this.getTemple(template.nextID) as data.WingsTemple;
			obj.nattr = this.createBaseAttr(template2.Value,template2.ValueArgument);
		}
		this.view.initStarData(obj);
	}
	/**刷新内功数据 */
	public refreshMeridiansData(id:number):void{
		var template:data.JingMaiTemple = temple.TempleManager.select(id) as data.JingMaiTemple;
		var uid:number = DataCenter.goodsUIDgather.get(template.needItem+"");
		var count:number = 0;
		if(uid){
			count = DataCenter.goodsSource.get(uid+"");
		}
		var obj:any = {
			num:count?count:0,
			lev:template.star,
			rank:template.rank,
			fightValue:template.FightValue,
			cost:template.costElixir,
		}
		obj.cattr = this.createBaseAttr(template.Value,template.ValueArgument);
		if(template.nextID){
			var template2:data.JingMaiTemple = temple.TempleManager.select(template.nextID) as data.JingMaiTemple;
			obj.nattr = this.createBaseAttr(template2.Value,template2.ValueArgument);
			obj.changeValue = template2.FightValue - template.FightValue;
		}else{
			obj.changeValue = 0;
			obj.nattr = obj.cattr;
		}
		this.view.refreshMeridians(obj);
		
	}
	public setJob(obj:any){
		Module_roleInfo.curJob = obj.job;
		var curRoleInfo:proto.Client_RoleInfo;
		// this.weaponId = 0;
		// this.clothesId = 0;
		if(!Module_roleInfo.type){
			//查看个人信息
			this.view.refreshHeadCom();
			curRoleInfo = DataCenter.RoleInFoVo[Module_roleInfo.curJob];
		}else{
			curRoleInfo = DataCenter.OtherRoleInfoVo[Module_roleInfo.curJob];
		}
		this.toDealWithRoleInfoData(curRoleInfo);
		this.refreshView(curRoleInfo)
	}
	private getTemple(id:number):any{
		return temple.TempleManager.select(id);
	}
}