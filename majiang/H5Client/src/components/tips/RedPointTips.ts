class RedPointTips extends eui.Component{

	private tipsGather:any = {};
	public constructor() {
		super();
	}
	
	protected childrenCreated():void{
		var sp:egret.Sprite = new egret.Sprite();
		sp.graphics.beginFill(0xff0000,1);
		sp.graphics.drawCircle(0,0,10);
		sp.graphics.endFill();
		this.addChild(sp);
		this.tipsGather = DataCenter.tips.tipsGather;
	}
	/**
	 * 添加提示到显示容器
	 */
	public addTipsToDis(display:any,positionX:number,positionY:number,type:string):void{
		display.addChild(this);
		this.x = positionX;
		this.y = positionY;
		var obj:any = {display:display,px:positionX,py:positionY,tips:this}
		if(!this.tipsGather[type]){
			this.tipsGather[type] = [];
		}
		this.tipsGather[type].push(obj);
	}
	/**
	 * 移除提示
	 */
	public removeTipsFromDis():void{
		if(!!this.parent){
			this.parent.removeChild(this);
		}
	}
	/**
	 * 移除全部提示
	 * @param single singleType {boolean string} {是否移除全部提示或者单条所有相关提示,移除单条类型}
	 */
	public removeAllTips(single:boolean = true,singleType:string=""):void{
		if(single){
			//移除单条所有相关提示
			if(!!this.tipsGather[singleType]){
				var singleData = this.tipsGather[singleType];
				for(var i:number = 0;i<singleData.length;i++){
					var tips:any = singleData[i].tips;
					tips.parent.removeChild(tips);
				}
			}else{
				throw new Error("移除的提示类型不存在。。")
			}
			
		}else{
			//移除全部提示
			for(var key in this.tipsGather){
				var len = this.tipsGather[key].length;
				for(var j:number = 0;j<len;j++){
					var disp:any = this.tipsGather[key][i].tips;
					tips.parent.removeChild(tips);
				}
			}
		}
		
	}

}