class PopTips extends eui.Component{
	private qualityColor:any = {};
	private w:number = 0;
	private watcher:eui.Watcher;
	private _label:string;
	public curQualityColor:number;
	public moveObj:any = {y:0};
	public STYLE_COLOR:string;
	public STYLE_SIZE:string;
	public lab:eui.Label;
	public popTipsBg:eui.Image
	public moveEnd:boolean = false;
	public constructor(quality:number = 5) {
		super();
		this.STYLE_COLOR = "C";
        this.STYLE_SIZE = "S";
		this.qualityColor = DataCenter.bag.qualityColor;
		this.curQualityColor = this.qualityColor[quality];
		this.skinName = "PopTips_skin";
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}
	private onAddToStage():void{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		this.watcher = eui.Binding.bindProperty(this.moveObj,["y"],this,"y");
	}
	private getSingleTextFlow1(e){
		var t = e.split("&T:",2);
		if(2 == t.length){
			for(var i,n = "<font",r=t[0].split("&"),o = !1,s=0,a=r.length;a>s;s++){
				switch(i = r[s].split(":") , i[0]){
					case this.STYLE_SIZE:
                    	n += ' size="' + parseInt(i[1]) + '"';
                    	break;
					case this.STYLE_COLOR:
						n += ' color="' + parseInt(i[1]) + '"';
						break;
				}
			}
			return n += o ? "><u>" + t[1] + "</u></font>" : ">" + t[1] + "</font>"
		}
		return "<font>" + e + "</font>"
	}
	private curTart:PopTips;
	public move(target:PopTips,posY:number,callBackFunc:Function,arg:any,index:number):void{
		if(this.curTart != target){
			this.curTart = target;
			egret.Tween.removeTweens(target);
			setTimeout(function(){
				egret.Tween.get(target).to({alpha:0},500).call(function(){
					egret.Tween.removeTweens(target);
					target.parent.removeChild(target);
					target.removeTips(target,callBackFunc,arg,index);
				})
			},1000)
		}
		egret.Tween.get(target.moveObj).to({y:posY},500).call(function(){
			egret.Tween.removeTweens(target.moveObj);
		})
	}
	public removeTips(that,m_call,m_arg,m_index):void{
		that.moveEnd = true;
		m_call.call(m_arg,{index:m_index});
	}
	private refreshAttr():void{
		this.width = this.lab.width + 80;
		this.popTipsBg.width = this.width;
		this.x = (Config.w_width>>1) - (this.width>>1);
		this.y = (Config.w_height>>1) - (this.height>>1) - 80;
		this.moveObj.y = this.y;
	}
	public set labelTxt(value:string){
		this._label = value;
		for(var t = value.split("|"),i = "",n = 0,r = t.length; r > n;n++){
			i += this.getSingleTextFlow1(t[n]);
		}
		try{
			var content = (new egret.HtmlTextParser).parse(i);
		}
		catch(error){
			console.log("错误的HTML输入");
			return;
		}
		this.lab.textFlow = content;
		this.refreshAttr();
	}
	public get label():string{
		return this._label;
	}
	/**
	 * 测试使用
	 */
	private createBgSp(bg:egret.Shape,w:number):void{
		bg.graphics.clear();
		bg.graphics.beginFill(0x140E11,0.4);
		bg.graphics.drawRect(0,0,w,24);
		bg.graphics.endFill();
	}
}