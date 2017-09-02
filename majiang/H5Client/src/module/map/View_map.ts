class View_map extends Base_view{
	public constructor() {
		super();
		this.initView();
	}

	private mapbg:View_map_bg;
	private mapUnit:View_map_unit;
	private mapEffect:View_map_effect;

	private initView():void{
		this.mapbg=new View_map_bg();
		this.addChild(this.mapbg);
		this.mapUnit=new View_map_unit();
		this.addChild(this.mapUnit);
		this.mapEffect=new View_map_effect();
		this.addChild(this.mapEffect);
		Global.addEventListener(MainNotify.REDUCE_POLLBALL,this.onReduceBoll,this);
		Global.addEventListener("czSkillMove",this.czSkillMove,this);
		Global.addEventListener("addMoveBuff",this.addMoveBuff,this);
		
	}
	private onReduceBoll(evt:lcp.ChangeEvent):void{
		this.module.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.REDUCE_POLLBALL,{damage:evt.c_data.damage});
	}
	/**
	 * 加载地图
	 * @param mx 地图显示中心的列索引
	 * @param my 地图显示中心的行索引
	 */
	public mapload(path:string,gx:number=0,gy:number=0):void{
		var p=PosUtils.gridToPixel(gx,gy);
		this.mapUnit.x=this.mapbg.x=-p.x;
		this.mapUnit.y=this.mapbg.y=-p.y;
		this.mapbg.mapload(path,gx,gy);
		
	}
	/**
	 * 创建人物角色
	 */
	public createPerson(roleInfo:proto.Client_RoleInfo,isFirst:boolean):void{
		this.mapUnit.createPerson(roleInfo,isFirst);
	}
	/**清除地图单元数据 */
	public clearUnitData():void{
		this.mapUnit.clear();
	}
	/**
	 * 执行动作
	 * @param actionList 动作列表
	 */
	public executeCopyAction(action:proto.MyAction,last:boolean = false):void{
		switch (action.actionType) {
			case 0:
				this.executeMoveAction(action,last); 
				break;
			case 1:
				this.executeCreateAction(action,last);
				break;
			case 2:
				this.executeRemovekAction(action,last);
				break;
			case 3:
				this.executeAttackAction(action,last);
				break;
			case 4:
				this.executeBufferAction(action,last);
				break;
			case 5:
				this.executeChangeStandAction(action,last);
				break;
			default:
				break;
		}
	}
	/**执行移动动作 */
	private executeMoveAction(action:proto.MyAction,last):void{		
		this.move(action.InstanceId,action.S_Move);
		this.mapUnit.move(action.InstanceId,action.S_Move,-1,false,last);
	}
	public stopTween():void{
		egret.Tween.removeAllTweens();
	}
	/**执行创建动作 */
	private executeCreateAction(action:proto.MyAction,last):void{
		this.mapUnit.createUnit(action.S_Create,"",last);
	}
	/**执行移除动作 */
	private executeRemovekAction(action:proto.MyAction,last):void{
		this.mapUnit.removeUnit(action.InstanceId,last);
	}
	/**执行攻击动作 */
	private executeAttackAction(action:proto.MyAction,last):void{
		// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",action.skillID);
		
		this.mapUnit.Attack(action,last);
	}
	// /**执行显示伤害动作 */
	// private executeShowDamageAction(action:proto.MyAction):void{
	// 	this.mapUnit.showDamage(action);
	// }
	/**执行buff动作 */
	private executeBufferAction(action:proto.MyAction,last):void{
		this.mapUnit.setBuff(action,last);
	}
	/**执行待机动作 */
	private executeChangeStandAction(action:proto.MyAction,last):void{
		this.mapUnit.showChangeStand(action,last);
	}
	/**地图移动 */
	private  move(insId:string,action:proto.MoveAction,time:number=-1):void{
		if(insId+""!=Config.personId){
			return;
		}

		if(time<0){
			time=DataCenter.moveSpeed;
		}
		// console.log("",action);
		var p=PosUtils.gridToPixel(action.ex,action.ey);
		egret.Tween.removeTweens(this.mapbg);
		egret.Tween.removeTweens(this.mapUnit);
		egret.Tween.get(this.mapbg).to({x:-p.x,y:-p.y},time);
		egret.Tween.get(this.mapUnit).to({x:-p.x,y:-p.y},time);
		this.mapbg.checkGridHasUpdate(action.ex,action.ey);
		
	}
	private czSkillMove(event:lcp.ChangeEvent):void{
		var any:any=event.c_data;
		this.move(any.targetId,any.action,any.time);
	 }
	 private addMoveBuff(event:lcp.ChangeEvent):void{
		var any:any=event.c_data;
		this.move(any.targetId,any.action,any.time);
	 }

}