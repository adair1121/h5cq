class View_mainUI extends Base_view{
	
	public mainNav:MainUI_nav;
	public mainUITitle:MainUI_title;
	public mainUIHeadBox:MainUI_roleInfo;
	public storeBtn:Btn1;
	
	public group:eui.Group;
	private curModule:Module_mainUI;
	private popTipsGather:any[] = [];


	public btn_chat:eui.Button;
	public Group_chat:eui.Group;
	public btn_mail:eui.Image;
	public chat_list:eui.List;
	public chat_scroller:eui.Scroller;
	public autoChallenge:level_btn;
	public levelInfo:level_info;
	public btnExit:eui.Button;
	public playerProgress:eui.ProgressBar;
	private collec_chat:eui.ArrayCollection;

	public btn_friend:eui.Button;
	

	private _power:number;
	private _gold:number;
	private _uname:string;
	private _money:number;
	private _vip:number;
	private _level:number;
	private skinStates:any;
	public systemNotice:System_notice;
	private timer:egret.Timer;
	public bossBtn:eui.Image;
	public constructor() {
		super();
		this.skinName = "View_mainUI_skin";
	}
	protected childrenCreated():void{
		this.skinStates = {};
		this.skinStates[data.SenceType.YeWai] = "mainUI";
		this.skinStates[data.SenceType.GuanQia] = "levelChallenge";
		this.skinStates[data.SenceType.FuBen] = "boss";
		this.skinStates[data.SenceType.GeRenBoss] = "boss";
		this.curModule = this.module as Module_mainUI;
		Global.addEventListener(MainNotify.OPENBAG,this.onOpenBag,this);
		Global.addEventListener(MainNotify.OPENROLEPANEL,this.onOpenRolePanel,this);
		Global.addEventListener(MainNotify.OPENSKILLPANEL,this.onOpenSkillPanel,this);
		Global.addEventListener(MainNotify.OPENFORGINGPANEL,this.onOpenForgingPanel,this);
		Global.addEventListener(MainNotify.OPENRANKPANEL,this.onOpenRankPanel,this);
		Global.addEventListener(MainNotify.SENDTOSAUTOCHALLENGE,this.onStartAutoChallenge,this);
		Global.addEventListener(MainNotify.OPENCHALLENGEPANEL,this.onOpenChallengePanel,this);
		Global.addEventListener(MainNotify.BUYITEM,this.buyItemHandler,this);
		Global.addEventListener(MainNotify.CREATENEWROLE,this.createNewRole,this);
		Global.addEventListener(MainNotify.OPENPERSONALBOSSPANEL,this.openPersonalBoss,this);
		Global.addEventListener(MainNotify.BOSSCURHP,this.curValue,this);
		Global.addEventListener(MainNotify.BOSSTOTALHP,this.totleValue,this);
		this.chat_scroller.viewport=this.chat_list;
		this.chat_list.itemRenderer=MainUI_chat_itemRenderer;
		this.collec_chat=new eui.ArrayCollection();
		this.chat_list.dataProvider=this.collec_chat;
		this.storeBtn.label = "商城";
		this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClickHandler,this);
		this.btn_friend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClickHandler,this);
		this.storeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openStorePanel,this);
		this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClickHandler,this);
		this.btn_mail.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClickHandler,this);
		this.bossBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClickHandler,this);
		this.timer = new egret.Timer(30000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.playerProgress["progressValue"].visible = true;
		// this.curModule.sendMsgToModule([ModuleEnum.STORE],MainNotify.OPENSTOREPANEL);
		
	}
	public startTime():void{
		this.timer.start();
	}
	public stopTime():void{
		this.timer.stop();
	}
	private tal:number;
	private cur:number;
	public totleValue(evt:lcp.ChangeEvent):void{
		this.playerProgress.maximum = evt.c_data.MHP;
		this.tal =  evt.c_data.MHP
		this.playerProgress["progressValue"].text = this.cur+"/"+this.tal;
	}
	public curValue(evt:lcp.ChangeEvent):void{
		this.playerProgress.value = evt.c_data.curHp;
		this.cur = evt.c_data.curHp;
		if(this.cur < 0){
			this.cur = 0;
		}
		this.playerProgress["progressValue"].text = this.cur+"/"+this.tal;
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.curModule.syncTime();
	}
	public showChat(dataObj:proto.s_ChatInfo = null):void{
		var arr:Array<any>=[];
		var dict:Dictionary=DataCenter.chatData;
		if(!dict){
			return;
		}
		if(dataObj){
			if(dataObj.type === 1||dataObj.type === 2){
				this.systemNotice.addItem({type:dataObj.type,content:dataObj.content});
				if(!this.systemNotice.startState){
					this.systemNotice.initComponent(2,4000);
				}
			}
		}
		arr=arr.concat(dict.get("0")).concat(dict.get("1")).concat(dict.get("2"));
		arr.sort((any1:any,any2:any):number=>{
			if(any1.timeStemp>any2.timeStemp){
				return 1;
			}else if(any1.timeStemp==any2.timeStemp){
				return 0;
			}else{
				return -1;
			}
			
		});
		if(arr.length > 50){
			this.collec_chat.replaceAll(arr.slice(-50));
		}else{
			this.collec_chat.source = arr;
		}

		this.chat_scroller.stopAnimation();
		this.chat_scroller.validateNow();

		if(this.chat_scroller.viewport.measuredHeight<this.chat_scroller.height){
			this.chat_scroller.viewport.scrollV=0;
		}else{
			this.chat_scroller.viewport.scrollV=this.chat_scroller.viewport.measuredHeight-this.chat_scroller.height;
		}
		
	}
	private btnClickHandler(event:egret.TouchEvent):void{
		switch (event.target) {
			case this.btn_chat:
				this.curModule.sendMsgToModule([ModuleEnum.CHAT],MainNotify.OPENCHATPANEL);
				break;
			case this.btn_friend:
				this.curModule.sendMsgToModule([ModuleEnum.FRIEND],MainNotify.OPENFRIENDSPANEL);
				break;
			case this.btn_mail:
				this.curModule.sendMsgToModule([ModuleEnum.MAIL],MainNotify.OPENMAILPANEL);
				break;
			case this.bossBtn:
				this.curModule.sendMsgToModule([ModuleEnum.BOSS],MainNotify.OPENPERSONALBOSSPANEL);
				break;
			case this.btnExit:
				this.curModule.leaveBossRoom();
				break;
			default:
				break;
		}
		
	}
	private openPersonalBoss(evt:lcp.ChangeEvent):void{
		this.curModule.sendMsgToModule([ModuleEnum.BOSS],MainNotify.OPENPERSONALBOSSPANEL);
	}
	private onStartAutoChallenge(evt:lcp.ChangeEvent):void{
		this.curModule.autoChallengeState = evt.c_data.type;
	}
	private createNewRole(evt:lcp.ChangeEvent):void{
		this.curModule.sendMsgToModule([ModuleEnum.CREATEROLE],MainNotify.OPENCREATEROLE,evt.c_data)
	}
	private buyItemHandler(evt:lcp.ChangeEvent):void{
		this.curModule.sendToSByItem(evt.c_data);
	}
	private openStorePanel(evt:egret.TouchEvent):void{
		this.curModule.sendMsgToModule([ModuleEnum.STORE],MainNotify.OPENSTOREPANEL);
	}
	private onOpenBag():void{
		this.curModule.sendMsgToModule([ModuleEnum.BAG],MainNotify.OPENBAG);
	}
	private onOpenRolePanel():void{
		this.curModule.sendMsgToModule([ModuleEnum.ROLEINFO],MainNotify.OPENROLEPANEL);
	}
	private onOpenSkillPanel():void{
		this.curModule.sendMsgToModule([ModuleEnum.SKILLPANEL],MainNotify.OPENSKILLPANEL);
	}
	private onOpenForgingPanel():void{
		this.curModule.sendMsgToModule([ModuleEnum.FORGING],MainNotify.OPENFORGINGPANEL);
	}
	private onOpenRankPanel():void{
		this.curModule.sendMsgToModule([ModuleEnum.RANK],MainNotify.OPENRANKPANEL);
	}
	private onOpenChallengePanel():void{
		//打开挑战面板
		this.curModule.sendMsgToModule([ModuleEnum.CHALLENGE],MainNotify.OPENCHALLENGEPANEL);
	}
	/**更新场景状态 */
	public changeScene(type):void{
		this.skin.currentState = this.skinStates[type];
	}
	/**
	 * 更新关卡信息
	 */
	public refreshLevelInfo(dataObj:any):void{
		if(dataObj.skinState === "mainState"){
			this.levelInfo.getMoney = dataObj.getMoney;
			this.levelInfo.getExp = dataObj.getExp;
		}else{
			this.levelInfo.fDesc = dataObj.fDesc;
		}
		this.levelInfo.levName = dataObj.levName;
		this.levelInfo.levInfoState = dataObj.skinState;
	}
	/**
	 * 更新挑战波数
	 */
	public refreshChallengeNum(value:number):void{
		this.autoChallenge.curValue = value;
	}
	/**
	 * 更新自动挑战状态
	 */
	public refreshAutoState(state:number):void{
		this.autoChallenge.curState = state;
	}
	/**
	 * 更改血量显示
	 */
	public changeHpPoll(changeHp:number):void{
		this.mainNav.refreshHpPoolBall(changeHp);
	}
	/**
	 * 初始化焦点
	 */
	public initNavFocus():void{
		this.mainNav.initFocus();
	}
	/**
	 * 刷新人物头像
	 */
	public refreshRoleInfoData():void{
		var job:number = DataCenter.roleList[0].job;
		var sex:number = DataCenter.roleList[0].sex;
		var obj = {
			job:job,
			sex:sex
		}
		this.mainUIHeadBox.refreshData(obj);
	}
	public set power(value:number){
		this._power = value;
		this.mainUIHeadBox.setPower(value+"");
	}
	public set gold(value:number){
		this._gold = value;
		this.mainUITitle.refreshGoldNum(value);
	}
	public set uname(value:string){
		this._uname = value;
		this.mainUITitle.refreshUname(value);
	}
	public set money(value:number){
		this._money = value;
		this.mainUITitle.refreshMoneyNum(value);
	}
	public set vip(value:number){
		this._vip = value;
		this.mainUIHeadBox.refreshVipNum(value);
	}
	public set level(value:number){
		this._level = value;
		this.mainUIHeadBox.refreshLelNum(this._level);
	}
}


class MainUI_chat_itemRenderer extends eui.ItemRenderer{
	public constructor() {
		super();
		
		this.txt=new eui.Label();
		this.txt.fontFamily="SimHei";
		this.txt.size=14;
		this.txt.lineSpacing=3;
		this.txt.width=280;
		this.txt.stroke=1;
		this.txt.strokeColor=0x000000;
		this.txt.multiline=true;
		this.addChild(this.txt);
	}
	public txt:eui.Label;

	public dataChanged():void{
		var channel:string;
		var color_channel:number;
		var name:string;

		switch(this.data.channel){
			case 0:
				channel="[世界]";
				color_channel=0xd21eff;
				break;
			case 1:
				channel="[工会]";
				color_channel=0X04fe10;
				break;
			case 2:
				channel="[系统]";
				color_channel=0xfc3434;
				break;
		}
		if(this.data.type==1){
			channel="[公告]";
			color_channel=0xfca304;
		}
		if(this.data.channel!=2){
			name="["+this.data.name+"]";
		}

		this.txt.textFlow=<Array<egret.ITextElement>>[
            {text: channel, style: {"textColor": color_channel}}, 
			{text: name, style: {"textColor": 0x0fb8ff}}, 
			{text: ":"+this.data.content, style: {"textColor": 0xE6D8B3,"strokeColor": 0x000000, "stroke": 1}}
           
        ];;

		this.height=this.txt.height+Math.floor(this.txt.height/14)*3;
	}
}