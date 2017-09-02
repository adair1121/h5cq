class View_mail extends Base_view{
	private mailId:string;
	public constructor() {
		super();
		this.skinName="View_mail_skin";
	}

	public list:eui.List;
	public scroller:eui.Scroller;
	public returnBtn:eui.Image;

	private curModule:Module_mail;
	private collection:eui.ArrayCollection;
	private mailListData:Array<any>;

	private mailPopup:Mail_popup;
	
	protected childrenCreated():void{
		
		this.curModule=this.module as Module_mail;

		this.mailPopup=new Mail_popup();

		this.scroller.viewport=this.list;

		this.mailListData=[];
		this.list.itemRenderer=Mail_itemRenderer;
		this.collection=new eui.ArrayCollection();
		this.list.dataProvider=this.collection;

		this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClickHandler,this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.clickItemHandler,this);

	}
		
	public changeView(source:any[]):void{
		
		// this.mailListData=DataCenter.mailData;
		this.collection.source = [];
		this.collection.source = source;

		this.scroller.viewport.scrollV=0;
		
	}

	public btnClickHandler(event:egret.TouchEvent):void{
		switch (event.target) {
			case this.returnBtn:
				this.curModule.removeView();
				break;
			default:
				break;
		}
	}

	private clickItemHandler(event:eui.ItemTapEvent):void{
		
		this.mailId = event.item.mailId;
		PopUpManager.addPopUp(this.mailPopup,true,this.mailPopup.skinName,ViewController.getInstance().getContainer().layer_popup,0);
		PopUpManager.startClickHidden(this.mailPopup.skinName,this.callBackFunc,this);
			
		this.mailPopup.setMailData(event.item,this.getReward,this);
		this.curModule.openMail(this.mailId);
		
	}
	private getReward():void{
		this.curModule.getRewardToS(this.mailId);
	}
	public removeEvent():void{

	}
	private callBackFunc():void{
		PopUpManager.removePopUp(this.mailPopup.skinName,0);
	}
	

}