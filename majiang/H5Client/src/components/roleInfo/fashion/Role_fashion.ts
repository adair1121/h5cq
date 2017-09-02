class Role_fashion extends eui.Component{
	public roleBtn:BagBtn;
	public weaponBtn:BagBtn;
	public wingBtn:BagBtn;
	public returnBtn:eui.Image;
	public headCom:Role_headCom;
	public list:eui.List;
	public power:eui.Label;
	public roleModuleGroup:eui.Group;
	public scroller:eui.Scroller;
	public itemName:eui.Label;
	public attrList:eui.List;
	public itemPower:eui.Label;
	public needNum:eui.Label;
	public activateBtn:eui.Button;
	private collect:eui.ArrayCollection;
	private attrCollect:eui.ArrayCollection;
	private curBtn:BagBtn;
	private wingMc:MovieClip;
	private weaponMc:MovieClip;
	private roleMc:MovieClip;
	private SELECT:string = "select";
	private NOSELECT:string = "noselect";
	private skinState:string = "";
	private curJob:number = 0;
	private curSex:number = 0;
	private fashionGoodsData:any[];
	private fashionEquipData:any[] = [];
	private curItem:any;
	private dress:number = 1;
	private active:number = 0;
	private roleFashionSource:any ={};
	private weaponFahsionSource:any = {};
	private wingFahionSource:any = {}
	private posObj:any = {};
	private curType:number = data.EquipPos.fashion_role;
	public constructor() {
		super();
		this.skinName = "Role_fashion_skin";
	}
	protected childrenCreated():void{
		this.fashionEquipData = [];
		this.curItem = null;
		this.roleBtn.setAttr({currentState:"up",text:"角色"});
		this.weaponBtn.setAttr({currentState:"up",text:"武器"});
		this.wingBtn.setAttr({currentState:"up",text:"翅膀"});
		this.collect = new eui.ArrayCollection();
		this.attrCollect = new eui.ArrayCollection();
		this.wingMc = new MovieClip();
		this.roleMc = new MovieClip();
		this.weaponMc = new MovieClip();
		this.activateBtn.label = "激活";
		this.list.itemRenderer = ForgingItemRenderer;
		this.attrList.itemRenderer = Role_specialItem;
		this.attrList.dataProvider = this.attrCollect;
		this.list.dataProvider = this.collect;
		this.scroller.viewport = this.list;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		Global.addEventListener(MainNotify.JOBCHAGNE,this.onJobChange,this);
		Global.addEventListener(MainNotify.SJ_ACTIVATE_SUCCESS,this.onChangeHandler,this);
		Global.addEventListener(MainNotify.SJ_DRESS_SUCCESS,this.onChangeHandler,this);
		Global.addEventListener(MainNotify.SYNCTIME,this.onChangeHandler,this);
		Global.addEventListener(MainNotify.SJ_EXPIRE,this.onChangeHandler,this);
		this.skinState = this.NOSELECT;
		this.invalidateState();
		this.curJob = DataCenter.roleList[0].job;
		this.curSex = DataCenter.roleList[0].sex;
		this.headCom.updateHead(DataCenter.roleList,this.skinName);
		this.curBtn = this.roleBtn;
		this.fashionGoodsData = DataCenter.BagitemType2Gather[301];
		this.roleFashionSource = this.createSourceCollect(DataCenter.fashionData[data.EquipPos.fashion_role]);
		this.weaponFahsionSource= this.createSourceCollect(DataCenter.fashionData[data.EquipPos.fashion_weapon]);
		this.wingFahionSource = this.createSourceCollect(DataCenter.fashionData[data.EquipPos.fashion_wings]);
		this.changeTap(this.curBtn,this.roleFashionSource);
		this.posObj[data.EquipPos.fashion_role] = this.roleFashionSource;
		this.posObj[data.EquipPos.fashion_weapon] = this.weaponFahsionSource;
		this.posObj[data.EquipPos.fashion_wings] = this.wingFahionSource;
		this.dealWithTime(this.roleFashionSource);
		this.setRolePower();
	}
	private dealWithTime(source:any[]):void{
		for(var i:number = 0;i<DataCenter.roleList.length;i++){
			for(var j:number = 0;j<source.length;j++){
				this.refreshFashionTime(DataCenter.roleList[i].job,source[j].clothesId);
			}
		}
	}
	private createSourceCollect(source:any[]):any[]{
		var arr:any[] = [];	
		for(var i:number = 0;i<source.length;i++){
			var obj:any = {};
			var itemTemple:data.ItemTemple = temple.TempleManager.select(source[i].clothesId) as data.ItemTemple;
			obj.equipSource = Config.path_equip + itemTemple.icon + ".png";
			obj.boxS = GlobalFunc.setBgData(itemTemple.itemQuality).boxS;
			obj.iName = source[i].clothesNmame;
			for(var key in source[i]){
				obj[key] = source[i][key];
			}
			arr.push(obj);
		}
		return arr;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.roleBtn.button:
				this.curType = data.EquipPos.fashion_role;
				this.changeTap(this.roleBtn,this.roleFashionSource);
				break;
			case this.weaponBtn.button:
				this.curType = data.EquipPos.fashion_weapon;
				this.changeTap(this.weaponBtn,this.weaponFahsionSource);
				break;
			case this.wingBtn.button:
				this.changeTap(this.wingBtn,this.wingFahionSource);
				this.curType = data.EquipPos.fashion_wings;
				break;
			case this.returnBtn:
				PopUpManager.removePopUp(this.skinName,0);
				break;
			case this.activateBtn:
				this.judgeActivate();
				break;
		}
	}
	private judgeActivate():void{
		if(this.itemState === this.active){
			var obj:any = this.judgeIfHasFashion(this.curItem);
			if(!obj.hasFashion){
				var obj:any = {type:TipsEnum.TYPE_WARN,label:"时装材料不足"};
				PopTipsManager.showPopTips([obj]);
			}else{
				//激活
				var obj:any = {
					pos:obj.pos,
					job:this.curJob,
					itemId:this.curItem.needItem,
					clothId:this.curItem.clothesId,
					item:obj.fashionItem
				};
				Global.dispatchEvent(MainNotify.SJ_ACTIVATE,obj);
			}
		}else{
			//穿上
			var obj1:any = this.getFashionEquipData(this.curItem);
			Global.dispatchEvent(MainNotify.SJ_DRESS,obj1);
		}
	}
	private getFashionEquipData(item:any):any{
		for(var i:number = 0;i<this.fashionEquipData.length;i++){
			if(this.fashionEquipData[i].TempleID === item.clothesId){
				var obj:any = {
					clothId : item.clothesId,
					insId:this.fashionEquipData[i].uid,
					pos:item.clothesPart,
					job:this.curJob,
					item:this.fashionEquipData[i]
				}
				return obj
			}
		}
	}
	public setInitData(dataObj:any):void{
		if(dataObj.wingPath){
			this.refreshWingMc(dataObj.wingPath);
		}
		this.refreshWeaponMc(dataObj.weaponPath);
		this.refreshRoleMode(dataObj.rolePath);
		this.skinState = this.NOSELECT;
		this.invalidateState();
		this.curBtn = this.roleBtn;
		this.changeTap(this.curBtn,this.roleFashionSource);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		//计算背包时装装备
		for(var key in DataCenter.BagitemType2Gather){
			if(parseInt(key) === 401 || parseInt(key) === 402 ||parseInt(key)===403 ){
				this.fashionEquipData = this.fashionEquipData.concat(DataCenter.BagitemType2Gather[key]);
			}
		}
		this.list.selectedIndex = evt.itemIndex;
		this.curItem = evt.item;
		if(this.skinState === this.NOSELECT){
			this.skinState = this.SELECT;
			this.invalidateState();
		}
		var itemTemple:data.ItemTemple = temple.TempleManager.select(evt.item.clothesId) as data.ItemTemple;
		this.attrCollect.source = this.createBaseAttr(itemTemple.num,itemTemple.Value);
		this.itemName.text = "属性-"+itemTemple.name;
		this.itemPower.text = "战力:"+itemTemple.FightVaule;
		this.needNum.text = itemTemple.name +"x" + evt.item.itemNumber;
		var path:string = "";
		switch(evt.item.clothesPart){
			case data.EquipPos.fashion_role:
				path = Config.path_role_in + (this.curSex === 1?itemTemple.maleInIcon:itemTemple.femaleInIcon)+"_a_0";
				this.refreshRoleMode(path);
				this.itemStateChange(DataCenter.roleFashionState,evt.item,DataCenter.curRoleFahsionId);
				break;
			case data.EquipPos.fashion_weapon:
				path = Config.path_equip + (this.curSex === 1?itemTemple.maleInIcon:itemTemple.femaleInIcon)+"_a_0";
				this.refreshWeaponMc(path);
				this.itemStateChange(DataCenter.weaponFashionState,evt.item,DataCenter.weaponFashionId);
				break;
			case data.EquipPos.fashion_wings:
				path = Config.path_wing_in + itemTemple.maleInIcon+"_a_0";
				this.refreshWingMc(path);
				this.itemStateChange(DataCenter.wingFashionState,evt.item,DataCenter.curWingFashionId);
				break;
		}
	}
	/**时装激活成功 */
	private onChangeHandler(evt:lcp.ChangeEvent):void{
		switch(evt.type){
			case MainNotify.SJ_ACTIVATE_SUCCESS:
				if(!DataCenter.fashionActive[this.curJob]){
					DataCenter.fashionActive[this.curJob] = {};
				}
				if(!this.curItem){
					return;
				}
				var obj:any = {pos:evt.c_data.pos,ifDress:true,isActive:true,time:evt.c_data.time,expireTime:evt.c_data.expireTime,insId:evt.c_data.insId};
				DataCenter.fashionActive[this.curJob][this.curItem.clothesId] = obj;
				this.refreshFashionTime(this.curJob,this.curItem.clothesId);
				break;
			case MainNotify.SJ_DRESS_SUCCESS:
				for(var key in DataCenter.fashionActive){
					for(var key2 in DataCenter.fashionActive[key]){
						DataCenter.fashionActive[key][key2].ifDress = false;
					}
				}
				DataCenter.fashionActive[this.curJob][this.curItem.clothesId].ifDress = true;
				break;
			case MainNotify.SJ_EXPIRE:
				var fashionObj:any = DataCenter.fashionActive[evt.c_data.job];
				for(var key in fashionObj){
					if(parseInt(key) == evt.c_data.clothId){
						// this.refreshFashionTime(evt.c_data.job,evt.c_data.clothId);
						delete fashionObj[key];
						break;
					}
				}
				break;
			case MainNotify.SYNCTIME:
				this.refreshFashionTime(evt.c_data.job,evt.c_data.clothId);
				break;
		}
		this.activateBtn.visible = false;
		
	}
	private refreshFashionTime(job:number,clothId:string):void{
		var obj:any = DataCenter.fashionActive[job];
			for(var key in obj){
				if(parseInt(key) === parseInt(clothId)){
					var source:any[] = this.posObj[obj[key].pos];
					for(var i:number = 0;i<source.length;i++){
						if(source[i].clothesId == clothId){
							source[i].time = obj[key].time;
						}
					}
					if(this.curType === obj[key].pos){
						this.collect.source = source;
					}
					break;
				}
			}
	}
	private itemState:number;
	/**item状态改变 */
	private itemStateChange(state:boolean,item:any,curFashionId:number):void{
		if(state){
			//当前处于时装激活状态
			if(curFashionId != item.clothesId){
				//切换到了新的时装id
				var activeFashion:any = DataCenter.fashionActive[this.curJob][item.clothesId];
				if(activeFashion && activeFashion.isActive){
					this.activateBtn.label = "穿上";
					this.activateBtn.visible = true;
					this.itemState = this.dress;
				}else{
					this.activateBtn.label = "激活";
					this.activateBtn.visible = true;
					this.itemState = this.active;
				}
			}else{
				this.activateBtn.visible = false;
			}
		}else{
			this.itemState = this.active;
			this.activateBtn.label = "激活";
			this.activateBtn.visible = true;
		}
	}
	/**判断是否存在当前时装道具 */
	private judgeIfHasFashion(curItem:any):any{
		var hasFashion:boolean = false;
		var fashionItem:any  = {};
		var pos:number = 0;
		if(this.fashionGoodsData && this.fashionGoodsData.length){
			for(var i:number = 0;i<this.fashionGoodsData.length;i++){
				if(this.fashionGoodsData[i].TempleID === this.curItem.needItem){
					fashionItem = this.fashionGoodsData[i];
					pos = this.curItem.clothesPart;
					hasFashion = true;
					return {hasFashion:hasFashion,pos:pos,fashionItem:fashionItem};
				}
			}
		}
		return {hasFashion:false}
	}
	private onJobChange(evt:lcp.ChangeEvent):void{
		if(evt.c_data.insKey === this.skinName){
			this.curJob = evt.c_data.job;
			this.curSex = DataCenter.roleList[this.curJob].sex;
			var clothId:number = DataCenter.roleEquip.get(this.curJob+"").clothId;
			clothId = clothId?clothId:DataCenter.roleEquip.get(this.curJob+"").initClothId;
			var weaponId:number = DataCenter.roleEquip.get(this.curJob+"").weaponId;
			weaponId = weaponId?weaponId:DataCenter.roleEquip.get(this.curJob+"").initWeaponId;
			var wingId:number = DataCenter.roleEquip.get(this.curJob+"").windId;
			wingId = wingId?wingId:0;
			var dataObj:any = {};
			if(wingId){
				var wingTemple:data.WingsTemple = temple.TempleManager.select(wingId) as data.WingsTemple;
				dataObj.wingPath = Config.path_wing_in + wingTemple.maleResId + "_a_0";
			}
			var clothTemple:data.ItemTemple = temple.TempleManager.select(clothId) as data.ItemTemple;
			dataObj.rolePath = Config.path_role_in + (this.curSex === 1?clothTemple.maleInIcon:clothTemple.femaleInIcon)+"_a_0";
			var weaponTemple:data.ItemTemple = temple.TempleManager.select(weaponId) as data.ItemTemple;
			dataObj.weaponPath = Config.path_equip + (this.curSex === 1?weaponTemple.maleInIcon:weaponTemple.femaleInIcon)+"_a_0";
			this.setInitData(dataObj);
			this.setRolePower();
		}
	}
	protected getCurrentState():string{
		return this.skinState;
	}
	public remove():void{
		if(this.roleMc){
			this.roleMc.gotoAndStop(0);
			this.roleMc = null;
		}
		if(this.weaponMc){
			this.weaponMc.gotoAndStop(0);
			this.weaponMc = null;
		}
		if(this.wingMc){
			this.wingMc.gotoAndStop(0);
			this.wingMc = null;
		}
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		Global.removeEventListener(MainNotify.JOBCHAGNE,this.onJobChange,this);
		Global.removeEventListener(MainNotify.SJ_ACTIVATE_SUCCESS,this.onChangeHandler,this);
		Global.removeEventListener(MainNotify.SJ_DRESS_SUCCESS,this.onChangeHandler,this);
		Global.removeEventListener(MainNotify.SYNCTIME,this.onChangeHandler,this);
		Global.removeEventListener(MainNotify.SJ_EXPIRE,this.onChangeHandler,this);
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn,source:any[]){
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
		this.collect.source = source;
		this.dealWithTime(source);
		if(this.skinState === this.SELECT){
			this.scroller.viewport.scrollH = 0;
		}
	}
	/**更新角色模型 */
	private refreshRoleMode(roleModePath:string = ""):void{
		this.roleMc.loadFile(roleModePath,true,-1,null,this);
		if(!this.roleModuleGroup.contains(this.roleMc)){
			this.roleModuleGroup.addChild(this.roleMc);
		}
		this.roleMc.x = (this.roleModuleGroup.width >> 1);
		this.roleMc.y = (this.roleModuleGroup.height>>1)+25
	}
	/**更新翅膀模型 */
	private refreshWingMc(roleWingPath:string=""):void{
		this.wingMc.loadFile(roleWingPath,true,-1,null,this);
		if(!this.roleModuleGroup.contains(this.wingMc)){
			this.roleModuleGroup.addChild(this.wingMc);
		}
		this.wingMc.x = (this.roleModuleGroup.width >> 1)
		this.wingMc.y = (this.roleModuleGroup.height>>1)+25
		
	}
	/**更新武器模型 */
	private refreshWeaponMc(roleWeaponPath:string = ""):void{
		this.weaponMc.loadFile(roleWeaponPath,true,-1,null,this);
		if(!this.roleModuleGroup.contains(this.weaponMc)){
			this.roleModuleGroup.addChild(this.weaponMc);
		}
		this.weaponMc.x = (this.roleModuleGroup.width >> 1);
		this.weaponMc.y = (this.roleModuleGroup.height>>1)+25
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
	private setRolePower():void{
		var clientRole:proto.Client_RoleInfo = DataCenter.RoleInFoVo[this.curJob];
		var power:number = clientRole.roleAttr[data.RoleAttr.FightValue];
		this.power.text = power+"";
	}
}