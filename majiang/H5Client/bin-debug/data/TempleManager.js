var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var temple;
(function (temple) {
    var TempleManager = (function () {
        function TempleManager() {
        }
        TempleManager.init = function () {
            var txts = [];
            RES.getResByUrl("resource/cfg/ItemTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/SkillTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/UnitTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/WingsTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/HumenTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/RebornTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/DropTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/StrengthenTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/DropItemTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/BuffTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/MapTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/JingMaiTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/DragonSoulTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/ShieldTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/GemstoneTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/ZhuLingTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/ShopTemple.txt", this.getShopFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/LevelStageTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/LevelStageTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/RoleInitTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/JobInitTemple.txt", this.getJobInitFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/WordTemple.txt", this.getWordFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/GlobalDefineTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/RankTemple.txt", this.getRankDataFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/AddBagTemple.txt", this.getBagRelationFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/LevelTemple.txt", this.getLevelDataFunc, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/EquipTemple.txt", this.getEquipData, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/FashionTemple.txt", this.getFashionData, this, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl("resource/cfg/BossTemple.txt", this.getFunc, this, RES.ResourceItem.TYPE_JSON);
        };
        //
        TempleManager.getFunc = function (da) {
            for (var o in da) {
                TempleManager.temples[o] = da[o];
            }
            // var obj=TempleManager.temples[1001015];
            // var C:data.UnitTemple=<data.UnitTemple>obj;
            // console.log(C.name);
        };
        TempleManager.getWordFunc = function (da) {
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                DataCenter.wordGather[da[o].enumValue] = da[o].word;
            }
        };
        TempleManager.getBagRelationFunc = function (da) {
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                DataCenter.bagGridRelation[da[o].addNumber] = da[o].yuanbaoNumber;
            }
        };
        TempleManager.getShopFunc = function (da) {
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                if (!DataCenter.storeData[da[o].shopType]) {
                    DataCenter.storeData[da[o].shopType] = [];
                }
                DataCenter.storeData[da[o].shopType].push(da[o].ID);
                if (da[o].shopType === 2) {
                    DataCenter.storeGoods[da[o].ItemID] = (da[o].ID);
                }
            }
        };
        TempleManager.getRankDataFunc = function (da) {
            if (!DataCenter.rankData) {
                DataCenter.rankData = {};
            }
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                if (!DataCenter.rankData[da[o].order]) {
                    DataCenter.rankData[da[o].order] = [];
                }
                DataCenter.rankData[da[o].order].push(da[o]);
            }
        };
        TempleManager.getLevelDataFunc = function (da) {
            if (!DataCenter.levelData) {
                DataCenter.levelData = {};
            }
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                DataCenter.levelData[da[o].Level] = da[o];
            }
        };
        TempleManager.getJobInitFunc = function (da) {
            if (!DataCenter.jobInitData) {
                DataCenter.jobInitData = {};
            }
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                DataCenter.jobInitData[da[o].job] = da[o];
            }
        };
        TempleManager.getEquipData = function (da) {
            if (!DataCenter.CJData) {
                DataCenter.CJData = {};
            }
            if (!DataCenter.CJTempleData) {
                DataCenter.CJTempleData = {};
            }
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                var str = da[o].equipPart.join("-");
                if (!DataCenter.CJData[str]) {
                    DataCenter.CJData[str] = [];
                }
                DataCenter.CJData[str].push(da[o]);
                DataCenter.CJTempleData[da[o].itemId] = da[o];
            }
        };
        TempleManager.getFashionData = function (da) {
            if (!DataCenter.fashionData) {
                DataCenter.fashionData = {};
            }
            for (var o in da) {
                TempleManager.temples[o] = da[o];
                if (!DataCenter.fashionData[da[o].clothesPart]) {
                    DataCenter.fashionData[da[o].clothesPart] = [];
                }
                DataCenter.fashionData[da[o].clothesPart].push(da[o]);
            }
        };
        TempleManager.select = function (id) {
            return TempleManager.temples[id];
        };
        return TempleManager;
    }());
    TempleManager.temples = [];
    temple.TempleManager = TempleManager;
    __reflect(TempleManager.prototype, "temple.TempleManager");
})(temple || (temple = {}));
//# sourceMappingURL=TempleManager.js.map