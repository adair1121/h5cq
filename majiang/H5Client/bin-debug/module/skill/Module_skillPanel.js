var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_skillPanel = (function (_super) {
    __extends(Module_skillPanel, _super);
    function Module_skillPanel() {
        var _this = _super.call(this) || this;
        _this.SINGLE = "single";
        _this.ALL = "all";
        _this.allCost = 0;
        return _this;
    }
    Module_skillPanel.prototype.bindData = function () {
        this.p_type = PanelType.MAINNAV;
        Module_skillPanel.firstOper = true;
        this.attr = DataCenter.playerAttr;
        this.setJob({ job: DataCenter.roleList[0].job });
        eui.Binding.bindHandler(DataCenter, ["RoleInFoVo"], this.dealWithSkillData, this);
        eui.Binding.bindHandler(Module_skillPanel, ["skillSource"], this.onSkillSourceChange, this);
    };
    Module_skillPanel.prototype.onSkillSourceChange = function (value) {
        if (value && value.length && this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.refreshSkillSource(value);
        }
    };
    Module_skillPanel.prototype.setJob = function (obj) {
        this.curJob = obj.job;
        var skills = DataCenter.RoleInFoVo[this.curJob].skills;
        this.dealWithcurRoleSkillInfo({ UpInfo: skills });
    };
    Module_skillPanel.prototype.dealWithSkillData = function (value) {
        if (value) {
            var skills = value[this.curJob].skills;
            this.dealWithcurRoleSkillInfo({ UpInfo: skills });
        }
    };
    /**处理技能数据 */
    Module_skillPanel.prototype.dealWithcurRoleSkillInfo = function (dataObj) {
        Module_skillPanel.skillSource = [];
        Module_skillPanel.curSkilIdGather = [];
        var skillData = dataObj.UpInfo;
        var arr = [];
        var idArr = [];
        for (var i = 0; i < skillData.length; i++) {
            var template = temple.TempleManager.select(parseInt(skillData[i].SkillID));
            var obj = {};
            obj.skillName = template.name;
            obj.skillDesc = template.describe;
            obj.skillIcon = Config.path_skillIcon + template.icon + ".png";
            obj.lv = template.skilllev;
            // obj.isactive = skillData[i].isactive;
            obj.skillID = skillData[i].SkillID;
            obj.order = template.skill_category;
            obj.needMongy = template.needMongy;
            obj.focus = false;
            arr.push(obj);
            //记录技能id集合
            var obj2 = {};
            obj2[obj["order"]] = skillData[i].SkillID;
            obj2["order"] = template.skill_category;
            idArr.push(obj2);
        }
        arr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "order", GlobalFunc.deepCopy(arr));
        idArr = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "order", GlobalFunc.deepCopy(idArr));
        arr[0].focus = true;
        Module_skillPanel.skillSource = arr;
        Module_skillPanel.curSkilIdGather = idArr;
    };
    Module_skillPanel.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENSKILLPANEL:
                this.createView();
                break;
            default:
                break;
        }
    };
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_skillPanel.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_skill_up:
                var skill_msg = msg;
                if (skill_msg.isSuccessed) {
                    this.requestUpDateRes(skill_msg);
                }
                else {
                    this.showTips("升级失败");
                }
                break;
            case proto.MessageType.s_skillAllUp:
                var allSkillMsg = msg;
                if (allSkillMsg.idSuccessed) {
                    //修改---处理技能全部升级问题
                    this.requestAllUpDateRes(allSkillMsg);
                }
                else {
                    //此处暂时为测试使用
                    this.showTips("升级失败");
                }
                break;
            default:
                break;
        }
    };
    Module_skillPanel.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView(1);
        }
        else {
            //打开技能面板
            this.view = new View_skillPanel();
            _super.prototype.createView.call(this);
            this.view.isInitSingle = true;
            this.view.isInitAll = true;
            this.combatValueArr = [];
            this.calculAllUpCost();
            Module_skillPanel.skillSource[0].focus = true;
            this.setSource(Module_skillPanel.skillSource);
            this.headIconWatcher = eui.Binding.bindProperty(Module_skillPanel, ["headIconSource"], this.view.roleHeadCom, "sourceData");
            eui.Binding.bindProperty(this, ["allCost"], this.view, "allc");
        }
    };
    Module_skillPanel.prototype.removeView = function (closeState) {
        //关闭技能面板
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            if (this.headIconWatcher) {
                this.headIconWatcher.unwatch();
            }
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
            if (closeState) {
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.INITNAVFOCUS);
            }
        }
    };
    /**初始化技能数据*/
    Module_skillPanel.prototype.setSource = function (skillSource) {
        var arr = GlobalFunc.deepCopy(skillSource);
        Module_skillPanel.skillSource = [];
        Module_skillPanel.skillSource = arr;
    };
    /**初始化技能面板人物头像数据 */
    Module_skillPanel.prototype.initHeadSource = function () {
        Module_skillPanel.headIconSource = [];
        for (var i = 0; i < 3; i++) {
            var obj = { "roleIcon": "", "focus": false };
            Module_skillPanel.headIconSource.push(obj);
        }
    };
    /**请求升级单个技能 */
    Module_skillPanel.prototype.requestUpDate = function (item) {
        var template = temple.TempleManager.select(parseInt(item.skillID));
        if (!template.upgradeSkill) {
            this.showTips("技能已升到顶级");
            return;
        }
        var template2 = temple.TempleManager.select(template.upgradeSkill);
        this.needGold = template.needMongy;
        var needLevel = template2.needLev;
        this.prevSkillIndex = item.index;
        if (this.attr[data.PlayerAttr.levID] < needLevel) {
            this.showTips("技能等级达到上限,请提升等级");
            return;
        }
        if (this.needGold > this.attr[data.PlayerAttr.money]) {
            this.showTips("金币不足");
            return;
        }
        var skill_msg = new proto.c_skill_up();
        skill_msg.job = this.curJob;
        skill_msg.skillid = item.skillID;
        SocketManager.getInstance().sendProto(skill_msg);
    };
    /**请求升级全部技能 */
    Module_skillPanel.prototype.requestAllUp = function () {
        var len = Module_skillPanel.skillSource.length;
        var num = 0;
        var num2 = 0;
        for (var i = 0; i < len; i++) {
            var template = temple.TempleManager.select(parseInt(Module_skillPanel.skillSource[i].skillID));
            var nextTemplate = temple.TempleManager.select(template.upgradeSkill);
            if (nextTemplate.needLev > this.attr[data.PlayerAttr.levID]) {
                num += 1;
            }
            if (!template.upgradeSkill) {
                num2 += 1;
            }
        }
        if (num2 >= 5) {
            this.showTips("技能已经达到顶级");
            return;
        }
        if (num >= 5) {
            this.showTips("技能等级达到上限,请提升等级");
            return;
        }
        if (this.allCost > this.attr[data.PlayerAttr.money]) {
            this.showTips("金币不足");
            return;
        }
        var skill_msg = new proto.c_skillAllUp();
        skill_msg.job = this.curJob;
        SocketManager.getInstance().sendProto(skill_msg);
    };
    /**请求升级单个技能返回 */
    Module_skillPanel.prototype.requestUpDateRes = function (skillMsg) {
        if (skillMsg.isSuccessed) {
            var skillId = skillMsg.skillid;
            Module_skillPanel.skillSource[0].focus = false;
            // var skillTemplate:data.SkillTemple = temple.TempleManager.select(skillId) as data.SkillTemple;
            // var skill_category:number = skillTemplate.skill_category;
            // var preSkillId:number = Module_skillPanel.curSkilIdGather[skill_category];
            // var prevSkillTemplate:data.SkillTemple = temple.TempleManager.select(preSkillId) as data.SkillTemple;
            // var combatValue:number = skillTemplate.FightValue - prevSkillTemplate.FightValue;
            // this.combatValueArr.push(combatValue);
            // var curSkillData = Module_skillPanel.skillSource[this.prevSkillIndex];
            // curSkillData.skillDesc = skillTemplate.describe;
            // curSkillData.lv = skillTemplate.skilllev;
            // curSkillData.skillID = skillMsg.skillid;
            // curSkillData.count = skillTemplate.skilllev - prevSkillTemplate.skilllev;
            // Module_skillPanel.curSkilIdGather[skill_category] = skillId;
            // curSkillData.needMongy = skillTemplate.needMongy;
            this.dealUpData([skillId]);
            this.changeData(this.SINGLE);
        }
        else {
            //此处暂时为测试使用
            this.showTips("技能升级失败");
        }
    };
    /**请求升级全部技能返回 */
    Module_skillPanel.prototype.requestAllUpDateRes = function (skillMsg) {
        if (skillMsg.idSuccessed) {
            this.dealUpData(skillMsg.skillInfoList);
            this.changeData(this.ALL);
        }
        else {
            //此处暂时为测试使用
            this.showTips("技能升级失败");
        }
    };
    /**处理技能升级后的公共方法 */
    Module_skillPanel.prototype.dealUpData = function (idGather) {
        var curIdGather = Module_skillPanel.curSkilIdGather;
        var curGatherLen = curIdGather.length;
        var curSkillTemplate;
        var skill_category;
        var prevSkillTemplate;
        var preSkillId;
        var skillIndex;
        var id;
        for (var i = 0, len = idGather.length; i < len; i++) {
            if (idGather.length <= 1) {
                id = idGather[i];
            }
            else {
                id = idGather[i].SkillID;
            }
            curSkillTemplate = temple.TempleManager.select(id);
            skill_category = curSkillTemplate.skill_category;
            for (var j = 0; j < curGatherLen; j++) {
                if (curSkillTemplate.skill_category === curIdGather[j]["order"]) {
                    preSkillId = curIdGather[j][skill_category];
                    skillIndex = j;
                }
            }
            prevSkillTemplate = temple.TempleManager.select(preSkillId);
            var combatValue = curSkillTemplate.FightValue - prevSkillTemplate.FightValue;
            this.combatValueArr.push(combatValue);
            var curSkillData = Module_skillPanel.skillSource[skillIndex];
            curSkillData.skillDesc = curSkillTemplate.describe;
            curSkillData.lv = curSkillTemplate.skilllev;
            curSkillData.skillID = id;
            curSkillData.count = curSkillTemplate.skilllev - prevSkillTemplate.skilllev;
            Module_skillPanel.curSkilIdGather[skillIndex][skill_category] = id;
            curSkillData.needMongy = curSkillTemplate.needMongy;
        }
    };
    /**技能升级后的数据修改 */
    Module_skillPanel.prototype.changeData = function (type) {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            if (type === this.SINGLE) {
                this.view.isInitSingle = false;
                this.view.isInitAll = true;
            }
            else {
                this.view.isInitSingle = true;
                this.view.isInitAll = false;
            }
            // this.attr[data.PlayerAttr.FightValue] += changePower;
            // this.attr[data.PlayerAttr.money] -= changeGold;
            this.calculAllUpCost();
            this.setSource(Module_skillPanel.skillSource);
        }
    };
    /** */
    Module_skillPanel.prototype.showTips = function (msg) {
        var obj = [{ type: TipsEnum.TYPE_WARN, label: msg }];
        PopTipsManager.showPopTips(obj);
    };
    /** 计算消耗金币值*/
    Module_skillPanel.prototype.calculAllUpCost = function () {
        var arr = GlobalFunc.deepCopy(Module_skillPanel.skillSource);
        this.allCost = 0;
        this.recursiveCost(arr);
    };
    Module_skillPanel.prototype.recursiveCost = function (e) {
        //待测试--排序公共方法
        e = GlobalFunc.sortRule(GlobalFunc.NORMALIZE, "lv", e);
        ;
        var len = e.length;
        var minAverageObj = this.getMinAverage(e);
        var curAverage = e[e.length - 1].lv;
        if (minAverageObj) {
            //技能等级不同
            var operArr = [];
            var index = e.indexOf(minAverageObj);
            for (var i = 0; i < len; i++) {
                if (i < index) {
                    operArr.push(e[i]);
                }
            }
            //例如[5,5,5,6,10]
            var diffValue = minAverageObj.lv - operArr[0].lv;
            this.getSum(operArr, diffValue, e);
        }
        else {
            var id = parseInt(e[0].skillID);
            var template = temple.TempleManager.select(id);
            if (template) {
                if (!template.upgradeSkill) {
                }
                else {
                    // var template2:data.SkillTemple = temple.TempleManager.select(template.upgradeSkill) as data.SkillTemple;
                    this.allCost = this.allCost === 0 ? template.needMongy : this.allCost;
                    if (this.attr[data.PlayerAttr.levID] >= template.needLev) {
                        this.getSum(e, 1, e);
                    }
                }
            }
        }
    };
    /**
     * arr：operArr
     * diff:diffValue
     * parr:e 技能数组
     */
    Module_skillPanel.prototype.getSum = function (arr, diff, parr) {
        for (var i = 0; i < arr.length; i++) {
            //遍历可操做的数组 < minAverageObj的数组
            for (var j = 0; j < diff; j++) {
                var id = parseInt(arr[i].skillID) + j;
                var template = temple.TempleManager.select(id);
                if (!template) {
                    break;
                }
                this.allCost += template.needMongy;
                if (this.allCost > this.attr[data.PlayerAttr.money]) {
                    this.allCost -= template.needMongy;
                    this.allCost = this.allCost === 0 ? template.needMongy : this.allCost;
                    return false;
                }
            }
            parr[i].lv += diff;
            parr[i].skillID = parseInt(parr[i].skillID) + diff;
        }
        this.recursiveCost(parr);
    };
    /**获取差值最小的技能等级 */
    Module_skillPanel.prototype.getMinAverage = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (!!arr[i + 1]) {
                if (arr[i].lv < arr[i + 1].lv) {
                    return arr[i + 1];
                }
            }
        }
        return 0;
    };
    return Module_skillPanel;
}(Base_module));
Module_skillPanel.firstOper = true;
__reflect(Module_skillPanel.prototype, "Module_skillPanel");
//# sourceMappingURL=Module_skillPanel.js.map