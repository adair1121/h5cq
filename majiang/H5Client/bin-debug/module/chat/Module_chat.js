var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_chat = (function (_super) {
    __extends(Module_chat, _super);
    function Module_chat() {
        return _super.call(this) || this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_chat.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_ChatInfo:
                var curMsg = msg;
                this.dealMsg(curMsg);
                this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.ADDCHAT, { msg: curMsg });
                if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
                    this.view.changeView(curMsg.channel);
                }
                break;
            case proto.MessageType.s_say:
                var curMsg2 = msg;
                if (!curMsg2.isSuccess) {
                    //提示发送信息
                    var obj = { type: TipsEnum.TYPE_WARN, label: curMsg2.errMsg };
                    PopTipsManager.showPopTips([obj]);
                    return;
                }
                else {
                    if (this.sayType === 4) {
                        //私聊
                        this.sendMsgToModule([ModuleEnum.FRIEND], MainNotify.SAYSUCESS, { playerId: this.privatePlayerId, content: this.content });
                    }
                }
                // this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT);
                break;
            case proto.MessageType.s_ChatCacheInfo:
                var curMsg1 = msg;
                this.dealInitMsg(curMsg1);
                this.filterChatData();
                // this.sendMsgToModule([ModuleEnum.MAINUI],MainNotify.ADDCHAT);
                break;
            default:
                break;
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_chat.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
        switch (msgType) {
            case MainNotify.OPENCHATPANEL:
                //打开锻造面板
                this.createView();
                break;
            case MainNotify.FILTERCHAT:
                this.filterChatData();
                break;
            case MainNotify.CLEARFILTER:
                this.removeFilter();
                break;
            case MainNotify.PRIVATESAY:
                this.sendChatToServer(data.content, data.channel, data.playerId);
                break;
            default:
                break;
        }
    };
    Module_chat.prototype.filterChatData = function () {
        if (!DataCenter.chatData) {
            return;
        }
        var dicObj = DataCenter.chatData.dict;
        var blackList = DataCenter.friendData.get(data.FriendState.Blacklist + "");
        if (!blackList || !blackList.length) {
            return;
        }
        for (var key in dicObj) {
            var arr = dicObj[key];
            if (!arr.length) {
                break;
            }
            for (var i = 0, flag = true; i < arr.length; flag ? i++ : i) {
                var ifRemove = this.ifRemoveFilterChat(arr[i].channel, arr[i].roleData.instanceId, blackList);
                if (ifRemove) {
                    arr.splice(i, 1);
                    flag = false;
                }
                else {
                    flag = true;
                }
            }
        }
        this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.ADDCHAT);
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.changeView(this.view.curChannel);
        }
    };
    Module_chat.prototype.removeFilter = function () {
        var dic = GlobalFunc.deepCopyDict(DataCenter.allChatData);
        DataCenter.chatData = dic;
        this.sendMsgToModule([ModuleEnum.MAINUI], MainNotify.ADDCHAT);
        // if(this.view && this.view.parent && this.view.parent.contains(this.view)){
        // 	this.view.changeView();
        // }
    };
    Module_chat.prototype.ifRemoveFilterChat = function (channel, playerId, filterList) {
        if ((channel === 0 || channel === 1)) {
            for (var i = 0; i < filterList.length; i++) {
                if (playerId === filterList[i].playerId) {
                    return true;
                }
            }
        }
        return false;
    };
    Module_chat.prototype.dealInitMsg = function (msg) {
        var worldArr = new Array();
        var gangArr = new Array();
        var systemArr = new Array();
        var arr = [];
        arr = msg.chatCacheList;
        var privatChatArr = [];
        for (var i = 0; i < arr.length; i++) {
            switch (arr[i].channel) {
                case 0:
                    worldArr.push(this.dealWorldChat(arr[i]));
                    break;
                case 1:
                    gangArr.push(this.dealGangChat(arr[i]));
                    break;
                case 2:
                    systemArr.push(this.dealSystemChat(arr[i]));
                    break;
                case 4:
                    privatChatArr.push(arr[i]);
                    break;
                default:
                    break;
            }
        }
        var dict = new Dictionary("");
        dict.add("0", worldArr);
        dict.add("1", gangArr);
        dict.add("2", systemArr);
        dict.add("4", privatChatArr);
        DataCenter.chatData = dict;
        if (privatChatArr.length) {
            this.sendMsgToModule([ModuleEnum.FRIEND], MainNotify.PRIVATEDATACATCH, privatChatArr);
        }
        DataCenter.allChatData = GlobalFunc.deepCopyDict(dict);
    };
    Module_chat.prototype.dealWorldChat = function (any) {
        var any1 = {};
        any1.channel = any.channel;
        any1.timeStemp = any.timeSpan;
        any1.roleData = any.senderBasicInfo;
        any1.type = any.type;
        any1.name = any.senderBasicInfo.name;
        any1.content = any.content;
        any1.state = "default";
        return any1;
    };
    Module_chat.prototype.dealGangChat = function (any) {
        var any1 = {};
        any1.channel = any.channel;
        any1.timeStemp = any.timeSpan;
        any1.roleData = any.senderBasicInfo;
        any1.type = any.type;
        any1.name = any.senderBasicInfo.name;
        any1.content = any.content;
        any1.state = "default";
        return any1;
    };
    Module_chat.prototype.dealSystemChat = function (any) {
        var any1 = {};
        any1.channel = any.channel;
        any1.timeStemp = any.timeSpan;
        any1.content = any.content;
        any1.type = any.type;
        any1.state = "system";
        //拼接
        return any1;
    };
    Module_chat.prototype.dealMsg = function (msg) {
        switch (msg.channel) {
            case 0:
                DataCenter.chatData.get("0").push(this.dealWorldChat(msg));
                DataCenter.allChatData.get("0").push(this.dealWorldChat(msg));
                break;
            case 1:
                DataCenter.chatData.get("1").push(this.dealGangChat(msg));
                DataCenter.allChatData.get("1").push(this.dealGangChat(msg));
                break;
            case 2:
                DataCenter.chatData.get("2").push(this.dealSystemChat(msg));
                DataCenter.allChatData.get("2").push(this.dealSystemChat(msg));
                break;
            case 4:
                //私聊
                var dataObj = {};
                dataObj.playerId = msg.senderBasicInfo.instanceId;
                var friendInfo = {};
                friendInfo.playerId = msg.senderBasicInfo.instanceId;
                friendInfo.state = 3;
                friendInfo.head = msg.senderBasicInfo.headID;
                friendInfo.name = msg.senderBasicInfo.name;
                dataObj.content = msg.content;
                dataObj.friendInfo = friendInfo;
                this.sendMsgToModule([ModuleEnum.FRIEND], MainNotify.RECEIVESAY, dataObj);
                break;
            default:
                break;
        }
        // this.view.changeView();
    };
    Module_chat.prototype.removeView = function () {
        //关闭角色面板
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    Module_chat.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView();
        }
        else {
            //打开角色面板
            this.view = new View_chat();
            _super.prototype.createView.call(this);
            this.view.changeView();
        }
    };
    Module_chat.prototype.getListData = function (channel) {
        var arr = DataCenter.chatData.get("" + channel);
        if (!arr) {
            return;
        }
        var arr1;
        if (arr.length > 50) {
            arr1 = arr.slice(-50);
        }
        else {
            arr1 = arr;
        }
        return arr1;
    };
    Module_chat.prototype.sendChatToServer = function (str, channel, playerId) {
        if (playerId === void 0) { playerId = ""; }
        var msg = new proto.c_say();
        msg.channel = channel;
        msg.content = str;
        msg.sendTo = playerId;
        DataCenter.playerId;
        this.sayType = channel;
        this.privatePlayerId = playerId;
        this.content = str;
        SocketManager.getInstance().sendProto(msg);
    };
    Module_chat.prototype.addFriendById = function (id) {
        var msg = new proto.c_AddFriendById();
        msg.friendInstId = id;
        SocketManager.getInstance().sendProto(msg);
    };
    Module_chat.prototype.addBlackList = function (id) {
        var msg = new proto.c_AddBlacklist();
        msg.playerId = id;
        SocketManager.getInstance().sendProto(msg);
        // DataCenter.friendIdData.get("blackList").push(msg.playerId);
    };
    return Module_chat;
}(Base_module));
__reflect(Module_chat.prototype, "Module_chat");
//# sourceMappingURL=Module_chat.js.map