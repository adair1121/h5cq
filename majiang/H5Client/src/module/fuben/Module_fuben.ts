class Module_fuben extends Base_module{
	public constructor() {
		super();
	}
	protected bindData():void{
		
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.OPENFUBENPANEL:
				this.createView();
				break;
			default:
				break;
		}
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			default:
				break;
		}
	}
	protected createView():void{
		this.view = new View_fuben();
		super.createView();
	}
	public removeView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
		}
	}
}