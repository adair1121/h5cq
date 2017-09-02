class Module_chat extends Base_module{
	private sayType:number;
	private privatePlayerId:string;
	private content:string;
	public constructor() {
		super();
	}

	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_ChatInfo:
				var curMsg:proto.s_ChatInfo=msg as proto.s_ChatInfo;
				this.dealMsg(curMsg);
				this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT,{msg:curMsg});
				if(this.view && this.view.parent && this.view.parent.contains(this.view)){
					this.view.changeView(curMsg.channel);
				}
				break;
			case proto.MessageType.s_say:
				var curMsg2:proto.s_say=msg as proto.s_say;
				if(!curMsg2.isSuccess){
					//提示发送信息
					var obj:any = {type:TipsEnum.TYPE_WARN,label:curMsg2.errMsg};
					PopTipsManager.showPopTips([obj]);
					return;
				}else{
					if(this.sayType === 4){
						//私聊
						this.sendMsgToModule([ModuleEnum.FRIEND],MainNotify.SAYSUCESS,{playerId:this.privatePlayerId,content:this.content});
					}
				}
				// this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT);
				break;
			case proto.MessageType.s_ChatCacheInfo:
				var curMsg1:proto.s_ChatCacheInfo=msg as proto.s_ChatCacheInfo;
				this.dealInitMsg(curMsg1);
				this.filterChatData();
				// this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT);
				break;
	
			default:
				break;
		}
	}


	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,data:any=null):void{
		switch(msgType){
			case MainNotify.OPENCHATPANEL:
				//打开锻造面板
				this.createView();
				break;
			case MainNotify.FILTERCHAT:
				this.filterChatData();
				break;
			case MainNotify.CLEARFILTER:
				this.removeFilter();
				break;
			case MainNotify.PRIVATESAY:
				this.sendChatToServer(data.content,data.channel,data.playerId);
				break;
			default :
				break;
		}
	}
	private filterChatData():void{
		if(!DataCenter.chatData){
			return;
		}
		var dicObj = DataCenter.chatData.dict;
		var blackList:any[] = DataCenter.friendData.get(data.FriendState.Blacklist+"");
		if(!blackList || !blackList.length){
			return;
		}
		for(var key in dicObj){
			var arr:any[] = dicObj[key];
			if(!arr.length){
				break;
			}
			for(var i:number = 0,flag = true;i<arr.length;flag?i++:i){
				var ifRemove:boolean = this.ifRemoveFilterChat(arr[i].channel,arr[i].roleData.instanceId,blackList);
				if(ifRemove){
					arr.splice(i,1);
					flag = false;
				}else{
					flag = true;
				}
			}
		}
		this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT);
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.changeView(this.view.curChannel);
		}
	}
	private removeFilter():void{
		var dic:Dictionary = GlobalFunc.deepCopyDict(DataCenter.allChatData);
		DataCenter.chatData = dic;
		this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT);
		// if(this.view && this.view.parent && this.view.parent.contains(this.view)){
		// 	this.view.changeView();
		// }
	}
	private ifRemoveFilterChat(channel:number,playerId:string,filterList:any[]):boolean{
		if((channel === 0 || channel === 1)){
			for(var i:number = 0;i<filterList.length;i++){
				if(playerId === filterList[i].playerId){
					return true;
				}
			}
		}
		return false
	}


	private dealInitMsg(msg:proto.s_ChatCacheInfo):void{
		var worldArr:Array<any>=new Array<any>();
		var gangArr:Array<any>=new Array<any>();
		var systemArr:Array<any>=new Array<any>();
		var arr:Array<any>=[];
		arr=msg.chatCacheList;
		var privatChatArr:any[] = [];
		for(var i:number=0;i<arr.length;i++){
			switch (arr[i].channel) {
				case 0:
					worldArr.push(this.dealWorldChat(arr[i]));
					break;
				case 1:
					gangArr.push(this.dealGangChat(arr[i]));
					break;
				case 2:
					systemArr.push(this.dealSystemChat(arr[i]));
					break;
				case 4:
					privatChatArr.push(arr[i]);
					break;
				default:
					break;
			}

		}
		var dict=new Dictionary("");
		
		dict.add("0",worldArr);
		dict.add("1",gangArr);
		dict.add("2",systemArr);
		dict.add("4",privatChatArr)
		DataCenter.chatData=dict;
		if(privatChatArr.length){
			this.sendMsgToModule([ModuleEnum.FRIEND],MainNotify.PRIVATEDATACATCH,privatChatArr);
		}
		DataCenter.allChatData = GlobalFunc.deepCopyDict(dict);

	}
	private dealWorldChat(any:any):any{
		var any1:any={};
		any1.channel=any.channel;
		any1.timeStemp=any.timeSpan;
		any1.roleData=any.senderBasicInfo;
		any1.type=any.type;
		any1.name=any.senderBasicInfo.name;
		any1.content=any.content;
		any1.state="default";
		return any1;
	}
	private dealGangChat(any:any):any{
		var any1:any={};
		any1.channel=any.channel;
		any1.timeStemp=any.timeSpan;
		any1.roleData=any.senderBasicInfo;
		any1.type=any.type;
		any1.name=any.senderBasicInfo.name;
		any1.content=any.content;
		any1.state="default";
		return any1;
	}
	private dealSystemChat(any:any):any{
		var any1:any={};
		any1.channel=any.channel;
		any1.timeStemp=any.timeSpan;
		any1.content = any.content;
		any1.type = any.type;
		any1.state="system";
		//拼接
		return any1;
	}

	private dealMsg(msg:proto.s_ChatInfo):void{
		switch (msg.channel) {
				case 0:
					DataCenter.chatData.get("0").push(this.dealWorldChat(msg));
					DataCenter.allChatData.get("0").push(this.dealWorldChat(msg));
					break;
				case 1:
					DataCenter.chatData.get("1").push(this.dealGangChat(msg));
					DataCenter.allChatData.get("1").push(this.dealGangChat(msg));
					break;
				case 2:
					DataCenter.chatData.get("2").push(this.dealSystemChat(msg));
					DataCenter.allChatData.get("2").push(this.dealSystemChat(msg));
					break;
				case 4:
					//私聊
					var dataObj:any = {};
					dataObj.playerId = msg.senderBasicInfo.instanceId;
					var friendInfo:any = {};
					friendInfo.playerId = msg.senderBasicInfo.instanceId;
					friendInfo.state = 3;
					friendInfo.head = msg.senderBasicInfo.headID;
					friendInfo.name = msg.senderBasicInfo.name;
					dataObj.content = msg.content;
					dataObj.friendInfo = friendInfo;
					this.sendMsgToModule([ModuleEnum.FRIEND],MainNotify.RECEIVESAY,dataObj);
					break;
				default:
					break;
			}
			// this.view.changeView();

	}

	public removeView():void{
		//关闭角色面板
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
		}
	} 

	protected createView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView();
		}else{
			//打开角色面板
			this.view = new View_chat();
			super.createView();
			this.view.changeView();
		}
	}

	public getListData(channel:number):Array<any>{

		var arr:Array<any>=DataCenter.chatData.get(""+channel);
		if(!arr){
			return;
		}
		var arr1;
		if(arr.length > 50){
			arr1=arr.slice(-50);
		}else{
			arr1 = arr;
		}
		return arr1;
	}

	public sendChatToServer(str:string,channel:number,playerId:string = ""):void{
		var msg:proto.c_say=new proto.c_say();
		msg.channel=channel;
		msg.content=str;
		msg.sendTo = playerId;
		DataCenter.playerId
		this.sayType = channel;
		this.privatePlayerId = playerId;
		this.content = str;
		SocketManager.getInstance().sendProto(msg);
	}
	public addFriendById(id:string):void{
		var msg:proto.c_AddFriendById = new proto.c_AddFriendById();
		msg.friendInstId = id;
		SocketManager.getInstance().sendProto(msg);
	}
	public addBlackList(id:string):void{
		var msg:proto.c_AddBlacklist = new proto.c_AddBlacklist();
		msg.playerId = id;
		SocketManager.getInstance().sendProto(msg);
		// DataCenter.friendIdData.get("blackList").push(msg.playerId);
	}
}