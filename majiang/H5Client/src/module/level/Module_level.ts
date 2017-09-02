class Module_level extends Base_module{
	private static levelInfoObj:any ={};
	private levelStageId:number;
	public constructor() {
		super();
	}
	protected bindData():void{
		eui.Binding.bindHandler(DataCenter.playerAttr,[data.PlayerAttr.levelStageID+""],this.levelIdChange,this);
	}
	private levelIdChange(value:number):void{
		if(value){
			this.dealWithChallengeData(value);
			this.levelStageId = value;
		}
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.OPENCHALLENGEPANEL:
				this.createView();
				break;
			default:
				break;
		}
	}
	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			default:
				break;
		}
	}
	/**处理挑战关卡数据 */
	private dealWithChallengeData(levId:number):void{
		Module_level.levelInfoObj = {};
		var template:data.LevelStageTemple = temple.TempleManager.select(levId) as data.LevelStageTemple;
		var template2:data.LevelStageTemple = temple.TempleManager.select(template.BossMap) as data.LevelStageTemple;
		var bossTemplate:data.UnitTemple = temple.TempleManager.select(template2.MonsterID) as data.UnitTemple;
		var obj:any = {
			money:template.Money,
			exp:template.Exp,
			zhenqi:template.ZhenQi,
			progressValue:template.ProgressRate,
			bossName:bossTemplate.name,
			// bossPath:Config.path_monMc + bossTemplate.model + "_s_5"
			bossPath:Config.path_monMc  + "31030_s_5"
		}
		Module_level.levelInfoObj = obj;
	}
	//请求服务器
	public startChallenge():void{
		// var msg_challenge:proto.c_CreateNewSence = new proto.c_CreateNewSence();
		var levelTemple:data.LevelStageTemple = temple.TempleManager.select(this.levelStageId) as data.LevelStageTemple;
		var bossMap:number = levelTemple.BossMap;
		// msg_challenge.levelStageID = bossMap;
		// DataCenter.curFuBen = data.SenceType.GuanQia;
		// SocketManager.getInstance().sendProto(msg_challenge);
		// this.removeView();
		// this.sendMsgToModule([ModuleEnum.MAP],MainNotify.INITDATA);
		GlobalFunc.changeSence(bossMap,this);
		this.removeView();
	}

	//页面相关操作
	protected createView():void{
		this.view = new View_level();
		super.createView();
		this.view.setViewData(Module_level.levelInfoObj);
	}
	public removeView():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.removeEvent();
			this.view.parent.removeChild(this.view);
		}
	}
}