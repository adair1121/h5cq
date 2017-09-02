var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_chengzhuang = (function (_super) {
    __extends(View_chengzhuang, _super);
    function View_chengzhuang() {
        var _this = _super.call(this) || this;
        _this.sourceArr = [];
        _this.curJob = 0;
        _this.skinName = "View_chengzhuang_skin";
        return _this;
    }
    View_chengzhuang.prototype.childrenCreated = function () {
        this.initialize();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        Global.addEventListener(MainNotify.JOBCHAGNE, this.onJobChange, this);
        Global.addEventListener(MainNotify.CJ_ASSEMBLY, this.receiveHandler, this);
        Global.addEventListener(MainNotify.CJ_DISASSEMBLY, this.receiveHandler, this);
        this.headCom.updateHead(DataCenter.roleList, this.skinName);
        this.curTap = new CJ_tab();
        this.curJob = DataCenter.roleList[0].job;
        this.tabGroup.addChild(this.curTap);
        this.curTap.refreshCJEquip(this.curJob);
        this.curBtn = this.CJBtn;
        this.CJBtn.setAttr({ currentState: "down" });
    };
    View_chengzhuang.prototype.refreshHeadCom = function () {
        this.headCom.updateHead(DataCenter.roleList, this.skinName);
    };
    /**重新计算合成后的橙装数据 */
    View_chengzhuang.prototype.resetCJEquipData = function (equipItem) {
        if (this.curTap instanceof CJ_tab) {
            this.curTap.refreshCJEquip(this.curJob);
        }
    };
    /**更新分解橙装数据 */
    View_chengzhuang.prototype.refreshCJData = function () {
        if (this.curTap instanceof CJ_tab) {
            this.curTap.refreshCJData();
        }
    };
    View_chengzhuang.prototype.initialize = function () {
        this.curModule = this.module;
        // this.curRoleBtn["roleIcon"].source="head_0_0_png";
        //===========================
        this.searchBtn.setAttr({ text: "寻宝", currentState: "up" });
        this.CJBtn.setAttr({ text: "橙装", currentState: "up" });
        this.CQBtn.setAttr({ text: "传奇", currentState: "up" });
        this.CkBtn.setAttr({ text: "仓库", currentState: "up" });
        this.curBtn = this.searchBtn;
    };
    View_chengzhuang.prototype.receiveHandler = function (evt) {
        switch (evt.type) {
            case MainNotify.CJ_ASSEMBLY:
                var obj = {};
                obj.itemId = evt.c_data.itemId;
                obj.job = this.curJob;
                obj.equipPos = evt.c_data.equipPos;
                this.curModule.assemblyEquip(obj);
                break;
            case MainNotify.CJ_DISASSEMBLY:
                this.curModule.disAssemblyEqip(evt.c_data);
                break;
        }
    };
    View_chengzhuang.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
                //点击返回
                this.curModule.removeView(1);
                break;
            case this.searchBtn.button:
                break;
            case this.CJBtn.button:
                // this.changeTap(this.CJBtn,WingTab);
                this.bgSource.source = "wing_equip_bg_png";
                break;
            case this.CQBtn.button:
                break;
            case this.CkBtn.button:
                break;
            default:
                break;
        }
    };
    /**tab切换 */
    View_chengzhuang.prototype.changeTap = function (curBtn, Tab) {
        this.curBtn.setAttr({ currentState: "up" });
        this.curBtn = curBtn;
        curBtn.setAttr({ currentState: "down" });
        this.curTap.remove();
        this.curTap.parent.removeChild(this.curTap);
        this.curTap = new Tab(Module_roleInfo.type);
        this.tabGroup.addChild(this.curTap);
    };
    View_chengzhuang.prototype.onJobChange = function (evt) {
        if (evt.c_data.insKey === this.skinName) {
            this.curJob = evt.c_data.job;
            if (this.curTap instanceof CJ_tab) {
                this.curTap.refreshCJEquip(this.curJob);
            }
        }
    };
    View_chengzhuang.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        Global.removeEventListener(MainNotify.CJ_ASSEMBLY, this.receiveHandler, this);
        Global.removeEventListener(MainNotify.JOBCHAGNE, this.onJobChange, this);
        if (this.curTap && this.curTap.parent && this.curTap.parent.contains(this.curTap)) {
            this.curTap.remove();
            this.curTap.parent.removeChild(this.curTap);
        }
    };
    return View_chengzhuang;
}(Base_view));
__reflect(View_chengzhuang.prototype, "View_chengzhuang");
//# sourceMappingURL=View_chengzhuang.js.map