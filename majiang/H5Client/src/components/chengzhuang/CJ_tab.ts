class CJ_tab extends Base_view{
	public list:eui.List;
	public curName:eui.Label;
	public nextName:eui.Label;
	public curCj:CommonItem;
	public nextCj:CommonItem;
	public curScore:eui.Label;
	public nextScore:eui.Label;
	public cAttrList:eui.List;
	public nAttrList:eui.List;
	public cost:eui.Label;
	public getCjWay:UI_ConnectWord;
	public operBtn:eui.Button;
	private ACTIVATE:string = "activate";
	private NOACTIVATE:string = "noactivate";
	private sourceCollect:eui.ArrayCollection;
	private equipPosSource:number[];
	private equipSource:any[] = [];
	private totleNum:number = 0;
	private curNum:number = 0;
	//当前橙装templeiD
	private cjTempleId:number = 0;
	//当前穿戴位置
	private equipPos:number = 0;
	//当前消耗品id
	private debrisID:number = 0
	private cattrCollect:eui.ArrayCollection;
	private nattrCollect:eui.ArrayCollection;
	private cjAssembly:CJ_assembly;
	private layer:eui.Component;
	private skinState:string = "";
	public constructor() {
		super();
		this.skinName = "CJ_tab_skin";
	}
	protected childrenCreated():void{
		this.list.selectedIndex = 0;
		this.cjAssembly = new CJ_assembly();
		this.equipPosSource = [data.EquipPos.weapon,data.EquipPos.head,data.EquipPos.body,data.EquipPos.neck,data.EquipPos.left_bracelet,
		data.EquipPos.right_bracelet,data.EquipPos.left_ring,data.EquipPos.right_ring];
		this.sourceCollect = new eui.ArrayCollection();
		this.list.dataProvider = this.sourceCollect;
		this.list.itemRenderer = ForgingItemRenderer;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.operBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.sourceCollect.source = this.initEquipData();
		eui.Binding.bindHandler(DataCenter,["changeItemNum"],this.changeCJSuiPian,this);
		this.debrisID = DataCenter.CJTempleData[this.equipSource[0].itemId].debrisID;
		this.cattrCollect = new eui.ArrayCollection();
		this.nattrCollect = new eui.ArrayCollection();
		this.cAttrList.itemRenderer = Role_specialItem;
		this.cAttrList.dataProvider = this.cattrCollect;
		this.nAttrList.itemRenderer = Role_specialItem;
		this.nAttrList.dataProvider = this.nattrCollect;
		var uid:number = DataCenter.goodsUIDgather.get(this.debrisID+"");
		var num:number = 0;
		if(uid){
			num = DataCenter.goodsSource.get(uid+"");
		}else{
			num = 0;
		}
		this.curNum = num;
		
		this.layer = ViewController.getInstance().getContainer().layer_ui;
		this.getCjWay.setClickFunction(this.clickFunc,this);
	}
	private clickFunc():void{
		PopUpManager.addPopUp(this.cjAssembly,true,this.cjAssembly.skinName,this.layer,0);
		var obj:any = {};
		var itemData:any[] = [{itemWay:"获得橙装:寻宝",icon:"popup_box_png"},
							  {itemWay:"获得橙装:全名BOSS",icon:"popup_box_png"},
							  {itemWay:"获得橙装:挑战副本",icon:"popup_box_png"}]
		obj.itemData = itemData;
		obj.equipSource = DataCenter.cjEquip;
		this.cjAssembly.setData(obj,this.toCjDis,this);
	}
	public refreshCJData():void{
		this.cjAssembly.refreshCJData(DataCenter.cjEquip);
	}
	/**分解橙装 */
	private toCjDis(dataObj:any):void{
		Global.dispatchEvent(MainNotify.CJ_DISASSEMBLY,dataObj);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.refreshEquipState(evt.item);
		this.list.selectedIndex = evt.itemIndex;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(this.curNum < this.totleNum){
			var obj:any = {type:TipsEnum.TYPE_WARN,label:"碎片不足"};
			PopTipsManager.showPopTips([obj]);
			return;
		}
		Global.dispatchEvent(MainNotify.CJ_ASSEMBLY,{itemId:this.cjTempleId,equipPos:this.equipPos});
	}
	/**更新橙装显示状态 */
	private refreshEquipState(item:any):void{
		this.cjTempleId = item.itemId;
		this.debrisID = DataCenter.CJTempleData[item.itemId].debrisID;
		this.equipPos = item.equipPos;
		var curItemTemple:data.ItemTemple = temple.TempleManager.select(item.itemId) as data.ItemTemple;
		var nextId:number = DataCenter.CJTempleData[item.itemId].nextId;
		this.cattrCollect.source = this.createBaseAttr(curItemTemple.num,curItemTemple.Value);
		this.curCj.bgBox = GlobalFunc.setBgData(curItemTemple.itemQuality).boxS;
		this.curName.text = curItemTemple.name;
		this.curCj.iName = curItemTemple.needlev+"";
		this.curCj.img = Config.path_equip+curItemTemple.icon+".png";
		this.curScore.text = DataCenter.CJTempleData[item.itemId].orangeScore+"";
		this.totleNum = DataCenter.CJTempleData[item.itemId].orangecomDebris;
		if(item.hasEquip){
			this.operBtn.label = "升级";
			if(nextId){
				this.operBtn.visible = true;
				this.skinState = this.ACTIVATE;
				this.invalidateState();
				var itemTemplate:data.ItemTemple = temple.TempleManager.select(nextId) as data.ItemTemple;
				this.nextCj.bgBox = GlobalFunc.setBgData(5).boxS;
				this.nattrCollect.source = this.createBaseAttr(itemTemplate.num,itemTemplate.Value);
				this.nextName.text = itemTemplate.name;
				this.nextCj.iName = itemTemplate.needlev+"";
				this.nextCj.img = Config.path_equip+itemTemplate.icon+".png";
				this.nextScore.text = DataCenter.CJTempleData[nextId].orangeScore+"";
				this.totleNum = DataCenter.CJTempleData[nextId].orangecomDebris;
			}else{
				this.operBtn.visible = false;
				this.skinState = this.NOACTIVATE;
				this.invalidateState();
			}
		}else{
			this.operBtn.visible = true;
			this.operBtn.label = "合成";
			this.skinState = this.NOACTIVATE;
			this.invalidateState();
		}
		
		this.refreshCost();
	}
	protected getCurrentState():string{
		return this.skinState;
	}
	//橙装碎片改变
	private changeCJSuiPian(value:any):void{
		if(value && value.id){
			var uid:number = DataCenter.goodsUIDgather.get(this.debrisID+"");
			if(uid && uid === value.id){
				this.curNum = value.num;
				this.refreshCost();
			}
		}
	}
	private refreshCost():void{
		this.cost.text = this.curNum+"/"+this.totleNum;
	}
	//初始化橙装数据
	private initEquipData():any[]{
		this.equipSource = [];
		for(var i:number = 0;i<this.equipPosSource.length;i++){
			var obj:any = this.calculInitTempleId(this.equipPosSource[i],0);
			this.equipSource.push(obj);
		}
		return this.equipSource;
	}
	
	public refreshCJEquip(job:number):void{
		this.sourceCollect.source = this.getEquipData(job);
		// this.list.selectedIndex = 0;
		// this.refreshEquipState(this.equipSource[0]);
	}
	/**根据职业获取对应的橙装合成数据 */
	private getEquipData(job):any[]{
		var roleInfo:proto.Client_RoleInfo = DataCenter.RoleInFoVo[job];
		var equips:proto.ItemData[] = roleInfo.equips;
		for(var i:number = 0,len:number = equips.length,item:proto.ItemData;i<len;i++){
			item = equips[i];
			this.calculSingleCJData(item);
		}
		return this.equipSource;
	}
	/**计算单个橙装数据 修改橙装显示列表*/
	public calculSingleCJData(item:any,ifRefresh:boolean = false):void{
		var itemTemple:data.ItemTemple = temple.TempleManager.select(item.TempleID) as data.ItemTemple;
		var equipObj = GlobalFunc.searchMoreAttrValue([data.ItemAttr.equipPos,data.ItemAttr.score],item.attrList);
		var obj:any = this.calculInitTempleId(equipObj[data.ItemAttr.equipPos],equipObj[data.ItemAttr.score]);
		for(var j:number = 0;j<this.equipSource.length;j++){
			if(this.equipSource[j].equipPos === obj.equipPos){
				this.equipSource[j] = obj;
				if(itemTemple.itemtype2 !== 202){
					//当前角色穿戴不是橙装
					this.equipSource[j].boxS = GlobalFunc.setBgData(1).boxS;
					this.equipSource[j].iName = "";
					this.equipSource[j].lev = "";
					this.equipSource[j].equipSource = "";
					obj.hasEquip = false;
				}else{
					this.equipSource[j].equipSource = Config.path_equip + itemTemple.icon + ".png";
					this.equipSource[j].boxS = GlobalFunc.setBgData(itemTemple.itemQuality).boxS;
					this.equipSource[j].iName = itemTemple.name;
					this.equipSource[j].lev = itemTemple.needlev;
					this.equipSource[j].itemId = item.TempleID;
					obj.hasEquip = true;
				}
				break;
			}
		}
		if(ifRefresh){
			this.refreshEquipState(this.equipSource[this.list.selectedIndex]);
		}
	}
	/**计算初始化橙装temple */
	private calculInitTempleId(equipPos:number,equipPower:number):any{
		for(var key in DataCenter.CJData){
			var keyArr:string[] = key.split("-");
			if(keyArr.indexOf(equipPos+"") != -1){
				var obj:any = {};
				var item:any;
				var arr:any[] = DataCenter.CJData[key];
				temple
				if(equipPower && arr && arr.length){
					for(var i:number = 0;i<arr.length;i++){
						try{
							var itemTemple:data.ItemTemple = temple.TempleManager.select(arr[i].itemId) as data.ItemTemple;
						}catch(err){
							console.log(arr[i])
						}
						if(itemTemple.itemtype2 != 202){
							continue;
						}
						item = arr[i];
						if(arr[i].orangeScore > equipPower){
							break;
						}
					}
				}else{
					item = DataCenter.CJData[key][0];
				}
				var itemTemplate:data.ItemTemple = temple.TempleManager.select(item.itemId) as data.ItemTemple;
				obj.itemId = item.itemId;
				obj.equipPos = equipPos;
				obj.hasEquip = false;
				return obj;
			}
		}
	}
	public remove():void{
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.operBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
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
}