class View_map_unit extends egret.Sprite{
	public constructor() {
		super();
		this.unitIdDict=new Dictionary("unitIdDict");
		this.dropCon = new egret.Sprite();
		this.addChild(this.dropCon);
		// this.monCon=new egret.Sprite();
		// this.addChild(this.monCon);
		this.mapNum = this.numChildren;
		// Global.addEventListener("addMoveEffect",this.addMoveEffect,this);
	}

	private person:MapUnit_Role;
	private unitIdDict:Dictionary;
	// private monCon:egret.Sprite;
	private dropCon:egret.Sprite;
	private unitObj:any[] = [];
	private mapNum:number = 0;
	private curBossHp:number = 0;
	private labelGather:any[] = [];
	// private friendUnit:any[] = [];
	// private isCZSkill:boolean=false;
	// private CZSkillTime:number;

	// private dropArr:Array<proto.Client_DropInfo>
	/**
	 * 创建人物角色
	 * @param roleId 角色id
	 * @param skinId 皮肤id
	 * @param _x 站位x
	 * @param _y 站位y
	 * @param direction 朝向 
	 */
	public createPerson(roleInfo:proto.Client_RoleInfo,isFirst:boolean):void{

		var  role:MapUnit_Role;
		var roleAttr=roleInfo.roleAttr;
		if(this.unitIdDict.hasKey( roleInfo.instanceId+"")){
			role=this.unitIdDict.get( roleInfo.instanceId+"");
		}else{
			role=new MapUnit_Role();
			this.addChild(role);
			role.setRoleInfo(roleInfo.job,roleInfo.roleAttr,DataCenter.roleEquip.get(roleInfo.job+""));
			this.unitIdDict.add( roleInfo.instanceId+"",role);
			if(isFirst){
				Config.personId=roleInfo.instanceId+"";
			}
			eui.Binding.bindHandler(roleAttr,[data.RoleAttr.x+""],(value:number)=>{
				if(value){
					var p=PosUtils.gridToPixel(roleAttr[data.RoleAttr.x],roleAttr[data.RoleAttr.y]);
					role.gx=roleAttr[data.RoleAttr.x];
					role.x=p.x;
				}
			},this)
			eui.Binding.bindHandler(roleAttr,[data.RoleAttr.y+""],(value:number)=>{
				if(value){
					var p=PosUtils.gridToPixel(roleAttr[data.RoleAttr.x],roleAttr[data.RoleAttr.y]);
					role.gy=roleAttr[data.RoleAttr.y];
					role.y=p.y;
					for(var i:number = 0;i<this.unitObj.length;i++){
						if(this.unitObj[i][roleInfo.instanceId]){
							this.unitObj[i].gy = role.gy;
						}
					}
				}
			},this)
			var obj:any = {};
			obj[roleInfo.instanceId] = role;
			obj.gy = role.gy;
			role.insId = roleInfo.instanceId;
			this.unitObj.push(obj);
			// this.friendUnit.push(role);
		}
		// var p=PosUtils.gridToPixel(roleAttr[data.RoleAttr.x],roleAttr[data.RoleAttr.y]);
		// role.gx=roleAttr[data.RoleAttr.x];
		// role.gy=roleAttr[data.RoleAttr.y];
		// role.x=p.x;
		// role.y=p.y;
		
		
		
		
		
		
	}

	public clear():void{
		this.dropCon.removeChildren();
		this.unitObj = [];
		for(var key in this.unitIdDict.dict){
			var element = this.unitIdDict.dict[key];
			if(element && element.parent && element.parent.contains(element)){
				element.parent.removeChild(element);
			}
		}
		for(var i:number = 0;i<this.labelGather.length;i++){
			this.labelGather[i].parent.removeChild(this.labelGather[i]);
		}
		this.labelGather = [];
		// this.removeChildren();
		this.unitIdDict.clear();
	}
	/**单位移动 */
	public move(insId:string,action:proto.MoveAction,time:number=-1,stand:boolean=false,last:boolean = false):void{          
		var unit=this.unitIdDict.get( insId+"");
		var curUnitObj;
		for(var i:number =0;i<this.unitObj.length;i++){
			if(this.unitObj[i][insId]){
				curUnitObj = this.unitObj[i];
				break;
			}
		}
		if(time<0){
			if(unit instanceof MapUnit_Role){
				time=DataCenter.moveSpeed;
			}else if(unit instanceof MapUnit_Monster){
				time = unit.moveStep;
			}
		}
		if(unit){
			// if(unit instanceof MapUnit_Role && stand){
			// 	console.log("人物当前位置"+unit.gx,unit.gy);
			// 	console.log("人物当前移动步长："+time);
			// 	console.log("人物action数据移动下一个位置："+action.ex,action.ey);
			// }
			// var curTime:number = 0;
			// if(time === DataCenter.moveSpeed || (unit.moveStep && time === unit.moveStep)){
			// 	var gridXNum:number = Math.abs(action.ex - unit.gx);
			// 	var gridYNum:number = Math.abs(action.ey - unit.gy);
			// 	console.log(gridXNum,gridYNum)
			// 	var diffGridNum:number = 0;
			// 	if(gridXNum && gridYNum){
			// 		diffGridNum = Math.max(gridXNum,gridYNum);
			// 	}else if(gridXNum && !gridYNum){
			// 		diffGridNum = gridXNum;
			// 	}else if(!gridXNum && gridYNum){
			// 		diffGridNum = gridYNum;
			// 	}else{
			// 		console.log("获取到的野蛮冲撞的xy坐标为0");
			// 	}
			// 	curTime = diffGridNum*time;
			// }else{
			// 	curTime = time;
			// }
			this.dealWithIndex();
			if((action.ex === unit.gx) && (action.ey === unit.gy)){
				unit.changeStand();
				return;
			}
			curUnitObj[insId].gx = action.ex;
			curUnitObj[insId].gy = action.ey;
			curUnitObj.gy = action.ey;
			var p=PosUtils.gridToPixel(action.ex,action.ey);
			if(unit instanceof MapUnit_Monster && stand){
				egret.Tween.removeTweens(unit);
			}
			egret.Tween.get(unit).to({x:p.x,y:p.y},time).call(()=>{
				if(stand){
					unit.changeStand();
				}
				// if(unit instanceof MapUnit_Monster){
				// 	unit.changeStand();
				// }
				// for(var n:number = 0;n<this.friendUnit.length;n++){
				// 	if(DataCenter.endAction.hasKey(this.friendUnit[n].insId)){
				// 		var boo:boolean = DataCenter.endAction.get(this.friendUnit[n].insId);
				// 		if(boo){
				// 			unit.changeStand();
				// 		}
				// 	}
				// }
			},this);
			var state:string=action.state==1?MapUnitState.RUN:MapUnitState.STAND;
			unit.move(action.look,state);
			if(last){
				DataCenter.curFightState = true;
			}else{
				DataCenter.curExecActionState = true;
			}
			// unit.gx=action.ex;
			// unit.gy=action.ey;
		}
		
		// ActionUtil.getInstance().actionExecuting=false;
	}
	/**处理层级关系 */
	public dealWithIndex():void{
		var arr:any[] = GlobalFunc.sortRule(GlobalFunc.NORMALIZE,"gy",this.unitObj);
		var len:number = arr.length;
		for(var i:number = 0;i<len;i++){
			for(var key in arr[i]){
				var unit = arr[i][key];
				if(unit && unit.parent && unit.parent.contains(unit)){
					this.setChildIndex(unit,this.mapNum+i);
				}
			}
		}
	}
	/**创建单位 */
	public createUnit(action:proto.AddUnit,type:string = "",last:boolean = false):void{ 
		switch (action.type) {
			case 0:
				//怪物
				for(var i:number=0;i<action.entityInfoList.length;i++){
					var monster:proto.RoleEntityInfo=action.entityInfoList[i];
					var curUnit:any;
					if(this.unitIdDict.hasKey(monster.InstanceId)){
						break;
					}
					if(monster.job == 4){
						//怪物
						var unit:MapUnit_Monster=new MapUnit_Monster();
						unit.setMonsterInfo(monster.templateId);
						this.addChild(unit);
						var template:data.UnitTemple = temple.TempleManager.select(monster.templateId) as data.UnitTemple;
						unit.moveStep = template.moveTime;
						curUnit = unit;
						if(DataCenter.curFuBen === data.SenceType.GeRenBoss || DataCenter.curFuBen === data.SenceType.FuBen){
							this.curBossHp = monster.attrList[data.RoleAttr.HP];
							Global.dispatchEvent(MainNotify.BOSSTOTALHP,{MHP:monster.attrList[data.RoleAttr.MHP]});
							Global.dispatchEvent(MainNotify.BOSSCURHP,{curHp:this.curBossHp});
						}
						// if(type === "friendUnit"){
						// 	this.friendUnit.push(unit);
						// }
					}else{
						//角色
						var roleUnit:MapUnit_Role = new MapUnit_Role();
						this.addChild(roleUnit);
						var sex:number = monster.attrList[data.RoleAttr.sex];
						var obj:any = DataCenter.jobInitData[monster.job]
						var initClothId:number = sex === 1?obj.maleResID:obj.femaleResID;
						var initWeaponId:number = sex===1?obj.maleWeaponID:obj.femaleWeaponID;
						var roleEquip:any = {
							clothId:"",
							weaponId:"",
							initClothId:initClothId,
							initWeaponId:initWeaponId
						}
						for(var j:number = 0,len = monster.equips.length,item:proto.ItemData;j<len;j++){
							item = monster.equips[j];
							var pos:number = GlobalFunc.searchAttrValue(data.ItemAttr.equipPos,item.attrList);
							if(pos === data.EquipPos.weapon){
								roleEquip.weaponId = item.TempleID;
							}
							if(pos === data.EquipPos.body){
								roleEquip.clothId = item.TempleID;
							}
						}
						roleUnit.setRoleInfo(monster.job,monster.attrList,roleEquip);
						curUnit = roleUnit;
					}
					var sx:number = monster.attrList[data.RoleAttr.x];
					var sy:number = monster.attrList[data.RoleAttr.y];
					var p=PosUtils.gridToPixel(sx,sy);
					curUnit.x=p.x;
					curUnit.y=p.y;
					curUnit.gx = sx;
					curUnit.gy = sy;
					curUnit.insId = monster.InstanceId;
					var obj:any = {};
					obj[monster.InstanceId] = curUnit;
					obj.gy = curUnit.gy;
					this.unitObj.push(obj);
					this.unitIdDict.add( monster.InstanceId,curUnit);
				}
				// console.log("创建----","目标："+ action.unitId,"字典：",this.unitIdDict);
				break;
			case 1:
				//掉落的物品
				// this.dropArr=[];
				DataCenter.bag.curDropGroup = [];
				for(var k:number=0;k<action.drop.length;k++){
					var drop:proto.Client_DropInfo=action.drop[k];
					var dropUnit:MapUnit_Drop = new MapUnit_Drop();
					dropUnit.setDropInfo(drop);
					this.dropCon.addChild(dropUnit);
					var p = PosUtils.gridToPixel(drop.sx,drop.sy);
					dropUnit.x = p.x;
					dropUnit.y = p.y;
					dropUnit.gx = drop.sx;
					dropUnit.gy = drop.sy;
					// console.log("掉落品位置：",drop.sx,drop.sy,"id="+drop.instanceId);
					
					this.unitIdDict.add( drop.instanceId+"",dropUnit);
					// this.dropArr.push(drop);
				}
				// var role:MapUnit_Role= this.unitIdDict.get( Config.personId);
				// var any:any={roleId:Config.personId,x:role.gx,y:role.gy};
				// ActionUtil.getInstance().setPickUpAction(any,egret.getTimer()+DataCenter.time_stamps,this.dropArr);
				break;
			case 2:

				break;
		
			default:
				break;
		}
		
		this.dealWithIndex();
		if(last){
			DataCenter.curFightState = true;
		}else{
			DataCenter.curExecActionState = true;
		}
		// ActionUtil.getInstance().actionExecuting=false;
	}
	/**单位攻击 */
	public Attack(myAction:proto.MyAction,last:boolean = false):void{
		var action:proto.UseSkill=myAction.S_Useskill;
		if(!action){
			return;
		}
		var unit=this.unitIdDict.get( myAction.InstanceId);
		
		if(unit){
			var boo:boolean=unit instanceof(MapUnit_Role);
			// for(var n:number = 0;n<this.friendUnit.length;n++){
			// 	if(DataCenter.endAction.hasKey(this.friendUnit[n].insId)){
			// 		var boo:boolean = DataCenter.endAction.get(this.friendUnit[n].insId);
			// 		if(boo){
			// 			unit.changeStand();
			// 		}
			// 	}
			// }
			var temp :data.SkillTemple=temple.TempleManager.select(action.skillID) as data.SkillTemple;
			if(boo && (unit.job != data.JobAttr.JS)){
				unit.cast(action);
			}else{
				unit.attack(action);
			}
			if(boo){
				this.executeChongzhuang(myAction,temp);
			}
			if(action.summonUnit){
				this.createUnit(action.summonUnit,"friendUnit");
			}
			if(action.damageInfoList){
				// var temp:data.SkillTemple=temple.TempleManager.select(action.skillID) as data.SkillTemple;
				var timer:TimerUtils=new TimerUtils();
				var waitTime:number = temp.skillTime;
				waitTime += temp.strikeTime; 
				timer.setTimeOut(waitTime,()=>{
					timer=null;
					for(var i:number=0;i<action.damageInfoList.length;i++){
						this.showDamage(action.damageInfoList[i],action.attacker,last);
					}
				},this);
			}
			if(action.bufferList.length && unit instanceof MapUnit_Role){
				// for(var j:number = 0;j<action.bufferList.length;j++){
					unit.addBuff(action.bufferList); 
				// }
			}
			if(action.removeList.length && unit instanceof MapUnit_Role){
				// for(var m:number = 0;m<action.removeList.length;m++){
					unit.clearOnceBuff(action.removeList);
				// }
			}
		}
	}

	private executeChongzhuang(myAction:proto.MyAction,skillTemple:data.SkillTemple):void{
		if(skillTemple.skillType === 4){
			var action:proto.MoveAction=new proto.MoveAction();
			action.ex=myAction.S_Useskill.hitX;
			action.ey=myAction.S_Useskill.hitY;
			action.look=myAction.S_Useskill.look;
			action.state=1;
			this.move(myAction.InstanceId,action,myAction.S_Useskill.hitSkillTime,true);
		}
		var monsterList:proto.DamageInfo[] = myAction.S_Useskill.damageInfoList;
		for(var i:number = 0,len:number = monsterList.length;i<len;i++){
			var item:proto.DamageInfo = monsterList[i]
			var monAction:proto.MoveAction = new proto.MoveAction();
			monAction.ex = item.hitX;
			monAction.ey = item.hitY;
			if(item.hitX && item.hitY && skillTemple.strikeTime){
				var monsterUnit = this.unitIdDict.get(item.instId);
				monsterUnit.changeStand();
				this.move(item.instId,monAction,myAction.S_Useskill.hitSkillTime,true);
			}
		}
		if(skillTemple.skillType ===4){
			Global.dispatchEvent("czSkillMove",{targetId:myAction.InstanceId,time:myAction.S_Useskill.hitSkillTime,action:action});
		}
	}
	/**单位移除*/
	public removeUnit(insId:string,last:boolean = false):void{
		var unit=this.unitIdDict.get( insId+"");
		if(unit){
			if(unit instanceof(MapUnit_Drop)){   
				DataCenter.count += 1;
				// this.dropCon.removeChild(unit); 
				this.dropCon.removeChild(unit); 
				// console.log("移除掉落品:","id="+myAction.InstanceId+"/>>>>时间："+myAction.timeSpan+"/>>>>ex:"+unit.gx+"/>>>ey:"+unit.gy);
			}else{
				this.removeChild(unit);
			}
			// for(var j:number = 0;j<this.friendUnit.length;j++){
			// 	if(this.friendUnit[j] == unit){
			// 		this.friendUnit.splice(j,1);
			// 		break;
			// 	}
			// }
			for(var i:number = 0;i<this.unitObj.length;i++){
				if(this.unitObj[i][insId]){
					this.unitObj.splice(i,1);
					break;
				}
			}
			this.unitIdDict.remove( insId+"");
		// 	unit.direct=action.look;
		// 	unit.state=MapUnitState.ATTACK;
		}
		if(last){
			DataCenter.curFightState = true;
		}else{
			DataCenter.curExecActionState = true;
		}
		

		
	}
	/**单位伤害展示 */
	private damageShow:string;
	public showDamage(damageInfo:proto.DamageInfo,job:number,last:boolean = false):void{
		var unit=this.unitIdDict.get( damageInfo.instId+"");
		if(unit){
			if(unit instanceof MapUnit_Role){
				Global.dispatchEvent(MainNotify.REDUCE_POLLBALL,{damage:damageInfo.showInfo},false);
				// ModuleManager.getInstance().slotMessage([ModuleEnum.MAINUI],[MainNotify.REDUCE_POLLBALL],{damage:action.damage});
				this.damageShow = "redFont_fnt";
			}else if(unit instanceof MapUnit_Monster){
				switch(job){
					case 0:
						this.damageShow = "redFont_fnt";
						break;
					case 1:
						this.damageShow = "warrior_fnt";
						break;
					case 2:
						this.damageShow = "damageFont_blue_fnt";
						break;
					case 3:
						this.damageShow = "purpleFont_fnt";
						break;
					default:
						break;
				}
				if(DataCenter.curFuBen === data.SenceType.GeRenBoss || DataCenter.curFuBen === data.SenceType.FuBen){
					this.curBossHp  = this.curBossHp - Math.abs(damageInfo.showInfo);
					Global.dispatchEvent(MainNotify.BOSSCURHP,{curHp:this.curBossHp},false);
				}
			}
			if(damageInfo.showInfo>0){
				this.damageShow ="greenFont_fnt";
			}else{
				this.damageShow ="redFont_fnt";
			}
			var txt:eui.BitmapLabel=new eui.BitmapLabel();
			txt.font=RES.getRes(this.damageShow);
			txt.text=Math.abs(damageInfo.showInfo)+"";
			// txt.text=damageInfo.showInfo>=0?"+"+damageInfo.showInfo:"-"+(-damageInfo.showInfo);
			this.addChild(txt);
			this.labelGather.push(txt);
			txt.x=unit.x;
			txt.y=unit.y - unit.height + ((Math.random()*10)>>0);
			egret.Tween.get(txt).to({y:txt.y-120,alpha:0},1500,egret.Ease.circOut).call(()=>{
				this.removeChild(txt);
				egret.Tween.removeTweens(txt);
				this.labelGather.splice(this.labelGather.indexOf(txt),1);
			},this);
			//加buff
			if(damageInfo.addbuffList.length){
				for(var i:number=0;i<damageInfo.addbuffList.length;i++){
					unit.addBuff(damageInfo.addbuffList[i]);
				}
			}
			if(damageInfo.removeBufferList.length){
				for(var j:number=0;j<damageInfo.addbuffList.length;j++){
					unit.clearOnceBuff(damageInfo.addbuffList[j]);
				}
			}
			if(damageInfo.isDead){
				//1、清buff
				unit.clearBuff();
				unit.clearBuffShowInfo();
				//2、移除
				this.removeUnit(damageInfo.instId);
			}
			if(damageInfo.dropActionList){
				this.createUnit(damageInfo.dropActionList.S_Create);
			}
		}
		if(last){
			DataCenter.curFightState = true;
		}else{
			DataCenter.curExecActionState = true;
		}
		// ActionUtil.getInstance().actionExecuting=false;
	}
	private judgeLastAction():void{

	}
	public setBuff(myAction:proto.MyAction,last:boolean = false):void{
		var unit=this.unitIdDict.get( myAction.InstanceId+"");
		var buffEffect:proto.BuffEffect = myAction.S_BuffEffect;
		if(unit){
			if(buffEffect.showInfo){
				unit.addBuffShowInfo(buffEffect.showInfo,buffEffect.buffIdList);
			}
			if(!buffEffect.type){
				//移除
				unit.removeBuff(buffEffect.buffIdList);
				unit.removeOneBuffShowInfo(buffEffect.buffIdList);
			}
			if(buffEffect.isDead){
				unit.clearBuffShowInfo();
				unit.clearBuff();
				this.removeUnit(myAction.InstanceId);
				if(buffEffect.ResurrectionUnit){
					this.createUnit(buffEffect.ResurrectionUnit);
				}
			}
		}
		if(last){
			DataCenter.curFightState = true;
		}else{
			DataCenter.curExecActionState = true;
		}
		// if(unit){
		// 	if(myAction.S_BuffEffect.move){
		// 		this.addMoveBuff(myAction.InstanceId,myAction.S_BuffEffect.buffId,myAction.S_BuffEffect.move);
		// 	}
		// }
	}
	private addMoveBuff(targetId:string,buffId:number,action:proto.MoveAction):void{
		var temp:data.BuffTemple=temple.TempleManager.select(buffId) as data.BuffTemple;
		var time:number=temp.Argument1[0]*temp.Argument2[0];
		var any:any={targetId:targetId,action:action,time:time};
		this.move(targetId,action,time,true);
		Global.dispatchEvent("addMoveBuff",any);
	}
	 public showChangeStand(myAction:proto.MyAction,last:boolean = false):void{
		 this.unitIdDict.get( myAction.InstanceId+"").changeStand();
		 if(last){
			DataCenter.curFightState = true;
		 }else{
			DataCenter.curExecActionState = true;
		 }
		//  ActionUtil.getInstance().actionExecuting=false;
	 }

	 

	 
}