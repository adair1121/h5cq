class Attr_goodsUse extends eui.ItemRenderer{
	public static m_height:number;
	public reduceBtn:eui.Image;
	public addBtn:eui.Image;
	public useBtn:BagBtn;
	public gridNum:eui.Label;
	private  count:number = 1;
	private static _useMaxNum:number;
	private static _callBackFunc:Function;
	private static _callBakArg:any;
	private static _templateId:number;
	public constructor() {
		super();
		this.skinName = "Attr_goodsUse_skin";
	}
	protected childrenCreated():void{
		Attr_goodsUse.m_height = this.height;
		this.useBtn.setAttr({text:"使用"});
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.reduceBtn:
				if(this.count <=1){
					return;
				}
				this.count--;
				this.gridNum.text = this.count+"";
				break;
			case this.addBtn:
				if(this.count >= Attr_goodsUse._useMaxNum){
					return;
				}
				this.count++;
				this.gridNum.text = this.count+"";
				break;
			case this.useBtn.button:
				if(Attr_goodsUse._callBackFunc && Attr_goodsUse._callBakArg){
					Attr_goodsUse._callBackFunc.call(Attr_goodsUse._callBakArg,{num:this.count,templateId:Attr_goodsUse._templateId});
				}
				break;
		}
	}
	/**设置数量以及回调 */
	public static setData(dataObj:any):void{
		Attr_goodsUse._useMaxNum = dataObj.num;
		Attr_goodsUse._callBackFunc = dataObj.callBackFunc;
		Attr_goodsUse._callBakArg = dataObj.arg;
		Attr_goodsUse._templateId = dataObj.templateId;
	}
}