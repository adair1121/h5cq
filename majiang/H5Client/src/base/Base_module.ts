class Base_module extends egret.EventDispatcher{
	public constructor() {
		super();
		this.bindData();
	}

	
	private _view ;	
	public data;
	private m_type;
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,data:any=null):void{

	}


	public sendMsgToModule(msgList:Array<string>,msgType:string,msgData=null):void{
		ModuleManager.getInstance().receiveMsgFromModule(msgList,msgType,msgData)
	}

	protected bindData():void{
		
	}

	/**
	 * 创建模块显示对象
	 */
	protected createView():void{
		var layerUI = ViewController.getInstance().getContainer().layer_ui;
		var component:egret.DisplayObjectContainer = layerUI.getChildAt(0) as egret.DisplayObjectContainer;
		var container = component["group"] as eui.Group;
		var len:number = container.numChildren;
		var onlyNavView:any;
		for(var i:number = 0;i<len;i++){
			var c_view:Base_view = container.getChildAt(i) as Base_view;
			if(c_view.module.p_type === PanelType.MAINNAV){
				onlyNavView = c_view;
			}
		}
		if(onlyNavView && (this.view.module.p_type === PanelType.MAINNAV)){
			if(onlyNavView.parent && onlyNavView.parent.contains(onlyNavView)){
				onlyNavView.removeView(0);
			}
		}
		ViewController.getInstance().addView(container,this.view);
	}
	 
	public removeView(closeState:number = 1):void{
		if(!!this.view){
			this.view.parent.removeChild(this.view);
		}
	}
	protected clearView():void{
		var container:MainContainer = ViewController.getInstance().getContainer();
		var len:number = container.numChildren;
		for(var i:number = 0,item:any;i<len;i++){
			item = container.getChildAt(i);
			item.removeChildren();
		}
	}
	

	public get view()  {		return this._view;	};
	public set view(v ) {		this._view = v;	this._view.module=this};
	public get p_type(){return this.m_type};
	public set p_type(value:string){this.m_type = value};

}

class PanelType{
	public static MAINNAV:string = "mainNav";
	public constructor() {
	}
}