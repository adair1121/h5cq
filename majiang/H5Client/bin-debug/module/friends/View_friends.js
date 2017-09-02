var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View_friends = (function (_super) {
    __extends(View_friends, _super);
    function View_friends() {
        var _this = _super.call(this) || this;
        _this._stateName = "recent";
        _this.skinName = "View_friends_skin";
        return _this;
    }
    Object.defineProperty(View_friends.prototype, "chatTargetName", {
        get: function () {
            return this._chatTargetName;
        },
        set: function (v) {
            this._chatTargetName = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View_friends.prototype, "stateName", {
        get: function () { return this._stateName; },
        set: function (v) { this._stateName = v; this.changeState(); this.curModule.curState = v; },
        enumerable: true,
        configurable: true
    });
    View_friends.prototype.getCurrentState = function () { return this.stateName; };
    View_friends.prototype.childrenCreated = function () {
        this.initialize();
        // this.bindData();
        this.touchEnabled = true;
    };
    View_friends.prototype.initialize = function () {
        this.curModule = this.module;
        this.btn_add.label = "添加好友";
        this.btn_add.labelTxt.size = 16;
        this.btn_blackList.label = "黑名单";
        this.btn_blackList.labelTxt.size = 16;
        this.btn_friend.setAttr({ text: "好友", size: 18 });
        this.btn_recently.setAttr({ text: "最近", size: 18 });
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTapHandler, this);
        // this.list.addEventListener("startChat",this.startChatHandler,this);
        this.scroller.viewport = this.list;
        this.collection = new eui.ArrayCollection();
        this.list.dataProvider = this.collection;
        this.layer = ViewController.getInstance().getContainer().layer_popup;
    };
    View_friends.prototype.btnClickHandler = function (event) {
        switch (event.target) {
            case this.btn_add.button:
                var friendOperPop = new Friends_popup("addFriend");
                PopUpManager.addPopUp(friendOperPop, true, friendOperPop.skinName, this.layer, 0);
                break;
            case this.btn_blackList.button:
                var friendOperPop2 = new Friends_popup("blackList");
                PopUpManager.addPopUp(friendOperPop2, true, friendOperPop2.skinName, this.layer, 0);
                break;
            case this.btn_friend.button:
                this.stateName = "friend";
                break;
            case this.btn_recently.button:
                this.stateName = "recent";
                break;
            case this.btn_send:
                var content = this.txt_input.text;
                if (!GlobalFunc.checkTextSpace(content)) {
                    this.txt_input.text = "";
                    var obj = { type: TipsEnum.TYPE_WARN, label: "请输入正确的内容" };
                    PopTipsManager.showPopTips([obj]);
                    return;
                }
                var obj = { playerId: this.playerId, content: this.txt_input.text, channel: 4 };
                this.curModule.sendMsgToModule([ModuleEnum.CHAT], MainNotify.PRIVATESAY, obj);
                this.txt_input.text = "";
                // this.curModule.sendChatToServer(this.playerId,this.txt_input.text);
                break;
            case this.returnBtn:
                this.curModule.removeView();
                break;
            case this.removeFrientBtn:
                Global.dispatchEvent(MainNotify.FRIENDS_OPER, { type: 2, operData: { playerId: this.playerId } });
                break;
            case this.addBlackListBtn:
                var blackList = DataCenter.friendData.get(data.FriendState.Blacklist + "");
                if (blackList && blackList.length && blackList.length >= DataCenter.balckListTotalNum) {
                    var obj = { type: TipsEnum.TYPE_WARN, label: "黑名单已达上限" };
                    PopTipsManager.showPopTips([obj]);
                    return;
                }
                Global.dispatchEvent(MainNotify.FRIENDS_OPER, { type: 1, operData: { playerId: this.playerId } });
                // this.curModule.addFriendToBlackList();
                break;
            case this.chatBtn:
                this.startChatHandler(this.chatFriend.name);
                break;
            default:
                break;
        }
    };
    View_friends.prototype.itemTapHandler = function (event) {
        switch (this.stateName) {
            case "recent":
                this.chatFriend = event.item;
                this.chatTargetName = this.chatFriend.name;
                this.stateName = "chat";
                this.playerId = event.item.playerId;
                break;
            case "chat":
                this.chatFriend = event.item;
                this.playerId = event.item.playerId;
                break;
            case "friend":
                //显示按钮弹窗
                // this.curItem = this.list.getChildAt(event.itemIndex) as Friends_list_item;
                // this.chatFriend = event.item;
                // this.curItem.setBtnVisible(!this.curItem.btnGroupVisible);
                var len = event.target.numChildren;
                this.curItem = this.list.getChildAt(event.itemIndex);
                for (var i = 0; i < len; i++) {
                    var itemObj = event.target.getChildAt(i);
                    if (this.curItem != itemObj) {
                        itemObj.setBtnVisible(false);
                    }
                }
                this.chatFriend = event.item;
                this.curItem.setBtnVisible(!this.curItem.btnGroupVisible);
                this.playerId = event.item.playerId;
                this.removeFrientBtn = this.curItem.btn_removeFriend;
                this.addBlackListBtn = this.curItem.btn_addBlack;
                this.chatBtn = this.curItem.btn_chat;
                break;
            default:
                break;
        }
    };
    View_friends.prototype.startChatHandler = function (chatTargetName) {
        if (this.stateName != "friend") {
            return;
        }
        this.chatTargetName = chatTargetName;
        this.stateName = "chat";
    };
    View_friends.prototype.changeState = function () {
        this.invalidateState();
        this.btn_recently.setAttr({ currentState: "up" });
        this.btn_friend.setAttr({ currentState: "up" });
        switch (this.stateName) {
            case "recent":
                this.list.itemRenderer = Friends_list_item;
                this.setRecentData();
                this.btn_recently.setAttr({ currentState: "down" });
                break;
            case "chat":
                this.list.itemRenderer = Friend_chat_item;
                this.setChatData();
                this.btn_recently.setAttr({ currentState: "down" });
                break;
            case "friend":
                this.list.itemRenderer = Friends_list_item;
                this.setFriendsData();
                this.btn_friend.setAttr({ currentState: "down" });
                break;
            default:
                break;
        }
    };
    /**设置最近联系人页面数据 */
    View_friends.prototype.setRecentData = function () {
        var arr = [];
        var baseArr = DataCenter.friendData.get("3");
        if (!baseArr) {
            baseArr = [];
        }
        for (var i = 0; i < baseArr.length; i++) {
            var card = baseArr[i];
            var any = {};
            any.stateName = 'recently';
            any.name = card.name;
            any.head = card.head;
            any.reborn = card.reborn;
            any.level = card.level;
            any.FightValue = card.FightValue;
            any.playerId = card.playerId;
            // any.isOnline=card.isOnline;
            if (DataCenter.friendChatData.hasKey(any.playerId)) {
                var arr1 = DataCenter.friendChatData.get(any.playerId);
                any.record = arr1[arr1.length - 1].content;
            }
            else {
                any.record = "";
            }
            arr.push(any);
        }
        // this.ListData=arr;
        this.updateListData(arr);
    };
    /**设置好友页面数据 */
    View_friends.prototype.setFriendsData = function () {
        var arr = [];
        var baseArr = DataCenter.friendData.get(data.FriendState.Friend + "");
        if (!baseArr) {
            baseArr = [];
        }
        if (baseArr && baseArr.length) {
            for (var i = 0; i < baseArr.length; i++) {
                var card = baseArr[i];
                var any = {};
                any.stateName = 'friend';
                any.name = card.name;
                any.head = card.head;
                any.reborn = card.reborn;
                any.state = card.state;
                any.level = card.level;
                any.FightValue = card.FightValue;
                any.playerId = card.playerId;
                // any.isOnline=card.isOnline;
                // any.record="最后一句话";
                arr.push(any);
            }
        }
        // this.ListData=arr;
        this.updateListData(arr);
        this.txt_friendNum.text = arr.length + "/100";
    };
    /**设置私聊页面数据 */
    View_friends.prototype.setChatData = function () {
        var arr = [];
        var baseArr;
        if (DataCenter.friendChatData.hasKey(this.chatFriend.playerId)) {
            baseArr = DataCenter.friendChatData.get(this.chatFriend.playerId);
        }
        else {
            baseArr = [];
        }
        for (var i = 0; i < baseArr.length; i++) {
            var card1 = baseArr[i];
            // if(i>0){
            // 	var card0:any=baseArr[i-1];
            // 	if(card1.timeSpan-card0.timeSpan>=300000){
            // 		var time:any={stateName:"time",timeSpan:card1.timeSpan};
            // 		arr.push(time);
            // 	}
            // }else{
            // 	var time:any={stateName:"time",timeSpan:card1.timeSpan};
            // 	arr.push(time);
            // }
            var any = {};
            any.stateName = card1.type == 1 ? "Lchat" : "Rchat";
            any.content = card1.content;
            arr.push(any);
        }
        // this.ListData=arr;
        this.updateListData(arr, false);
        this.txt_input.text = "";
    };
    /**
     * 设置列表数据
     */
    View_friends.prototype.updateListData = function (source, isTop) {
        if (source === void 0) { source = []; }
        if (isTop === void 0) { isTop = true; }
        this.collection.source = [];
        this.collection.source = source;
        this.scroller.stopAnimation();
        this.scroller.validateNow();
        this.scroller.viewport.scrollV = 0;
        if (!isTop) {
            if (this.scroller.viewport.measuredHeight > this.scroller.height) {
                this.scroller.viewport.scrollV = this.scroller.viewport.measuredHeight - this.scroller.height;
            }
        }
    };
    View_friends.prototype.removeEvent = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClickHandler, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTapHandler, this);
        // this.list.removeEventListener("startChat",this.startChatHandler,this);
    };
    return View_friends;
}(Base_view));
__reflect(View_friends.prototype, "View_friends");
//# sourceMappingURL=View_friends.js.map