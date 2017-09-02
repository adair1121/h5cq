var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActionUtil = (function () {
    function ActionUtil() {
        this.copyActionList = [];
        this.actionExecuting = false;
    }
    ActionUtil.getInstance = function () {
        return ActionUtil.instance ? ActionUtil.instance : ActionUtil.instance = new ActionUtil();
    };
    /**设置动作列表 */
    ActionUtil.prototype.setActionListData = function (data) {
        // console.log("动作列表：",JSON.stringify(data),data);
        this.actionExecuting = false;
        if (DataCenter.isWildScene) {
            this.wildActionList = [];
            this.wildActionList = data;
            this.actionList = [];
            this.actionList = this.wildActionList;
        }
        else {
            this.copyActionList.push(data);
            if (!this.actionList) {
                this.actionList = [];
                this.actionList = this.copyActionList.shift();
            }
        }
    };
    ActionUtil.prototype.setPickUpAction = function (roleData, time, pickUpData) {
        this.time = time;
        var arr = [];
        for (var i = 0; i < pickUpData.length; i++) {
            var action = new proto.MyAction();
            action.actionType = 0;
            action.timeSpan = this.time;
            action.InstanceId = roleData.roleId;
            var move = new proto.MoveAction();
            move.state = 1;
            move.alpha = 1;
            move.sx = roleData.x;
            move.sy = roleData.y;
            move.ex = roleData.x = pickUpData[i].sx;
            move.ey = roleData.y = pickUpData[i].sy;
            move.look = PosUtils.getLook(move.sx, move.sy, move.ex, move.ey);
            action.S_Move = move;
            arr.push(action);
            this.time += 528 / 2;
            var action1 = new proto.MyAction();
            action1.actionType = 5;
            action1.timeSpan = this.time;
            action1.InstanceId = roleData.roleId;
            arr.push(action1);
            var action2 = new proto.MyAction();
            action2.actionType = 2;
            action2.timeSpan = this.time;
            action2.InstanceId = pickUpData[i].instanceId + "";
            arr.push(action);
            this.time += 300;
        }
        this.isPickIng = true;
        this.actionList = arr;
    };
    /**清空动作列表 */
    ActionUtil.prototype.clearActionList = function () {
        // if(DataCenter.isWildScene){
        // 	this.wildActionList=null;
        // 	this.actionList=null;
        // }else{
        // 	this.copyActionList=null;
        // 	this.copyActionList=[];
        // 	this.actionList=null;
        // }
        Module_action.curMsg = [];
    };
    /**查找是否有可执行动作 */
    ActionUtil.prototype.findAction = function (timeStemp) {
        if (!this.actionList) {
            return;
        }
        if (this.actionList.length <= 0) {
            // if(this.isPickIng){
            // 	this.isPickIng=false;
            // }
            if (DataCenter.isWildScene) {
                if (!this.actionExecuting) {
                    // console.log("获取新动作列表");
                    Global.dispatchEvent(MainNotify.RESET_POOLBALL, null, false);
                    // ModuleManager.getInstance().slotMessage([ModuleEnum.MAINUI],[MainNotify.RESET_POOLBALL]);
                    // egret.setTimeout(()=>{
                    SocketManager.getInstance().sendProto(new proto.c_move());
                    // },this,5000); 
                    this.clearActionList();
                    this.actionList = null;
                }
            }
            else {
                if (this.copyActionList.length > 0) {
                    this.actionList = this.copyActionList.shift();
                }
                else {
                    // console.log("获取新动作列表");
                    Global.dispatchEvent(MainNotify.RESET_POOLBALL, null, false);
                    // ModuleManager.getInstance().slotMessage([ModuleEnum.MAINUI],[MainNotify.RESET_POOLBALL]);
                    SocketManager.getInstance().sendProto(new proto.c_move());
                    this.clearActionList();
                    this.actionList = null;
                }
            }
            return;
        }
        var num = 0;
        for (var i = 0; i < this.actionList.length; i++) {
            var action = this.actionList[i];
            // console.log("本地时间戳："+timeStemp,"动作时间戳："+action.timeSpan,"动作类型："+action.actionType);
            if (timeStemp >= action.timeSpan) {
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
            }
            else {
                break;
            }
        }
        var arr = this.actionList.splice(0, num);
        if (arr) {
            this.actionExecuting = true;
        }
        return arr;
    };
    return ActionUtil;
}());
ActionUtil.TYPE_EXTRA = "type_extra";
ActionUtil.TYPE_ADD = "type_add";
ActionUtil.TYPE_OTHER = "type_other";
ActionUtil.TYPE_NORMAL = "type_normal";
__reflect(ActionUtil.prototype, "ActionUtil");
//# sourceMappingURL=ActionUtil.js.map