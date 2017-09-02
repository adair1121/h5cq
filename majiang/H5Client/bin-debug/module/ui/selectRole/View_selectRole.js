var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_selectRole = (function (_super) {
    __extends(View_selectRole, _super);
    function View_selectRole() {
        var _this = _super.call(this) || this;
        _this.skinName = "View_selectRole_skin";
        return _this;
    }
    View_selectRole.prototype.childrenCreated = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.createBtn["labelTxt"].text = "创建";
        this.nameTxt = new egret.TextField();
        this.tData = { name: "", Job: -1, Sex: -1 };
        this.addChild(this.nameTxt);
        this.initialize();
    };
    View_selectRole.prototype.initialize = function () {
        this.nameTxt.width = 200;
        this.nameTxt.height = 30;
        this.nameTxt.fontFamily = "SimHei";
        this.nameTxt.size = 16;
        this.nameTxt.text = "请输入用户名";
        this.nameTxt.background = true;
        this.nameTxt.textColor = 0x999999;
        this.nameTxt.border = true;
        this.nameTxt.inputType = egret.TextFieldInputType.TEXT;
        this.nameTxt.type = egret.TextFieldType.INPUT;
        this.nameTxt.maxChars = 6;
        this.nameTxt.textAlign = egret.HorizontalAlign.LEFT;
        this.nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.nameTxt.x = (Config.curWidth() >> 1) - (this.nameTxt.width >> 1);
        this.nameTxt.y = Config.curHeight() - 150;
        this.nameTxt.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
        this.nameTxt.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        this.reg = new RegExp(/\s+/g);
        this.bgCir = this.createBg();
        this.addChild(this.bgCir);
        this.bgCir.visible = false;
    };
    View_selectRole.prototype.onFocusIn = function (evt) {
        if (this.nameTxt.textColor === 0x999999) {
            this.nameTxt.text = "";
            this.nameTxt.textColor = 0x000000;
        }
    };
    View_selectRole.prototype.onFocusOut = function (evt) {
        this.nameLabel = this.nameTxt.text.replace(this.reg, "");
        if (this.nameLabel === "") {
            this.nameTxt.text = "请输入用户名";
            this.nameTxt.textColor = 0x999999;
            return;
        }
    };
    View_selectRole.prototype.onTouchTap = function (evt) {
        this.curTar = evt.target;
        switch (evt.target) {
            case this.taoistBtn_0:
            case this.taoistBtn_1:
            case this.masterBtn_0:
            case this.masterBtn_1:
            case this.warriorBtn_0:
            case this.warriorBtn_1:
                this.clickHeadOper();
                break;
            case this.createBtn:
                this.createRoleFunc();
                break;
            default:
                break;
        }
    };
    View_selectRole.prototype.clickHeadOper = function () {
        var arr = this.curTar.name.split("_");
        this.tData.Job = arr[0];
        this.tData.Sex = arr[1];
        if (!this.bgCir.visible) {
            this.bgCir.visible = true;
        }
        this.bgCir.x = this.curTar.x - 1;
        this.bgCir.y = this.curTar.y - 1;
    };
    View_selectRole.prototype.createRoleFunc = function () {
        if ((this.tData.Job === -1) || (this.nameTxt.textColor === 0x999999)) {
            return;
        }
        this.tData.name = this.nameLabel;
        this.module["createRole"]();
    };
    /**测试使用 */
    View_selectRole.prototype.createBg = function () {
        var sp = new egret.Sprite();
        sp.graphics.lineStyle(1, 0xff0000);
        sp.graphics.drawRect(0, 0, 82, 82);
        sp.graphics.endFill();
        return sp;
    };
    return View_selectRole;
}(Base_view));
__reflect(View_selectRole.prototype, "View_selectRole");
//# sourceMappingURL=View_selectRole.js.map