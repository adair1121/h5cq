class Friends_list_item extends eui.ItemRenderer{
	public icon:RoleHeadItemRender;
	public friendName:eui.Label;
	public friendLev:eui.Label;
	public friendFightV:eui.Label;
	public removeBtn:eui.Button;
	public btn_chat:Btn3;
	public btn_removeFriend:Btn3;
	public btn_addBlack:Btn3;
	public group_btnGroup:eui.Group;
	public txt_isOnline:eui.Label;

	private stateName:string;
	private showBtn:boolean;

	public constructor() {
		super();
		this.skinName = "Friends_list_item_skin";
	}
	protected childrenCreated():void{
		this.removeBtn.label = "删除";
		this.btn_addBlack.label = "屏蔽";
		this.btn_removeFriend.label = "删除";
		this.btn_chat.label = "私聊";
		this.btn_chat.size=16;
		this.btn_addBlack.size=16;
		this.btn_removeFriend.size=16;
		this.showBtn=false;
		this.group_btnGroup.visible=false;
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP,(event:egret.TouchEvent)=>{
		// 	switch(event.target){
		// 		case this.removeBtn:
		// 			//移除黑名单item
		// 			Global.dispatchEvent(MainNotify.FRIENDS_OPER,{type:3,operData:{name:this.data.name}});
		// 			break;
		// 		case this.btn_removeFriend:
		// 			//移除好友
		// 			Global.dispatchEvent(MainNotify.FRIENDS_OPER,{type:1,operData:{name:this.data.name}});
		// 			break;
		// 		case this.btn_addBlack:
		// 			//加入黑名单
		// 			Global.dispatchEvent(MainNotify.FRIENDS_OPER,{type:2,operData:{name:this.data.name}});
		// 			break;
		// 		case this.btn_chat:
		// 			this.dispatchEvent(new egret.Event("startChat",true,false,{chatTargetName:this.data.name}));
		// 			break;
		// 		default:
		// 			this.group_btnGroup.visible=false;
		// 			if(!this.showBtn){
		// 				this.showBtn=true;
		// 				this.group_btnGroup.visible=true;
		// 			}else{
		// 				this.showBtn=false;
		// 				this.group_btnGroup.visible=false;
		// 			}
		// 		break;
				
		// 	}
			
		// },this)
	}
	public setBtnVisible(visible:boolean):void{
		this.group_btnGroup.visible = visible;
	}
	public get btnGroupVisible():boolean{
		return this.group_btnGroup.visible;
	}
	protected dataChanged():void{
		if(this.data.state === data.FriendState.Friend){
			this.stateName = "friend";
		}else if(this.data.state === data.FriendState.Blacklist){
			this.stateName = "blackList";
		}else{
			this.stateName = "recently";
		}
		this.invalidateState();
		this.validateNow();
		this.icon.selected=false;
		this.icon.source = this.data.head;
		
		this.friendName.text = this.data.name;
		if(this.data.reborn){
			this.friendLev.text = "("+this.data.reborn+"转"+this.data.level+"级)";
		}else{
			this.friendLev.text = "("+this.data.level+"级)";
		}
		if(this.stateName=="recently"){
			this.friendFightV.text = this.data.record;
		}else{
			this.friendFightV.text = "战斗力："+this.data.FightValue;
		}
		
		// if(this.data.stateName=="friend"){
		// 	this.group_btnGroup.visible=false;
		// 	// this.txt_isOnline.text=this.data.isOnline?"在线":"离线"
		// 	// if(this.data.isOnline){
		// 	// 	// this.txt_isOnline.textColor=0x04FE10;
		// 	// }else{
		// 	// 	this.txt_isOnline.textColor=0xE6D8B3;
		// 	// }
		// 	// eui.Binding.bindHandler(this,["selected"],()=>{
		// 	// 	if(this.selected==false){
		// 	// 		this.showBtn=false;
		// 	// 		this.group_btnGroup.visible=false;
		// 	// 	}
				
			
		// 	// },this);
		// }

		
	}
	protected getCurrentState():string{
		return this.stateName;
	}
}