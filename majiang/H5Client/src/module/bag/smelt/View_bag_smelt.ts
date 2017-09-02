class View_bag_smelt extends Base_view{

	public closeBtn:eui.Image;
	public returnBtn:eui.Image;
	public smeltBtn:Btn1;
	public rongluBtn:BagBtn;
	public normalEquipBtn:BagBtn;
	public itemList:eui.List;
	
	private btnArr:BagBtn[];
	private curModule:Module_bag_smelt;
	public arrayCollection:eui.ArrayCollection;
	private layer:eui.Component;
	private selectEquipPanel:Bag_smeltEquipSelect
	public constructor() {
		super();
		this.skinName = "Bag_smelt_skin";
	}
	
	protected childrenCreated():void{
		this.initialize();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.itemList.dataProvider = this.arrayCollection;
		this.itemList.itemRenderer = GoodsItem;
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.closeBtn:
			case this.returnBtn:
				this.removeView(1);
				this
				break;
			case this.smeltBtn.button:
				this.curModule.smeltEquip();
				break;
			case this.rongluBtn.button:
				break;
			case this.normalEquipBtn.button:
				break;
			default:
				break;
		}
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		var curSmeltData:any[] = Module_bag_smelt.source;
		if(!evt.item.isEmpty){
			this.curModule.refreshSmeltData(curSmeltData.indexOf(evt.item));
		}else{
			PopUpManager.addPopUp(this.selectEquipPanel,true,this.selectEquipPanel.skinName,this.layer,0);
			this.selectEquipPanel.refreshSource();
			PopUpManager.startClickHidden(this.selectEquipPanel.skinName,this.callBackFunc,this);
		}
	}
	private callBackFunc():void{
		PopUpManager.removePopUp(this.selectEquipPanel.skinName,0);
	}
	private initialize():void{
		this.layer = ViewController.getInstance().getContainer().layer_popup;
		this.selectEquipPanel = new Bag_smeltEquipSelect();
		this.smeltBtn.label = "熔炼";
		this.rongluBtn.setAttr({text:"熔炉",size:20});
		this.normalEquipBtn.setAttr({text:"普通装备",currentState:"down",size:20});
		this.btnArr = [this.normalEquipBtn,this.rongluBtn];
		this.curModule = this.module as Module_bag_smelt;
		this.arrayCollection = new eui.ArrayCollection();
	}
	private setButtonState():void{

	}
	public initBtnState():void{
		this.normalEquipBtn.setAttr({currentState:"down"});
		this.rongluBtn.setAttr({currentState:"down"});
	}
	public removeView(closeState:number):void{
		this.curModule.removeView(closeState);
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.itemList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}