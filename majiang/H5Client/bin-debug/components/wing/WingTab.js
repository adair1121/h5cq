var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WingTab = (function (_super) {
    __extends(WingTab, _super);
    function WingTab(type) {
        var _this = _super.call(this) || this;
        _this.wingSource = "";
        _this.clickState = false;
        _this.source = [];
        _this.no_star = "wing_star_0_png";
        _this.has_star = "wing_star_1_png";
        _this.skinName = "WingTab_skin";
        if (type) {
            _this.btnGroup.visible = false;
            _this.changWing.visible = false;
        }
        else {
            _this.btnGroup.visible = true;
            _this.changWing.visible = true;
        }
        return _this;
    }
    WingTab.prototype.childrenCreated = function () {
        this.initialize();
        this.starList.dataProvider = this.arrayCollet;
        this.starList.itemRenderer = Wing_star_item;
        this.c_arrayCollect = new eui.ArrayCollection();
        this.n_arrayCollect = new eui.ArrayCollection();
        this.cAttrList.dataProvider = this.c_arrayCollect;
        this.nextAttrList.dataProvider = this.n_arrayCollect;
        this.cAttrList.itemRenderer = Role_specialItem;
        this.nextAttrList.itemRenderer = Role_specialItem;
        this.myTimer = new egret.Timer(200);
        this.myTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.attr = DataCenter.playerAttr;
        this.watcher = eui.Binding.bindHandler(DataCenter, ["changeItemNum"], this.changeNeedFeather, this);
        // this.refreshFeatherColor();
    };
    WingTab.prototype.changeNeedFeather = function (value) {
        if (value && value.id) {
            var uid = DataCenter.goodsUIDgather.get(this.wingTempleId + "");
            if (uid && uid === value.id) {
                this.featherNum = value.num;
            }
        }
    };
    WingTab.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.freeActive.button:
                this.skin.currentState = "active";
                // this.roleWing.source = this.wingSource;
                // this.starList.visible = true;
                break;
            case this.autoUp.button:
                // if(attr[data.PlayerAttr.feather]<=0 && attr[data.PlayerAttr.money] < this.cost){
                // 	var obj:any[] = [{type:TipsEnum.TYPE_WARN,label:"金币不足"}];
                // 	PopTipsManager.showPopTips(obj);
                // 	this.clickState = false;
                // 	return;
                // }
                this.clickState = !this.clickState;
                if (this.clickState) {
                    this.autoUp.label = "停止";
                    this.myTimer.start();
                }
                else {
                    // this.myTimer.stop();
                    // this.myTimer.reset();
                    // this.autoUp.label = "自动升星";
                    this.stopAutoUpgrade();
                }
                break;
            case this.promoteBtn.button:
                if (this.clickState) {
                    return;
                }
                if (this.attr[data.PlayerAttr.money] < this.cost) {
                    var obj = [{ type: TipsEnum.TYPE_WARN, label: "金币不足" }];
                    PopTipsManager.showPopTips(obj);
                    return;
                }
                Global.dispatchEvent(MainNotify.EXPERIENCE_STAR, { type: 1 });
                break;
            case this.featherUpBtn.button:
                if (this.clickState) {
                    return;
                }
                if (this.featherCount <= 0) {
                    var obj = [{ type: TipsEnum.TYPE_WARN, label: "羽毛不足" }];
                    PopTipsManager.showPopTips(obj);
                    return;
                }
                Global.dispatchEvent(MainNotify.EXPERIENCE_STAR, { type: 2 });
                break;
            case this.changWing.button:
                //提升
                Global.dispatchEvent(MainNotify.WINGCHANGE);
                break;
        }
    };
    WingTab.prototype.onTimer = function (evt) {
        var attr = DataCenter.playerAttr;
        if (this.featherCount <= 0 && attr[data.PlayerAttr.money] < this.cost) {
            this.stopAutoUpgrade();
            return;
        }
        Global.dispatchEvent(MainNotify.EXPERIENCE_STAR, { type: 3 });
    };
    WingTab.prototype.initialize = function () {
        this.source = [];
        this.arrayCollet = new eui.ArrayCollection();
        this.wingMc = new MovieClip();
        this.autoUp.label = "自动升星";
        this.promoteBtn.label = "提升";
        this.featherUpBtn.label = "羽毛提升";
        this.freeActive.setAttr({ text: "免费激活", size: 20 });
        this.changWing.label = "升阶";
        for (var i = 0; i < 10; i++) {
            var obj = { img: this.no_star };
            this.source.push(obj);
        }
        this.arrayCollet.source = this.source;
    };
    /**更新翅膀模型 */
    WingTab.prototype.refreshWingMode = function (roleWingPath) {
        if (roleWingPath === void 0) { roleWingPath = ""; }
        this.roleWing.removeChildren();
        this.wingMc.loadFile(roleWingPath, true, -1, null, this);
        this.roleWing.addChild(this.wingMc);
        this.wingMc.x = (this.roleWing.width >> 1);
        this.wingMc.y = (this.roleWing.height >> 1) + 25;
    };
    WingTab.prototype.refreshStar = function (starNum) {
        for (var i = 0; i < 10; i++) {
            this.source[i].img = this.no_star;
        }
        for (var i = 0; i < starNum; i++) {
            this.source[i].img = this.has_star;
        }
        this.arrayCollet.source = this.source;
    };
    /**翅膀升星操作（包含羽毛提升以及金币提升） */
    WingTab.prototype.upGradeStar = function (dataObj) {
        var num;
        if (DataCenter.goodsSource.hasKey(this.fUid + "")) {
            num = DataCenter.goodsSource.get(this.fUid + "");
        }
        else {
            num = 0;
        }
        this.featherNum = num ? num : 0;
        // this.refreshFeatherColor();
        this.curValue += dataObj.exp;
        this.costNum = dataObj.costMoney;
        var obj = { type: TipsEnum.TYPE_EXPERIENCE, num: dataObj.exp };
        PopTipsManager.showPopTips([obj]);
        //判断是否要升星
        if (this.curValue >= this.totalValue) {
            // 升星
            this.stopAutoUpgrade();
            Global.dispatchEvent(MainNotify.STAR_UPGRADE);
        }
    };
    WingTab.prototype.stopAutoUpgrade = function () {
        this.myTimer.stop();
        this.myTimer.reset();
        this.autoUp.label = "自动升星";
        this.clickState = false;
    };
    // private refreshFeatherColor():void{
    // 	if(this.featherCount<=0){
    // 		this.feather.textColor = 0xfc3434;
    // 	}else{
    // 		this.feather.textColor = 0xE6D8B3;
    // 	}
    // }
    // private refreshMoneyColor(num:number):void{
    // 	if(this.attr[data.PlayerAttr.money] < num){
    // 		this.costMoney.textColor = 0xfc3434;
    // 	}else{
    // 		this.costMoney.textColor = 0xE6D8B3;
    // 	}
    // }
    /**初始化星级 */
    WingTab.prototype.initLev = function (value) {
        this.m_curStar = value;
        this.refreshStar(value);
        if (value === 10) {
            //升阶界面
            this.skin.currentState = "upGradeStar";
            this.updateProgress["label"].visible = false;
        }
        else {
            this.skin.currentState = "active";
            this.updateProgress["label"].visible = true;
        }
    };
    Object.defineProperty(WingTab.prototype, "curValue", {
        get: function () {
            return this.m_curValue;
        },
        set: function (value) {
            this.m_curValue = value;
            this.updateProgress.value = this.m_curValue;
            this.updateProgress["label"].text = this.m_curValue + "/" + this.m_totalValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WingTab.prototype, "totalValue", {
        get: function () {
            return this.m_totalValue;
        },
        set: function (value) {
            this.m_totalValue = value;
            this.updateProgress.maximum = value;
            this.updateProgress["label"].text = this.m_curValue + "/" + this.m_totalValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WingTab.prototype, "featherNum", {
        set: function (value) {
            this.featherCount = value;
            this.feather.text = value + "/1";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WingTab.prototype, "costNum", {
        set: function (value) {
            // this.refreshMoneyColor(value);
            this.cost = value;
            this.costMoney.text = value + "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WingTab.prototype, "cattrList", {
        set: function (value) {
            this.c_arrayCollect.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WingTab.prototype, "nattrList", {
        set: function (value) {
            this.n_arrayCollect.source = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WingTab.prototype, "fUID", {
        set: function (value) {
            this.fUid = value;
        },
        enumerable: true,
        configurable: true
    });
    WingTab.prototype.remove = function () {
        this.wingMc.gotoAndStop(0);
        this.wingMc = null;
        this.myTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this.watcher) {
            this.watcher.unwatch();
        }
    };
    return WingTab;
}(eui.Component));
__reflect(WingTab.prototype, "WingTab");
//# sourceMappingURL=WingTab.js.map