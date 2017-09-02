var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Role_headCom = (function (_super) {
    __extends(Role_headCom, _super);
    function Role_headCom() {
        var _this = _super.call(this) || this;
        _this.curIndex = 0;
        _this.skinName = "Role_headCom_skin";
        return _this;
    }
    Role_headCom.prototype.childrenCreated = function () {
        this.headList.itemRenderer = RoleHeadItemRender;
        this.headSource = new eui.ArrayCollection();
        this.headList.dataProvider = this.headSource;
        // eui.Binding.bindHandler(this,["_sourceData"],this.soureChange,this);
        this.headList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRoleChange, this);
        // eui.Binding.bindHandler(DataCenter,["roleList"],this.updateHead,this);
        this.headList.selectedIndex = 0;
        this.layer = ViewController.getInstance().getContainer().layer_ui;
    };
    Role_headCom.prototype.updateHead = function (value, key) {
        if (value && value.length) {
            this.lockObj = {};
            var arr = [];
            for (var i = 0; i < 3; i++) {
                var obj = {};
                if (value[i]) {
                    var sex = value[i].sex;
                    var job = value[i].job;
                    obj["roleIcon"] = "head_" + job + "_" + sex + "_png";
                    obj["job"] = job;
                    obj["sex"] = sex;
                    obj["isClocked"] = true;
                    this.lockObj[job] = true;
                }
                else {
                    obj["isClocked"] = false;
                }
                arr.push(obj);
            }
            this.instanceKey = key;
            this.headSource.source = [];
            this.headSource.source = arr;
            this.headList.selectedIndex = this.curIndex;
        }
    };
    Role_headCom.prototype.soureChange = function (value) {
        if (value) {
            this.headSource.source = value;
        }
    };
    Role_headCom.prototype.onRoleChange = function (evt) {
        // 判断当前角色是否已经解锁
        // DataCenter.roleInfo.curRoleInfo["job"] = this.headList.selectedItem.job;
        this.curIndex = evt.itemIndex;
        if (this.headList.selectedItem.isClocked) {
            this.headList.selectedIndex = evt.itemIndex;
            Global.dispatchEvent(MainNotify.JOBCHAGNE, { job: this.headList.selectedItem.job, insKey: this.instanceKey });
        }
        else {
            //弹出解锁页面
            // this.headList.selectedIndex=evt.itemIndex;
            Global.dispatchEvent(MainNotify.CREATENEWROLE, this.lockObj);
        }
    };
    return Role_headCom;
}(eui.Component));
__reflect(Role_headCom.prototype, "Role_headCom");
//# sourceMappingURL=Role_headCom.js.map