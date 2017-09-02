class Module_mail extends Base_module{
	private mailData:any[] = [];
	public constructor() {
		super();
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_MailList:
				var curMsg:proto.s_MailList=msg as proto.s_MailList;
 				this.dealMsg(curMsg);
				break;
			case proto.MessageType.s_TakeAward:
				var curMsg1:proto.s_TakeAward=msg as proto.s_TakeAward;
				this.receiveHandler(curMsg1);
				break;
			case proto.MessageType.s_RefreshMailExpire:
				var expire_msg:proto.s_RefreshMailExpire = msg as proto.s_RefreshMailExpire;
				var expireIdList:string[] = expire_msg.expireIdList;
				this.dealWithExpireIdList(expireIdList);
				break;
			case proto.MessageType.s_OpenMail:
				var openMail_msg:proto.s_OpenMail = msg as proto.s_OpenMail;
				this.changeMailState(openMail_msg);
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
			case MainNotify.OPENMAILPANEL:
				//打开邮件面板
				this.createView();   
				break;
			default :
				break;
		}
	}
	protected createView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView();
		}else{
			//打开角色面板
			this.view = new View_mail();
			super.createView();
			this.refreshMailExpire();
			if(this.view){
				this.view.changeView(this.mailData);
			}
		}
	}
	public removeView():void{
		//关闭角色面板
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
		}
	} 
	private dealMsg(msg:proto.s_MailList):void{
		var arr:Array<proto.MailData>=msg.mailList;
		for(var i:number = 0,len = arr.length,item:proto.MailData;i<len;i++){
			item = arr[i];
			var obj:any = {};
			for(var key in item){
				obj[key] = item[key];
			}
			this.mailData.push(obj);
		}
		if(this.view){
			this.view.changeView(this.mailData);
		}
	}
	/**向服务器发送消息 */
	public getRewardToS(mailId:string):void{
		var takeAward_msg:proto.c_TakeAward = new proto.c_TakeAward();
		takeAward_msg.mailId = mailId;
		SocketManager.getInstance().sendProto(takeAward_msg);
	}
	public refreshMailExpire():void{
		var expire_msg:proto.c_RefreshMailExpire = new proto.c_RefreshMailExpire();
		SocketManager.getInstance().sendProto(expire_msg);
	}
	public openMail(mailId:string):void{
		var openMailMsg:proto.c_OpenMail = new proto.c_OpenMail();
		openMailMsg.mailId = mailId;
		SocketManager.getInstance().sendProto(openMailMsg);
	}
	//================================================
	/**删除过期邮件 */
	private dealWithExpireIdList(expireList:string[]):void{
		var arr:string[] = GlobalFunc.deepCopy(expireList);
		for(var i:number = 0,flag = true;i<this.mailData.length;flag?(i++):i){
			for(var j:number = 0;j<arr.length;j++){
				if(this.mailData[i] === arr[j]){
					flag = false;
					this.mailData.splice(i,1);
					break;
				}else{
					flag = true;
				}
			}
		}
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.changeView(this.mailData);
		}
	}
	/**更改邮件状态 */
	public changeMailState(msg:proto.s_OpenMail):void{
		if(msg.isSuccess){
			for(var i:number = 0;i<this.mailData.length;i++){
				if(this.mailData[i].mailId === msg.mailID){
					this.mailData[i].mailState = 1;
				}
			}
			if(this.view && this.view.parent && this.view.parent.contains(this.view)){
				this.view.changeView(this.mailData);
			}
		}else{
			// var obj:any = {type:TipsEnum.TYPE_WARN,label:msg.errMsg};
			// PopTipsManager.showPopTips([obj]);
		}
	}
	private receiveHandler(msg:proto.s_TakeAward):void{
		if(msg.isSuccess){
			for(var i:number = 0;i<this.mailData.length;i++){
				if(this.mailData[i].mailId === msg.mailId){
					this.mailData.splice(i,1);
					break;
				}
			}
			if(this.view && this.view.parent && this.view.parent.contains(this.view)){
				this.view.changeView(this.mailData);
			}
		}else{
			var obj:any = {msgType:TipsEnum.TYPE_WARN,label:msg.errMsg};
			PopTipsManager.showPopTips([obj]);
		}
	}

}