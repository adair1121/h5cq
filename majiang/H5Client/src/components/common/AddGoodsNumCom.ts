class AddGoodsNumCom extends eui.Component{
	public jian:eui.Image;
	public jia:eui.Image;
	public jian10:eui.Image;
	public jia10:eui.Image;
	public numLabel:eui.Label;
	private m_minV:number = 1;
	private curValue:number = 1;
	private m_maxV:number = 0;
	public constructor() {
		super();
		this.skinName = "AddGoodsNumComSkin";
	}
	protected childrenCreated():void{
		this.numLabel.text = this.m_minV + "";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.jian:
				if(this.curValue <= 1){
					return;
				}
				this.curValue -=this.m_minV;
				break;
			case this.jia:
				this.curValue +=this.m_minV;
				if(this.m_maxV){
					if(this.curValue >= this.m_maxV){
						this.curValue = this.m_maxV;
						var obj:any = {type:TipsEnum.TYPE_WARN,label:"已达购买上限"};
						PopTipsManager.showPopTips([obj]);
					}
				}
				break;
			case this.jia10:
				this.curValue +=10;
				if(this.m_maxV){
					if(this.curValue >= this.m_maxV){
						this.curValue = this.m_maxV;
						var obj:any = {type:TipsEnum.TYPE_WARN,label:"已达购买上限"};
						PopTipsManager.showPopTips([obj]);
					}
				}
				break;
			case this.jian10:
				if(this.curValue >=10){
					this.curValue -=10;
					this.curValue = this.curValue?this.curValue:1;
				}else{
					return;
				}
				break;
			default:
				this.curValue = this.curValue;
				break;
		}
		this.numLabel.text = this.curValue +"";
		Global.dispatchEvent(MainNotify.COSTCHANGE,{curValue:this.curValue});
	}
	public set minValue(value:number){
		this.m_minV = value;
	}
	public set maxValue(value:number){
		this.m_maxV = value;
	}
	public set costNum(value:number){
		this.numLabel.text = value + ""
		this.curValue = value;
	}
	public get costNum():number{
		return this.curValue;
	}
}