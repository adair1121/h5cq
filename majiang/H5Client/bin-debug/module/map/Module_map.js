var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_map = (function (_super) {
    __extends(Module_map, _super);
    function Module_map() {
        return _super.call(this) || this;
    }
    Module_map.prototype.bindData = function () {
        // eui.Binding.bindHandler(DataCenter,["curActionArr"],this.getAction,this);
        eui.Binding.bindHandler(DataCenter, ["curExecAction"], this.getAction, this);
        eui.Binding.bindHandler(DataCenter, ["lastOfAction"], this.getLastAction, this);
    };
    //////////////////////////////数据绑定函数///////////////
    Module_map.prototype.getAction = function (value) {
        if (value != null) {
            this.view.executeCopyAction(value);
        }
    };
    Module_map.prototype.getLastAction = function (value) {
        if (value != null) {
            this.view.executeCopyAction(value, true);
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_map.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_CreateNewSence:
                var msg1 = msg;
                this.createNewScene(msg1);
                break;
            default:
                break;
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_map.prototype.receiveMsgFromModule = function (msgType, dataRes) {
        if (dataRes === void 0) { dataRes = null; }
        switch (msgType) {
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
    };
    Module_map.prototype.createNewScene = function (msg) {
        var levelId = 0;
        var temp = temple.TempleManager.select(msg.levelStageID);
        switch (temp.mapType) {
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
        if (DataCenter.curFuBen === data.SenceType.YeWai) {
            levelId = DataCenter.curSceneId;
        }
        else if (DataCenter.curFuBen === data.SenceType.GuanQia) {
            levelId = msg.levelStageID;
        }
        for (var i = 0; i < msg.pos.length; i++) {
            for (var j = 0; j < DataCenter.roleList.length; j++) {
                if (msg.pos[i].uid === DataCenter.roleList[j].insId) {
                    DataCenter["role" + DataCenter.roleList[j].job + "Attr"][data.RoleAttr.x] = msg.pos[i].x;
                    DataCenter["role" + DataCenter.roleList[j].job + "Attr"][data.RoleAttr.y] = msg.pos[i].y;
                }
            }
        }
        this.initMapData();
        this.reloadMap(temp.MapID);
        SocketManager.getInstance().sendProto(new proto.c_move());
    };
    Module_map.prototype.reloadMap = function (MapID) {
        ActionUtil.getInstance().clearActionList();
        DataCenter.changeSenceState = false;
        DataCenter.curMapPath = MapID + "";
        var job = DataCenter.roleList[0].job;
        this.mapshow(DataCenter.curMapPath, DataCenter["role" + job + "Attr"][data.RoleAttr.x], DataCenter["role" + job + "Attr"][data.RoleAttr.y]);
        this.createRole();
        this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.CHANGESCENE);
    };
    /////////////////////////地图////////////////////////////////
    Module_map.prototype.initMapData = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.clearUnitData();
            this.view.stopTween();
        }
    };
    Module_map.prototype.mapshow = function (path, gx, gy) {
        if (gx === void 0) { gx = 0; }
        if (gy === void 0) { gy = 0; }
        if (!this.view) {
            this.createView(gx, gy);
        }
        this.view.mapload(path, gx, gy);
    };
    /////////////////////////角色////////////////////////
    Module_map.prototype.createRole = function () {
        var len = DataCenter.roleList.length;
        for (var i = 0; i < len; i++) {
            var job = DataCenter.roleList[i].job;
            this.roleshow(DataCenter["role" + job + "Info"], i == 0 ? true : false);
        }
    };
    Module_map.prototype.roleshow = function (roleAttr, isFirst) {
        if (!this.view) {
            this.createView(roleAttr[data.RoleAttr.x], roleAttr[data.RoleAttr.y]);
        }
        this.view.createPerson(roleAttr, isFirst);
        // console.log("获取动作列表");
    };
    /**
     * 创建模块显示对象
     */
    Module_map.prototype.createView = function (gx, gy) {
        if (gx === void 0) { gx = 0; }
        if (gy === void 0) { gy = 0; }
        this.view = new View_map();
        ViewController.getInstance().addView(ViewController.getInstance().getContainer().layer_map, this.view, Config.w_width / 2, Config.w_height / 2);
    };
    return Module_map;
}(Base_module));
__reflect(Module_map.prototype, "Module_map");
//# sourceMappingURL=Module_map.js.map