class Friends_popup extends eui.Component{
	public editText:eui.EditableText;
	public scroller:eui.Scroller;
	public sureBtn:eui.Button;
	public cancleBtn:eui.Button;
	public returnBtn:eui.Image;
	public blackNum:eui.Label;
	public dataList:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private curItem:Friends_list_item;
	private curItemData:any;
	private m_state:string = "addFriend";
	public constructor(state:string) {
		super();
		this.skinName = "Friends_popup_skin";
		this.skin.currentState = state;
		// this.setSkinState(state);
	}
	protected childrenCreated():void{
		this.sureBtn.label = "确认";
		this.cancleBtn.label = "取消";
		this.arrayCollect = new eui.ArrayCollection();
		this.scroller.viewport=this.dataList;
		this.dataList.itemRenderer = Friends_list_item;
		this.dataList.dataProvider = this.arrayCollect;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.dataList.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onListTouch,this,true,1);
		this.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		eui.Binding.bindHandler(this.skin,["currentState"],this.skinChange,this);
	}
	public setSkinState(state:string):void{
		this.m_state = state;
		this.invalidateState();
	}
	public skinChange(value:string):void{
		if(value === "blackList"){
			var blackList:any[] = DataCenter.friendData.get(data.FriendState.Blacklist+"");
			var num:number = blackList&&blackList.length?blackList.length:0;
			this.arrayCollect.source = blackList;
			this.blackNum.text = num+"/"+DataCenter.balckListTotalNum;
		}
	}
	protected getCurrentState():string{
		return this.m_state;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.returnBtn:
			case this.cancleBtn:
				this.remove();
				break;
			case this.sureBtn:
				if(this.editText.text === ""){
					var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"用户名不能为空"}];
					PopTipsManager.showPopTips(obj);
					return;
				}else{
					//发送添加朋友请求
					Global.dispatchEvent(MainNotify.FRIENDS_OPER,{type:0,operData:{name:this.editText.text}});
					this.remove();
					this.editText.text = "";
				}
				break;
			
		}
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.curItem = this.dataList.getChildAt(this.dataList.selectedIndex) as Friends_list_item;
		this.curItemData = evt.item;
	}
	private onListTouch(evt:egret.TouchEvent):void{
		if(!this.curItem){
			return;
		}
		switch(evt.target){
			case this.curItem.removeBtn:
				//移除黑名单item
				Global.dispatchEvent(MainNotify.FRIENDS_OPER,{type:3,operData:{playerId:this.curItemData.playerId},callBack:this.callBack,arg:this});
				break;
		}
	}
	private callBack():void{
		var blackList:any[] = DataCenter.friendData.get(data.FriendState.Blacklist+"");
		var num:number = blackList&&blackList.length?blackList.length:0;
		this.arrayCollect.source = blackList;
		this.blackNum.text = num+"/"+DataCenter.balckListTotalNum;
	}
	private remove():void{
		PopUpManager.removePopUp(this.skinName,0);
	}
}