var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_map = (function (_super) {
    __extends(View_map, _super);
    function View_map() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    View_map.prototype.initView = function () {
        this.mapbg = new View_map_bg();
        this.addChild(this.mapbg);
        this.mapUnit = new View_map_unit();
        this.addChild(this.mapUnit);
        this.mapEffect = new View_map_effect();
        this.addChild(this.mapEffect);
        Global.addEventListener(MainNotify.REDUCE_POLLBALL, this.onReduceBoll, this);
        Global.addEventListener("czSkillMove", this.czSkillMove, this);
        Global.addEventListener("addMoveBuff", this.addMoveBuff, this);
    };
    View_map.prototype.onReduceBoll = function (evt) {
        this.module.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.REDUCE_POLLBALL, { damage: evt.c_data.damage });
    };
    /**
     * 加载地图
     * @param mx 地图显示中心的列索引
     * @param my 地图显示中心的行索引
     */
    View_map.prototype.mapload = function (path, gx, gy) {
        if (gx === void 0) { gx = 0; }
        if (gy === void 0) { gy = 0; }
        var p = PosUtils.gridToPixel(gx, gy);
        this.mapUnit.x = this.mapbg.x = -p.x;
        this.mapUnit.y = this.mapbg.y = -p.y;
        this.mapbg.mapload(path, gx, gy);
    };
    /**
     * 创建人物角色
     */
    View_map.prototype.createPerson = function (roleInfo, isFirst) {
        this.mapUnit.createPerson(roleInfo, isFirst);
    };
    /**清除地图单元数据 */
    View_map.prototype.clearUnitData = function () {
        this.mapUnit.clear();
    };
    /**
     * 执行动作
     * @param actionList 动作列表
     */
    View_map.prototype.executeCopyAction = function (action, last) {
        if (last === void 0) { last = false; }
        switch (action.actionType) {
            case 0:
                this.executeMoveAction(action, last);
                break;
            case 1:
                this.executeCreateAction(action, last);
                break;
            case 2:
                this.executeRemovekAction(action, last);
                break;
            case 3:
                this.executeAttackAction(action, last);
                break;
            case 4:
                this.executeBufferAction(action, last);
                break;
            case 5:
                this.executeChangeStandAction(action, last);
                break;
            default:
                break;
        }
    };
    /**执行移动动作 */
    View_map.prototype.executeMoveAction = function (action, last) {
        this.move(action.InstanceId, action.S_Move);
        this.mapUnit.move(action.InstanceId, action.S_Move, -1, false, last);
    };
    View_map.prototype.stopTween = function () {
        egret.Tween.removeAllTweens();
    };
    /**执行创建动作 */
    View_map.prototype.executeCreateAction = function (action, last) {
        this.mapUnit.createUnit(action.S_Create, "", last);
    };
    /**执行移除动作 */
    View_map.prototype.executeRemovekAction = function (action, last) {
        this.mapUnit.removeUnit(action.InstanceId, last);
    };
    /**执行攻击动作 */
    View_map.prototype.executeAttackAction = function (action, last) {
        // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",action.skillID);
        this.mapUnit.Attack(action, last);
    };
    // /**执行显示伤害动作 */
    // private executeShowDamageAction(action:proto.MyAction):void{
    // 	this.mapUnit.showDamage(action);
    // }
    /**执行buff动作 */
    View_map.prototype.executeBufferAction = function (action, last) {
        this.mapUnit.setBuff(action, last);
    };
    /**执行待机动作 */
    View_map.prototype.executeChangeStandAction = function (action, last) {
        this.mapUnit.showChangeStand(action, last);
    };
    /**地图移动 */
    View_map.prototype.move = function (insId, action, time) {
        if (time === void 0) { time = -1; }
        if (insId + "" != Config.personId) {
            return;
        }
        if (time < 0) {
            time = DataCenter.moveSpeed;
        }
        // console.log("",action);
        var p = PosUtils.gridToPixel(action.ex, action.ey);
        egret.Tween.removeTweens(this.mapbg);
        egret.Tween.removeTweens(this.mapUnit);
        egret.Tween.get(this.mapbg).to({ x: -p.x, y: -p.y }, time);
        egret.Tween.get(this.mapUnit).to({ x: -p.x, y: -p.y }, time);
        this.mapbg.checkGridHasUpdate(action.ex, action.ey);
    };
    View_map.prototype.czSkillMove = function (event) {
        var any = event.c_data;
        this.move(any.targetId, any.action, any.time);
    };
    View_map.prototype.addMoveBuff = function (event) {
        var any = event.c_data;
        this.move(any.targetId, any.action, any.time);
    };
    return View_map;
}(Base_view));
__reflect(View_map.prototype, "View_map");
//# sourceMappingURL=View_map.js.map