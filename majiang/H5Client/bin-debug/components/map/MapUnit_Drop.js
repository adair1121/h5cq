var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MapUnit_Drop = (function (_super) {
    __extends(MapUnit_Drop, _super);
    function MapUnit_Drop() {
        var _this = _super.call(this) || this;
        _this.qualityColor = {};
        _this.qualityColor = DataCenter.bag.qualityColor;
        _this.state = MapUnitState.STAND;
        return _this;
    }
    MapUnit_Drop.prototype.setDropInfo = function (dropInfo) {
        this.isCreated = false;
        var template = temple.TempleManager.select(dropInfo.templeID);
        this._dropId = template.dropIcon;
        this.quality = template.itemQuality;
        this.eName = template.name;
        var configPath = Config.path_drop;
        var obj = { quality: this.quality, label: this.eName, tid: dropInfo.templeID };
        if (template.itemtype2 === data.ItemType.money) {
            //金币
            configPath = Config.path_goods;
            obj.num = dropInfo.num;
            obj.type = TipsEnum.TYPE_GOLD;
            obj.quality = 4;
        }
        else {
            obj.num = 1;
            obj.type = TipsEnum.TYPE_EQUIP;
            configPath = Config.path_equip;
        }
        DataCenter.bag.curDropGroup.push(obj);
        if (AssetsManager.getAsset(this._dropId + "") == null) {
            var dict = AssetsManager.loadAssetsQueue([this._dropId + ""], this.loadEquipRes, configPath, this);
        }
        else {
            this.loadEquipRes();
        }
    };
    MapUnit_Drop.prototype.loadEquipRes = function () {
        var dropEquip = new egret.Bitmap(AssetsManager.getAsset(this._dropId + ""));
        var label = new eui.Label();
        label.size = 12;
        label.fontFamily = "SimHei";
        // label.bold = true;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.textColor = this.qualityColor[this.quality];
        label.stroke = 1;
        label.strokeColor = 0x000000;
        dropEquip.scaleX = dropEquip.scaleY = 0.6;
        this.addChild(dropEquip);
        this.addChild(label);
        label.text = this.eName;
        label.anchorOffsetX = label.width >> 1;
        dropEquip.anchorOffsetX = dropEquip.width >> 1;
        dropEquip.anchorOffsetY = dropEquip.height >> 1;
        this.isCreated = true;
        label.y = dropEquip.y - ((dropEquip.height * 0.6) >> 1) - label.height + 5;
    };
    Object.defineProperty(MapUnit_Drop.prototype, "dropId", {
        get: function () {
            return this._dropId;
        },
        enumerable: true,
        configurable: true
    });
    return MapUnit_Drop;
}(Base_MapUnit));
__reflect(MapUnit_Drop.prototype, "MapUnit_Drop");
//# sourceMappingURL=MapUnit_Drop.js.map