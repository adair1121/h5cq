var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ModuleManager = (function () {
    function ModuleManager() {
        this.dict = new Dictionary("ModuleManager");
    }
    ModuleManager.getInstance = function () {
        return ModuleManager.instance ? ModuleManager.instance : ModuleManager.instance = new ModuleManager();
    };
    /**
     * 接受由服务器传回的消息，分发给相关模块
     * @param moduleList 相关模块的列表
     * @param msgList 模块对应的消息
     */
    ModuleManager.prototype.receiveMsgFromSever = function (moduleList, msg) {
        for (var i = 0; moduleList.length > i; i++) {
            var module = this.getModule(moduleList[i]);
            //向模块中发送消息
            module.receiveMsgFromSever(msg);
        }
    };
    /**
     * 接受由模块传回的消息，分发给相关模块
     * @param moduleList 相关模块的列表
     * @param msgType 模块对应的消息类型
     * @param msgData 模块对应的消息
     */
    ModuleManager.prototype.receiveMsgFromModule = function (moduleList, msgType, msgData) {
        if (msgData === void 0) { msgData = null; }
        for (var i = 0; moduleList.length > i; i++) {
            var module = this.getModule(moduleList[i]);
            //向模块中发送消息
            module.receiveMsgFromModule(msgType, msgData);
        }
    };
    ModuleManager.prototype.getModule = function (moduleName) {
        if (!this.dict.hasKey(moduleName)) {
            this.createModule(moduleName);
        }
        return this.dict.get(moduleName);
    };
    // /**
    //  * 消息分发
    //  * @param moduleList 分发到的模块列表
    //  * @param msgList 需要分发的消息队列
    //  */
    // public slotMessage(moduleList:Array<string>,msgList:Array<string>,data:any = {}):void{
    // 	for(var i:number=0;moduleList.length>i;i++){
    // 		var module=this.getModule(moduleList[i]);
    // 		//向模块中发送消息
    // 		module.receiveMsgFromModule(msgList,data);
    // 	}
    // }
    /**
     * 创建模块对象
     */
    ModuleManager.prototype.createModule = function (moduleName) {
        var module;
        switch (moduleName) {
            case ModuleEnum.MAP:
                module = new Module_map();
                break;
            case ModuleEnum.BAG:
                module = new Module_bag();
                break;
            case ModuleEnum.SKILLPANEL:
                module = new Module_skillPanel();
                break;
            case ModuleEnum.BAG_SMELT:
                module = new Module_bag_smelt();
                break;
            case ModuleEnum.RANK:
                module = new Module_rank();
                break;
            case ModuleEnum.STORE:
                module = new Module_store();
                break;
            case ModuleEnum.ROLEINFO:
                module = new Module_roleInfo();
                break;
            case ModuleEnum.MAINUI:
                module = new Module_mainUI();
                break;
            case ModuleEnum.SELECTROLE:
                module = new Module_selectRole();
                break;
            case ModuleEnum.ACTION:
                module = new Module_action();
                break;
            case ModuleEnum.DATA:
                module = new Module_data();
                break;
            case ModuleEnum.FORGING:
                module = new Module_forging();
                break;
            case ModuleEnum.CHAT:
                module = new Module_chat();
                break;
            case ModuleEnum.FRIEND:
                module = new Module_friends();
                break;
            case ModuleEnum.CHALLENGE:
                module = new Module_level();
                break;
            case ModuleEnum.FUBEN:
                module = new Module_fuben();
                break;
            case ModuleEnum.MAIL:
                module = new Module_mail();
                break;
            case ModuleEnum.CREATEROLE:
                module = new Module_roleSelect();
                break;
            case ModuleEnum.CJ:
                module = new Module_chengzhuang();
                break;
            case ModuleEnum.BOSS:
                module = new Module_boss();
                break;
            default:
                break;
        }
        this.dict.add(moduleName, module);
    };
    return ModuleManager;
}());
__reflect(ModuleManager.prototype, "ModuleManager");
//# sourceMappingURL=ModuleManager.js.map