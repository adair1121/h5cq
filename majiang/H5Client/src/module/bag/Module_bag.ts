class Module_bag extends Base_module{

	private static goodsSource:any[] = [];
	public static equipSource:any[] = [];
	private bagWatch:eui.Watcher;
	private bagBoxWatch:eui.Watcher;
	private source:any[];
	private type:number;
	private xiaohaoArr:any;
	private roleMinEquipValue:any ={};
	private waitSmeltData:any[] = [];
	private equipChangeItem:number = 0;
	private goodsChangeItem:number = 0;
	private curPage:string = "";
	public constructor() {
		super();
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_AddItems:
				var bagMsg:proto.s_AddItems = msg as proto.s_AddItems;
				this.dealWithAddBagData(bagMsg.items);
				break;
			case proto.MessageType.s_ItemAttrChange:
				var changeMsg:proto.s_ItemAttrChange = msg as proto.s_ItemAttrChange;
				this.dealWithChangeData(changeMsg);
				break;
			case proto.MessageType.s_BagItem:
				var bagDataMsg:proto.s_BagItem = msg as proto.s_BagItem;
				this.dealWithBaseBagData(bagDataMsg);
				break;
			case proto.MessageType.s_ItemUse:
				var useGoodsMsg:proto.s_ItemUse = msg as proto.s_ItemUse;
				this.dealWithUseGoodsData(useGoodsMsg);
				break;
			default:
				break;
		}
	}
	protected bindData():void{
		this.p_type = PanelType.MAINNAV;
		eui.Binding.bindHandler(this,["equipChangeItem"],this.equipChange,this);
		eui.Binding.bindHandler(this,["goodsChangeItem"],this.goodsChange,this);
	}
	//////////////////////////////数据绑定函数///////////////
	private equipChange():void{
		if(this.view.state){
			this.setBagGroupData(Module_bag.equipSource);
		}
	}
	private goodsChange():void{
		if(!this.view.state){
			this.setBagGroupData(Module_bag.goodsSource);
		}	
	}
	private dealWithBaseBagData(value:proto.s_BagItem):void{
		Module_bag.equipSource = [];
		Module_bag.goodsSource = [];
		this.dealWithBagData(value.ItemList);
	}
	private dealWithUseGoodsData(msgData:proto.s_ItemUse):void{
		if(!msgData.type){
			var obj:any = {type:TipsEnum.TYPE_WARN,label:msgData.errMsg};
			PopTipsManager.showPopTips([obj]);
		}
		var popArr:any[] = [];
		if(msgData.type === 1){
			//获得物品
			var goodsList:proto.ItemData[] = msgData.itemList;
			for(var i:number = 0,len:number = goodsList.length,item:proto.ItemData;i<len;i++){
				var obj:any = {}
				item = goodsList[i];
				var template:data.ItemTemple = temple.TempleManager.select(item.TempleID) as data.ItemTemple;
				obj.quality = template.itemQuality,
				obj.num = GlobalFunc.searchAttrValue(data.ItemAttr.count,item.attrList);
				obj.type = TipsEnum.TYPE_EQUIP;
				obj.label = template.name;
				popArr.push(obj);
			}
		}else{
			//获得属性
			var attrList:proto.AttrValue[] = msgData.attrList;
			for(var k:number = 0,len2:number = attrList.length,item2:proto.AttrValue;k<len2;k++){
				item2 = attrList[k];
				var obj:any = GlobalFunc.getAttrWordEnum(item2.attrID);
				var obj2:any = {};
				obj2.label = obj.word;
				obj2.num = item2.myvalue;
				obj2.color = 0xffffff;
				obj2.type = TipsEnum.TYPE_DEFAULT;
				popArr.push(obj2);
			}
		}
		PopTipsManager.showPopTips(popArr);
	}
	private dealWithAddBagData(value:proto.ItemData[]):void{
		if(value.length){
			this.dealWithBagData(value);
		}
	}
	/**
	 * 修改背包消耗品数量
	 */
	private dealWithChangeData(changeData:proto.s_ItemAttrChange):void{
		var len:number = Module_bag.goodsSource.length;
		var count:number;
		var index:number;
		for(var i:number = 0;i<len;i++){
			if(Module_bag.goodsSource[i].uid === changeData.InstanceId){
				count = GlobalFunc.searchAttrValue(data.ItemAttr.count,changeData.AttrChangeList)
				Module_bag.goodsSource[i].num = count;
				index = i;
				break;
			}
		}
		DataCenter.goodsSource.modify(changeData.InstanceId+"",count);
		DataCenter.changeItemNum = {};
		var any:any={id:0,num:0};
		any.id=changeData.InstanceId;
		any.num=count;
		DataCenter.changeItemNum=any;
		this.setBagGroupData(Module_bag.goodsSource);
		if(!count){
			Module_bag.goodsSource.splice(index,1);
			for(var key in DataCenter.goodsUIDgather.dict){
				if(DataCenter.goodsUIDgather.dict[key] === changeData.InstanceId){
					DataCenter.goodsUIDgather.remove(key);
					break;
				}
			}
		}
	}
	/**
	 * 处理背包数据
	 */
	private dealWithBagData (bag:proto.ItemData[]):void{
		this.waitSmeltData = [];
		if(!DataCenter.goodsSource){
			DataCenter.goodsSource=new Dictionary("DataCenterGoodsSource");
		}
		for(var i:number = 0;i<bag.length;i++){
			var template:data.ItemTemple = temple.TempleManager.select(bag[i].TempleID) as data.ItemTemple;
			var bgObj:any = GlobalFunc.setBgData(template.itemQuality);
			var searchData:any = GlobalFunc.searchMoreAttrValue([data.ItemAttr.count,data.ItemAttr.score],bag[i].attrList);
			var obj:any = {};
			obj.job = template.JOB;
			// obj.sex = template.sex;
			obj.itemType = template.itemtype1;
			obj.icon = template.icon;
			obj.equipPos = template.equipPos;
			obj.label = template.name;
			obj.equipBoxSource = bgObj.boxS;
			obj.itemName = template.name;
			obj.quality = template.itemQuality;
			obj.InstanceId = obj.uid = bag[i].InstanceId;
			// obj.power = template.FightVaule;
			obj.num = searchData[data.ItemAttr.count]?searchData[data.ItemAttr.count]:0;
			obj.itemType2 = template.itemtype2;
			obj.TempleID = bag[i].TempleID;
			obj.level = template.needlev;
			obj.point = searchData[data.ItemAttr.score]?searchData[data.ItemAttr.score]:0;
			obj.itemDesc =[{desc:template.needCondition}];
			if(obj.itemType === 2){
				//装备
				obj.num = 0;
				obj.attrStrAny = [];
				//格式化装备item附加值显示tips
				for(var j:number = 0,len:number = bag[i].attrList.length,item:proto.AttrValue;j<len;j++){
					item = bag[i].attrList[j];
					if(item.additional){
						obj.attrStrAny.push(GlobalFunc.formatTipsInfo(item.attrID)+ item.myvalue + " +"+item.additional);
					}
				}
				obj.equipSource = Config.path_equip + obj.icon+".png";
				Module_bag.equipSource.push(obj);
				if(obj.itemType2 === 202){
					//橙装
					var cjTempleObj:any = DataCenter.CJTempleData[bag[i].TempleID];
					obj.orangeResolve = cjTempleObj.orangeResolve;
					DataCenter.cjEquip.push(obj);
				}
			}
			if(obj.itemType === 3 && obj.num){
				//物品
				obj.canUse = template.canUse;
				obj.equipSource = Config.path_goods +obj.icon+".png";
				Module_bag.goodsSource.push(obj);
				DataCenter.goodsSource.add(obj.uid+"",obj.num);
				if(DataCenter.goodsUIDgather.hasKey(obj.TempleID)){
					DataCenter.goodsUIDgather.modify(obj.TempleID+"",obj.uid+"");
				}else{
					DataCenter.goodsUIDgather.add(obj.TempleID+"",obj.uid+"");
				}
			}
			if(!DataCenter.BagitemType2Gather[obj.itemType2]){
				DataCenter.BagitemType2Gather[obj.itemType2] = [];
			}
			DataCenter.BagitemType2Gather[obj.itemType2].push(obj);
			
		}
		if(this.curPage === MainNotify.SHOWEQUIP){
			this.equipChangeItem = Math.random();
		}else{
			this.goodsChangeItem = Math.random();
		}
		var arr:any[] = GlobalFunc.deepCopy(Module_bag.equipSource);
		for(var i:number = 0,len:number = arr.length,bagItem:any;i<len;i++){
			bagItem = arr[i];
			if(bagItem.itemType2 === 202){
				continue;
			}
			this.formatSmeltData(bagItem);
		}
		this.dealWithSmeltData();
	}
	/**格式化装备数据存储 */
	private formatSmeltData(obj:any):void{
		var key:string = obj.equipPos.join("-");
		if(!DataCenter.smeltData[obj.job]){
			DataCenter.smeltData[obj.job] = {};
		}
		if(!DataCenter.smeltData[obj.job][key]){
			DataCenter.smeltData[obj.job][key] = [];
		}
		DataCenter.smeltData[obj.job][key].push(obj);
	}
	private deleteArr:string[] = [];
	private dealWithSmeltData():void{
		DataCenter.canSmeltData = [];
		this.deleteArr = [];
		for(var JOB in DataCenter.smeltData){
			var equipObj:any = DataCenter.smeltData[JOB];
			for(var key2 in equipObj){
				var pos:string[] = key2.split("-");
				var equipList:any[] = GlobalFunc.deepCopy(equipObj[key2]);
				var arr:any[] = GlobalFunc.sortRule(GlobalFunc.REVERSE,"point",equipList);
				if(pos.length < 2){
					//单个装备
					var firstEquipPoint:any = arr.shift();
					DataCenter.canSmeltData = DataCenter.canSmeltData.concat(arr);
					if(!parseInt(JOB)){
						//该装备为通用装备
						DataCenter.canSmeltData.push(firstEquipPoint);
					}else{
						var pointObj:any = DataCenter.roleMinEquipValueObj[JOB];
						if(pointObj && pointObj[pos[0]] && firstEquipPoint.point <= pointObj[pos[0]]){
							DataCenter.canSmeltData.push(firstEquipPoint);
						}
					}
				}else{
					var maxEquipPoint:any = arr.shift();
					var minEquipPoint:any = arr.shift();
					DataCenter.canSmeltData = DataCenter.canSmeltData.concat(arr);
					var point1Obj:any = DataCenter.roleMinEquipValueObj[JOB];
					var index1:number = parseInt(pos[0]);
					var index2:number = parseInt(pos[1]);
					if(point1Obj && point1Obj[index1] && point1Obj[index2]){
						var minV:number =  Math.min(point1Obj[index1],point1Obj[index2]);
						var maxV:number = Math.max(point1Obj[index1],point1Obj[index2]);
						if(maxEquipPoint && maxEquipPoint.point <= minV){
							DataCenter.canSmeltData.push(maxEquipPoint);
						}
						if(minEquipPoint && minEquipPoint.point <= maxV){
							DataCenter.canSmeltData.push(minEquipPoint);
						}
					}
					if(point1Obj && point1Obj[index1] && !point1Obj[index2]){
						if(minEquipPoint && minEquipPoint.point <= point1Obj[index1]){
							DataCenter.canSmeltData.push(minEquipPoint);
						}
					}
					if(pointObj && !point1Obj[index1] && point1Obj[index2]){
						if(minEquipPoint && minEquipPoint.point <= point1Obj[index2]){
							DataCenter.canSmeltData.push(minEquipPoint);
						}
					}
				}
			}
		}
		DataCenter.smeltData = {};
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.OPENBAG:
				this.createView();
				break;
			case MainNotify.SHOWEQUIP:
				this.curPage = MainNotify.SHOWEQUIP;
				this.setBagGroupData(Module_bag.equipSource);
				break;
			case MainNotify.SHOWPROP:
				this.curPage = MainNotify.SHOWPROP;
				this.setBagGroupData(Module_bag.goodsSource);
				break;
			case MainNotify.REMOVEBAGITEM:
				for(var j:number = 0;j<dataRes.length;j++){
					var itemTemple:data.ItemTemple = temple.TempleManager.select(dataRes[j].TempleID) as data.ItemTemple;
					var source:any[] = [];
					if(itemTemple.itemtype1 === 2){
						source = Module_bag.equipSource;
					}else if(itemTemple.itemtype1 === 3){
						source = Module_bag.goodsSource;
					}
					var specialSource:any[] = DataCenter.BagitemType2Gather[itemTemple.itemtype2];
					var cjData:any[] = DataCenter.CJData;
					if(specialSource && specialSource.length){
						for(var k:number = 0;k<specialSource.length;k++){
							if(dataRes[j].InstanceId === specialSource[k].uid){
								specialSource.splice(k,1);
								break;
							}
						}
					}
					if(cjData && cjData.length && itemTemple.itemtype2 ==202 ){
						for(var n:number = 0;n<cjData.length;n++){
							if(dataRes[j].InstanceId === cjData[n].uid){
								cjData.splice(n,1);
								break;
							}
						}
					}	
					for(var i:number = 0;i<source.length;i++){
						if(dataRes[j].InstanceId === source[i].uid){
							source.splice(i,1);
							break;
						}
					}
				}
				// this.setBagGroupData(Module_bag.equipSource);
				break;
			default :
				break;
		}
	}
	//========================发送消息到服务器============================
	/**发送物品使用数据 */
	public sendUseGoodsDataToS(dataObj:any):void{
		var useGoodsMsg:proto.c_ItemUse = new proto.c_ItemUse();
		useGoodsMsg.templateId = dataObj.templateId;
		useGoodsMsg.useCount = dataObj.useCount;
		SocketManager.getInstance().sendProto(useGoodsMsg);
	}
	/**增加背包格子 */
	public sendAddBoxNumToS(dataObj:any):void{
		var bagMsg:proto.c_AddBag = new proto.c_AddBag();
		bagMsg.num = dataObj.num;
		SocketManager.getInstance().sendProto(bagMsg);
	}
	//=====================界面相关操作======================
	private container:eui.Group;
	protected createView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView(1);
		}else{
			//打开背包
			this.view = new View_bag();
			super.createView();
			this.view.initBtnState();
			this.curPage = MainNotify.SHOWEQUIP;
			this.setBagGroupData(Module_bag.equipSource);
			this.bagWatch = eui.Binding.bindProperty(this,["source"],this.view.arrayCollection,"source");
			this.bagBoxWatch = eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.bagcount+""],this.boxNumChange,this);
		}
		
	}
	/**背包格子数据改变 */
	private boxNumChange(value:number):void{
		if(value != null && this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.refreshBoxNum(Module_bag.equipSource.length,value);
		}
	}
	/**
	 * 关闭界面
	 * @param closeState 关闭状态  0为被动关闭 1为主动关闭
	 */
	public removeView(closeState:number):void{
		//关闭背包
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.curPage = "";
			this.bagWatch.unwatch();
			this.bagBoxWatch.unwatch();
			this.view.module = null;
			this.view.parent.removeChild(this.view);
			if(closeState){
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.INITNAVFOCUS);
			}
		}
	} 
	/**
	 * 设置背包数据
	 */
	private setBagGroupData(data:any):void{
		this.source = [];
		this.source = data;
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.refreshDataGroup(this.source.length);
		}
	}
	/**
	 * 设置item弹窗信息数据
	 */
	private m_layer:any;
	public setItemInfo(item:any,dataRes:any):void{
		this.m_layer = ViewController.getInstance().getContainer().layer_popup;
		var obj = dataRes;
		if(dataRes.itemType === 2){
			var baseAttrSource:any[] = [];
			for(var i:number = 0,len:number = dataRes.attrStrAny.length;i<len;i++){
				var obj2:any ={
					attrValue: dataRes.attrStrAny[i]
				}
				baseAttrSource.push(obj2);
			}
			obj.attrSource = [{title:"基础属性",renderType:1,baseAttrSource:baseAttrSource}]
			item.setData(obj);
			PopUpManager.addPopUp(item,true,item.skinName,this.m_layer,0);
		}else if(dataRes.itemType === 3){
			//物品tips皮肤状态 0为不可使用  1为可使用
			obj.canUse?obj.skinType = 1:obj.skinType = 0;
			item.setGoodsPopInfo(obj);
			PopUpManager.addPopUp(item,true,item.skinName,this.m_layer,0);
		}
		PopUpManager.startClickHidden(item.skinName,()=>{
			item.initData();
			PopUpManager.removePopUp(item.skinName,0);
		},this);	
	}
}