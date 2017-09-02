var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_roleSelect = (function (_super) {
    __extends(View_roleSelect, _super);
    function View_roleSelect() {
        var _this = _super.call(this) || this;
        _this.sex = 0;
        _this.job = 0;
        _this.ifLocked = false;
        _this.skinName = "Role_select_skin";
        _this.source = { 1: { jobName: "战士", roleImg: "", job: 1, ifLocked: 0 },
            2: { jobName: "法师", roleImg: "", job: 2, ifLocked: 0 },
            3: { jobName: "道士", job: 3, roleImg: "", ifLocked: 0 } };
        return _this;
    }
    View_roleSelect.prototype.childrenCreated = function () {
        this.roleBtnMan.setAttr({ currentState: "down", text: "男" });
        this.roleBtnWoman.setAttr({ currentState: "up", text: "女" });
        this.createRoleBtn.setAttr({ text: "开启" });
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.sourceCollect = new eui.ArrayCollection();
        this.roleList.itemRenderer = Role_select_item;
        this.roleList.dataProvider = this.sourceCollect;
        this.roleList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.roleList.selectedIndex = 0;
        this.curModule = this.module;
        this.sex = 1;
    };
    /**设置人物是否已经开启 */
    View_roleSelect.prototype.setData = function (lockObj) {
        this.resetData();
        for (var key in lockObj) {
            this.source[key].ifLocked = 1;
            this.ifLocked = true;
            this.createRoleBtn.visible = false;
        }
        this.sourceCollect.source = this.createSource();
        this.roleList.selectedIndex = 0;
    };
    /**重置开启数据 */
    View_roleSelect.prototype.resetData = function () {
        for (var key in this.source) {
            this.source[key].ifLocked = 0;
        }
    };
    /**创建列表数据 */
    View_roleSelect.prototype.createSource = function () {
        var sourceArr = [];
        for (var key in this.source) {
            sourceArr.push(this.source[key]);
        }
        return sourceArr;
    };
    View_roleSelect.prototype.onItemTap = function (evt) {
        this.roleList.selectedIndex = evt.itemIndex;
        this.ifLocked = evt.item.ifLocked;
        if (this.ifLocked) {
            this.createRoleBtn.visible = false;
        }
        else {
            this.createRoleBtn.visible = true;
        }
        this.job = evt.item.job;
    };
    View_roleSelect.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.roleBtnMan.button:
                this.roleBtnMan.setAttr({ currentState: "down" });
                this.roleBtnWoman.setAttr({ currentState: "up" });
                this.sex = 1;
                break;
            case this.roleBtnWoman.button:
                this.roleBtnMan.setAttr({ currentState: "up" });
                this.roleBtnWoman.setAttr({ currentState: "down" });
                this.sex = 2;
                break;
            case this.createRoleBtn.button:
                var level = DataCenter.playerAttr[data.PlayerAttr.levID];
                var vipNum = DataCenter.playerAttr[data.PlayerAttr.VIP];
                if (DataCenter.roleList.length <= 1) {
                    if (level < 80 || vipNum >= 1) {
                        var obj = { type: TipsEnum.TYPE_WARN, label: "不满足激活条件" };
                        PopTipsManager.showPopTips([obj]);
                        return;
                    }
                }
                else if (DataCenter.roleList.length <= 2) {
                    var reborn = DataCenter.playerAttr[data.PlayerAttr.rebornID];
                    if (reborn < 4 || vipNum >= 4) {
                        var obj = { type: TipsEnum.TYPE_WARN, label: "不满足激活条件" };
                        PopTipsManager.showPopTips([obj]);
                        return;
                    }
                }
                var obj = { sex: this.sex, job: this.job };
                this.curModule.createRole(obj);
                break;
            case this.returnBtn:
                this.curModule.removeView();
                break;
        }
    };
    View_roleSelect.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.roleList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return View_roleSelect;
}(Base_view));
__reflect(View_roleSelect.prototype, "View_roleSelect");
//# sourceMappingURL=View_roleSelect.js.map