var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AssetsManager = (function () {
    function AssetsManager() {
    }
    /**
     * 加载资源组
     * name:string 类型
     * assetSourceArr: string[]  要加载的资源组名称
     * callBackFunc:Function 回调函数
     * data:any 回调作用域
     */
    AssetsManager.loadGroup = function (name, assetSourceArr, callBackFunc, data) {
        if (callBackFunc === void 0) { callBackFunc = null; }
        if (data === void 0) { data = {}; }
        if (!AssetsManager.g_isLoad) {
            var data = {};
            data["name"] = name;
            data["assetSourceArr"] = assetSourceArr;
            data["callBack"] = callBackFunc;
            data["data"] = data;
            AssetsManager.g_map.push(data);
            return;
        }
        AssetsManager.g_isLoad = false;
        AssetsManager.g_name = name;
        AssetsManager.g_callback = callBackFunc;
        AssetsManager.g_data = data;
        var groupLoadRes = false;
        var len = assetSourceArr.length;
        AssetsManager.g_assetsSourceArr.length = 0;
        for (var i = 0; i < len; i++) {
            if (!RES.isGroupLoaded(assetSourceArr[i])) {
                AssetsManager.g_assetsSourceArr.push(assetSourceArr[i]);
                groupLoadRes = true;
            }
        }
        if (groupLoadRes) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            AssetsManager.index = 0;
            RES.loadGroup(AssetsManager.g_assetsSourceArr[AssetsManager.index]);
        }
        else {
            AssetsManager.g_callback(AssetsManager.g_data);
            AssetsManager.g_assetsSourceArr.length = 0;
            AssetsManager.g_isLoad = true;
            if (AssetsManager.g_map.length) {
                var temp = AssetsManager.g_map.shift();
                this.loadGroup(temp["name"], temp["assetSourceArr"], temp["callBack"], temp["data"]);
            }
        }
    };
    /**
     * 资源组加载完成
     */
    AssetsManager.onResourceLoadComplete = function (event) {
        //if (event.groupName == this.assetsSourceArr[this.index]) {
        egret.log("LoadComplete:" + event.groupName + " ");
        if (AssetsManager.g_assetsSourceArr.length > AssetsManager.index + 1) {
            AssetsManager.index++;
            RES.loadGroup(AssetsManager.g_assetsSourceArr[AssetsManager.index]);
        }
        else {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            AssetsManager.g_callback(AssetsManager.g_data);
            AssetsManager.g_isLoad = true;
            if (AssetsManager.g_map.length) {
                var temp = AssetsManager.g_map.shift();
                this.loadGroup(temp["name"], temp["assetsSourceArr"], temp["callback"], temp["data"]);
            }
        }
        //}
    };
    /**
     * 资源组加载失败
     */
    AssetsManager.onResourceLoadError = function (event) {
        //TODO
        egret.warn("LoadError:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
     *资源组加载进度
     */
    AssetsManager.onResourceProgress = function (event) {
        if (event.groupName == AssetsManager.g_assetsSourceArr[AssetsManager.index]) {
            var p = event.itemsLoaded / event.itemsTotal * (100 / AssetsManager.g_assetsSourceArr.length) + AssetsManager.index * (100 / AssetsManager.g_assetsSourceArr.length);
            //var data: any = { progress: event.itemsLoaded, itemsTotal: event.itemsTotal};
            egret.log(this.g_name + "  current====" + p.toFixed(0));
        }
    };
    /**
     * 加载资源队列
     * assetsArr:string[] 资源名数组
     * callBac:Function 回调函数
     * path:string 资源默认路径
     * callBackSrc:any 作用域
     */
    AssetsManager.loadAssetsQueue = function (assetsArr, callBack, path, callBackSrc) {
        if (callBack === void 0) { callBack = null; }
        if (path === void 0) { path = ""; }
        if (callBackSrc === void 0) { callBackSrc = {}; }
        if (!AssetsManager.s_isLoadAssets) {
            if (assetsArr.length <= 0) {
                return;
            }
            var data = {};
            data["assetsArr"] = assetsArr;
            data["callBack"] = callBack;
            data["path"] = path;
            data["callBackSrc"] = callBackSrc;
            AssetsManager.s_map.push(data);
            return;
        }
        AssetsManager.s_isLoadAssets = false;
        AssetsManager.s_callBack = callBack;
        AssetsManager.s_path = path;
        AssetsManager.s_callBackSrc = callBackSrc;
        AssetsManager.s_callBackData = {};
        AssetsManager.s_assetsArr.length = 0;
        AssetsManager.s_assetsArr = AssetsManager.s_assetsArr.concat(assetsArr);
        this.startLoadAsset(AssetsManager.s_assetsArr.shift());
    };
    AssetsManager.startLoadAsset = function (url) {
        var rUrl = AssetsManager.s_path + url + ".png";
        AssetsManager.s_name = url;
        if (this.s_loadResArr.hasKey(AssetsManager.s_name)) {
            this.operLoadRes();
            return;
        }
        RES.getResByUrl(rUrl, this.loadRes, this, RES.ResourceItem.TYPE_IMAGE);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onLoadError, this);
    };
    AssetsManager.loadRes = function (da) {
        AssetsManager.s_loadResArr.add(AssetsManager.s_name, da);
        AssetsManager.s_callBackData[AssetsManager.s_name] = da;
        this.operLoadRes();
    };
    AssetsManager.operLoadRes = function () {
        if (AssetsManager.s_assetsArr.length > 0) {
            this.startLoadAsset(AssetsManager.s_assetsArr.shift());
        }
        else {
            AssetsManager.s_isLoadAssets = true;
            if (AssetsManager.s_callBack != null) {
                AssetsManager.s_callBack.call(AssetsManager.s_callBackSrc, AssetsManager.s_callBackData);
            }
            if (AssetsManager.s_map.length > 0) {
                var sourceList = AssetsManager.s_map.shift();
                this.loadAssetsQueue(sourceList.assetsArr, sourceList.callBack, sourceList.path, sourceList.callBackSrc);
            }
        }
    };
    AssetsManager.onLoadError = function (evt) {
        // console.log("============>>>>>> 加载资源失败 <<<<<<===========");
        // console.log("=========>>>url:"+evt.resItem.url);
    };
    AssetsManager.getAsset = function (key) {
        if (this.s_loadResArr.hasKey(key)) {
            return this.s_loadResArr.get(key);
        }
        else {
            return null;
        }
    };
    /**
     * 获取资源
     */
    AssetsManager.getGroupAsset = function (keyList) {
        var assetDic = new Dictionary("assetDic");
        var m_keyList = [];
        var curName;
        var m_map = [];
        m_keyList.length = 0;
        m_keyList = m_keyList.concat(keyList);
        startLoad(m_keyList.shift());
        function startLoad(key) {
            curName = key;
            var asset = RES.getRes(key);
            if (!asset) {
                RES.getResAsync(key, onLoadAsyncRes, AssetsManager);
            }
            else {
                onLoadAsyncRes(asset);
            }
        }
        function onLoadAsyncRes(data) {
            if (!assetDic.hasKey(curName)) {
                assetDic.add(curName, data);
            }
            if (m_keyList.length) {
                startLoad(m_keyList.shift());
                return;
            }
            else {
                return assetDic;
            }
        }
        // AssetsManager.assetDic = null;
        // AssetsManager.assetDic = new Dictionary();
        return assetDic;
        // 			
    };
    return AssetsManager;
}());
//==============加载资源数组数据================
/**等待加载队列 */
AssetsManager.s_map = [];
/**是否可加载 */
AssetsManager.s_isLoadAssets = true;
/**加载资源数据 */
AssetsManager.s_assetsArr = [];
/**加载资源存储字典 */
AssetsManager.s_loadResArr = new Dictionary("s_loadResArr");
/**加载资源名字即存储在字典中的key值 */
AssetsManager.s_name = "";
/**资源默认路径 */
AssetsManager.s_path = "";
/**资源回调数据 */
AssetsManager.s_callBackData = {};
//===================加载资源组数据=================================
/**等待资源组加载队列*/
AssetsManager.g_map = [];
/**是否可加载*/
AssetsManager.g_isLoad = true;
AssetsManager.g_assetsSourceArr = [];
AssetsManager.index = 0;
AssetsManager.g_name = "";
__reflect(AssetsManager.prototype, "AssetsManager");
//# sourceMappingURL=AssetsManager.js.map