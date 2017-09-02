class Module_roleSelect extends Base_module{
	public constructor() {
		super();
	}
	protected bind():void{
		this.p_type = PanelType.MAINNAV;
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,data:any=null):void{
		switch(msgType){
			case MainNotify.OPENCREATEROLE:
				//打开邮件面板
				this.createView(data);   
				break;
			case MainNotify.CLOSECRETEROLE:
				this.removeView();
				break;
			default :
				break;
		}
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	// public receiveMsgFromSever(msg:proto.Pro):void{
	// 	switch (msg.S) {
			
	// 		default:
	// 			break;
	// 	}
	// }
	protected createView(dataObj:any = null):void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.removeView();
		}else{
			//打开角色面板
			this.view = new View_roleSelect();
			super.createView();
			if(dataObj){
				this.view.setData(dataObj);
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
	public createRole(dataObj:any):void{
		var createRole_msg:proto.c_createRole = new proto.c_createRole();
		createRole_msg.job = dataObj.job;
		createRole_msg.sex = dataObj.sex;
		SocketManager.getInstance().sendProto(createRole_msg);
	}
}