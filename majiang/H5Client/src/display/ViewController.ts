class ViewController {
	public constructor() {
	}
	protected static instance:ViewController;
	public static getInstance():ViewController{
		return ViewController.instance?ViewController.instance:ViewController.instance=new ViewController();
	}
	
	private container:MainContainer;
	public registStage(content:egret.DisplayObjectContainer):void{
		this.container=new MainContainer();
		content.addChild(this.container)
		
	}
	public getContainer():MainContainer{
		return this.container;
	}
	public addView(con:egret.DisplayObjectContainer,view:egret.DisplayObject,_x:number=0,_y:number=0):void{
		con.addChild(view);
		view.x=_x;
		view.y=_y;
	}
	

}    