class MainContainer extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.init();
	}


	public layer_panel:eui.Component; 
	public layer_map:egret.DisplayObjectContainer; 
	public layer_ui:eui.Component; 
	public layer_popup:eui.Component; 
    public layer_wait:eui.Component ;

	private init():void{
		this.layer_panel= new eui.Component();
		this.addChild(this.layer_panel);
		this.layer_map=new egret.DisplayObjectContainer();
		this.addChild(this.layer_map);
		this.layer_ui=new eui.Component();
		this.addChild(this.layer_ui);
		this.layer_popup=new eui.Component();
		this.addChild(this.layer_popup);
		this.layer_wait=new eui.Component();
		this.addChild(this.layer_wait);

		
	}
}