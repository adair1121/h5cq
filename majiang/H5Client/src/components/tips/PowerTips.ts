class PowerTips extends eui.Component{
	public power:eui.BitmapLabel;
	public stopLetter:number = 2;
	private myTimer:egret.Timer;
	private stopArr:string[];
	private otherArr:string[];
	private operArr:string[];
	private m_callBack:Function;
	private m_arg:any;
	public constructor(callBack,arg) {
		super();
		this.m_callBack = callBack;
		this.m_arg = arg;
		this.skinName = "PowerTips_skin";
		this.myTimer = new egret.Timer(50,10);
	}

	public letterScroll(value:number):void{
		this.otherArr = [];
		this.stopArr = [];
		this.operArr = [];
		var valueStr:string = value+"";
		var valueArr:string[] = valueStr.split("");
		if(valueArr.length <100){
			this.stopLetter = valueArr.length;
		}else{
			this.stopLetter = 2;
		}
		this.stopArr = valueArr.splice(0,this.stopLetter);
		this.otherArr = this.otherArr.concat(valueArr);
		this.operArr = this.operArr.concat(valueArr);

		this.myTimer.start();
		this.myTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		this.myTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
	}
	private onTimer(evt:egret.TimerEvent):void{
		for(var i:number = 0;i<this.operArr.length;i++){
			var index:number = (Math.random()*10)>>0;
			this.operArr[i] = index+"";
		}
		var arr = this.stopArr.concat(this.operArr);
		var str = arr.join("");
		this.power.text = str;
	}
	private onTimerCom(evt:egret.TimerEvent):void{
		this.myTimer.stop();
		this.power.text = this.stopArr.concat(this.otherArr).join("");
		if(this.m_callBack && this.m_arg){
			this.m_callBack.call(this.m_arg);
		}
		var that = this;
		setTimeout(function(){
			egret.Tween.get(that).to({alpha:0},500).call(function(){
				egret.Tween.removeTweens(that);
				that.parent.removeChild(that);
			})
		},800)
		this.myTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		this.myTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
	}

}