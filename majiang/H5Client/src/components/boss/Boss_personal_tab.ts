class Boss_personal_tab extends eui.Component{
	public scroller:eui.Scroller;
	public list:eui.List;
	private collect:eui.ArrayCollection;
	private curItemBtn:eui.Button;
	public removeBtn:eui.Image;
	private itemData:any;
	public constructor() {
		super();
		this.skinName = "Boss_personal_skin";
	}
	protected childrenCreated():void{
		this.collect = new eui.ArrayCollection();
		this.list.itemRenderer = Boss_personal_item;
		this.list.dataProvider = this.collect;
		this.scroller.viewport = this.list;
		// this.collect.source = [{bossId:201110001,bossIcon:"",dropIcon:["","",""],count:1}];
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this,false,2);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this,false,1);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		var item:Boss_personal_item = this.list.getChildAt(evt.itemIndex) as Boss_personal_item;
		this.curItemBtn = item.challengeBtn;
		this.itemData = evt.item;
	}
	public setBossSource(source:any):void{
		this.collect.source = source;
	}
	public setBossItem(item:any,index:number):void{
		this.collect.replaceItemAt(item,index);
		this.collect.refresh();
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.removeBtn:
				this.remove();
				break;
			case this.curItemBtn:
				if(this.curItemBtn.currentState === "up"){
					Global.dispatchEvent(MainNotify.CHALLENGE_PERSONAL_BOSS,this.itemData);
				}
				break;
		}
	}
	public remove():void{
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		if(this.parent && this.parent.contains(this)){
			this.parent.removeChild(this);
		}
	}
}