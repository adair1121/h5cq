class View_chat extends Base_view{
	public constructor() {
		super();
		this.skinName="View_chat_skin";
	}
	public list:eui.List;
	public scroller:eui.Scroller;
	public txt_input:eui.EditableText;
	public btn_sendMsg:eui.Image;
	public btn_world:BagBtn;
	public btn_gang:BagBtn;
	public btn_system:BagBtn;
	public btn_service:BagBtn;
	public btn_service_send:Btn1;
	public returnBtn:eui.Image;
	public txt_service_input:eui.EditableText;



	private stateName:string;
	public curChannel:number=0;
	private listData:Array<any>;
	private collection:eui.ArrayCollection;
	private curModule:Module_chat;
	private addFrientBtn:Btn3;
	private addBlackListBtn:Btn3;

	protected childrenCreated():void{
		
		this.curModule=this.module as Module_chat;

		this.btn_world.setAttr({text:"世界",currentState:"down"});
		this.btn_gang.setAttr({text:"公会",currentState:"up"});
		this.btn_system.setAttr({text:"系统",currentState:"up"});
		this.btn_service.setAttr({text:"客服",currentState:"up"});
		this.btn_service_send.label="发送";
		this.btn_service.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.btn_world.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.btn_gang.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.btn_system.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);


		this.scroller.viewport=this.list;

		this.btn_sendMsg.touchEnabled=true;
		this.list.itemRenderer=Chat_ItemRenderer;
		this.collection=new eui.ArrayCollection(this.listData);
		this.list.dataProvider=this.collection;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);

		// eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.levID+""],this.setInput,this);
	
	}

	private setInput():void{
		if(!this.txt_input){
			return;
		}
		var levID =DataCenter.playerAttr[data.PlayerAttr.levID+""]
		var rebornID=temple.TempleManager.select(DataCenter.playerAttr[data.PlayerAttr.rebornID+""])["RELev"];
		this.btn_sendMsg.touchEnabled = true;
		this.txt_input.text="";
		this.txt_input.touchEnabled=true;
		if(this.curChannel==1){
			if(!rebornID && levID < 60){
				this.txt_input.text="等级大于60级开启";
				this.txt_input.touchEnabled=false;
				this.btn_sendMsg.touchEnabled = false;
			}
			// if(DataCenter.playerAttr[data.PlayerAttr.gangID+""]<=0){
			// 	this.txt_input.text="请先加入公会";
			// 	this.txt_input.touchEnabled=false;
			// }else{
			// 	this.txt_input.text="";
			// 	this.txt_input.touchEnabled=true;
			// }
		}
		
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch (evt.target) {
			case this.returnBtn:
				this.curModule.removeView();
				break;
			case this.btn_sendMsg:
				var content:string=this.txt_input.text;
				if(!GlobalFunc.checkTextSpace(content)){
					var obj:any = {type:TipsEnum.TYPE_WARN,label:"请输入正确的内容"};
					PopTipsManager.showPopTips([obj]);
					return;
				}
				this.curModule.sendChatToServer(content,this.curChannel);
				this.txt_input.text="";
				break;
			case this.btn_service_send:
				var content:string=this.txt_service_input.text;
				this.curModule.sendChatToServer(content,this.curChannel);
				break;
			case this.addFrientBtn:
				this.curModule.addFriendById(this.playerId);
				break;
			case this.addBlackListBtn:
				this.curModule.addBlackList(this.playerId);
				break;
		
			default:
				break;
		}
		GlobalFunc
	}
	private changeStateHandler(event:egret.TouchEvent):void{
		this.btn_world.setAttr({currentState:"up"});
		this.btn_gang.setAttr({currentState:"up"});
		this.btn_system.setAttr({currentState:"up"});
		this.btn_service.setAttr({currentState:"up"});

		switch (event.target) {
			case this.btn_world.button:
				this.btn_world.setAttr({currentState:"down"});
				this.stateName="world";
				this.curChannel=0;
				this.setInput();
				this.changeView();
				break;
			case this.btn_gang.button:
				this.btn_gang.setAttr({currentState:"down"});
				this.stateName="gang";
				this.curChannel=1;
				this.setInput();
				this.changeView();
				break;
			case this.btn_system.button:
				this.btn_system.setAttr({currentState:"down"});
				this.stateName="system";
				this.curChannel=2;
				this.changeView();
				break;
			case this.btn_service.button:
				this.btn_service.setAttr({currentState:"down"});
				this.stateName="service";
				this.curChannel=3;
				break;
			default:
				break;
		}
		
		this.invalidateState();
	}
	protected getCurrentState():string{
		if(this.stateName){
			return this.stateName;
		}
		return super.getCurrentState();
	}
	
	public changeView(channel:number = NaN):void{
		if(!isNaN(channel) && channel != this.curChannel){
			return;
		}
		this.listData=this.curModule.getListData(this.curChannel);
		if(this.listData.length){
			this.collection.source = this.listData;
		}else{
			this.collection.source = [];
		}
		this.scroller.stopAnimation();
		this.scroller.validateNow();
		// this.scroller.viewport.scrollV=this.scroller.viewport.measuredHeight;
		var height:number = 0;
		if(this.curChannel === 2){
			height = (this.listData.length*Chat_ItemRenderer.m_Sysheight())
		}else{
			height = (this.listData.length*Chat_ItemRenderer.m_Defaultheight())
		}
		var num:number = height - this.scroller.viewport.height;
		if(num > 0){
			this.scroller.viewport.scrollV = height - this.scroller.viewport.height;
		}else{
			this.scroller.viewport.scrollV = 0;
		}
	}
	private playerId:string;
	private onItemTap(evt:eui.ItemTapEvent):void{
		var len:number = evt.target.numChildren;
		if(evt.item.channel === 0 || evt.item.channel === 1){
			var item:Chat_ItemRenderer = evt.target.getChildAt(evt.itemIndex);
			for(var i:number = 0;i<len;i++){
				var itemObj:Chat_ItemRenderer = evt.target.getChildAt(i);
				if(item != itemObj){
					itemObj.setBtnVisible(false);
				}
			}
			item.setBtnVisible(!item.btnGroupVisible);
			this.playerId = evt.item.roleData.instanceId;
			this.addFrientBtn = item.btn_addFriend;
			this.addBlackListBtn = item.btn_addBlack;
		}
	}
	public removeEvent():void{
		this.btn_service.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.btn_world.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.btn_gang.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.btn_system.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeStateHandler,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}