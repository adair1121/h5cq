class Boss_personal_item extends eui.ItemRenderer{
	public count:eui.Label;
	public item1:CommonItem;
	public item2:CommonItem;
	public item3:CommonItem;
	public challengeBtn:eui.Button;
	public bossName:eui.Label;
	public bossIcon:eui.Image;
	public condition:eui.Label;
	public group:eui.Group;
	public romeNum:eui.Label;
	public time:eui.Label;
	public skinState:string;
	public TYPE_PERSONAL:string = "personal";
	public TYPE_WORLD:string = "world";
	private timer:egret.Timer;
	private timeCount:number = 0;
	private itemBossData:any = {};
	public constructor() {
		super();
		this.skinName = "Boss_personal_item_skin";
	}
	protected childrenCreated():void{
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.addEventListener(egret.TimerEvent.COMPLETE,this.onTimerComplete,this);
	}
	private onTimer(evt:egret.TimerEvent):void{
		if(this.timeCount != 0){
			this.timeCount-=1;
			this.time.text = GlobalFunc.formatTime(this.timeCount,false,true);
		}
	}
	private onTimerComplete(evt:egret.TimerEvent):void{
		this.timeCount = 0;
		this.timer.stop();
		//发送事件通知当前boss倒计时结束
		Global.dispatchEvent(MainNotify.WORLDBOSSREBIRTH,this.itemBossData);
	}
	protected dataChanged():void{
		this.itemBossData = this.data
		this.skinState = this.data.state;
		this.invalidateState();
		this.challengeBtn.label = "挑战";
		this.item1.img = this.data.dropIcon[0];
		this.item2.img = this.data.dropIcon[1];
		this.item3.img = this.data.dropIcon[2];
		this.bossIcon.source = this.data.bossIcon;
		this.bossName.text = this.data.bossName;
		if(this.data.challenged){
			//满足挑战条件
			this.challengeBtn.visible = true;
			this.condition.visible = false;
			this.time.visible = false;
			this.group.visible = true;
		}else{
			this.condition.text = this.data.condition;
			this.condition.visible = true;
			this.challengeBtn.visible = false;
			this.time.visible = false;
			this.group.visible = false;
		}
		if(!this.data.isOpen){
			this.challengeBtn.currentState = "disabled";
		}else{
			this.challengeBtn.currentState = "up";
		}
		if(this.skinState === this.TYPE_PERSONAL){
			this.count.text = this.data.count;
		}else{
			if(!this.data.isOpen){
				this.group.visible = false;
				if(this.data.challenged){
					this.time.visible = true;
					if(this.data.time){
						this.timeCount = this.data.time;
						this.time.text = GlobalFunc.formatTime(this.data.time,false,true);
						this.timer.repeatCount = this.data.time;
						this.timer.start();
					}
				}
			}else{
				this.group.visible = true;
				this.romeNum.text = this.data.playerCount;
				this.time.visible = false;
			}
		}
	}
	public remove():void{
		this.timer.stop();
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.removeEventListener(egret.TimerEvent.COMPLETE,this.onTimerComplete,this);
	}
	protected getCurrentState():string{
		return this.skinState;
	}
}