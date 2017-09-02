var GlobalFunc;
(function (GlobalFunc) {
    /**排序方式--从小到大 */
    GlobalFunc.NORMALIZE = "normalize";
    /**排序方式--从大道小 */
    GlobalFunc.REVERSE = "reverse";
    /**深复制 */
    function deepCopy(source) {
        var arr = [];
        for (var i = 0; i < source.length; i++) {
            var result = {};
            for (var key in source[i]) {
                result[key] = source[i][key];
            }
            arr.push(result);
        }
        return arr;
    }
    GlobalFunc.deepCopy = deepCopy;
    /**深复制字典 */
    function deepCopyDict(source) {
        var dic = new Dictionary("");
        for (var key in source.dict) {
            var arr = GlobalFunc.deepCopy(source.dict[key]);
            dic.add(key, arr);
        }
        return dic;
    }
    GlobalFunc.deepCopyDict = deepCopyDict;
    function setBgData(quality) {
        var obj = {};
        if (quality != 1) {
            obj.boxS = "bag_" + quality + "_box_png";
        }
        else {
            obj.boxS = "bag_1_box_png";
        }
        obj.color = DataCenter.bag.qualityColor[quality];
        return obj;
    }
    GlobalFunc.setBgData = setBgData;
    function getPositionWord(pos) {
        var cnt = "";
        switch (pos) {
            case data.EquipPos.body:
                cnt = "衣服";
                break;
            case data.EquipPos.head:
                cnt = "头盔";
                break;
            case data.EquipPos.left_bracelet:
            case data.EquipPos.right_bracelet:
                cnt = "手镯";
                break;
            case data.EquipPos.left_ring:
            case data.EquipPos.right_ring:
                cnt = "戒指";
                break;
            case data.EquipPos.weapon:
                cnt = "武器";
                break;
            case data.EquipPos.neck:
                cnt = "项链";
                break;
        }
        return cnt;
    }
    GlobalFunc.getPositionWord = getPositionWord;
    function getJobWord(job) {
        var jobStr = "";
        switch (job) {
            case data.JobAttr.Player:
                jobStr = "通用";
                break;
            case data.JobAttr.JS:
                jobStr = "战士";
                break;
            case data.JobAttr.FS:
                jobStr = "法师";
                break;
            case data.JobAttr.DS:
                jobStr = "道士";
                break;
        }
        return jobStr;
    }
    GlobalFunc.getJobWord = getJobWord;
    function formatTipsInfo(attrId) {
        var attrCnt;
        switch (attrId) {
            case data.ItemAttr.ATK:
                attrCnt = "攻击: ";
                break;
            case data.ItemAttr.MHP:
                attrCnt = "生命: ";
                break;
            case data.ItemAttr.DEF:
                attrCnt = "物防: ";
                break;
            case data.ItemAttr.MDEF:
                attrCnt = "魔防: ";
                break;
            case data.ItemAttr.MMP:
                attrCnt = "魔法: ";
                break;
        }
        return attrCnt;
    }
    GlobalFunc.formatTipsInfo = formatTipsInfo;
    //验证内容是否包含空格
    function checkTextSpace(content, temp) {
        if (temp === void 0) { temp = 1; }
        var reg = /(^\s+)|(\s+$)/g;
        //temp用来标识内容是否允许存在空格1为可存在0为不存在
        // if(temp==1){
        reg = /\s+/g;
        // }
        var content2 = content.replace(reg, "");
        if (!content2) {
            return false;
        }
        return true;
    }
    GlobalFunc.checkTextSpace = checkTextSpace;
    /**获取属性相关汉字描述 */
    function getAttrWordEnum(attrId) {
        var obj = {};
        switch (attrId) {
            case data.PlayerAttr.money:
                obj.word = DataCenter.wordGather["money"];
                obj.color = ColorTipsEnum.COLOR_GOLD;
                break;
            case data.PlayerAttr.gold:
                obj.word = DataCenter.wordGather["gold"];
                obj.color = ColorTipsEnum.COLOR_GOLD;
                break;
            case data.PlayerAttr.exp:
                obj.word = DataCenter.wordGather["exp"];
                obj.color = ColorTipsEnum.COLOR_EXPERIENCE;
                break;
            case data.PlayerAttr.jx_zhenqi:
                obj.word = DataCenter.wordGather["jx_zhenqi"];
                obj.color = ColorTipsEnum.COLOR_DEFAULT;
                break;
            case data.PlayerAttr.xiuwei:
                obj.word = DataCenter.wordGather["xiuwei"];
                obj.color = ColorTipsEnum.COLOR_DEFAULT;
                break;
        }
        return obj;
    }
    GlobalFunc.getAttrWordEnum = getAttrWordEnum;
    /**读取单个属性 */
    function searchAttrValue(searchId, searchSource) {
        for (var i = 0, len = searchSource.length, item; i < len; i++) {
            item = searchSource[i];
            if (searchId === item.attrID) {
                return item.myvalue;
            }
        }
    }
    GlobalFunc.searchAttrValue = searchAttrValue;
    /**读取多个属性 */
    function searchMoreAttrValue(searchIdList, searchSource) {
        var obj = {};
        for (var j = 0, len2 = searchIdList.length, id; j < len2; j++) {
            id = searchIdList[j];
            for (var i = 0, len = searchSource.length, item; i < len; i++) {
                item = searchSource[i];
                if (item.attrID === id) {
                    obj[id] = item.myvalue;
                    continue;
                }
            }
        }
        return obj;
    }
    GlobalFunc.searchMoreAttrValue = searchMoreAttrValue;
    /**排序规则 */
    function sortRule(type, comparingValues, sourceCollection) {
        var relationNum = 1;
        if (type === GlobalFunc.NORMALIZE) {
            relationNum = 1;
        }
        else {
            relationNum = -1;
        }
        function compareFunc(item1, item2) {
            var a, b;
            if (comparingValues != "") {
                a = item1[comparingValues];
                b = item2[comparingValues];
            }
            else {
                a = item1;
                b = item2;
            }
            if (a > b) {
                return relationNum;
            }
            else if (a < b) {
                return -relationNum;
            }
            else {
                return 0;
            }
        }
        return sourceCollection.sort(compareFunc);
    }
    GlobalFunc.sortRule = sortRule;
    /**根据对象键值排序 */
    function sortByKey(source) {
        var objKeys = Object.keys(source);
        return source;
    }
    GlobalFunc.sortByKey = sortByKey;
    /**时间格式化 */
    function formatTime(timespan, ufc, extra) {
        if (ufc === void 0) { ufc = true; }
        if (extra === void 0) { extra = false; }
        var data = new Date((timespan > 0 ? timespan : -timespan) * 1000);
        var year = data.getFullYear();
        var day = data.getDate();
        var hour = data.getHours();
        var month = data.getMonth() + 1;
        var day = data.getDate();
        var minutes = data.getMinutes();
        var seconds = data.getSeconds();
        var str2 = "";
        var str = "";
        if (ufc) {
            str2 = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day) + "\t";
            str = (hour < 10 ? "0" + hour : hour) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            return str2 + str;
        }
        else {
            if (extra) {
                hour = Math.floor(timespan / 3600);
                minutes = Math.floor(timespan % 3600 / 60);
                seconds = Math.floor(timespan % 3600 % 60);
                str = (hour < 10 ? "0" + hour : hour) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
            }
            else {
                day = Math.floor(timespan / 24 / 60 / 60);
                hour = Math.floor(timespan % (24 * 60 * 60) / 3600);
                minutes = Math.floor(timespan % (24 * 60 * 60) % 3600 / 60);
                str = day + "天" + hour + "时" + minutes + "分";
            }
            return str;
        }
    }
    GlobalFunc.formatTime = formatTime;
    /**初始化锻造数据 */
    function setForgingData(arr) {
        var dict = new Dictionary("");
        var qianghuaArr = [];
        var gemArr = [];
        var zhulingArr = [];
        var refiningArr = [];
        var qita = {};
        for (var i = 0, item; i < arr.length; i++) {
            var any = {};
            item = arr[i];
            any.value = item.strengthId;
            var template = temple.TempleManager.select(item.strengthId);
            try {
                any.pos = template.pos;
            }
            catch (err) {
                console.log(item.strengthId);
            }
            switch (any.pos) {
                case data.EquipPos.weapon:
                    any.index = 0;
                    break;
                case data.EquipPos.head:
                    any.index = 1;
                    break;
                case data.EquipPos.body:
                    any.index = 2;
                    break;
                case data.EquipPos.neck:
                    any.index = 3;
                    break;
                case data.EquipPos.left_bracelet:
                    any.index = 4;
                    break;
                case data.EquipPos.right_bracelet:
                    any.index = 5;
                    break;
                case data.EquipPos.left_ring:
                    any.index = 6;
                    break;
                case data.EquipPos.right_ring:
                    any.index = 7;
                    break;
            }
            switch (item.type) {
                case 1:
                    qianghuaArr.push(any);
                    break;
                case 2:
                    gemArr.push(any);
                    break;
                case 3:
                    zhulingArr.push(any);
                    break;
                case 4:
                    refiningArr.push(any);
                    break;
                default:
                    qita[item.type] = any.value;
                    break;
            }
        }
        qianghuaArr.sort(this.sortArrByIndex);
        gemArr.sort(this.sortArrByIndex);
        zhulingArr.sort(this.sortArrByIndex);
        refiningArr.sort(this.sortArrByIndex);
        dict.add("qianghua", qianghuaArr);
        dict.add("gem", gemArr);
        dict.add("zhuling", zhulingArr);
        dict.add("refining", refiningArr);
        dict.add("other", qita);
        return dict;
    }
    GlobalFunc.setForgingData = setForgingData;
    /**
     * 显示战力增长值相关tips
     *
     * @:fightValue {number} 战力基础值
     * @:combatValueArr {number[]} 战力提升集合
     *
     * */
    function showPowerUpTips(fightValue, combatValueArr) {
        function getSum(array) {
            var sum = 0;
            for (var i = 0; i < array.length; i++) {
                sum += array[i];
            }
            return sum;
        }
        function showPowerRes() {
            var valueArr = [];
            valueArr = valueArr.concat(combatValueArr);
            var obj = { w: 300, h: 20, text: "+" + getSum(valueArr), x: (Config.curWidth() >> 1) + 50, y: (Config.curHeight() >> 1) };
            var parentCon = ViewController.getInstance().getContainer().layer_popup;
            PopTipsManager.showUpGradeTips(obj, parentCon, null, this);
        }
        var x = (Config.curWidth() >> 1) - 135;
        var y = (Config.curHeight() >> 1) + 40;
        PopTipsManager.showPowerTips(x, y, fightValue, showPowerRes, this);
    }
    GlobalFunc.showPowerUpTips = showPowerUpTips;
    /**生成人物当前角色装备战力集合 */
    function creteRolePowerObj(euqips, job) {
        var minEquipValuObj = {};
        for (var i = 0, len = euqips.length, item; i < len; i++) {
            item = euqips[i];
            var posAndScoreObj = GlobalFunc.searchMoreAttrValue([data.ItemAttr.equipPos, data.ItemAttr.score], item.attrList);
            minEquipValuObj[posAndScoreObj[data.ItemAttr.equipPos]] = posAndScoreObj[data.ItemAttr.score];
        }
        DataCenter.roleMinEquipValueObj[job] = minEquipValuObj;
    }
    GlobalFunc.creteRolePowerObj = creteRolePowerObj;
    /**
     * 挑战副本公共方法
     * @levelId {number} {关卡id}
     * @fuben {number} {当前副本}
     */
    function changeSence(levelId, arg, openModule, msg, dataObj) {
        if (openModule === void 0) { openModule = ""; }
        if (msg === void 0) { msg = ""; }
        if (dataObj === void 0) { dataObj = {}; }
        var msg_challenge = new proto.c_CreateNewSence();
        DataCenter.changeSenceState = true;
        msg_challenge.levelStageID = levelId;
        SocketManager.getInstance().sendProto(msg_challenge);
        // arg.sendMsgToModule([ModuleEnum.MAP],MainNotify.INITDATA);
        if (openModule) {
            arg.sendMsgToModule([openModule], msg, dataObj);
        }
    }
    GlobalFunc.changeSence = changeSence;
})(GlobalFunc || (GlobalFunc = {}));
//# sourceMappingURL=GlobalFunc.js.map