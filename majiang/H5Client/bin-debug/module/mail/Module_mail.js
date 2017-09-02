var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_mail = (function (_super) {
    __extends(Module_mail, _super);
    function Module_mail() {
        var _this = _super.call(this) || this;
        _this.mailData = [];
        return _this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_mail.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_MailList:
                var curMsg = msg;
                this.dealMsg(curMsg);
                break;
            case proto.MessageType.s_TakeAward:
                var curMsg1 = msg;
                this.receiveHandler(curMsg1);
                break;
            case proto.MessageType.s_RefreshMailExpire:
                var expire_msg = msg;
                var expireIdList = expire_msg.expireIdList;
                this.dealWithExpireIdList(expireIdList);
                break;
            case proto.MessageType.s_OpenMail:
                var openMail_msg = msg;
                this.changeMailState(openMail_msg);
                break;
            default:
                break;
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_mail.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENMAILPANEL:
                //打开邮件面板
                this.createView();
                break;
            default:
                break;
        }
    };
    Module_mail.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView();
        }
        else {
            //打开角色面板
            this.view = new View_mail();
            _super.prototype.createView.call(this);
            this.refreshMailExpire();
            if (this.view) {
                this.view.changeView(this.mailData);
            }
        }
    };
    Module_mail.prototype.removeView = function () {
        //关闭角色面板
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    Module_mail.prototype.dealMsg = function (msg) {
        var arr = msg.mailList;
        for (var i = 0, len = arr.length, item; i < len; i++) {
            item = arr[i];
            var obj = {};
            for (var key in item) {
                obj[key] = item[key];
            }
            this.mailData.push(obj);
        }
        if (this.view) {
            this.view.changeView(this.mailData);
        }
    };
    /**向服务器发送消息 */
    Module_mail.prototype.getRewardToS = function (mailId) {
        var takeAward_msg = new proto.c_TakeAward();
        takeAward_msg.mailId = mailId;
        SocketManager.getInstance().sendProto(takeAward_msg);
    };
    Module_mail.prototype.refreshMailExpire = function () {
        var expire_msg = new proto.c_RefreshMailExpire();
        SocketManager.getInstance().sendProto(expire_msg);
    };
    Module_mail.prototype.openMail = function (mailId) {
        var openMailMsg = new proto.c_OpenMail();
        openMailMsg.mailId = mailId;
        SocketManager.getInstance().sendProto(openMailMsg);
    };
    //================================================
    /**删除过期邮件 */
    Module_mail.prototype.dealWithExpireIdList = function (expireList) {
        var arr = GlobalFunc.deepCopy(expireList);
        for (var i = 0, flag = true; i < this.mailData.length; flag ? (i++) : i) {
            for (var j = 0; j < arr.length; j++) {
                if (this.mailData[i] === arr[j]) {
                    flag = false;
                    this.mailData.splice(i, 1);
                    break;
                }
                else {
                    flag = true;
                }
            }
        }
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.changeView(this.mailData);
        }
    };
    /**更改邮件状态 */
    Module_mail.prototype.changeMailState = function (msg) {
        if (msg.isSuccess) {
            for (var i = 0; i < this.mailData.length; i++) {
                if (this.mailData[i].mailId === msg.mailID) {
                    this.mailData[i].mailState = 1;
                }
            }
            if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
                this.view.changeView(this.mailData);
            }
        }
        else {
        }
    };
    Module_mail.prototype.receiveHandler = function (msg) {
        if (msg.isSuccess) {
            for (var i = 0; i < this.mailData.length; i++) {
                if (this.mailData[i].mailId === msg.mailId) {
                    this.mailData.splice(i, 1);
                    break;
                }
            }
            if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
                this.view.changeView(this.mailData);
            }
        }
        else {
            var obj = { msgType: TipsEnum.TYPE_WARN, label: msg.errMsg };
            PopTipsManager.showPopTips([obj]);
        }
    };
    return Module_mail;
}(Base_module));
__reflect(Module_mail.prototype, "Module_mail");
//# sourceMappingURL=Module_mail.js.map