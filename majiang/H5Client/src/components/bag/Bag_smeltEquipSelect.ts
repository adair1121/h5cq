class Bag_smeltEquipSelect extends eui.Component{
	public sureBtn:Btn1;
	public count:eui.Label;
	public itemList:eui.List;
	private arrayCollection:eui.ArrayCollection;
	private equipSource:any[] = [];
	private selectNum:number = 0;
	public scroller:eui.Scroller;
	public constructor() {
		super();
		this.skinName = "Bag_smeltEquipSelect_skin";
	}
	protected childrenCreated():void{
		this.count.text = "0/9";
		this.sureBtn.label = "确定";
		this.arrayCollection = new eui.ArrayCollection();
		this.itemList.dataProvider = this.arrayCollection;
		this.itemList.itemRenderer = Smelt_selectItem;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.scroller.viewport = this.itemList;
		// eui.Binding.bindHandler(DataCenter,["bagData"],this.bagDataChange,this);
		eui.Binding.bindHandler(this,["equipSource"],this.equipSourceChange,this);
		eui.Binding.bindHandler(Module_bag_smelt,["source"],this.selectChange,this);
		eui.Binding.bindHandler(this,["selectNum"],this.selectNumChange,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.sureBtn.button:
				this.closeView();
				this.sureHandler();
				break;
		}
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		var item:Smelt_selectItem = this.itemList.getChildAt(evt.itemIndex) as Smelt_selectItem;
		if(!evt.item.selected){
			if(this.selectNum < 9){
				this.selectNum +=1;
				evt.item.selected = true;
				evt.item["isEmpty"] = false;
				item.checkSelect = true;
				if(this.selectNum >= 9){
					this.closeView(); 
					this.sureHandler();
				}
			}
		}else{
			evt.item["isEmpty"] = true;
			this.selectNum -=1;
			evt.item.selected = false;
			item.checkSelect = false;
		}
	}
	// private bagDataChange(value:any):void{
	// 	if(value.length){
	// 		this.dealWithBagData(value);
	// 	}
	// }
	private equipSourceChange(value:any):void{
		if(value){
			this.refreshData(value);
		}
	}
	private selectChange(value:any):void{
		if(value.length){
			this.dealWithBagData(value)
		}
	}
	private selectNumChange(value:number){
		this.count.text = value +"/9";
	}
	private sourceArr:any = [];
	private sureHandler():void{
		this.initSmeltData();
		var data:eui.ArrayCollection = this.itemList.dataProvider as eui.ArrayCollection;
		var len:number = data.source.length;
		var source:any = data.source;
		var arr:any[] = [];
		for(var i:number = 0;i<len;i++){
			if(source[i].selected){
				var obj:any = {};
				var bgObj = this.setBagBgData(source[i].quality);
				obj.uid = source[i].uid;
				obj.job = source[i].job;
				obj.label = source[i].lev;
				obj.equipSource = source[i].imgSource;
				obj.num = source[i].num;
				obj.equipBoxSource = source[i].boxS;
				obj.isEmpty = source[i].isEmpty;
				arr.push(obj)
			}
		}
		for(var i:number = 0;i<arr.length;i++){
			Module_bag_smelt.source[i] = arr[i];
		}
		DataCenter.bag.curSmeltGroup = Module_bag_smelt.source;
	}
	/**
	 * 初始化熔炼装备数据
	 */
	private initSmeltData():void{
		Module_bag_smelt.source = [];
		for(var i:number = 0;i<9;i++){
			var bgObj = this.setBagBgData(1);
			var obj:any = {equipBoxSource:bgObj.boxS,isEmpty:true};
			Module_bag_smelt.source.push(obj);
		}
	}
	private dealWithBagData (value:any):void{
		this.scroller.stopAnimation();
		this.scroller.validateNow();
		this.scroller.viewport.scrollV = 0;
		this.selectNum = 0;
		this.equipSource = [];
		var bag:any = Module_bag.equipSource;
		var curSmeltGroup:any = value;
		for(var i:number = 0;i<bag.length;i++){
			var template:data.ItemTemple = temple.TempleManager.select(parseInt(bag[i].TempleID)) as data.ItemTemple;
			var itemType = template.itemtype1;
			var icon = template.icon;
			var bgObj:any = this.setBagBgData(bag[i].quality);
			var obj:any = {};
			obj.job = template.JOB;
			obj.iName = template.name;
			obj.lev = template.needlev;
			obj.boxS = bgObj.boxS;
			obj.itemName = template.name;
			obj.quality = bag[i].quality;
			obj.uid = bag[i].uid;
			obj.num = bag[i].num == 0?"" : bag[i].num;
			obj.cattr =  bag[i].cattr;
			obj.extra = bag[i].extra;
			obj.imgSource = Config.path_equip + icon+".png";
			for(var j:number = 0;j<curSmeltGroup.length;j++){
				if(obj.uid === curSmeltGroup[j].uid){
					obj.selected = true;
					this.selectNum +=1;
					break;
				}else{
					obj.selected = false;
				} 
			}
			this.equipSource.push(obj);
		}
	}
	/**
	 * 设置背包item背景数据
	 */
	private setBagBgData(quality:number):any{
		var obj:any = {};
		if(quality != 1){
			obj.boxS = "bag_"+quality+"_box_png"
		}else{
			obj.boxS = "bag_1_box_png";
		}
		return obj;
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
	private refreshData(source:any):void{
		this.arrayCollection.source = source;
	}
	public refreshSource():void{
		var data:any = GlobalFunc.deepCopy(Module_bag_smelt.source);
		Module_bag_smelt.source = [];
		Module_bag_smelt.source = data;
	}
}