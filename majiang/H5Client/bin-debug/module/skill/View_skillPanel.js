var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_skillPanel = (function (_super) {
    __extends(View_skillPanel, _super);
    function View_skillPanel() {
        var _this = _super.call(this) || this;
        _this.STATE_SECRET_START = "secretStart";
        _this.STATE_SECRET_BOOLLIST = "secretBookList";
        _this.STATE_SECRET_PANEL = "secretPanel";
        _this.STATE_SKILL_PANEL = "skillPanel";
        _this.STATE_TOPO_PANEL = "topoPanel";
        _this.skinName = "View_skill_skin";
        return _this;
    }
    View_skillPanel.prototype.childrenCreated = function () {
        this.initialize();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.touchEnabled = true;
        this.skillList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        Global.addEventListener(MainNotify.JOBCHAGNE, this.onDispatchRes, this);
        this.secretGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this, false);
        this.skillList.selectedIndex = 0;
        this.attr = DataCenter.playerAttr;
        this.roleHeadCom.updateHead(DataCenter.roleList, this.skinName);
    };
    View_skillPanel.prototype.jobChange = function (evt) {
        this.curModule.setJob(evt.c_data);
    };
    View_skillPanel.prototype.initialize = function () {
        this.curBtn = this.skillBtn;
        this.layer = ViewController.getInstance().getContainer().layer_popup;
        this.upGradeBtn.label = "升级";
        this.allUpGradeBtn.label = "全部升级";
        this.skillBtn.setAttr({ text: "技能", size: 20, currentState: "down" });
        this.secretBtn.setAttr({ text: "秘籍", size: 20, currentState: "up" });
        this.tupoBtn.setAttr({ text: "突破", size: 20, currentState: "up" });
        this.startBtn.setAttr({ text: "学习", size: 20 });
        this.secretReplaceLink.textFlow = (new egret.HtmlTextParser).parser('<font color="#9BF707" size="14" fontFamily="SimHei"><u>秘籍置换</u></font>');
        this.skillSource = new eui.ArrayCollection();
        this.secretPanel = new Secret_book();
        this.secretReplace = new Secret_replace();
        this.skillList.itemRenderer = RoleSkillItemRender;
        this.skillList.dataProvider = this.skillSource;
        this.curModule = this.module;
        this.vLayout = new eui.VerticalLayout();
        this.vLayout.gap = 2;
        this.skillList.layout = this.vLayout;
        this.isInitSingle = true;
        this.isInitAll = true;
    };
    /**更新技能数据 */
    View_skillPanel.prototype.refreshSkillSource = function (value) {
        this.curItem = {};
        this.skillSource.source = value;
        this.curItem = this.skillList.selectedItem;
        this.curItem["index"] = this.skillList.selectedIndex;
        this.singleCost.text = value[this.skillList.selectedIndex].needMongy;
        // if(value[this.skillList.selectedIndex].needMongy > this.attr[data.PlayerAttr.money]){
        // 	this.singleCost.textColor = 0xfc3434;
        // }else{
        // 	this.singleCost.textColor = 0xEDC589;
        // }
        if (!this.isInitSingle) {
            this.showGrideTips({}, this.skillList.selectedIndex);
        }
        if (!this.isInitAll) {
            for (var i = 0; i < value.length; i++) {
                if (value[i].count) {
                    this.showGrideTips(value[i], i);
                }
            }
        }
    };
    /**显示技能提升等级tips */
    View_skillPanel.prototype.showGrideTips = function (valueObj, index) {
        var count = valueObj.count;
        var sy = index * (RoleSkillItemRender.getHeight() + this.vLayout.gap);
        var obj = { w: 60, h: 20 };
        obj.x = this.skillList.x + this.skillList.width - obj.w;
        obj.y = sy + (RoleSkillItemRender.getHeight() - obj.h);
        if (count) {
            obj.text = "+" + count;
        }
        else {
            obj.text = "+1";
        }
        PopTipsManager.showUpGradeTips(obj, this.skillList, this.showUpGradeRes, this);
    };
    /**显示战力值显示tips */
    View_skillPanel.prototype.showUpGradeRes = function () {
        var x = (Config.curWidth() >> 1) - 135;
        var y = (Config.curHeight() >> 1) + 40;
        var power = DataCenter.playerAttr[data.PlayerAttr.FightValue];
        PopTipsManager.showPowerTips(x, y, power, this.showPowerRes, this);
    };
    View_skillPanel.prototype.showPowerRes = function () {
        var obj = { w: 300, h: 20, text: "+" + this.getSum(this.curModule.combatValueArr), x: (Config.curWidth() >> 1) + 50, y: (Config.curHeight() >> 1) };
        this.curModule.combatValueArr = [];
        var parentCon = ViewController.getInstance().getContainer().layer_popup;
        PopTipsManager.showUpGradeTips(obj, parentCon, null, this);
    };
    View_skillPanel.prototype.getSum = function (array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    };
    View_skillPanel.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.tupoBtn.button:
                this.changeTap(this.tupoBtn);
                this.skin.currentState = this.STATE_TOPO_PANEL;
                break;
            case this.secretBtn.button:
                this.changeTap(this.secretBtn);
                this.skin.currentState = this.STATE_SECRET_PANEL;
                break;
            case this.skillBtn.button:
                this.changeTap(this.skillBtn);
                this.skin.currentState = this.STATE_SKILL_PANEL;
                break;
            case this.returnBtn:
            case this.closeBtn:
                this.removeView(1);
                break;
            case this.upGradeBtn.button:
                //升级
                this.curModule.requestUpDate(this.curItem);
                break;
            case this.allUpGradeBtn.button:
                //全部升级
                this.curModule.requestAllUp();
                break;
            case this.secretBookBtn:
                //秘籍图鉴
                this.secretPanel.state = this.STATE_SECRET_BOOLLIST;
                PopUpManager.addPopUp(this.secretPanel, true, this.secretPanel.skinName, this.layer, 0);
                this.secretPanel.initScroller();
                //测试
                DataCenter.secretBook = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
                this.secretPanel.testName = ["中级健体", "中级强力", "中级防御", "中级暴击", "中级免伤", "中级必杀", "中级穿透", "中级反伤", "中级偷袭", "中级神佑",
                    "中级死咒", "中级再生", "高级健体", "高级强力", "高级防御", "高级暴击", "高级免伤", "高级必杀", "高级穿透", "高级反伤",
                    "高级偷袭", "高级神佑", "高级死咒", "高级再生"];
                break;
            case this.startBtn.button:
                this.secretPanel.state = this.STATE_SECRET_START;
                PopUpManager.addPopUp(this.secretPanel, true, this.secretPanel.skinName, this.layer, 0);
                this.secretPanel.initScroller();
                //测试
                DataCenter.secretBook = [4, 5, 4];
                this.secretPanel.testName = ["中级强力", "高级神佑", "中级必杀"];
                break;
            case this.secretReplaceLink:
                //秘籍置换
                PopUpManager.addPopUp(this.secretReplace, true, this.secretReplace.skinName, this.layer, 0);
                break;
            default:
                break;
        }
    };
    View_skillPanel.prototype.onGroupTouch = function (evt) {
        var item = evt.target.parent;
    };
    View_skillPanel.prototype.onDispatchRes = function (evt) {
        if (evt.c_data.insKey === this.skinName) {
            this.curModule.setJob(evt.c_data);
        }
    };
    View_skillPanel.prototype.onItemTap = function (evt) {
        this.initSkillFocus();
        var item = this.skillList.getChildAt(evt.itemIndex);
        item.focusImg = "reborn_select_png";
        this.curItem = this.skillList.selectedItem;
        this.curItem.index = this.skillList.selectedIndex;
        this.singleCost.text = this.curItem.needMongy;
        if (this.curItem.needMongy > this.attr[data.PlayerAttr.money]) {
            this.singleCost.textColor = 0xfc3434;
        }
        else {
            this.singleCost.textColor = 0xEDC589;
        }
    };
    View_skillPanel.prototype.initSkillFocus = function () {
        var len = this.skillList.numChildren;
        for (var i = 0; i < len; i++) {
            var item = this.skillList.getChildAt(i);
            item.focusImg = "reborn_normal_png";
        }
    };
    /**tab切换 */
    View_skillPanel.prototype.changeTap = function (curBtn) {
        this.curBtn.setAttr({ currentState: "up" });
        this.curBtn = curBtn;
        curBtn.setAttr({ currentState: "down" });
    };
    View_skillPanel.prototype.refreshTextColor = function () {
    };
    Object.defineProperty(View_skillPanel.prototype, "allc", {
        set: function (value) {
            // if(value > this.attr[data.PlayerAttr.money]){
            // 	this.allCost.textColor = 0XFC3434;
            // }else{
            // 	this.allCost.textColor = 0xEDC589;
            // }
            this.allCost.text = value + "";
        },
        enumerable: true,
        configurable: true
    });
    View_skillPanel.prototype.removeView = function (closeState) {
        this.curModule.removeView(closeState);
    };
    View_skillPanel.prototype.removeEvent = function () {
        Global.removeEventListener(MainNotify.JOBCHAGNE, this.onDispatchRes, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.secretGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupTouch, this, false);
        this.skillList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return View_skillPanel;
}(Base_view));
__reflect(View_skillPanel.prototype, "View_skillPanel");
//# sourceMappingURL=View_skillPanel.js.map