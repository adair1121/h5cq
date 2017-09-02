var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Chat_ItemRenderer = (function (_super) {
    __extends(Chat_ItemRenderer, _super);
    function Chat_ItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "Chat_ItemRenderer_skin";
        _this.btn_addBlack.label = "屏蔽";
        _this.btn_addBlack.size = 16;
        _this.btn_addFriend.label = "好友";
        _this.btn_addFriend.size = 16;
        return _this;
    }
    Chat_ItemRenderer.prototype.dataChanged = function () {
        if (this.data.state == "system") {
            this.stateName = "system";
            this.invalidateState();
            this.setSystemData();
        }
        else {
            this.stateName = "default";
            this.group_btnGroup.visible = false;
            this.invalidateState();
            this.setDefaultData();
        }
    };
    Chat_ItemRenderer.m_Sysheight = function () {
        return Chat_ItemRenderer._Sysheight;
    };
    Chat_ItemRenderer.m_Defaultheight = function () {
        return Chat_ItemRenderer._DefaultHeight;
    };
    Chat_ItemRenderer.prototype.setBtnVisible = function (visible) {
        this.group_btnGroup.visible = visible;
    };
    Object.defineProperty(Chat_ItemRenderer.prototype, "btnGroupVisible", {
        get: function () {
            return this.group_btnGroup.visible;
        },
        enumerable: true,
        configurable: true
    });
    Chat_ItemRenderer.prototype.getCurrentState = function () {
        if (this.stateName) {
            return this.stateName;
        }
        return _super.prototype.getCurrentState.call(this);
    };
    Chat_ItemRenderer.prototype.setDefaultData = function () {
        this.roleData = this.data.roleData;
        //type区分是普通，公告，系统
        this.icon.data = { roleIcon: "head_" + 1 + "_" + 1 + "_png" };
        // if(this.data.type==0){
        // 	this.icon.visible=true;
        // 	this.chatSysImgIcon.visible=false;
        // 	this.icon.data={roleIcon:"head_"+1+"_"+1+"_png"};
        // }else{
        // 	this.icon.visible=false;
        // 	this.chatSysImgIcon.visible=true;
        // 	this.chatSysImgIcon.source="chat_msgType"+this.data.type+"_png";
        // }
        this.group.removeChildren();
        if (this.roleData && this.roleData.yueka) {
            var yueka = new eui.BitmapLabel();
            yueka.font = "vipFont_fnt";
            yueka.text = "月";
            this.group.addChild(yueka);
        }
        if (this.roleData && this.roleData.vip != 0) {
            var vip = new eui.BitmapLabel();
            vip.font = "vipFont_fnt";
            vip.text = "v" + this.roleData.vip;
            this.group.addChild(vip);
        }
        //如果是工会，，要显示职位
        // if(this.data.state=="gang"&&this.roleData.position){
        // 	var position:eui.Label=new eui.Label();
        // 	position.size=16;
        // 	position.textColor=0xfedc1b;
        // 	position.fontFamily="SimHei";
        // 	position.text="["+this.roleData.position+"]";
        // 	this.group.addChild(position);
        // }
        var name = new eui.Label();
        name.size = 16;
        name.textColor = 0x0fb8ff;
        name.fontFamily = "SimHei";
        name.text = this.data.name;
        this.group.addChild(name);
        this.content.text = this.data.content;
    };
    Chat_ItemRenderer.prototype.setSystemData = function () {
        this.chatSysImgIcon.source = "chat_msgType" + this.data.type + "_png";
        this.notice.text = this.data.content;
        //拼接文本内容
        this.content.textFlow = [
            { text: "妈妈再也不用担心我在", style: { "size": 20 } },
            { text: "Egret", style: { "textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2 } },
            { text: "里说一句话不能包含", style: { "fontFamily": "楷体" } },
            { text: "各种", style: { "fontFamily": "楷体", "underline": true } },
            { text: "五", style: { "textColor": 0xff0000 } },
            { text: "彩", style: { "textColor": 0x00ff00 } },
            { text: "缤", style: { "textColor": 0xf000f0 } },
            { text: "纷", style: { "textColor": 0x00ffff } },
            { text: "、\n" },
            { text: "大", style: { "size": 56 } },
            { text: "小", style: { "size": 16 } },
            { text: "不", style: { "size": 26 } },
            { text: "一", style: { "size": 34 } },
            { text: "、" },
            { text: "格", style: { "italic": true, "textColor": 0x00ff00 } },
            { text: "式", style: { "size": 26, "textColor": 0xf000f0 } },
            { text: "各", style: { "italic": true, "textColor": 0xf06f00 } },
            { text: "样的文字", style: { "fontFamily": "KaiTi" } },
            { text: "了！" }
        ];
        ;
    };
    return Chat_ItemRenderer;
}(eui.ItemRenderer));
Chat_ItemRenderer._Sysheight = 50;
Chat_ItemRenderer._DefaultHeight = 100;
__reflect(Chat_ItemRenderer.prototype, "Chat_ItemRenderer");
//# sourceMappingURL=Chat_ItemRenderer.js.map