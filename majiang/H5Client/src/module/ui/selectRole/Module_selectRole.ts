class Module_selectRole extends Base_module{
	public constructor() {
		super();
	}


	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,data:any=null):void{
		switch(msgType){
			case MainNotify.OPENSELECTROLEPANEL:
				this.createView();
				break;
			default :
				break;
		}
	}


	
	protected createView():void{
		this.view=new View_selectRole();
		ViewController.getInstance().addView(ViewController.getInstance().getContainer().layer_panel,this.view);
	}
	
	public createRole():void{
		
		var params = this.view.tData;
		var msg_createChar:proto.c_CreateChar=new proto.c_CreateChar();
		msg_createChar.name=params.name;
		msg_createChar.JOB=parseInt(params.Job);
		msg_createChar.Sex=parseInt(params.Sex);
		SocketManager.getInstance().sendProto(msg_createChar);
		this.removeView();
	}
	

}