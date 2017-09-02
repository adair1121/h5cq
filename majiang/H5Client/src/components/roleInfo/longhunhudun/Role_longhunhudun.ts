class Role_longhunhudun extends eui.Component{
	public headCom:Role_headCom;
	public level:eui.Label;
	public curAttrGroup:eui.List;
	public nextAttrGroup:eui.List;
	private curAttrCollection:eui.ArrayCollection;
	private nextAttrCollection:eui.ArrayCollection;
	public item:eui.Image;
	public num:eui.Label;
	public returnBtn:eui.Image;
	public upGradeBtn:Btn1;
	private typeObj:any = {};
	private type:number;
	private curValue:number;
	private totalValue:number;
	private goWay:number;
	private curJob:number = 0;
	private template:data.StrengthenTemple;
	private template2:data.StrengthenTemple;
	private clickState:boolean;
	private changeValue:number;
	private goodsPop:Get_Goods_pop;
	private layer:eui.Component;
	private goodsId:number;
	private watcher:eui.Watcher;
	public constructor(state:string) {
		super();
		this.skinName = "Role_longhunhudun_skin";
		this.skin.currentState = state;
		this.typeObj = {"longhun":data.StrengthenType.ST_LH,"hudun":data.StrengthenType.ST_HD,
		"mabi":data.StrengthenType.ST_MB,"hushen":data.StrengthenType.ST_HS};
		this.type = this.typeObj[state];
	}
	protected childrenCreated():void{
		this.goodsPop = new Get_Goods_pop();
		this.curAttrCollection = new eui.ArrayCollection();
		this.nextAttrCollection = new eui.ArrayCollection();
		this.curAttrGroup.itemRenderer = Role_specialItem;
		this.nextAttrGroup.itemRenderer = Role_specialItem;
		this.curAttrGroup.dataProvider = this.curAttrCollection;
		this.nextAttrGroup.dataProvider = this.nextAttrCollection;
		this.layer = ViewController.getInstance().getContainer().layer_popup;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.curJob = DataCenter.roleList[0].job;
		Global.addEventListener(MainNotify.JOBCHAGNE,this.jobChange,this);
		this.watcher = eui.Binding.bindHandler(DataCenter,["changeItemNum"],this.changeNeedStone,this);
		this.getDragonOrShieldId();
		this.headCom.updateHead(DataCenter.roleList,this.skinName);
	}
	private getDragonOrShieldId():void{
		var id:number = 0;
		var otherArr:any = DataCenter.forgingData.get(this.curJob+"").get("other");
		id = otherArr[this.type];
		this.refreshView(id);
	}
	private changeNeedStone(value:any):void{
		if(value && value.id){
			var uid:number = DataCenter.goodsUIDgather.get(this.goodsId+"");
			if(uid && uid === value.id){
				this.curValue = value.num?value.num:0;
				this.num.text = this.curValue + "/"+this.template.itemNum;
			}
		}
	}
	private jobChange(evt:lcp.ChangeEvent):void{
		if(evt.c_data.insKey === this.skinName){
			this.curJob = evt.c_data.job;
			this.getDragonOrShieldId();
		}
		
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.upGradeBtn.button:
				this.clickHandler();
				break;
			case this.returnBtn:
				this.closeView();
				break;
			default:
				break;
		}
	}
	private refreshView(mid:number):void{
		this.template = temple.TempleManager.select(mid) as data.StrengthenTemple;
		this.goodsId = this.template.itemID;
		var itemTemplate:data.ItemTemple = temple.TempleManager.select(this.goodsId) as data.ItemTemple;
		var curData:any[] = this.createBaseAttrCnt(this.template.AttrEnum,this.template.Attr);
		this.curAttrCollection.source = curData;
		if(this.template.nextID){
			this.template2 = temple.TempleManager.select(this.template.nextID) as data.StrengthenTemple;
			var nextData:any[] = this.createBaseAttrCnt(this.template2.AttrEnum,this.template2.Attr);
			this.nextAttrCollection.source = nextData;
			this.changeValue = this.template2.FightValue - this.template.FightValue;
		}else{
			this.nextAttrCollection.source = curData;
			return;
		}
		var uid:number = DataCenter.goodsUIDgather.get(this.goodsId+"");
		if(uid){
			this.curValue = DataCenter.goodsSource.get(uid+"");
		}else{
			this.curValue = 0;
		}
		this.item.source =  Config.path_equip + itemTemplate.icon + ".png";
		this.num.text = this.curValue + "/"+this.template.itemNum;
		this.totalValue = this.template.itemNum;
		this.level.text = this.template.lev+"";
		this.judgeSuiPian();
		if(this.clickState){
			GlobalFunc.showPowerUpTips(this.template.FightValue,[this.changeValue])
			// this.showUpGradeRes(this.template.FightValue);
			this.clickState = false;
		}
	}
	/**创建属性 */
	private createBaseAttrCnt(attrEnum:number[],attrCnt:number[]):any[]{
		var attrName:string = "";
		var cnt:any[] = [];
		for(var i:number = 0;i<attrEnum.length;i++){
			var obj:any = {};
			attrName = AttrNameUtil.getInstance().getAttrName(attrEnum[i],3);
			if(!attrName){
				attrName = AttrNameUtil.getInstance().getAttrName(-1,3);
			}
			obj.attr = attrName;
			obj.value = attrCnt[i];
			cnt.push(obj);
		}
		return cnt;
	}
	private clickHandler():void{
		if(!this.goWay){
			//提升
			this.clickState = true;
			Global.dispatchEvent(MainNotify.UP_LONGHUN_OR_HUDUN,{type:this.type,job:this.curJob});
		}else{
			//获得材料
			PopUpManager.addPopUp(this.goodsPop,true,this.goodsPop.skinName,this.layer,0);
			PopUpManager.startClickHidden(this.goodsPop.skinName,this.callBackFunc,this);
			var template:data.ItemTemple = temple.TempleManager.select(this.goodsId) as data.ItemTemple;
			var obj:any = {tid:this.goodsId,singleCost:20,quality:4,itemName:template.name,imgS:Config.path_goods + template.icon+".png",state:this.type};
			var itemGetWay:string = "材料副本";
			if(this.type === data.StrengthenType.ST_MB || this.type === data.StrengthenType.ST_HS){
				itemGetWay = "通关章节获得";
			}
			this.goodsPop.refreshItem({shopData:obj,itemData:[{itemWay:itemGetWay,icon:"popup_box_png"}]});
		}
	}
	private callBackFunc():void{
		PopUpManager.removePopUp(this.goodsPop.skinName,0);
	}
	private judgeSuiPian():void{
		if(this.curValue >= this.totalValue){
			this.upGradeBtn.label = "提升";
			this.num.textColor = 0x00FF4B;
			this.goWay = 0;
		}else{
			this.upGradeBtn.label = "获得材料";
			this.num.textColor = 0xED0909;
			this.goWay = 1;
		}
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
		Global.removeEventListener(MainNotify.JOBCHAGNE,this.jobChange,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		if(this.watcher){
			this.watcher.unwatch();
		}
	}
	/**显示战力值显示tips */
	// private showUpGradeRes(fightValue:number):void{
	// 	var x:number = (Config.curWidth()>>1) - 135;
	// 	var y:number = (Config.curHeight()>>1) + 40;
	// 	PopTipsManager.showPowerTips(x,y,fightValue,this.showPowerRes,this);
	// }
	// private showPowerRes():void{
	// 	var obj = {w:300,h:20,text:"+"+this.changeValue,x:(Config.curWidth()>>1) + 50,y:(Config.curHeight()>>1)};
	// 	var parentCon = ViewController.getInstance().getContainer().layer_popup;
	// 	PopTipsManager.showUpGradeTips(obj,parentCon,null,this);
	// }
	// private getSum(array):number{
	// 	var sum:number = 0;
	// 	for(var i:number = 0;i<array.length;i++){
	// 		sum += array[i];
	// 	}
	// 	return sum;
	// }
}