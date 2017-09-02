class MainUI_nav extends eui.Component{

    public bag:eui.Button;
	public role:eui.Button;
	public skill:eui.Button;
	public forging:eui.Button;
	// public boss:eui.Button;
	private btnArr:any[] = [];
	public mainNav:MainUI_nav;
	private tipsPoint:RedPointTips;
	private hpBall:egret.MovieClip;
	private mpBall:egret.MovieClip;
	public ballGroup:eui.Group;
	public hpMask:eui.Image;
	public mpMask:eui.Image;
	private hpDir:number;
	private mpDir:number;
	private standed:number = 80;
	private totalHp:number;
	private totalMp:number;
	public playerProgress:eui.ProgressBar;
	public constructor() {
		super();
		this.skinName = "MainUI_nav_skin";
		
	}
	protected childrenCreated():void{
		// this.btnArr = [this.bag,this.role,this.skill,this.forging,this.boss];
		this.btnArr = [this.bag,this.role,this.skill,this.forging];
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.TouchTap,this);
		this.bag["bagIcon"].source = "nav_bag_png";
		this.forging["bagIcon"].source = "nav_forg_png";
		// this.boss["bagIcon"].source = "nav_boss_png";
		// this.tipsPoint = new RedPointTips();
		this.hpBall = MoviePool.getInstance().getMc("hpBall");
        this.ballGroup.addChild(this.hpBall);
        this.hpBall.gotoAndPlay(1,-1);
		this.hpBall.mask = this.hpMask;
		this.hpBall.x = 2;
		this.hpBall.y = 0;

		this.mpBall = MoviePool.getInstance().getMc("mpBall");
		this.ballGroup.addChild(this.mpBall);
		this.mpBall.gotoAndPlay(1,-1);
		this.mpBall.mask = this.mpMask;
		this.mpBall.y = 0;
		eui.Binding.bindHandler(DataCenter,["playerMaxExp"],this.maxNumChange,this);
		eui.Binding.bindHandler(DataCenter,["playerCurExp"],this.curExpChange,this);
		/**测试调用方法 */
		// this.addTips();
		this.setFocus(null);
	}
	private maxNumChange(value:number):void{
		this.playerProgress.maximum = value;
	}
	private curExpChange(value:number):void{
		this.playerProgress.value = value;
	}
	private TouchTap(evt:egret.Event):void{
		switch(evt.target){
			case this.bag:
				this.setFocus(this.bag);
				this.onClickOper(MainNotify.OPENBAG);
				break;
			case this.role:
				this.setFocus(this.role);
				this.onClickOper(MainNotify.OPENROLEPANEL);
				break;
			case this.skill:
				this.setFocus(this.skill);
				this.onClickOper(MainNotify.OPENSKILLPANEL);
				break;
			case this.forging:
				this.setFocus(this.forging);
				this.onClickOper(MainNotify.OPENFORGINGPANEL);
				break;
			// case this.boss:
			// 	this.setFocus(this.boss);
			// 	this.onClickOper(MainNotify.OPENPERSONALBOSSPANEL);
			// 	break;
			default :
				break;
		}
	}
	private setFocus(curTarget:eui.Component):void{
		var len:number = this.btnArr.length;
		for(var i:number = 0;i<len;i++){
			var curtarget = this.btnArr[i] as eui.Button;
			if(this.btnArr[i] === curTarget){
				curtarget["navBtnBg"].visible = true
			}else{
				curtarget["navBtnBg"].visible= false;
			}
		}
	}
	public initFocus():void{
		this.setFocus(null);
		// if(this.curBtn){
		// 	this.setFocus(this.curBtn);
		// }
		// this.curBtn = null;
		
	}
	private onClickOper(target):void{
		//打开背包
		Global.dispatchEvent(target,null,false);
	}
	public addTips():void{
		this.addEventListener(egret.Event.RENDER,this.onRender,this);
	}
	private onRender(evt:egret.Event):void{
		//===================================此处为测试使用========================
		var x = this.role.width-this.tipsPoint.width;
		var y = -this.tipsPoint.height;
		this.tipsPoint.addTipsToDis(this.role,x,y,"Role");
		this.removeEventListener(egret.Event.RENDER,this.onRender,this);
		//===========================================================================
	}
	/**
	 * 更新血池百分比
	 * @param currHp {number} {当前血量值}
	 * @param changeHp {number} {变化后血量值}
	 */
	public refreshHpPoolBall(changeHp:number):void{
		this.totalHp = DataCenter.playerInfo.tolHp;
		if(changeHp === this.totalHp){
			this.hpBall.y = 0;
			return;	
		}
		this.hpBall.y += (changeHp/this.totalHp)*this.standed;
	}
	/**
	 * 更新法池百分比
	 * @param currMp {number} {当前法量值}
	 * @param changeMp	{number} {变化后法量值}
	 */
	public refreshMpPoolBall(changeMp:number):void{
		this.totalMp = DataCenter.playerInfo.tolMp;
		if(this.totalMp === changeMp){
			this.mpBall.y = 0;
			return;
		}
		this.mpBall.y += (changeMp/this.totalMp)*this.standed;
	}
}
