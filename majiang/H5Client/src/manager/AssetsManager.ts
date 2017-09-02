class AssetsManager {
	public constructor() {
	}
	//==============加载资源数组数据================
	/**等待加载队列 */
	private static s_map:Array<any> = [];
	/**是否可加载 */
	private static s_isLoadAssets:boolean = true;
	/**加载资源成功后的回调 */
	private static s_callBack:Function;
	/**加载资源数据 */
	private static s_assetsArr:string[] = [];
	/**加载资源存储字典 */
	private static s_loadResArr:Dictionary = new Dictionary("s_loadResArr");
	/**加载资源名字即存储在字典中的key值 */
	private static s_name:string = "";
	/**资源默认路径 */
	private static s_path:string="";
	/**资源回调作用域 */
	private static s_callBackSrc:any;
	/**资源回调数据 */
	private static s_callBackData:any = {};

	//===================加载资源组数据=================================
	/**等待资源组加载队列*/
    private static g_map: Array<any> = [];
    /**是否可加载*/
    private static g_isLoad:boolean = true;
    private static g_assetsSourceArr: string[] = [];
    private static index: number = 0;
    private static g_name: string = "";
    private static g_data: any;
	/** 加载资源成功后的回调方法*/
    private static g_callback: Function; 
	/**
	 * 加载资源组
	 * name:string 类型
	 * assetSourceArr: string[]  要加载的资源组名称
	 * callBackFunc:Function 回调函数
	 * data:any 回调作用域
	 */
	public static loadGroup(name:string,assetSourceArr:string[],callBackFunc:Function = null,data:any = {}):void{
		if(!AssetsManager.g_isLoad){
			var data:any = {};
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

		var groupLoadRes:boolean = false;
		var len:number = assetSourceArr.length;
		AssetsManager.g_assetsSourceArr.length = 0;
		for(var i:number = 0;i<len;i++){
			if(!RES.isGroupLoaded(assetSourceArr[i])){
				AssetsManager.g_assetsSourceArr.push(assetSourceArr[i]);
				groupLoadRes = true;
			}
		}
		if(groupLoadRes){
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
			AssetsManager.index = 0;

			RES.loadGroup(AssetsManager.g_assetsSourceArr[AssetsManager.index]);
		}else{
			AssetsManager.g_callback(AssetsManager.g_data);
			AssetsManager.g_assetsSourceArr.length = 0;
			AssetsManager.g_isLoad = true;
			if(AssetsManager.g_map.length){
				var temp:any = AssetsManager.g_map.shift();
				this.loadGroup(temp["name"],temp["assetSourceArr"],temp["callBack"],temp["data"]);
			}
		}
	}
	/**
	 * 资源组加载完成
	 */
	private static onResourceLoadComplete(event:RES.ResourceEvent):void{
		 //if (event.groupName == this.assetsSourceArr[this.index]) {
        egret.log("LoadComplete:" + event.groupName + " ");
        if(AssetsManager.g_assetsSourceArr.length > AssetsManager.index + 1) {
            AssetsManager.index++;
            RES.loadGroup(AssetsManager.g_assetsSourceArr[AssetsManager.index]);
        } else {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            AssetsManager.g_callback(AssetsManager.g_data);
            AssetsManager.g_isLoad = true;
            if(AssetsManager.g_map.length) {
                var temp: any = AssetsManager.g_map.shift();
                this.loadGroup(temp["name"],temp["assetsSourceArr"],temp["callback"],temp["data"]);
            }
        }
        //}
	}
	/**
	 * 资源组加载失败
	 */
	private static onResourceLoadError(event:RES.ResourceEvent):void{
		 //TODO
        egret.warn("LoadError:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
	}
	/**
	 *资源组加载进度 
	 */
	private static onResourceProgress(event:RES.ResourceEvent):void{
		if(event.groupName == AssetsManager.g_assetsSourceArr[AssetsManager.index]) {
            var p: Number = event.itemsLoaded / event.itemsTotal * (100 / AssetsManager.g_assetsSourceArr.length) + AssetsManager.index * (100 / AssetsManager.g_assetsSourceArr.length);
            //var data: any = { progress: event.itemsLoaded, itemsTotal: event.itemsTotal};
            egret.log(this.g_name + "  current====" + p.toFixed(0));
        }
	}
	/**
	 * 加载资源队列
	 * assetsArr:string[] 资源名数组
	 * callBac:Function 回调函数
	 * path:string 资源默认路径
	 * callBackSrc:any 作用域
	 */
	public static loadAssetsQueue(assetsArr:string[],callBack:Function = null,path:string = "",callBackSrc:any = {}):void{
		if(!AssetsManager.s_isLoadAssets){
			if(assetsArr.length <= 0){
				return;
			}
			var data:any = {};
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
	}
	private static startLoadAsset(url):void{
		var rUrl:string = AssetsManager.s_path + url + ".png";
		AssetsManager.s_name = url;
		if(this.s_loadResArr.hasKey(AssetsManager.s_name)){
			this.operLoadRes();
			return;
		}
		
		RES.getResByUrl(rUrl,this.loadRes,this,RES.ResourceItem.TYPE_IMAGE);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onLoadError,this)
	}
	private static loadRes(da:any):void{
		AssetsManager.s_loadResArr.add(AssetsManager.s_name,da);
		AssetsManager.s_callBackData[AssetsManager.s_name] = da;
		this.operLoadRes();
	}
	private static operLoadRes():void{
		if(AssetsManager.s_assetsArr.length > 0){

			this.startLoadAsset(AssetsManager.s_assetsArr.shift());
		}else{
			AssetsManager.s_isLoadAssets = true;
			if(AssetsManager.s_callBack != null){
				AssetsManager.s_callBack.call(AssetsManager.s_callBackSrc,AssetsManager.s_callBackData);
			}
			if(AssetsManager.s_map.length > 0){
				var sourceList:any = AssetsManager.s_map.shift();
				this.loadAssetsQueue(sourceList.assetsArr,sourceList.callBack,sourceList.path,sourceList.callBackSrc);
			}
		}
	}
	private static onLoadError(evt:RES.ResourceEvent):void{
		// console.log("============>>>>>> 加载资源失败 <<<<<<===========");
		// console.log("=========>>>url:"+evt.resItem.url);
	}
	public static getAsset(key:string):any{
		if(this.s_loadResArr.hasKey(key)){
			return this.s_loadResArr.get(key);
		}else{
			return null
		}
	}
	
	
	/**
	 * 获取资源
	 */
	
	public static  getGroupAsset(keyList:string[]):Dictionary{
		var assetDic:Dictionary = new Dictionary("assetDic");
		var m_keyList:string[] = [];
		var curName:string;
		var m_map:Array<any> = [];
		m_keyList.length = 0;
		m_keyList = m_keyList.concat(keyList);
		startLoad(m_keyList.shift());
		
		function  startLoad(key:string){
			curName = key;
			var asset = RES.getRes(key);
			if(!asset){
				RES.getResAsync(key,onLoadAsyncRes,AssetsManager);
			}else{
				onLoadAsyncRes(asset);
			}
		}
		function onLoadAsyncRes(data){
			if(!assetDic.hasKey(curName)){
				assetDic.add(curName,data);
			}
			if(m_keyList.length){
				startLoad(m_keyList.shift());	
				return;
			}else{
				return assetDic;
				// this.m_callBack.call(this.m_arg,this.assetDic);
			}
		}
		// AssetsManager.assetDic = null;
		// AssetsManager.assetDic = new Dictionary();
		return assetDic;
		// 			
	}
	// private static startLoad(key:string):void{
		
	// }
	// private static onLoadAsyncRes(data):void{
		
	// }
}

