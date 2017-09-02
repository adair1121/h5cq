var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewController = (function () {
    function ViewController() {
    }
    ViewController.getInstance = function () {
        return ViewController.instance ? ViewController.instance : ViewController.instance = new ViewController();
    };
    ViewController.prototype.registStage = function (content) {
        this.container = new MainContainer();
        content.addChild(this.container);
    };
    ViewController.prototype.getContainer = function () {
        return this.container;
    };
    ViewController.prototype.addView = function (con, view, _x, _y) {
        if (_x === void 0) { _x = 0; }
        if (_y === void 0) { _y = 0; }
        con.addChild(view);
        view.x = _x;
        view.y = _y;
    };
    return ViewController;
}());
__reflect(ViewController.prototype, "ViewController");
//# sourceMappingURL=ViewController.js.map