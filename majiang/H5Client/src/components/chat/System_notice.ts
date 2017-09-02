class System_notice extends eui.Component{
	private rotationList:string[];
	private itemText:egret.TextField;
	private htmlTxt:string;
	public startState:boolean = false;
	private lunxunCount:number;
	private lunxunSpeed:number;
	private singleLunXunEnd:boolean;
	public constructor() {
		super();
		this.skinName = "System_notice_skin";
	}
	protected childrenCreated():void{
		this.rotationList = [];
		this.itemText = new egret.TextField();
		this.addChild(this.itemText);
		this.itemText.fontFamily = "Microsoft YaHei";
		this.itemText.size = 20;
		this.itemText.y = 8;
		this.visible = false;
	}
	/**设置公告轮循 */
	public setRotationList(source:string[]):void{
		this.rotationList = source;
	}
	/**追加轮循item */
	public addItem(obj:any):void{
		if(obj.type === 1){
			//公告
			this.htmlTxt = "<font color=0xfca304>[公告]\t</font>"+"<font color=0xffffff>"+obj.content+"</font>";
		}else{
			//系统
			this.htmlTxt = "<font color=0xfc3434>[系统]\t</font>"+"<font color=0xffffff>"+obj.content+"</font>";
		}
		this.rotationList.push(this.htmlTxt);
	}
	/** 移除组件*/
	public removeComponent():void{
		this.visible = false;
		this.startState = false;
		this.lunxunCount = 0;
		this.lunxunSpeed = 0;
		this.singleLunXunEnd = false;
		this.htmlTxt = "";
	}
	/**初始化组件*/
	public initComponent(singleCount:number,speed:number):void{
		this.startState = true;
		this.lunxunCount = singleCount;
		this.lunxunSpeed = speed;
		this.visible = true;
		if(this.rotationList.length){
			this.startLunxun();
		}
	}
	private startLunxun():void{
		this.singleLunXunEnd= false;
		this.itemText.textFlow = (new egret.HtmlTextParser).parser(this.rotationList.shift());
		this.itemText.x = this.x + this.width + 10;
		egret.Tween.get(this.itemText).to({x:-this.itemText.width},this.lunxunSpeed).call(function(){
			this.itemText.x = this.x + this.width + 10;
			egret.Tween.removeTweens(this.itemText);
		},this);
		for(var i:number = 0;i<this.lunxunCount-1;i++){
			var timeOut = egret.setTimeout(function(){
				egret.Tween.get(this.itemText).to({x:-this.itemText.width},this.lunxunSpeed).call(function(){
					this.itemText.x = this.x + this.width + 10;
					egret.Tween.removeTweens(this.itemText);
					if(i >= this.lunxunCount-1){
						this.singleLunXunEnd = true;
						if(this.rotationList.length){
							this.startLunxun();
						}else{
							this.removeComponent();
						}
					}
				},this);
				egret.clearTimeout(timeOut);
			},this,this.lunxunSpeed*(i+1))
		}
		
	}
		
}