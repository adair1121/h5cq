var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base_module = (function (_super) {
    __extends(Base_module, _super);
    function Base_module() {
        var _this = _super.call(this) || this;
        _this.bindData();
        return _this;
    }
    /**
     * 解析来自服务器的消息并处理
     * @param msg 模块对应的消息
     */
    Base_module.prototype.receiveMsgFromSever = function (msg) {
    };
    /**
     * 接收来自模块间的消息并分发
     * @param msg 消息列表
     */
    Base_module.prototype.receiveMsgFromModule = function (msgType, data) {
        if (data === void 0) { data = null; }
    };
    Base_module.prototype.sendMsgToModule = function (msgList, msgType, msgData) {
        if (msgData === void 0) { msgData = null; }
        ModuleManager.getInstance().receiveMsgFromModule(msgList, msgType, msgData);
    };
    Base_module.prototype.bindData = function () {
    };
    /**
     * 创建模块显示对象
     */
    Base_module.prototype.createView = function () {
        var layerUI = ViewController.getInstance().getContainer().layer_ui;
        var component = layerUI.getChildAt(0);
        var container = component["group"];
        var len = container.numChildren;
        var onlyNavView;
        for (var i = 0; i < len; i++) {
            var c_view = container.getChildAt(i);
            if (c_view.module.p_type === PanelType.MAINNAV) {
                onlyNavView = c_view;
            }
        }
        if (onlyNavView && (this.view.module.p_type === PanelType.MAINNAV)) {
            if (onlyNavView.parent && onlyNavView.parent.contains(onlyNavView)) {
                onlyNavView.removeView(0);
            }
        }
        ViewController.getInstance().addView(container, this.view);
    };
    Base_module.prototype.removeView = function (closeState) {
        if (closeState === void 0) { closeState = 1; }
        if (!!this.view) {
            this.view.parent.removeChild(this.view);
        }
    };
    Base_module.prototype.clearView = function () {
        var container = ViewController.getInstance().getContainer();
        var len = container.numChildren;
        for (var i = 0, item; i < len; i++) {
            item = container.getChildAt(i);
            item.removeChildren();
        }
    };
    Object.defineProperty(Base_module.prototype, "view", {
        get: function () { return this._view; },
        set: function (v) { this._view = v; this._view.module = this; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Base_module.prototype, "p_type", {
        get: function () { return this.m_type; },
        set: function (value) { this.m_type = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Base_module;
}(egret.EventDispatcher));
__reflect(Base_module.prototype, "Base_module");
var PanelType = (function () {
    function PanelType() {
    }
    return PanelType;
}());
PanelType.MAINNAV = "mainNav";
__reflect(PanelType.prototype, "PanelType");
//# sourceMappingURL=Base_module.js.map