class Module_map extends Base_module{
	public constructor() {
		super();
	}
	
	protected bindData():void{
		// eui.Binding.bindHandler(DataCenter,["curActionArr"],this.getAction,this);
		eui.Binding.bindHandler(DataCenter,["curExecAction"],this.getAction,this)
		eui.Binding.bindHandler(DataCenter,["lastOfAction"],this.getLastAction,this)
	}

	//////////////////////////////数据绑定函数///////////////

	private getAction(value:any):void{
		if(value!=null){
			this.view.executeCopyAction(value);
		}
		
	}
	private getLastAction(value:any):void{
		if(value!=null){
			this.view.executeCopyAction(value,true);
		}
	}

	/**
	 * 解析来自服务器的消息并处理
	 * @param msg 模块对应的消息
	 */
	public receiveMsgFromSever(msg:proto.Pro):void{
		switch (msg.S) {
			case proto.MessageType.s_CreateNewSence:
				var msg1:proto.s_CreateNewSence = msg as proto.s_CreateNewSence;
				this.createNewScene(msg1);
				
				break;
			default:
				break;
		}
	}
	/**
	 * 接收来自模块间的消息并分发
	 * @param msg 消息列表
	 */
    public receiveMsgFromModule(msgType:string,dataRes:any=null):void{
		switch(msgType){
			case MainNotify.INITDATA:
				this.initMapData();
				break;
			case MainNotify.CREATENEWROLE:
				this.createRole();
				break;
			case MainNotify.CHANGESCENE:
				this.reloadMap(dataRes.mapId);
				break;
			default:
				break;
		}
	}
	private createNewScene(msg:proto.s_CreateNewSence):void{
		var levelId:number = 0
		var temp:data.LevelStageTemple=temple.TempleManager.select(msg.levelStageID) as data.LevelStageTemple;
		switch(temp.mapType){
			case 3:
				DataCenter.curFuBen = data.SenceType.YeWai;
				break;
			case 1:
				break;
			case 2:
				DataCenter.curFuBen = data.SenceType.FuBen;
				break;
			case 6:
				DataCenter.curFuBen = data.SenceType.GuanQia;
				break;
		}
		if(DataCenter.curFuBen === data.SenceType.YeWai){
			levelId = DataCenter.curSceneId;
		}else if(DataCenter.curFuBen === data.SenceType.GuanQia){
			levelId = msg.levelStageID;
		}
		for(var i:number=0;i<msg.pos.length;i++){
			for(var j:number = 0;j<DataCenter.roleList.length;j++){
				if(msg.pos[i].uid === DataCenter.roleList[j].insId){
					DataCenter["role"+DataCenter.roleList[j].job+"Attr"][data.RoleAttr.x]=msg.pos[i].x;
					DataCenter["role"+DataCenter.roleList[j].job+"Attr"][data.RoleAttr.y]=msg.pos[i].y;
				}
			}
		}
		this.initMapData();
		this.reloadMap(temp.MapID);
		SocketManager.getInstance().sendProto(new proto.c_move());
	}
	private reloadMap(MapID:number):void{
		ActionUtil.getInstance().clearActionList();
		DataCenter.changeSenceState = false;
		DataCenter.curMapPath=MapID+"";
		var job:number = DataCenter.roleList[0].job;
		this.mapshow(DataCenter.curMapPath,DataCenter["role"+job+"Attr"][data.RoleAttr.x],DataCenter["role"+job+"Attr"][data.RoleAttr.y]);
		this.createRole();
		this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.CHANGESCENE);
	}
	/////////////////////////地图////////////////////////////////
	private initMapData():void{
		if(this.view && this.view.parent && this.view.parent.contains(this.view)){
			this.view.clearUnitData();
			this.view.stopTween();
		}
	}
	private mapshow(path:string,gx:number=0,gy:number=0):void{
		if(!this.view){
			this.createView(gx,gy);
		}
		this.view.mapload(path,gx,gy);
	}

	/////////////////////////角色////////////////////////
	private createRole():void{
		var len:number=DataCenter.roleList.length;
		for(var i:number=0;i<len;i++){
			var job:number = DataCenter.roleList[i].job
			this.roleshow(DataCenter["role"+job+"Info"],i==0?true:false)
		}
		
	}
	private roleshow(roleAttr:Array<number>,isFirst:boolean):void{
		if(!this.view){
			this.createView(roleAttr[data.RoleAttr.x],roleAttr[data.RoleAttr.y]);
		}
		this.view.createPerson(roleAttr,isFirst);
		// console.log("获取动作列表");
		
	}


	/**
	 * 创建模块显示对象
	 */
	protected createView(gx:number=0,gy:number=0):void{
		this.view=new View_map();
		ViewController.getInstance().addView(ViewController.getInstance().getContainer().layer_map,this.view,Config.w_width/2,Config.w_height/2);
	}
	 
}