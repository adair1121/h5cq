class View_roleInfo extends Base_view{
	public returnBtn:eui.Image;
	public roleBtn:BagBtn;
	public zhuanBtn:BagBtn;
	public wingBtn:BagBtn;
	public meridiansBtn:BagBtn;
	public headCom:Role_headCom;
	public tabGroup:eui.Group;
	public bgSource:eui.Image;
	

	private curBtn:BagBtn;
	private sourceArr:any[] = [];
	private curModule:Module_roleInfo;
	private curTap:any;
	public constructor() {
		super();
		this.skinName = "View_role_skin";
	}
	protected childrenCreated():void{
		this.initialize();
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.addEventListener(MainNotify.RELOADINGCLOTH,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.STAR_UPGRADE,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.AUTO_STAR_UPGRADE,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.EXPERIENCE_STAR,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.WINGCHANGE,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.JOBCHAGNE,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.USE_XIUWEI,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.REBORN,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.JINGMAIUP,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.UP_LONGHUN_OR_HUDUN,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.USE_GOODS,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.OPENCJPANEL,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.SJ_ACTIVATE,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.SJ_DRESS,this.onDispatchRes,this);
		this.curTap = new RoleTab(Module_roleInfo.type);
		if(Module_roleInfo.type){
			this.headCom.updateHead(DataCenter.OtherRoleJobList,this.skinName);
		}else{
			this.headCom.updateHead(DataCenter.roleList,this.skinName);
		}
		this.tabGroup.addChild(this.curTap);
	}
	public refreshHeadCom():void{
		this.headCom.updateHead(DataCenter.roleList,this.skinName);
	}
	private onDispatchRes(evt:lcp.ChangeEvent):void{
		switch(evt.type){
			case MainNotify.RELOADINGCLOTH:
				this.curModule.realoadingCloth();
				break;
			case MainNotify.EXPERIENCE_STAR:
			case MainNotify.AUTO_STAR_UPGRADE:
				this.curModule.starUpGrade(evt.c_data);
				break;
			case MainNotify.STAR_UPGRADE:
				var wingId:number = DataCenter.RoleInFoVo[Module_roleInfo.curJob].roleAttr[data.RoleAttr.wingsID];
				this.curModule.resetWingStarData(wingId);
				break;
			case MainNotify.WINGCHANGE:
				this.curModule.wingUpgrade();
				break;
			case MainNotify.JOBCHAGNE:
				if(evt.c_data.insKey === this.skinName){
					this.curModule.setJob(evt.c_data);
				}
				break;
			case MainNotify.USE_XIUWEI:
				this.curModule.useXuewei();
				break;
			case MainNotify.REBORN:
				this.curModule.reborn();
				break;
			case MainNotify.JINGMAIUP:
				if(evt.c_data.type === 1){
					this.curModule.jingmaiUp(evt.c_data);
				}else{
					this.curModule.jingmaiLevUp(evt.c_data);
				}
				break;
			case MainNotify.UP_LONGHUN_OR_HUDUN:
				this.curModule.longhunhudunUp(evt.c_data);
				break;
			case MainNotify.USE_GOODS:
				this.curModule.useGoods(evt.c_data);
				break;
			case MainNotify.OPENCJPANEL:
				this.curModule.sendMsgToModule([ModuleEnum.CJ],MainNotify.OPENCJPANEL);
				break;
			case MainNotify.SJ_ACTIVATE:
				this.curModule.activateFashion(evt.c_data);
				break;
			case MainNotify.SJ_DRESS:
				this.curModule.dressFashion(evt.c_data);
				break;
			default:
				break;
		}
		
	}
	private initialize():void{
		this.curModule = this.module as Module_roleInfo;
		// this.curRoleBtn["roleIcon"].source="head_0_0_png";
		//===========================
		this.roleBtn.setAttr({text:"角色",currentState:"down"});
		this.curBtn = this.roleBtn;
		if(!Module_roleInfo.type){
			this.zhuanBtn.setAttr({text:"转生",currentState:"up"});
		}else{
			this.zhuanBtn.setAttr({text:"技能",currentState:"up"});
		}
		this.wingBtn.setAttr({text:"羽翼",currentState:"up"});
		this.meridiansBtn.setAttr({text:"经脉",currentState:"up"});
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				//点击返回
				this.removeView(1);
				break;
			case this.zhuanBtn.button:
				if(!Module_roleInfo.type){
					this.headCom.visible = false;
					this.changeTap(this.zhuanBtn,Role_reborn);
					this.curModule.refreshRebornData(DataCenter.playerAttr[data.PlayerAttr.rebornID]);
					this.bgSource.source = "reborn_bg_png";
				}else{
					this.headCom.visible = true;
					this.changeTap(this.zhuanBtn,SkillShowTab);
					this.curModule.refreshSkillData({UpInfo:DataCenter.OtherRoleInfoVo[Module_roleInfo.curJob].skills});
					this.bgSource.source = "skill_bg_png";
				}
				break;
			case this.wingBtn.button:
				this.changeTap(this.wingBtn,WingTab);
				var wingId:number;
				if(!Module_roleInfo.type){
					wingId = DataCenter.RoleInFoVo[Module_roleInfo.curJob].roleAttr[data.RoleAttr.wingsID];
				}else{
					wingId = DataCenter.OtherRoleInfoVo[Module_roleInfo.curJob].roleAttr[data.RoleAttr.wingsID];
				}
				this.curModule.resetWingStarData(wingId);
				this.headCom.visible = true;
				this.bgSource.source = "wing_equip_bg_png";
				break;
			case this.roleBtn.button:
				this.changeTap(this.roleBtn,RoleTab);
				if(!Module_roleInfo.type){
					this.curModule.refreshView(DataCenter.RoleInFoVo[Module_roleInfo.curJob]);
				}else{
					this.curModule.refreshView(DataCenter.OtherRoleInfoVo[Module_roleInfo.curJob]);
				}
				this.headCom.visible = true;
				this.bgSource.source = "role_bg_png";
				break;
			case this.meridiansBtn.button:
				this.changeTap(this.meridiansBtn,RoleMeridiansTab);
				var jinmaiId:number;
				if(!Module_roleInfo.type){
					jinmaiId = DataCenter.RoleInFoVo[Module_roleInfo.curJob].roleAttr[data.RoleAttr.jingmaiID];
				}else{
					jinmaiId = DataCenter.OtherRoleInfoVo[Module_roleInfo.curJob].roleAttr[data.RoleAttr.jingmaiID];
				} 
				this.curModule.refreshMeridiansData(jinmaiId);
				this.headCom.visible = true;
				this.bgSource.source = "meridians_bg_png";
				break;
			default :
				break;
		}
	}
	/**更新装备数据 */
	public refreshEquipData(data:any):void{
		if(this.curTap instanceof RoleTab){
			this.curTap.refreshEquipData(data);
		}
	}
	/**更新技能数据 */
	public refreshSkillSource(value:any):void{
		this.curTap.refreshSkillSource(value);
	}
	/**更新特殊装备 */
	public refreshSpecialData(data:any):void{
		if(this.curTap instanceof RoleTab){
			this.curTap.refreshSpecialData(data);
		}
	}
	/**更新龙魂或者护盾数据 */
	public refreshLongHunOrHudun(id:number):void{
		if(this.curTap instanceof RoleTab){
			this.curTap.refreshLongHunOrHudun(id);
		}
	}
	/**更新角色模型 */
	public refreshRoleMode(roleModePath:string = "",):void{
		if(this.curTap instanceof RoleTab && !DataCenter.roleFashionState){
			this.curTap.refreshRoleMode(roleModePath);
		}else if(this.curTap instanceof RoleTab && DataCenter.roleFashionState){
			var sex:number = DataCenter.roleAttrsArr.get(Module_roleInfo.curJob+"")[data.RoleAttr.sex];
			var roleTemple:data.ItemTemple = temple.TempleManager.select(DataCenter.curRoleFahsionId) as data.ItemTemple;
			var path:string = Config.path_role_in + (sex ===1?roleTemple.maleInIcon:roleTemple.femaleInIcon) + "_a_0";
			this.curTap.refreshRoleMode(path);
		}
	}
	/**更新武器模型 */
	public refreshWeaponMode(roleWeaponPath:string = ""):void{
		
		if(this.curTap instanceof RoleTab && !DataCenter.weaponFashionState){
			this.curTap.refreshWeaponMode(roleWeaponPath);
		}else if(this.curTap instanceof RoleTab && DataCenter.weaponFashionState){
			var sex:number = DataCenter.roleAttrsArr.get(Module_roleInfo.curJob+"")[data.RoleAttr.sex];
			var weaponTemple:data.ItemTemple = temple.TempleManager.select(DataCenter.weaponFashionId) as data.ItemTemple;
			var path:string = Config.path_role_in + (sex ===1?weaponTemple.maleInIcon:weaponTemple.femaleInIcon) + "_a_0";
			this.curTap.refreshWeaponMode(path);
		}
	}
	public refreshWingMode(roleWingPath:string = ""):void{
		if(this.curTap instanceof WingTab && !DataCenter.wingFashionState){
			this.curTap.refreshWingMode(roleWingPath);
		}
		if(this.curTap instanceof RoleTab && !DataCenter.wingFashionState){
			var id:number = DataCenter.roleEquip.get(Module_roleInfo.curJob+"").wingId;
			var wingTemple:data.WingsTemple = temple.TempleManager.select(id) as data.WingsTemple;
			var path:string = Config.path_wing_in + wingTemple.InIconResId + "_a_0";
			this.curTap.refreshWingMode(path);
		}else if(this.curTap instanceof RoleTab && DataCenter.wingFashionState){
			var wingTemple2:data.ItemTemple = temple.TempleManager.select(DataCenter.curWingFashionId) as data.ItemTemple;
			var path:string = Config.path_wing_in + wingTemple2.maleInIcon + "_a_0";
			this.curTap.refreshWingMode(path);
		}
	}
	/**更新转生数据 */
	public refreshRebornData(data:any):void{
		this.curTap.refreshRebornData(data);
	}
	/**更新筋脉数据 */
	public refreshMeridians(data):void{
		this.curTap.refreshData(data);
	}
	/** 更改战力值*/
	public changePower(rolePower:number):void{
		this.curTap.power.text = rolePower+"";
	}
	/**翅膀提升 */
	public upGradeStar(data:any):void{
		this.curTap.upGradeStar(data);
	}
	/**初始化翅膀升星进度数据 */
	public initStarData(data:any){
		this.curTap.fUID = data.uid;
		this.curTap.initLev(data.starLev);
		this.curTap.featherNum = data.featherNum;
		this.curTap.costNum = data.costMoney;
		this.curTap.cattrList = data.cattr;
		this.curTap.nattrList = data.nattr;
 		if(data.starLev != 10){
			this.curTap.curValue = data.curValue;
			this.curTap.totalValue = data.totalValue;
		}else{
			this.curTap.curValue = data.totalValue;
			this.curTap.totalValue = data.totalValue;
		}
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn,Tab:any){
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
		this.curTap.remove();
		this.curTap.parent.removeChild(this.curTap);
		this.curTap = new Tab(Module_roleInfo.type);
		this.tabGroup.addChild(this.curTap);
	}
	public removeView(closeState:number):void{
		this.curModule.removeView(closeState);
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.removeEventListener(MainNotify.RELOADINGCLOTH,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.STAR_UPGRADE,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.AUTO_STAR_UPGRADE,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.EXPERIENCE_STAR,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.WINGCHANGE,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.JOBCHAGNE,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.USE_XIUWEI,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.REBORN,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.JINGMAIUP,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.UP_LONGHUN_OR_HUDUN,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.OPENCJPANEL,this.onDispatchRes,this);
		Global.removeEventListener(MainNotify.SJ_ACTIVATE,this.onDispatchRes,this)
		Global.removeEventListener(MainNotify.SJ_DRESS,this.onDispatchRes,this);
		if(this.curTap && this.curTap.parent && this.curTap.parent.contains(this.curTap)){
			this.curTap.remove();
			this.curTap.parent.removeChild(this.curTap);
		}
	}
}