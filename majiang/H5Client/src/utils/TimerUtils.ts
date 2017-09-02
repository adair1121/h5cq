class TimerUtils extends egret.EventDispatcher{
	public constructor() {
		super();
		this.init();
	}
	
	private timer:egret.Timer;
	
	private _delay : number=1;
	private _repeatCount : number=0;
	private _startTime : number=0;
	private _timerCallbackFunc : Function;
	private _comCallBackFunc : Function;
	private _callBackArg : any;
	private frameCount:number;



	private  init():void{
		this.timer=new egret.Timer(this.delay,this.repeatCount);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);

	}

	private onTimer(event:egret.TimerEvent):void{
		// // this.startTime+=this.delay;
		// console.log(this.delay,this.timer.currentCount);
		// console.log(egret.getTimer());
		
		if(this.timerCallbackFunc){
			this.timerCallbackFunc.call(this.callBackArg,{currentTime:this.startTime+this.delay*this.timer.currentCount})
		}
	}
	private onTimerCom(event:egret.TimerEvent):void{
		if(this.comCallBackFunc){
			this.comCallBackFunc.call(this.callBackArg,{endTime:this.startTime+this.delay*this.timer.currentCount})
		}
		this.destroy();
	}

	


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 延迟函数
	 * @param callBackFunc 回调函数
	 * @param callBackArg 回调函数作用域
	 */
	public setTimeOut(delayTime:number,callBackFunc:Function,callBackArg:any):void{
		this.destroy();
		this.delay=delayTime;
		this.repeatCount=1;
		this.comCallBackFunc=callBackFunc;
		this.callBackArg=callBackArg;
		this.timer.start();
	}
	/**
	 * 设置计时器
	 * @param delayTime 间隔时间 （默认：1，毫秒）
	 * @param repeatCount 执行次数 （默认：0）
	 * @param startTime 开始时间 （默认：0，毫秒）
	 * @param timerCallBackFunc 计时回调函数 （默认：null）
	 * @param comCallBackFunc 计时完成回调函数 （默认：null）
	 * @param callBackArg 回调函数作用域 （默认：null）
	 */
	public setUpTiming(delayTime:number=1,repeatCount:number=0,startTime:number=0,timerCallBackFunc:Function=null,comCallBackFunc:Function=null,callBackArg:any=null):void{
		this.destroy();
		this.delay=delayTime;
		this.repeatCount=repeatCount;
		this.startTime=startTime;
		this.timerCallbackFunc=timerCallBackFunc;
		this.comCallBackFunc=comCallBackFunc;
		this.callBackArg=callBackArg;
		this.timer.start();
	}
	/**
	 * 设置帧循环
	 * @param delayTime 间隔时间 （默认：1，毫秒）
	 * @param startTime 开始时间 （默认：0，毫秒）
	 * @param timerCallBackFunc 计时回调函数 （默认：null）
	 * @param comCallBackFunc 计时完成回调函数 （默认：null）
	 * @param callBackArg 回调函数作用域 （默认：null）
	 */
	public setUpFrame(delayTime:number=1,startTime:number=0,timerCallBackFunc:Function=null,comCallBackFunc:Function=null,callBackArg:any=null):void{
		this.frameCount=0;
		this.delay=delayTime;
		this.startTime=startTime;
		this.timerCallbackFunc=timerCallBackFunc;
		this.comCallBackFunc=comCallBackFunc;
		this.callBackArg=callBackArg;
		var self=this;
		new egret.Stage().addEventListener(egret.Event.ENTER_FRAME,this.onFrame,self);
	}
	private onFrame(event:egret.Event):void{
		this.frameCount++;
		var frameRate=new egret.Stage().frameRate;
		// var delay:number=frameRate*this.delay/1000;

		// if(this.frameCount%(delay)!=0){
		// 	return;
		// }
		if(this.timerCallbackFunc){
			this.timerCallbackFunc.call(this.callBackArg,{currentTime:this.startTime+this.frameCount*1000/frameRate})
		}
	}
	/**
	 * 销毁计时器
	 */
	public destroy():void{
		this.timer.stop();
		this.timer.reset();
		this.startTime=0;
		this.delay=1;
		this.repeatCount=0;
		this.callBackArg=null;
		this.comCallBackFunc=null;
		this.timerCallbackFunc=null;
		
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/**循环次数 */
	public get repeatCount() : number {		return this._repeatCount;	}
	public set repeatCount(v : number) {		this._repeatCount = v;	this.timer.repeatCount=v;}
	/**循环间隔 */
	public get delay() : number {		return this._delay;	}
	public set delay(v : number) {		this._delay = v;	this.timer.delay=v;}
	/**开始计时时间 */
	public get startTime() : number {		return this._startTime;	}
	public set startTime(v : number) {		this._startTime = v;	}
	/**计时中回调函数 */
	public get timerCallbackFunc() : Function {		return this._timerCallbackFunc;	}
	public set timerCallbackFunc(v : Function) {		this._timerCallbackFunc = v;	}
	/**计时结束回调函数 */
	public get comCallBackFunc() : Function {		return this._comCallBackFunc;	}
	public set comCallBackFunc(v : Function) {		this._comCallBackFunc = v;	}	
	/**回调函数作用域 */
	public get callBackArg() : any {		return this._callBackArg;	}
	public set callBackArg(v : any) {		this._callBackArg = v;	}

}