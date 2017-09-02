var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Forging_DataUtil = (function () {
    function Forging_DataUtil() {
    }
    Forging_DataUtil.getQiangHuaData = function (arr, job) {
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            var any = {};
            var temp = temple.TempleManager.select(arr[i].value);
            if (temp.nextID != 0) {
                var tempNext = temple.TempleManager.select(temp.nextID);
                any.n_attrVal = tempNext.Attr;
            }
            else {
                any.n_attrVal = temp.Attr;
            }
            any.equipIntensify = temp.lev;
            any.itemNum = temp.itemNum;
            any.itemID = temp.itemID;
            any.FightValue = temp.FightValue;
            switch (job) {
                case 1:
                    any.attrType = temp.AttrEnum;
                    any.attrVal = temp.Attr;
                    // any.n_attrVal=tempNext.Attr;
                    break;
                case 2:
                    any.attrType = temp.AttrEnum;
                    any.attrVal = temp.Attr;
                    // any.n_attrVal=tempNext.Attr;
                    break;
                case 3:
                    any.attrType = temp.AttrEnum;
                    any.attrVal = temp.Attr;
                    // any.n_attrVal=tempNext.Attr;	
                    break;
                default:
                    break;
            }
            var str;
            switch (arr[i].index) {
                case 0:
                    str = "d_e_001";
                    break;
                case 1:
                    str = "d_e_002";
                    break;
                case 2:
                    str = "d_e_003";
                    break;
                case 3:
                    str = "d_e_004";
                    break;
                case 4:
                    str = "d_e_005";
                    break;
                case 5:
                    str = "d_e_005";
                    break;
                case 6:
                    str = "d_e_006";
                    break;
                case 7:
                    str = "d_e_006";
                    break;
                default:
                    break;
            }
            any.equipSource = Config.path_default_equip + str + ".png";
            arr1.push(any);
        }
        return arr1;
    };
    Forging_DataUtil.getGemData = function (arr) {
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            var any = {};
            var temp = temple.TempleManager.select(arr[i].value);
            any.lev = temp.lev;
            any.itemNum = temp.itemNum;
            any.attrType = temp.AttrEnum;
            any.attrVal = temp.Attr;
            any.equipIntensify = temp.lev;
            any.itemID = temp.itemID;
            any.FightValue = temp.FightValue;
            any.systemType = temp.systemType;
            var str;
            switch (arr[i].index) {
                case 0:
                    str = "d_e_001";
                    break;
                case 1:
                    str = "d_e_002";
                    break;
                case 2:
                    str = "d_e_003";
                    break;
                case 3:
                    str = "d_e_004";
                    break;
                case 4:
                    str = "d_e_005";
                    break;
                case 5:
                    str = "d_e_005";
                    break;
                case 6:
                    str = "d_e_006";
                    break;
                case 7:
                    str = "d_e_006";
                    break;
                default:
                    break;
            }
            any.equipSource = Config.path_default_equip + str + ".png";
            arr1.push(any);
        }
        return arr1;
    };
    Forging_DataUtil.getZhulingData = function (arr) {
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            var any = {};
            var temp = temple.TempleManager.select(arr[i].value);
            if (temp.nextID != 0) {
                var tempNext = temple.TempleManager.select(temp.nextID);
                any.n_attrVal = tempNext.Attr;
            }
            else {
                any.n_attrVal = temp.Attr;
            }
            any.equipIntensify = temp.lev;
            any.itemNum = temp.itemNum;
            any.attrType = temp.AttrEnum;
            any.attrVal = temp.Attr;
            any.itemID = temp.itemID;
            any.FightValue = temp.FightValue;
            any.systemType = temp.systemType;
            var str;
            switch (arr[i].index) {
                case 0:
                    str = "d_e_001";
                    break;
                case 1:
                    str = "d_e_002";
                    break;
                case 2:
                    str = "d_e_003";
                    break;
                case 3:
                    str = "d_e_004";
                    break;
                case 4:
                    str = "d_e_005";
                    break;
                case 5:
                    str = "d_e_005";
                    break;
                case 6:
                    str = "d_e_006";
                    break;
                case 7:
                    str = "d_e_006";
                    break;
                default:
                    break;
            }
            any.equipSource = Config.path_default_equip + str + ".png";
            arr1.push(any);
        }
        return arr1;
    };
    return Forging_DataUtil;
}());
__reflect(Forging_DataUtil.prototype, "Forging_DataUtil");
//# sourceMappingURL=Forging_DataUtil.js.map