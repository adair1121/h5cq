class Role_reborn extends eui.Component{
	
	public fightValue:eui.BitmapLabel

	public rebornLev:eui.Label;
	public txt_needXw:eui.Label;
	public txt_hadXw:eui.Label;
	public getXW:eui.Label;
	public btn_upgrade:Btn1;
	private role_getXw:Role_getXw;
	private layer:eui.Component;
	private watcher:eui.Watcher;
	private n_xiuwei:number;
	private ifTop:boolean;
	private value:number = 0;
	public cAttrList:eui.List;
	public nextAttrList:eui.List;
	private c_arryCollect:eui.ArrayCollection;
	private n_arrayCollect:eui.ArrayCollection;
	private addItem:number[];
	public constructor(type:number) {
		super();
		this.skinName = "Role_reborn_skin";
	}
	protected childrenCreated():void{
		this.addItem = [];
		this.btn_upgrade.label = "提升"
		this.role_getXw = new Role_getXw();
		this.cAttrList.itemRenderer = Role_specialItem;
		this.nextAttrList.itemRenderer = Role_specialItem;
		this.c_arryCollect = new eui.ArrayCollection();
		this.n_arrayCollect = new eui.ArrayCollection();
		this.cAttrList.dataProvider = this.c_arryCollect;
		this.nextAttrList.dataProvider = this.n_arrayCollect;
		this.layer = ViewController.getInstance().getContainer().layer_popup;
		this.getXW.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetXw,this);
		this.watcher = eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.xiuwei+""],this.xiuweiChange,this);
		this.btn_upgrade.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private xiuweiChange(value:number):void{
		this.txt_hadXw.text = value + "";
	}
	private onGetXw(evt:egret.TouchEvent):void{
		this.role_getXw.setGoodsTemple(this.addItem);
		PopUpManager.addPopUp(this.role_getXw,true,this.role_getXw.skinName,this.layer,0);
		PopUpManager.startClickHidden(this.role_getXw.skinName,this.callBackFunc,this);
	}
	private callBackFunc():void{
		PopUpManager.removePopUp(this.role_getXw.skinName,0)
	}
	public refreshRebornData(data:any):void{
		this.c_arryCollect.source = data.cAttr;
		this.n_arrayCollect.source = data.nAttr;
		this.addItem = data.addItem;
		this.rebornLev.text = data.reLev + "转";
		this.txt_needXw.text = data.reExp;
		this.n_xiuwei = parseInt(data.reExp);
		this.ifTop = data.rebornLev;
		this.fightValue.text = data.fightValue+"";
		this.value = data.changeValue;
		if(this.clickState){
			GlobalFunc.showPowerUpTips(data.fightValue,[this.value]);
			this.clickState = false;
		}
	}
	private clickState:boolean;
	private onTouchTap(evt:egret.TouchEvent):void{
		var c_xiuwei:number = DataCenter.playerAttr[data.PlayerAttr.xiuwei];
		if(this.ifTop){
			var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"转生已达到顶级"}]
			PopTipsManager.showPopTips(obj);
			return;
		}
		if(this.n_xiuwei <= c_xiuwei){
			this.clickState = true;
			Global.dispatchEvent(MainNotify.REBORN);
		}else{
			var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"修为不足"}]
			PopTipsManager.showPopTips(obj);
		}
	}
	public remove():void{
		this.btn_upgrade.button.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.watcher.unwatch();
	}

}