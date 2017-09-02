class View_boss extends Base_view{
	public tabGroup:eui.Group;
	public returnBtn:eui.Image;
	public personalBtn:BagBtn;
	public allBtn:BagBtn;
	public zsBtn:BagBtn;
	private curBtn:BagBtn;
	private curTap:any;
	private curModule:Module_boss;
	private TYPE_PERSONAL:string = "personal";
	private TYPE_WORLD:string = "world";
	public curPanelType:string = "personal";
	public constructor() {
		super();
		this.skinName = "View_boss_skin";
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.addEventListener(MainNotify.CHALLENGE_PERSONAL_BOSS,this.dispatchEventHandle,this);
		Global.addEventListener(MainNotify.CHALLENGE_WORLD_BOSS,this.dispatchEventHandle,this);
		Global.addEventListener(MainNotify.WORLDBOSSREBIRTH,this.bossRebirth,this);
		this.personalBtn.setAttr({text:"个人",currentState:"down"});
		this.allBtn.setAttr({text:"全民",currentState:"up"});
		this.zsBtn.setAttr({text:"转生",currentState:"up"});
		this.curModule = this.module as Module_boss;
		this.curBtn = this.personalBtn;
		this.changeTap(this.personalBtn,Boss_personal_tab);
		// this.curModule.setPersonalBossData();
	}
	private bossRebirth(evt:lcp.ChangeEvent):void{
		this.curModule.bossRebirth(evt.c_data);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.personalBtn.button:
				this.changePersonalBossTap();
				this.curPanelType = this.TYPE_PERSONAL;
				if(this.curTap instanceof Boss_personal_tab){
					this.curModule.setPersonalBossData();
				}
				break;
			case this.allBtn.button:
				this.changeWorldBossTap();
				this.curPanelType = this.TYPE_WORLD;
				if(this.curTap instanceof Boss_world_tab){
					this.curModule.getWorldBossData();
				}
				break;
			case this.returnBtn:
				this.curModule.removeView();
				break;
		}
	}
	public changePersonalBossTap():void{
		this.changeTap(this.personalBtn,Boss_personal_tab);
	}
	public changeWorldBossTap():void{
		this.changeTap(this.allBtn,Boss_world_tab);
	}
	public setPersonalBossData(source:any):void{
		if(this.curTap instanceof Boss_personal_tab){
			this.curTap.setBossSource(source);
		}
	}
	public setWorldBossData(source:any):void{
		if(this.curTap instanceof Boss_world_tab){
			this.curTap.setBossSource(source);
		}
	}
	private dispatchEventHandle(evt:lcp.ChangeEvent):void{
		var boxNum:number = DataCenter.playerAttr[data.PlayerAttr.bagcount];
		if(DataCenter.curBoxNum >= boxNum){
			//背包数据已满无法购买装备
			var popObj:any = {type:TipsEnum.TYPE_WARN,label:"背包已满"};
			PopTipsManager.showPopTips([popObj]);
			return;
		}
		switch(evt.type){
			case MainNotify.CHALLENGE_PERSONAL_BOSS:
				this.curModule.challengePersonalBoss(evt.c_data);
				break;
			case MainNotify.CHALLENGE_WORLD_BOSS:
				this.curModule.challengeWorldBoss(evt.c_data);
				break;
		}
	}
	/**tab切换 */
	private changeTap(curBtn:BagBtn,Tab:any){
		this.curBtn.setAttr({currentState:"up"});
		this.curBtn = curBtn;
		curBtn.setAttr({currentState:"down"});
		if(this.curTap && this.curTap.parent && this.curTap.parent.contains(this.curTap)){
			this.curTap.remove();
		}
		this.curTap = new Tab();
		this.tabGroup.addChild(this.curTap);
	}
	public removeEvent():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		Global.removeEventListener(MainNotify.CHALLENGE_PERSONAL_BOSS,this.dispatchEventHandle,this);
		Global.removeEventListener(MainNotify.CHALLENGE_WORLD_BOSS,this.dispatchEventHandle,this);
		Global.removeEventListener(MainNotify.WORLDBOSSREBIRTH,this.bossRebirth,this);
		this.curTap.remove();
	}
}