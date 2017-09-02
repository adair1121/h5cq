class ActionUtil {
	public constructor() {
	}
	public static TYPE_EXTRA:string = "type_extra";

	public static TYPE_ADD:string = "type_add";

	public static TYPE_OTHER:string = "type_other";

	public static TYPE_NORMAL:string = "type_normal";
	protected static instance:ActionUtil;
	public static getInstance():ActionUtil{
		return ActionUtil.instance?ActionUtil.instance:ActionUtil.instance=new ActionUtil();
	}
	// private dict:Dictionary;
	private actionList:Array<any>
	private wildActionList:Array<any>;
	private copyActionList:Array<Array<any>>=[];
	private isPickIng:boolean;
	public actionExecuting:boolean=false;

	/**设置动作列表 */
	public setActionListData(data:Array<any>):void{
		// console.log("动作列表：",JSON.stringify(data),data);
		this.actionExecuting=false;
		if(DataCenter.isWildScene){
			this.wildActionList=[];
			this.wildActionList=data;
			this.actionList=[]; 
			this.actionList=this.wildActionList;
		}else{
			this.copyActionList.push(data);
			if(!this.actionList){
				this.actionList=[]; 
				this.actionList=this.copyActionList.shift();
			}
			
		}

		
	}
	//设置拾取动作列表
	private time:number;
	public setPickUpAction(roleData:any,time:number,pickUpData:Array<proto.Client_DropInfo>):void{
		this.time=time;
		var arr:Array<proto.MyAction>=[];
		for(var i:number=0;i<pickUpData.length;i++){
			var action:proto.MyAction=new proto.MyAction();
			action.actionType=0;
			action.timeSpan=this.time;
			action.InstanceId=roleData.roleId;
			var move:proto.MoveAction=new proto.MoveAction();
			move.state=1;
			move.alpha=1;
			move.sx=roleData.x;
			move.sy=roleData.y;
			move.ex=roleData.x=pickUpData[i].sx;
			move.ey=roleData.y=pickUpData[i].sy;
			move.look=PosUtils.getLook(move.sx,move.sy,move.ex,move.ey);
			action.S_Move=move;
			arr.push(action);
			this.time+=528/2;
			var action1:proto.MyAction=new proto.MyAction();
			action1.actionType=5;
			action1.timeSpan=this.time;
			action1.InstanceId=roleData.roleId;
			arr.push(action1);
			var action2:proto.MyAction=new proto.MyAction();
			action2.actionType=2;
			action2.timeSpan=this.time;
			action2.InstanceId=pickUpData[i].instanceId+"";
			arr.push(action);
			this.time+=300;
		}
		this.isPickIng=true;
		this.actionList=arr;
	}
	/**清空动作列表 */
	public clearActionList():void{
		 
		// if(DataCenter.isWildScene){
		// 	this.wildActionList=null;
		// 	this.actionList=null;
		// }else{
		// 	this.copyActionList=null;
		// 	this.copyActionList=[];
		// 	this.actionList=null;
		// }
		Module_action.curMsg = [];
	}
	/**查找是否有可执行动作 */
	public  findAction(timeStemp:number):Array<proto.MyAction>{
	
		if(!this.actionList){
			return;
		}


		if(this.actionList.length<=0){
			// if(this.isPickIng){
			// 	this.isPickIng=false;
			// }
			if(DataCenter.isWildScene){
				
				if(!this.actionExecuting){
					// console.log("获取新动作列表");
					Global.dispatchEvent(MainNotify.RESET_POOLBALL,null,false);
					// ModuleManager.getInstance().slotMessage([ModuleEnum.MAINUI],[MainNotify.RESET_POOLBALL]);
					// egret.setTimeout(()=>{
						SocketManager.getInstance().sendProto(new proto.c_move())
					// },this,5000); 
					this.clearActionList();
					this.actionList=null;
				}
				
			}else{
				if(this.copyActionList.length>0){
					this.actionList=this.copyActionList.shift();
				}else{
					// console.log("获取新动作列表");
					Global.dispatchEvent(MainNotify.RESET_POOLBALL,null,false);
					// ModuleManager.getInstance().slotMessage([ModuleEnum.MAINUI],[MainNotify.RESET_POOLBALL]);
					SocketManager.getInstance().sendProto(new proto.c_move()); 
					this.clearActionList();
					this.actionList=null;
				}
			}
			return;
			
		}

		var num:number=0;
		for(var i:number=0;i<this.actionList.length;i++){
			var action:proto.MyAction=this.actionList[i];
			// console.log("本地时间戳："+timeStemp,"动作时间戳："+action.timeSpan,"动作类型："+action.actionType);
			
			if(timeStemp>=action.timeSpan){


				//只是为了数据打印
				// var p:egret.Point=null
				// var id:number=NaN
				// var target:string=null
				// if(action.actionType==0){
				// 	p=new egret.Point();
				// 	p.x=action.S_Move.sx;
				// 	p.y=action.S_Move.sy;
				// 	target=action.mapID+"";
				// }else
				// if(action.actionType==3){
				// 	id=action.S_Useskill.skillID;
				// 	target=action.mapID+"";
				// 	p=new egret.Point();
				// 	p.x=action.S_Useskill.x;
				// 	p.y=action.S_Useskill.y;
				// }
				// else
				// if(action.actionType==1){
				// 	target=action.mapID+"";
				// 	p=new egret.Point();
				// 	if(action.S_Create.monster){
				// 		p.x=action.S_Create.monster.sx;
				// 		p.y=action.S_Create.monster.sy;
				// 	}else if(action.S_Create.drop){
				// 		p.x=action.S_Create.drop.sx;
				// 		p.y=action.S_Create.drop.sy;
				// 	}
					
				// }
				// console.log("本地时间戳："+timeStemp,"时间戳："+action.timeSpan,"动作类型："+action.actionType,"动作对象："+target,"技能id:"+id,"坐标:"+p);



				
				num++;
				
				
			}else{
				break;
			}
		}
		
		var arr:Array<proto.MyAction>=this.actionList.splice(0,num);
		if(arr){
			this.actionExecuting=true;
		}
		return arr;
	}
}