var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Module_friends = (function (_super) {
    __extends(Module_friends, _super);
    function Module_friends() {
        var _this = _super.call(this) || this;
        _this.operType = -1;
        _this.initialize = false;
        _this.recentList = [];
        return _this;
    }
    Module_friends.prototype.bindData = function () {
        // eui.Binding.bindHandler(DataCenter.friendData,["dict",data.FriendState.Friend+""],this.friendListChange,this);
        // eui.Binding.bindHandler(DataCenter.friendData,["dict","recentlyList"],()=>{this.changeDataHandler("recently");},this);
        // eui.Binding.bindHandler(DataCenter.friendChatData,["dict"],()=>{this.changeDataHandler("chat");},this);
        Global.addEventListener(MainNotify.FRIENDS_OPER, this.onFriendOper, this);
    };
    // private changeDataHandler(str:string):void{
    // 	if(str=="friend"&&this.curState=="friend"){
    // 		this.view.stateName="friend";
    // 	}else if(str=="recently"&&this.curState=="recent"){
    // 		this.view.stateName="recent";
    // 	}else if(str=="chat"&&this.curState=="chat"){
    // 		this.view.stateName="chat";
    // 	}
    // }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Module_friends.prototype.receiveMsgFromSever = function (msg) {
        switch (msg.S) {
            case proto.MessageType.s_FriendList:
                var curMsg1 = msg;
                this.updateFriendsData(curMsg1.FriendList);
                break;
            // case proto.MessageType.s_PrivateChat:
            // 	var curMsg2:proto.s_PrivateChat=msg as proto.s_PrivateChat;
            // 	this.addChatData(curMsg2);
            // 	break;
            case proto.MessageType.s_FriendAck:
                var friendAck_msg = msg;
                if (!friendAck_msg.isSuccess) {
                    var obj = { type: TipsEnum.TYPE_WARN, label: friendAck_msg.errMsg };
                    PopTipsManager.showPopTips([obj]);
                    return;
                }
                else {
                    if (friendAck_msg.friendInfo) {
                        this.updateFriendsData([friendAck_msg.friendInfo]);
                    }
                }
                break;
            case proto.MessageType.s_UpdateFriendState:
                var upDate_msg = msg;
                switch (upDate_msg.state) {
                    // case data.FriendState.Friend:
                    // 	DataCenter.friendData.get("friendList").push(upDate_msg.friendId);
                    // 	break;
                    case data.FriendState.Blacklist:
                        this.addBlackList(data.FriendState.Blacklist, upDate_msg.friendId);
                        this.changeViewData();
                        this.sendMsgToModule([ModuleEnum.CHAT], MainNotify.FILTERCHAT);
                        this.removeRecentLyData(upDate_msg.friendId);
                        break;
                    case data.FriendState.Remove:
                        this.removePlayerIdFromDict(data.FriendState.Friend, upDate_msg.friendId);
                        this.removePlayerIdFromDict(data.FriendState.Blacklist, upDate_msg.friendId);
                        this.removeRecentLyData(upDate_msg.friendId);
                        this.changeViewData();
                        this.sendMsgToModule([ModuleEnum.CHAT], MainNotify.CLEARFILTER);
                        break;
                }
                if (this.callBackFunc && this.arg) {
                    this.callBackFunc.call(this.arg);
                }
                break;
            default:
                break;
        }
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Module_friends.prototype.receiveMsgFromModule = function (msgType, dataObj) {
        if (dataObj === void 0) { dataObj = null; }
        switch (msgType) {
            case MainNotify.OPENFRIENDSPANEL:
                this.createView();
                break;
            case MainNotify.PRIVATEDATACATCH:
                this.addChatData(dataObj);
                break;
            case MainNotify.SAYSUCESS:
                //设置私聊数据
                var obj = {};
                obj.playerId = dataObj.playerId;
                obj.content = dataObj.content;
                obj.type = 0;
                if (!DataCenter.friendChatData.hasKey(dataObj.playerId)) {
                    DataCenter.friendChatData.add(dataObj.playerId, []);
                }
                DataCenter.friendChatData.get(dataObj.playerId).push(obj);
                /**设置最近联系人数据 */
                if (this.recentList.indexOf(dataObj.playerId) == -1) {
                    this.recentList.push(dataObj.playerId);
                }
                var friendInfo = DataCenter.friendData.get(data.FriendState.Friend + "");
                if (!friendInfo) {
                    friendInfo = [];
                }
                this.calculRecentList(friendInfo);
                if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
                    this.view.setChatData();
                }
                break;
            case MainNotify.RECEIVESAY:
                if (dataObj.playerId !== DataCenter.playerId) {
                    //其它用户发来的消息
                    var obj = {};
                    obj.playerId = dataObj.playerId;
                    obj.content = dataObj.content;
                    obj.type = 1;
                    if (!DataCenter.friendChatData.hasKey(dataObj.playerId)) {
                        DataCenter.friendChatData.add(dataObj.playerId, []);
                    }
                    DataCenter.friendChatData.get(dataObj.playerId).push(obj);
                    this.createRecentFriendInfo(dataObj.friendInfo);
                    if (this.recentList.indexOf(dataObj.playerId) == -1) {
                        this.recentList.push(dataObj.playerId);
                    }
                    this.calculRecentList([dataObj.friendInfo]);
                    if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
                        this.view.setChatData();
                    }
                }
                break;
            default:
                break;
        }
    };
    Module_friends.prototype.createView = function () {
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.removeView();
        }
        else {
            //打开角色面板
            this.view = new View_friends();
            _super.prototype.createView.call(this);
            this.view.stateName = "recent";
        }
    };
    Module_friends.prototype.removeView = function () {
        //关闭角色面板
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.view.removeEvent();
            this.view.parent.removeChild(this.view);
        }
    };
    /**
     * 更新好友数据
     */
    Module_friends.prototype.updateFriendsData = function (msg) {
        for (var i = 0, item; i < msg.length; i++) {
            item = msg[i];
            var obj = {};
            obj.playerId = item.playerId;
            obj.state = item.state;
            obj.name = item.name;
            var attr = [data.PlayerAttr.rebornID, data.PlayerAttr.levID, data.PlayerAttr.FightValue, data.PlayerAttr.head];
            var attrObj = GlobalFunc.searchMoreAttrValue(attr, item.playerAttrList);
            var rebornTemple = temple.TempleManager.select(attrObj[data.PlayerAttr.rebornID]);
            var rebornLev = rebornTemple.RELev;
            obj.reborn = rebornLev;
            obj.level = attrObj[data.PlayerAttr.levID];
            obj.FightValue = attrObj[data.PlayerAttr.FightValue];
            obj.head = attrObj[data.PlayerAttr.head];
            if (!DataCenter.friendData.hasKey(item.state + "")) {
                DataCenter.friendData.add(item.state + "", []);
            }
            DataCenter.friendData.get(item.state + "").push(obj);
            DataCenter.allFriendData.push(obj);
        }
        var blackList = DataCenter.friendData.get(data.FriendState.Blacklist + "");
        if (blackList && blackList.length) {
            this.sendMsgToModule([ModuleEnum.CHAT], MainNotify.FILTERCHAT);
        }
        this.calculRecentList(DataCenter.friendData.get(data.FriendState.Friend + ""));
        if (this.view && this.view.parent && this.view.parent.contains(this.view)) {
            this.changeViewData();
        }
    };
    /**生成私聊对象基础信息 */
    Module_friends.prototype.createRecentFriendInfo = function (obj) {
        var any = {};
        any.playerId = obj.playerId;
        any.head = obj.head;
        any.name = obj.name;
        any.state = obj.state;
        if (!DataCenter.friendData.hasKey(any.state + "")) {
            DataCenter.friendData.add(any.state + "", []);
        }
        DataCenter.friendData.get(any.state + "").push(any);
    };
    Module_friends.prototype.calculRecentList = function (friendObj) {
        if (!DataCenter.friendData.hasKey("3")) {
            DataCenter.friendData.add("3", []);
        }
        DataCenter.friendData.modify("3", []);
        // var friendList:any[] = DataCenter.friendData.get(data.FriendState.Friend+"");
        if (friendObj && friendObj.length) {
            for (var i = 0; i < this.recentList.length; i++) {
                for (var j = 0; j < friendObj.length; j++) {
                    if (friendObj[j].playerId === this.recentList[i]) {
                        DataCenter.friendData.get("3").push(friendObj[j]);
                    }
                }
            }
        }
    };
    Module_friends.prototype.changeViewData = function () {
        if (this.curState == "friend") {
            this.view.stateName = "friend";
        }
        else if (this.curState == "recent") {
            this.view.stateName = "recent";
        }
        else if (this.curState == "chat") {
            this.view.stateName = "chat";
        }
    };
    Module_friends.prototype.onFriendOper = function (evt) {
        this.operType = evt.c_data.type;
        var msg;
        this.callBackFunc = null;
        this.arg = null;
        switch (evt.c_data.type) {
            case 0:
                //根据名字添加好友
                msg = new proto.c_AddFriendByName();
                msg.friendName = evt.c_data.operData.name;
                break;
            case 1:
                //屏蔽
                msg = new proto.c_AddBlacklist();
                msg.playerId = evt.c_data.operData.playerId;
                break;
            case 2:
            //删除好友
            case 3:
                //移出黑名单
                msg = new proto.c_DelFriend();
                msg.friendId = evt.c_data.operData.playerId;
                break;
            default:
                break;
        }
        if (evt.c_data.callBack && evt.c_data.arg) {
            this.callBackFunc = evt.c_data.callBack;
            this.arg = evt.c_data.arg;
        }
        SocketManager.getInstance().sendProto(msg);
    };
    Module_friends.prototype.addBlackList = function (state, playerId) {
        var list = DataCenter.friendData.get(data.FriendState.Friend + "");
        for (var i = 0; i < list.length; i++) {
            if (list[i].playerId === playerId) {
                if (!DataCenter.friendData.hasKey(state + "")) {
                    DataCenter.friendData.add(state + "", []);
                }
                list[i].state = data.FriendState.Blacklist;
                DataCenter.friendData.get(state + "").push(list[i]);
                list.splice(i, 1);
                break;
            }
        }
    };
    /**移除最近联系人相关数据 */
    Module_friends.prototype.removeRecentLyData = function (playerId) {
        var recentlyList = DataCenter.friendData.get("3");
        if (recentlyList && recentlyList.length) {
            for (var i = 0; i < recentlyList.length; i++) {
                if (recentlyList[i].playerId === playerId) {
                    recentlyList.splice(i, 1);
                    break;
                }
            }
        }
        if (this.recentList.indexOf(playerId) != -1) {
            this.recentList.splice(this.recentList.indexOf(playerId), 1);
        }
        var chatData = DataCenter.friendChatData.get(playerId);
        if (chatData && chatData.length) {
            DataCenter.friendChatData.remove(playerId);
        }
    };
    Module_friends.prototype.removePlayerIdFromDict = function (state, playerId) {
        var list = DataCenter.friendData.get(state + "");
        if (list && list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].playerId === playerId) {
                    list.splice(i, 1);
                    break;
                }
            }
            for (var j = 0; j < DataCenter.allFriendData.length; j++) {
                if (DataCenter.allFriendData[i].playerId === playerId) {
                    DataCenter.allFriendData.splice(j, 1);
                    break;
                }
            }
        }
    };
    Module_friends.prototype.sendChatToServer = function (playerId, content) {
        //发送聊天到服务器
        var msg = new proto.c_say();
        msg.channel = 4;
        msg.content = content;
        msg.sendTo = playerId;
        SocketManager.getInstance().sendProto(msg);
    };
    Module_friends.prototype.addChatData = function (msg) {
        for (var i = 0; i < msg.length; i++) {
            var playerId = msg[i].privateBasicInfo.instanceId;
            if (this.recentList.indexOf(playerId) == -1) {
                this.recentList.push(playerId);
            }
            var any = {};
            any.name = msg[i].senderBasicInfo.name;
            any.content = msg[i].content;
            any.timeSpan = msg[i].timeSpan;
            if (playerId === DataCenter.playerId) {
                any.type = 1;
            }
            else {
                any.type = 0;
            }
            any.playerId = playerId;
            if (!DataCenter.friendChatData.hasKey(playerId)) {
                DataCenter.friendChatData.add(playerId, []);
            }
            DataCenter.friendChatData.get(playerId).push(any);
            // var arr:Array<any>=DataCenter.friendChatData.get(playerId);
            // arr.push(any);
            // DataCenter.friendChatData.modify(playerId,arr);
            if (this.curState == "chat") {
                if (!this.view.chatTargetName || this.view.chatTargetName == any.name) {
                    this.view.stateName = "chat";
                }
            }
        }
    };
    return Module_friends;
}(Base_module));
__reflect(Module_friends.prototype, "Module_friends");
//# sourceMappingURL=Module_friends.js.map