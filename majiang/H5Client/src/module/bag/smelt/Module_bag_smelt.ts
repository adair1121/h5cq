class Module_bag_smelt extends Base_module{
	public static source:any = {};
	private smeltNum:number = 9;
	private smeltIndexArr:number[];
	private jobInFo:any = {};
	private minEquipValueObj:any;
	private standBoxData:any;
	public constructor() {
		super();
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_SmeltEquips:
				var smeltMsg:proto.s_SmeltEquips = msg as proto.s_SmeltEquips;
				this.dealWithSmeltEquipRes(smeltMsg);
				break;
			default:
				break;
		}
	}
	protected bindData():void{
		this.p_type = PanelType.MAINNAV;
		// eui.Binding.bindHandler(DataCenter,["role1Info","equips"],this.getEquipValue,this);
		eui.Binding.bindHandler(DataCenter,["bag","curSmeltGroup"],this.smeltEquipDataChange,this);
	}
	// private getEquipValue(value:proto.ItemData[]):void{
	// 	if(value!= null){
	// 		this.minEquipValueObj = {};
	// 		for(var i:number = 0;i<value.length;i++){
	// 			var obj:any = {};
	// 			var template:data.ItemTemple = temple.TempleManager.select(value[i].TempleID) as data.ItemTemple;
	// 			var itemtype2:any = this.minEquipValueObj[template.itemtype2];
	// 			if(itemtype2 && itemtype2.FightValue){
	// 				if(itemtype2.FightValue > value[i].point){
	// 					this.minEquipValueObj[template.itemtype2] = value[i].point;
	// 				}
	// 			}
	// 			this.minEquipValueObj[template.itemtype2] = value[i].point;
	// 		}
	// 	}
	// }
	private smeltEquipDataChange(value:any):void{
		if(value != null && this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.setSmeltData(value);
		}
	}
	/**
	 * 初始化熔炼装备数据
	 */
	private initSmeltData():void{
		Module_bag_smelt.source = [];
		for(var i:number = 0;i<9;i++){
			var bgObj = GlobalFunc.setBgData(1);
			this.standBoxData = {equipBoxSource:bgObj.boxS,isEmpty:true};
			Module_bag_smelt.source.push(this.standBoxData);
		}
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,data:any=null):void{
		switch(msgType){
			case MainNotify.OPENBAGSMELT:
				this.createView();
				break;
			default :
				break;
		}
	}
	private container:eui.Group;
	protected createView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView(1);
		}else{
			//打开背包
			this.view = new View_bag_smelt();
			super.createView();
			this.calculMinFightValue();
			this.setSmeltData(DataCenter.bag.curSmeltGroup);
			eui.Binding.bindProperty(Module_bag_smelt,["source"],this.view.arrayCollection,"source");
		}
	}
	public removeView(closeState:number):void{
		//关闭背包
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
		}
	}
	private setSmeltData(data:any):void{
		Module_bag_smelt.source = [];
		Module_bag_smelt.source = GlobalFunc.deepCopy(data);
	}
	public refreshSmeltData(index:number):void{
		Module_bag_smelt.source[index] = this.standBoxData;
		this.setSmeltData(Module_bag_smelt.source);
	}
	/**处理装备熔炼后数据 */
	public dealWithSmeltEquipRes(smeltMsg:proto.s_SmeltEquips):void{
		var obj:any[] = [{type:TipsEnum.TYPE_GOLD,label:"金币",num:smeltMsg.money}];
		PopTipsManager.showPopTips(obj);
		var obj2:any[] = [{type:TipsEnum.TYPE_EQUIP,label:"强化石",num:smeltMsg.qianghuashi,quality:4}];
		PopTipsManager.showPopTips(obj2);
		this.disposeData(Module_bag.equipSource);
		this.disposeData(DataCenter.canSmeltData);
		// var bag:any[] = Module_bag.equipSource;
		// var bagData:any = GlobalFunc.deepCopy(Module_bag.equipSource);
		// DataCenter.bag.roleBagInfo = bagData;
		this.calculMinFightValue();
	}
	private disposeData(data:any[]):void{
		var operData:any[] = data;
		for(var i:number = 0,flag=true,len = operData.length;i<len;flag?i++:i){
			(function(that){
				for(var j:number = 0;j<that.smeltEquipArr.length;j++){ 
					if(operData[i] && operData[i].uid && operData[i].uid === that.smeltEquipArr[j]){
						operData.splice(i,1);
						flag = false;
						break;
					}else{
						flag = true;
					}
				}
			})(this)
		}	
	}
	private smeltEquipArr:string[];
	/**请求装备熔炼 */
	public smeltEquip():void{
		this.smeltEquipArr = [];
		var len:number = Module_bag_smelt.source.length;
		for(var i:number = 0;i<len;i++){
			if(Module_bag_smelt.source[i].uid){
				this.smeltEquipArr.push((Module_bag_smelt.source[i].uid).toString());
			}
		}
		if(this.smeltEquipArr.length){
			var smeltMsg:proto.c_SmeltEquips = new proto.c_SmeltEquips();
			smeltMsg.InstIdList = this.smeltEquipArr;
			SocketManager.getInstance().sendProto(smeltMsg);
		}
		
	}
	private calculMinFightValue():void{
		this.initSmeltData();
		var arr:any[] = DataCenter.canSmeltData;
		var len:number = arr.length;
		var num:number = 0;
		if(len){
			if(len >=9){
				num = 9;
			}else{
				num = len;
			}
			for(var j:number = 0;j<num;j++){
				this.getValue( arr[j],j);
			}
		}
		DataCenter.bag.curSmeltGroup = GlobalFunc.deepCopy(Module_bag_smelt.source);
	}
	private getValue(obj:any,index:number):void{
		obj["isEmpty"] = false;
		Module_bag_smelt.source[index] = obj;
	}
}