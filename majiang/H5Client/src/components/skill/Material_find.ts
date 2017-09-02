class Material_find extends eui.Component{
	public returnBtn:eui.Image;
	public closeBtn:eui.Image;
	public itemList:eui.List;
	public secret:CommonItem;

	private arrayCollection:eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "Material_find_skin"
	}
	protected childrenCreated():void{
		this.secret.iName = "秘籍";
		this.secret.itemName.textColor = 0xefbf00;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.arrayCollection = new eui.ArrayCollection();
		this.itemList.itemRenderer = Material_item;
		this.itemList.dataProvider = this.arrayCollection;
		this.refreshSource([{icon:"bag_2_bg_png",itemWay:"王者争霸"}]);
		this.itemList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this)
	}
	public refreshSource(source:any):void{
		this.arrayCollection.source = source;
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		//测试
		var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"活动尚未开启"}];
		PopTipsManager.showPopTips(obj)
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.closeBtn:
			case this.returnBtn:
				this.closeView();
				break;
		}
	}
	private closeView():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
}