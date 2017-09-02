var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_selectServer = (function (_super) {
    __extends(View_selectServer, _super);
    function View_selectServer() {
        var _this = _super.call(this) || this;
        _this.skinName = "View_selectServer_skin";
        return _this;
    }
    View_selectServer.prototype.childrenCreated = function () {
        var _this = this;
        var radioGroup = new eui.RadioButtonGroup();
        this.server0.group = radioGroup;
        this.server1.group = radioGroup;
        this.server2.group = radioGroup;
        this.server3.group = radioGroup;
        this.server2.selected = true;
        Config.gameHost = this.server2.label;
        radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartServer, this);
        this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.isClear = true;
            _this.onStartServer(event);
        }, this);
        this.startBtn["labelTxt"].text = "进入";
        this.btn_clear["labelTxt"].text = "清缓进入";
        this.btn_clear["labelTxt"].size = 12;
    };
    View_selectServer.prototype.radioChangeHandler = function (evt) {
        var radioGroup = evt.target;
        var radioBtn = radioGroup.selection;
        var txt = radioBtn.label;
        Config.gameHost = txt;
    };
    View_selectServer.prototype.onStartServer = function (evt) {
        var name;
        var pwd;
        var date = new Date();
        var str = String(date.getTime()).slice(-9, -5);
        if (Config.gameHost == "172.17.1.51") {
            if (this.isClear) {
                egret.localStorage.removeItem("loginName_p");
            }
            name = egret.localStorage.getItem("loginName_p");
            pwd = egret.localStorage.getItem("loginPwd_p");
            if (name && pwd) {
            }
            else {
                name = "t" + Math.floor(Math.random() * 99) + str;
                pwd = "111111";
                egret.localStorage.setItem("loginName_p", name);
                egret.localStorage.setItem("loginPwd_p", pwd);
            }
        }
        else if (Config.gameHost == "172.17.1.40") {
            if (this.isClear) {
                egret.localStorage.removeItem("loginName_s");
            }
            name = egret.localStorage.getItem("loginName_s");
            pwd = egret.localStorage.getItem("loginPwd_s");
            if (name && pwd) {
            }
            else {
                name = "t" + Math.floor(Math.random() * 99) + str;
                pwd = "111111";
                egret.localStorage.setItem("loginName_s", name);
                egret.localStorage.setItem("loginPwd_s", pwd);
            }
        }
        else if (Config.gameHost == "172.17.1.40") {
            if (this.isClear) {
                egret.localStorage.removeItem("loginName_s");
            }
            name = egret.localStorage.getItem("loginName_s");
            pwd = egret.localStorage.getItem("loginPwd_s");
            if (name && pwd) {
            }
            else {
                name = "t" + Math.floor(Math.random() * 99) + str;
                pwd = "111111";
                egret.localStorage.setItem("loginName_s", name);
                egret.localStorage.setItem("loginPwd_s", pwd);
            }
        }
        else {
            if (this.isClear) {
                egret.localStorage.removeItem("loginPwd_c");
            }
            name = egret.localStorage.getItem("loginName_c");
            pwd = egret.localStorage.getItem("loginPwd_c");
            if (name && pwd) {
            }
            else {
                name = "t" + Math.floor(Math.random() * 99) + str;
                pwd = "111111";
                egret.localStorage.setItem("loginName_c", name);
                egret.localStorage.setItem("loginPwd_c", pwd);
            }
        }
        // var name = "g42"
        // var pwd="greentea";
        Config.username = name;
        Config.password = pwd;
        this.parent.removeChild(this);
        // /**链接服务器 */
        SocketManager.getInstance().connectServer(Config.gameHost, Config.gamePort);
    };
    return View_selectServer;
}(eui.Component));
__reflect(View_selectServer.prototype, "View_selectServer");
//# sourceMappingURL=View_selectServer.js.map