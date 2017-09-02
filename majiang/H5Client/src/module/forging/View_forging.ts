class View_forging extends Base_view{
	public constructor() {
		super();
		this.skinName = "View_forging_skin";
	}
	public btn_qianghua:BagBtn;
	public btn_gem:BagBtn;
	public btn_zhuling:BagBtn;
	public btn_refining:BagBtn;
	public btn_upgrade:Btn1;
	public btn_getProps:UI_ConnectWord;
	public itemGroup:eui.List;
	public returnBtn:eui.Image;
	public closeBtn:eui.Image;
	public icon_img:eui.Image;
	public icon_txt:eui.Label;
	public group_attrs:eui.Group;
	public txt_haveStone:eui.Label;
	public txt_needStone:eui.Label;
	public group_prop1:eui.Group;
	public group_prop2:eui.Group;
	public headCom:Role_headCom;
	public power:eui.BitmapLabel;

	//宝石界面
	public gem_img1:eui.Image;
	public game_txt_grade1:eui.Label;
	public gem_txt_attr1:eui.Label;
	public gem_img2:eui.Image;
	public game_txt_grade2:eui.Label;
	public gem_txt_attr2:eui.Label;
	public gem_img3:eui.Image;
	public game_txt_grade3:eui.Label;
	public gem_txt_attr3:eui.Label;
	public gem_img4:eui.Image;
	public game_txt_grade4:eui.Label;
	public gem_txt_attr4:eui.Label;
	public group_gemData:eui.Group;
	

	private curBtn:BagBtn;
	private curModule:Module_forging;

	private collection:eui.ArrayCollection;
	private currentListData:Array<any>;
	private stateName:string="qianghua";
	private currentIndex:number;
	private currentData:any;
	private curForgingType:number;
	private stoneFull:boolean;

	private popup_getStone:Forging_getStone;
	private stoneId:number;

	
	private _fightValue : number=0;
	

	protected childrenCreated():void{
		this.initialize();
		this.bindData();
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		// Global.addEventListener(MainNotify.RELOADINGCLOTH,this.onDispatchRes,this);
		// Global.addEventListener(MainNotify.STAR_UPGRADE,this.onDispatchRes,this);
		// Global.addEventListener(MainNotify.AUTO_STAR_UPGRADE,this.onDispatchRes,this);
		// Global.addEventListener(MainNotify.EXPERIENCE_STAR,this.onDispatchRes,this);
		// Global.addEventListener(MainNotify.WINGCHANGE,this.onDispatchRes,this);
		Global.addEventListener(MainNotify.JOBCHAGNE,this.changeJob,this);
		// Global.addEventListener(MainNotify.USE_XIUWEI,this.onDispatchRes,this);
		this.headCom.updateHead(DataCenter.roleList,this.skinName);
	}
	private bindData():void{
		eui.Binding.bindHandler(DataCenter,["changeItemNum"],this.changeNeedStone,this);
		
		eui.Binding.bindHandler(this,["_fightValue"],this.changePower,this);
		
		
	}
	private changeNeedStone(value:any):void{
		if(value && value.id){
			var uid:number = DataCenter.goodsUIDgather.get(this.stoneId+"");
			if(uid && uid === value.id){
				this.txt_haveStone.text=DataCenter.changeItemNum.num+"";
			}
		}
	}
	private changePower(value:number):void{
		this.power.text=value+"";
	}
	private initialize():void{
		this.curModule = this.module as Module_forging;
		// this.curRoleBtn["roleIcon"].source="head_0_0_png";
		//===========================


		this.collection=new eui.ArrayCollection(this.currentListData);
		this.itemGroup.dataProvider=this.collection;
		this.itemGroup.selectedIndex=0;
		
		this.btn_qianghua.setAttr({text:"强化",currentState:"down"});
		this.btn_gem.setAttr({text:"宝石",currentState:"up"});
		this.btn_zhuling.setAttr({text:"注灵",currentState:"up"});
		this.btn_refining.setAttr({text:"精炼",currentState:"up"});

		this.curBtn = this.btn_qianghua;
		this.curModule.curJob=DataCenter.roleList[0].job;

		this.btn_getProps.setClickFunction(this.getPropsHandler,this);

		this.popup_getStone=new Forging_getStone();
		this.popup_getStone.addEventListener("openRonglianPanel",()=>{
			this.curModule.sendMsgToModule([ModuleEnum.BAG],MainNotify.OPENBAG)
		},this);
	}

	private changeJob(evt:lcp.ChangeEvent):void{
		if(evt.c_data.job && evt.c_data.insKey === this.skinName){
			this.curModule.curJob=evt.c_data.job;
			this._fightValue = DataCenter.forginPower.get(this.curModule.curJob+"")[this.curForgingType];
			// this.power.text = this._fightValue+"";
		}
		
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		
		switch(evt.target){
			case this.returnBtn:
				//点击返回
			case this.closeBtn:
				this.removeView(1);
				//点击关闭
				break;
			case this.btn_upgrade.button:
				var arr:any[] = DataCenter.forgingData.get(this.curModule.curJob+"").get(this.currentState)
				var temp:data.StrengthenTemple=temple.TempleManager.select(arr[arr.length-1].value) as data.StrengthenTemple;
				if(!temp.nextID){
					var popObj:any = {type:TipsEnum.TYPE_WARN,label:"已达到顶级"};
					PopTipsManager.showPopTips([popObj]);
					return;
				}
				if(this.stoneFull){
					this.curModule.sendUpgradeMsg(this.curForgingType);
				}else{
					this.getPropsHandler();
				}
				break;
			case this.btn_gem.button:
				this.changeStateHandler(evt);
				break;
			case this.btn_qianghua.button:
				this.changeStateHandler(evt);
				
				break;
			case this.btn_zhuling.button:
				this.changeStateHandler(evt);
				break;
			default :
				break;
		}
	}
	private changeStateHandler(evt:egret.TouchEvent):void{
		this.btn_qianghua.setAttr({currentState:"up"});
		this.btn_gem.setAttr({currentState:"up"});
		this.btn_zhuling.setAttr({currentState:"up"});
		this.btn_refining.setAttr({currentState:"up"});
		switch(evt.target){
			case this.btn_gem.button:
				this.btn_gem.setAttr({currentState:"down"});
				this.changeView("gem");
				break;
			case this.btn_qianghua.button:
				this.btn_qianghua.setAttr({currentState:"down"});
				this.changeView("qianghua");
				break;
			case this.btn_zhuling.button:
				this.btn_zhuling.setAttr({currentState:"down"});
				this.changeView("zhuling");
				break;
			default :
				break;
		}
	}
	public changeView(stateName:string="qianghua"):void{
		this.stateName=stateName;
		this.curModule.curState=stateName;
		this.invalidateState();
		// this.changeNeedStone();
		// this.changePower();
		switch (stateName) {
			case "qianghua":
				this.itemGroup.itemRenderer=ForgingItemRenderer;
				this.currentListData=Forging_DataUtil.getQiangHuaData(DataCenter.forgingData.get(this.curModule.curJob+"").get(this.currentState),this.curModule.curJob);
				this.btn_upgrade.label="强化";
				this.curForgingType=0;
				break;
			case "gem":
				this.itemGroup.itemRenderer=ForgingItemRenderer;
				this.currentListData=Forging_DataUtil.getGemData(DataCenter.forgingData.get(this.curModule.curJob+"").get(this.currentState));
				this.btn_upgrade.label="提升";
				this.curForgingType=1;
				break;
			case "zhuling":
				this.itemGroup.itemRenderer=ForgingItemRenderer;
				this.currentListData=Forging_DataUtil.getZhulingData(DataCenter.forgingData.get(this.curModule.curJob+"").get(this.currentState));
				this.btn_upgrade.label="提升";
				this.curForgingType=2;
				
				break;
			default:
				break;
		}
		this._fightValue = DataCenter.forginPower.get(this.curModule.curJob+"")[this.curForgingType];
		// this.power.text = this._fightValue+"";
		
		this.currentIndex=DataCenter.forgingUIPos.get(this.curModule.curJob+"")[this.curForgingType];
		this.changeData();
	}


	public get fightValue() : number {		return this._fightValue;	}
	public set fightValue(v : number) {		this._fightValue += v;	}
	private getFigthValue():void{
		var num:number=0;
		for(var i:number=0;i<this.currentListData.length;i++){
			num+=this.currentData[i].FigthValue;
		}
		this._fightValue=num;
	}

	
	private getPropsHandler():void{
		switch (this.curForgingType) {
			case 0:
				PopUpManager.addPopUp(this.popup_getStone,true,this.popup_getStone.skinName,ViewController.getInstance().getContainer().layer_popup,0);
				PopUpManager.startClickHidden(this.popup_getStone.skinName,function(){
					PopUpManager.removePopUp(this.popup_getStone.skinName,this);
				},this);
				break;
			case 1:
				//获得材料
				var getGoods:Get_Goods_pop= new Get_Goods_pop();
				PopUpManager.addPopUp(getGoods,true,getGoods.skinName,ViewController.getInstance().getContainer().layer_popup,0);
				PopUpManager.startClickHidden(getGoods.skinName);
				var template:data.ItemTemple = temple.TempleManager.select(this.currentData.itemID) as data.ItemTemple;
				var shopTemple:data.ShopTemple = temple.TempleManager.select(DataCenter.storeGoods[this.currentData.itemID]) as data.ShopTemple;
				var obj:any = {tid:this.currentData.itemID,singleCost:shopTemple.sellPrice[0],quality:4,itemName:template.name,imgS:Config.path_goods + template.icon+".png",state:0};
				getGoods.refreshItem({shopData:obj,itemData:[{itemWay:"材料副本",icon:"popup_box_png"}]});
				// PopUpManager.addPopUp(this.popup_getStone,true,ViewController.getInstance().getContainer().layer_popup,0);
				// PopUpManager.startClickHidden();
				break;
			case 2:
				var getGoods1:Get_Goods_pop= new Get_Goods_pop();
				PopUpManager.addPopUp(getGoods1,true,getGoods1.skinName,ViewController.getInstance().getContainer().layer_popup,0);
				PopUpManager.startClickHidden(getGoods1.skinName);
				var template:data.ItemTemple = temple.TempleManager.select(this.currentData.itemID) as data.ItemTemple;
				var obj:any = {tid:this.currentData.itemID,quality:4,itemName:template.name,imgS:Config.path_goods + template.icon+".png",state:1};
				getGoods1.refreshItem({shopData:obj,itemData:[{itemWay:"参与击杀全民BOSS",icon:"popup_box_png"}]});
				break;
		
			default:
				break;
		}

		
	}
	
	private changeData():void{
		this.collection.replaceAll(this.currentListData);
		this.collection.refresh();
		
		this.itemGroup.dataProviderRefreshed();
		this.itemGroup.selectedIndex=this.currentIndex;

		switch(this.stateName){
			case "qianghua":
				this.updateQianghuaView();
				break;
			case "gem":
				this.updateGemView();
				break;
			case "zhuling":
				this.updateQianghuaView();
				break;
		}
	}
	private updateQianghuaView():void{
		
		
		this.currentData=this.currentListData[this.currentIndex];

		this.icon_img.source = this.currentData.equipSource;
		this.icon_txt.text = "+"+this.currentData.equipIntensify;

		this.stoneId=this.currentData.itemID;
		var uid:number = DataCenter.goodsUIDgather.get(this.stoneId+"");
		var num:number = 0;
		if(uid){
			num = DataCenter.goodsSource.get(uid+"");
		}
		this.txt_haveStone.text= num?num+"":0+"";
		this.txt_needStone.text=this.currentData.itemNum;
		if(Number(this.txt_needStone.text)>Number(this.txt_haveStone.text)){
			this.txt_haveStone.textColor=0xfc3434;
			this.stoneFull=false;
		}else{
			this.txt_haveStone.textColor=0x00FF4B;
			this.stoneFull=true;
		}
		var propArr:Array<number>=this.currentData.attrType;
		var valueArr:Array<number>=this.currentData.attrVal;
		var valueNextArr:Array<number>=this.currentData.n_attrVal;
		
		this.group_attrs.removeChildren();
		for(var i:number=0;i<propArr.length;i++){
			var name:string=GlobalFunc.formatTipsInfo(propArr[i]);
			var item:Forging_AttrItem=new Forging_AttrItem(name,"+"+valueArr[i],valueNextArr[i]+"");
			this.group_attrs.addChild(item);
		}

		
	}
	private updateGemView():void{
		
		
		this.currentData=this.currentListData[this.currentIndex];
		this.stoneId=this.currentData.itemID;
		var uid:number = DataCenter.goodsUIDgather.get(this.stoneId+"");
		var num:number = 0;
		if(uid){
			num = DataCenter.goodsSource.get(uid+"");
		}
		this.txt_haveStone.text=num?num+"":0+"";
		this.txt_needStone.text=this.currentData.itemNum;
		if(Number(this.txt_needStone.text)>Number(this.txt_haveStone.text)){
			this.txt_haveStone.textColor=0xfc3434;
			this.stoneFull=false;
		}else{
			this.txt_haveStone.textColor=0x00FF4B;
			this.stoneFull=true;
		}

		
		var lev:number=this.currentData.lev;
		var itemNum:number=this.currentData.itemNum;
		var attrType:number[]=this.currentData.attrType;
		var attrVal:number[]=this.currentData.attrVal;

		var len:number=Math.floor(lev/10);
		// var color:string;
		// switch (attrType) {
		// 	case 13:
		// 		color="green";
		// 		break;
		// 	case 22:
		// 		color="red";
		// 		break;
		// 	case 23:
		// 		color="yellow";
		// 		break;
		// 	case 25:
		// 		color="blue";
		// 		break;
		
		// 	default:
		// 		break;
		// }
		for(var i:number=1;i<=4;i++){
			this["gem_txt_grade"+i].size=20;
			this["gem_txt_attr"+i].size=20;
			this["gem_txt_grade"+i].textColor=0x00ff4b;
			this["gem_txt_attr"+i].textColor=0x00ff4b;
			if(i-1<len){
				// this["gem_img"+i].source="gem_icon_"+color+"_1_png";
				this["gem_txt_grade"+i].text="lv"+10;
				this["gem_txt_attr"+i].text=AttrNameUtil.getInstance().getAttrName(attrType[0],3)+"+"+attrVal[0]/lev*10;

			}else if(i-1==len&&lev!=0){
				
				// this["gem_img"+i].source="gem_icon_"+color+"_2_png";
				this["gem_txt_grade"+i].text="lv"+lev%10;
				this["gem_txt_attr"+i].text=AttrNameUtil.getInstance().getAttrName(attrType[0],3)+"+"+attrVal[0]/lev*(lev%10);
			}else{
				this["gem_img"+i].source="gem_icon_gray_1_png";
				this["gem_txt_grade"+i].text=AttrNameUtil.getInstance().getAttrName(attrType[0],3)+"宝石";
				this["gem_txt_attr"+i].text="未激活";
				this["gem_txt_grade"+i].size=18;
				this["gem_txt_attr"+i].size=18;
				this["gem_txt_grade"+i].textColor=0xa19d94;
				this["gem_txt_attr"+i].textColor=0xa19d94;
			}
		}

		
		

		
	}
	public removeView(closeState:number):void{
		this.module.removeView(closeState);
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.removeEventListener(MainNotify.JOBCHAGNE,this.changeJob,this);
	}

	protected getCurrentState():string{
		return this.stateName;
	}
}