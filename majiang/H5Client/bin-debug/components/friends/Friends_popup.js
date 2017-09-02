var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Friends_popup = (function (_super) {
    __extends(Friends_popup, _super);
    function Friends_popup(state) {
        var _this = _super.call(this) || this;
        _this.m_state = "addFriend";
        _this.skinName = "Friends_popup_skin";
        _this.skin.currentState = state;
        return _this;
        // this.setSkinState(state);
    }
    Friends_popup.prototype.childrenCreated = function () {
        this.sureBtn.label = "确认";
        this.cancleBtn.label = "取消";
        this.arrayCollect = new eui.ArrayCollection();
        this.scroller.viewport = this.dataList;
        this.dataList.itemRenderer = Friends_list_item;
        this.dataList.dataProvider = this.arrayCollect;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.dataList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListTouch, this, true, 1);
        this.dataList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        eui.Binding.bindHandler(this.skin, ["currentState"], this.skinChange, this);
    };
    Friends_popup.prototype.setSkinState = function (state) {
        this.m_state = state;
        this.invalidateState();
    };
    Friends_popup.prototype.skinChange = function (value) {
        if (value === "blackList") {
            var blackList = DataCenter.friendData.get(data.FriendState.Blacklist + "");
            var num = blackList && blackList.length ? blackList.length : 0;
            this.arrayCollect.source = blackList;
            this.blackNum.text = num + "/" + DataCenter.balckListTotalNum;
        }
    };
    Friends_popup.prototype.getCurrentState = function () {
        return this.m_state;
    };
    Friends_popup.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.returnBtn:
            case this.cancleBtn:
                this.remove();
                break;
            case this.sureBtn:
                if (this.editText.text === "") {
                    var obj = [{ type: TipsEnum.TYPE_WARN, label: "用户名不能为空" }];
                    PopTipsManager.showPopTips(obj);
                    return;
                }
                else {
                    //发送添加朋友请求
                    Global.dispatchEvent(MainNotify.FRIENDS_OPER, { type: 0, operData: { name: this.editText.text } });
                    this.remove();
                    this.editText.text = "";
                }
                break;
        }
    };
    Friends_popup.prototype.onItemTap = function (evt) {
        this.curItem = this.dataList.getChildAt(this.dataList.selectedIndex);
        this.curItemData = evt.item;
    };
    Friends_popup.prototype.onListTouch = function (evt) {
        if (!this.curItem) {
            return;
        }
        switch (evt.target) {
            case this.curItem.removeBtn:
                //移除黑名单item
                Global.dispatchEvent(MainNotify.FRIENDS_OPER, { type: 3, operData: { playerId: this.curItemData.playerId }, callBack: this.callBack, arg: this });
                break;
        }
    };
    Friends_popup.prototype.callBack = function () {
        var blackList = DataCenter.friendData.get(data.FriendState.Blacklist + "");
        var num = blackList && blackList.length ? blackList.length : 0;
        this.arrayCollect.source = blackList;
        this.blackNum.text = num + "/" + DataCenter.balckListTotalNum;
    };
    Friends_popup.prototype.remove = function () {
        PopUpManager.removePopUp(this.skinName, 0);
    };
    return Friends_popup;
}(eui.Component));
__reflect(Friends_popup.prototype, "Friends_popup");
//# sourceMappingURL=Friends_popup.js.map