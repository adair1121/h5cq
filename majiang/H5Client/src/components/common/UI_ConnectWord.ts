class UI_ConnectWord extends eui.Label implements eui.UIComponent ,eui.IDisplayText {
	public constructor() {
		super();
		
	}

	private clickFunc:Function
	private clickArg:any;
	private clickData:any;
	protected createChildren():void{
		// this.text.textFlow=[null]
		this.textFlow= new Array<egret.ITextElement>(
            { text:this.text, style: { "href" : "event:text event triggered", underline:true } }
        );
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this)
	}

	private onClick(event:egret.TouchEvent):void{
		if(this.clickFunc){
			this.clickFunc.call(this.clickArg,this.clickData);
		}
	}

	public setClickFunction(clickFunc:Function,clickArg:any=null,clickData:any=null):void{
		this.clickFunc=clickFunc;
		this.clickArg=clickArg;
		this.clickData=clickData;


	}
	public set myText(value:string){
		this.textFlow= new Array<egret.ITextElement>(
            { text:value, style: { "href" : "event:text event triggered", underline:true } }
        );
	}
	
}