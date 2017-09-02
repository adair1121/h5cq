class CJ_assembly extends eui.Component{
	public equipList:eui.List;
	public otherItem:Way_other_item;
	public returnBtn:eui.Image;
	public scroller:eui.Scroller;
	private equipCollect:eui.ArrayCollection;
	private curEquipItem:CJ_assembly_item;
	private curEquipItemData:any;
	private callBack:Function;
	private arg:any;
	public constructor() {
		super();
		this.skinName = "CJ_assembly_skin";
	}
	protected childrenCreated():void{
		this.equipCollect = new eui.ArrayCollection();
		this.equipList.itemRenderer = CJ_assembly_item;
		this.equipList.dataProvider = this.equipCollect;
		this.scroller.viewport = this.equipList;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHandler,this,false,1);
		this.equipList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onEquipItemTap,this,false,2);
	}
	public setData(dataObj:any,callBack:Function,arg:any):void{
		this.equipCollect.source = dataObj.equipSource;
		this.otherItem.refreshOtherWay(dataObj.itemData,"获取装备");
		this.callBack = callBack;
		this.arg = arg;
	}
	public refreshCJData(source:any):void{
		this.equipCollect.source = source;
	}
	private onTouchHandler(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
				PopUpManager.removePopUp(this.skinName,0);
				break;
			case (this.curEquipItem?this.curEquipItem.assemblyBtn:0):
				var obj:any = {job:this.curEquipItemData.job,insId:this.curEquipItemData.uid};
				if(this.callBack && this.arg){
					this.callBack.call(this.arg,obj);
				}
				break;
			default:
				break;
		}
	}
	private onEquipItemTap(evt:eui.ItemTapEvent):void{
		this.curEquipItem = this.equipList.getChildAt(evt.itemIndex) as CJ_assembly_item;
		this.curEquipItemData = evt.item;
	}
}