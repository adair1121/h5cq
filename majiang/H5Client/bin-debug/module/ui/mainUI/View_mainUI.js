var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_mainUI = (function (_super) {
    __extends(View_mainUI, _super);
    function View_mainUI() {
        var _this = _super.call(this) || this;
        _this.popTipsGather = [];
        _this.skinName = "View_mainUI_skin";
        return _this;
    }
    View_mainUI.prototype.childrenCreated = function () {
        this.skinStates = {};
        this.skinStates[data.SenceType.YeWai] = "mainUI";
        this.skinStates[data.SenceType.GuanQia] = "levelChallenge";
        this.skinStates[data.SenceType.FuBen] = "boss";
        this.skinStates[data.SenceType.GeRenBoss] = "boss";
        this.curModule = this.module;
        Global.addEventListener(MainNotify.OPENBAG, this.onOpenBag, this);
        Global.addEventListener(MainNotify.OPENROLEPANEL, this.onOpenRolePanel, this);
        Global.addEventListener(MainNotify.OPENSKILLPANEL, this.onOpenSkillPanel, this);
        Global.addEventListener(MainNotify.OPENFORGINGPANEL, this.onOpenForgingPanel, this);
        Global.addEventListener(MainNotify.OPENRANKPANEL, this.onOpenRankPanel, this);
        Global.addEventListener(MainNotify.SENDTOSAUTOCHALLENGE, this.onStartAutoChallenge, this);
        Global.addEventListener(MainNotify.OPENCHALLENGEPANEL, this.onOpenChallengePanel, this);
        Global.addEventListener(MainNotify.BUYITEM, this.buyItemHandler, this);
        Global.addEventListener(MainNotify.CREATENEWROLE, this.createNewRole, this);
        Global.addEventListener(MainNotify.OPENPERSONALBOSSPANEL, this.openPersonalBoss, this);
        Global.addEventListener(MainNotify.BOSSCURHP, this.curValue, this);
        Global.addEventListener(MainNotify.BOSSTOTALHP, this.totleValue, this);
        this.chat_scroller.viewport = this.chat_list;
        this.chat_list.itemRenderer = MainUI_chat_itemRenderer;
        this.collec_chat = new eui.ArrayCollection();
        this.chat_list.dataProvider = this.collec_chat;
        this.storeBtn.label = "商城";
        this.btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.btn_friend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.storeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openStorePanel, this);
        this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.btn_mail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.bossBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.timer = new egret.Timer(30000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.playerProgress["progressValue"].visible = true;
        // this.curModule.sendMsgToModule([ModuleEnum.STORE],MainNotify.OPENSTOREPANEL);
    };
    View_mainUI.prototype.startTime = function () {
        this.timer.start();
    };
    View_mainUI.prototype.stopTime = function () {
        this.timer.stop();
    };
    View_mainUI.prototype.totleValue = function (evt) {
        this.playerProgress.maximum = evt.c_data.MHP;
        this.tal = evt.c_data.MHP;
        this.playerProgress["progressValue"].text = this.cur + "/" + this.tal;
    };
    View_mainUI.prototype.curValue = function (evt) {
        this.playerProgress.value = evt.c_data.curHp;
        this.cur = evt.c_data.curHp;
        if (this.cur < 0) {
            this.cur = 0;
        }
        this.playerProgress["progressValue"].text = this.cur + "/" + this.tal;
    };
    View_mainUI.prototype.onTimer = function (evt) {
        this.curModule.syncTime();
    };
    View_mainUI.prototype.showChat = function (dataObj) {
        if (dataObj === void 0) { dataObj = null; }
        var arr = [];
        var dict = DataCenter.chatData;
        if (!dict) {
            return;
        }
        if (dataObj) {
            if (dataObj.type === 1 || dataObj.type === 2) {
                this.systemNotice.addItem({ type: dataObj.type, content: dataObj.content });
                if (!this.systemNotice.startState) {
                    this.systemNotice.initComponent(2, 4000);
                }
            }
        }
        arr = arr.concat(dict.get("0")).concat(dict.get("1")).concat(dict.get("2"));
        arr.sort(function (any1, any2) {
            if (any1.timeStemp > any2.timeStemp) {
                return 1;
            }
            else if (any1.timeStemp == any2.timeStemp) {
                return 0;
            }
            else {
                return -1;
            }
        });
        if (arr.length > 50) {
            this.collec_chat.replaceAll(arr.slice(-50));
        }
        else {
            this.collec_chat.source = arr;
        }
        this.chat_scroller.stopAnimation();
        this.chat_scroller.validateNow();
        if (this.chat_scroller.viewport.measuredHeight < this.chat_scroller.height) {
            this.chat_scroller.viewport.scrollV = 0;
        }
        else {
            this.chat_scroller.viewport.scrollV = this.chat_scroller.viewport.measuredHeight - this.chat_scroller.height;
        }
    };
    View_mainUI.prototype.btnClickHandler = function (event) {
        switch (event.target) {
            case this.btn_chat:
                this.curModule.sendMsgToModule([ModuleEnum.CHAT], MainNotify.OPENCHATPANEL);
                break;
            case this.btn_friend:
                this.curModule.sendMsgToModule([ModuleEnum.FRIEND], MainNotify.OPENFRIENDSPANEL);
                break;
            case this.btn_mail:
                this.curModule.sendMsgToModule([ModuleEnum.MAIL], MainNotify.OPENMAILPANEL);
                break;
            case this.bossBtn:
                this.curModule.sendMsgToModule([ModuleEnum.BOSS], MainNotify.OPENPERSONALBOSSPANEL);
                break;
            case this.btnExit:
                this.curModule.leaveBossRoom();
                break;
            default:
                break;
        }
    };
    View_mainUI.prototype.openPersonalBoss = function (evt) {
        this.curModule.sendMsgToModule([ModuleEnum.BOSS], MainNotify.OPENPERSONALBOSSPANEL);
    };
    View_mainUI.prototype.onStartAutoChallenge = function (evt) {
        this.curModule.autoChallengeState = evt.c_data.type;
    };
    View_mainUI.prototype.createNewRole = function (evt) {
        this.curModule.sendMsgToModule([ModuleEnum.CREATEROLE], MainNotify.OPENCREATEROLE, evt.c_data);
    };
    View_mainUI.prototype.buyItemHandler = function (evt) {
        this.curModule.sendToSByItem(evt.c_data);
    };
    View_mainUI.prototype.openStorePanel = function (evt) {
        this.curModule.sendMsgToModule([ModuleEnum.STORE], MainNotify.OPENSTOREPANEL);
    };
    View_mainUI.prototype.onOpenBag = function () {
        this.curModule.sendMsgToModule([ModuleEnum.BAG], MainNotify.OPENBAG);
    };
    View_mainUI.prototype.onOpenRolePanel = function () {
        this.curModule.sendMsgToModule([ModuleEnum.ROLEINFO], MainNotify.OPENROLEPANEL);
    };
    View_mainUI.prototype.onOpenSkillPanel = function () {
        this.curModule.sendMsgToModule([ModuleEnum.SKILLPANEL], MainNotify.OPENSKILLPANEL);
    };
    View_mainUI.prototype.onOpenForgingPanel = function () {
        this.curModule.sendMsgToModule([ModuleEnum.FORGING], MainNotify.OPENFORGINGPANEL);
    };
    View_mainUI.prototype.onOpenRankPanel = function () {
        this.curModule.sendMsgToModule([ModuleEnum.RANK], MainNotify.OPENRANKPANEL);
    };
    View_mainUI.prototype.onOpenChallengePanel = function () {
        //打开挑战面板
        this.curModule.sendMsgToModule([ModuleEnum.CHALLENGE], MainNotify.OPENCHALLENGEPANEL);
    };
    /**更新场景状态 */
    View_mainUI.prototype.changeScene = function (type) {
        this.skin.currentState = this.skinStates[type];
    };
    /**
     * 更新关卡信息
     */
    View_mainUI.prototype.refreshLevelInfo = function (dataObj) {
        if (dataObj.skinState === "mainState") {
            this.levelInfo.getMoney = dataObj.getMoney;
            this.levelInfo.getExp = dataObj.getExp;
        }
        else {
            this.levelInfo.fDesc = dataObj.fDesc;
        }
        this.levelInfo.levName = dataObj.levName;
        this.levelInfo.levInfoState = dataObj.skinState;
    };
    /**
     * 更新挑战波数
     */
    View_mainUI.prototype.refreshChallengeNum = function (value) {
        this.autoChallenge.curValue = value;
    };
    /**
     * 更新自动挑战状态
     */
    View_mainUI.prototype.refreshAutoState = function (state) {
        this.autoChallenge.curState = state;
    };
    /**
     * 更改血量显示
     */
    View_mainUI.prototype.changeHpPoll = function (changeHp) {
        this.mainNav.refreshHpPoolBall(changeHp);
    };
    /**
     * 初始化焦点
     */
    View_mainUI.prototype.initNavFocus = function () {
        this.mainNav.initFocus();
    };
    /**
     * 刷新人物头像
     */
    View_mainUI.prototype.refreshRoleInfoData = function () {
        var job = DataCenter.roleList[0].job;
        var sex = DataCenter.roleList[0].sex;
        var obj = {
            job: job,
            sex: sex
        };
        this.mainUIHeadBox.refreshData(obj);
    };
    Object.defineProperty(View_mainUI.prototype, "power", {
        set: function (value) {
            this._power = value;
            this.mainUIHeadBox.setPower(value + "");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_mainUI.prototype, "gold", {
        set: function (value) {
            this._gold = value;
            this.mainUITitle.refreshGoldNum(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_mainUI.prototype, "uname", {
        set: function (value) {
            this._uname = value;
            this.mainUITitle.refreshUname(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_mainUI.prototype, "money", {
        set: function (value) {
            this._money = value;
            this.mainUITitle.refreshMoneyNum(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_mainUI.prototype, "vip", {
        set: function (value) {
            this._vip = value;
            this.mainUIHeadBox.refreshVipNum(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_mainUI.prototype, "level", {
        set: function (value) {
            this._level = value;
            this.mainUIHeadBox.refreshLelNum(this._level);
        },
        enumerable: true,
        configurable: true
    });
    return View_mainUI;
}(Base_view));
__reflect(View_mainUI.prototype, "View_mainUI");
var MainUI_chat_itemRenderer = (function (_super) {
    __extends(MainUI_chat_itemRenderer, _super);
    function MainUI_chat_itemRenderer() {
        var _this = _super.call(this) || this;
        _this.txt = new eui.Label();
        _this.txt.fontFamily = "SimHei";
        _this.txt.size = 14;
        _this.txt.lineSpacing = 3;
        _this.txt.width = 280;
        _this.txt.stroke = 1;
        _this.txt.strokeColor = 0x000000;
        _this.txt.multiline = true;
        _this.addChild(_this.txt);
        return _this;
    }
    MainUI_chat_itemRenderer.prototype.dataChanged = function () {
        var channel;
        var color_channel;
        var name;
        switch (this.data.channel) {
            case 0:
                channel = "[世界]";
                color_channel = 0xd21eff;
                break;
            case 1:
                channel = "[工会]";
                color_channel = 0X04fe10;
                break;
            case 2:
                channel = "[系统]";
                color_channel = 0xfc3434;
                break;
        }
        if (this.data.type == 1) {
            channel = "[公告]";
            color_channel = 0xfca304;
        }
        if (this.data.channel != 2) {
            name = "[" + this.data.name + "]";
        }
        this.txt.textFlow = [
            { text: channel, style: { "textColor": color_channel } },
            { text: name, style: { "textColor": 0x0fb8ff } },
            { text: ":" + this.data.content, style: { "textColor": 0xE6D8B3, "strokeColor": 0x000000, "stroke": 1 } }
        ];
        ;
        this.height = this.txt.height + Math.floor(this.txt.height / 14) * 3;
    };
    return MainUI_chat_itemRenderer;
}(eui.ItemRenderer));
__reflect(MainUI_chat_itemRenderer.prototype, "MainUI_chat_itemRenderer");
//# sourceMappingURL=View_mainUI.js.map