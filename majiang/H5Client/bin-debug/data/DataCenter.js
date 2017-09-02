var DataCenter;
(function (DataCenter) {
    DataCenter.tips = {
        //红点提示集合
        tipsGather: {}
    };
    DataCenter.baseInfo = {
        //登录状态
        loginState: -1,
    };
    DataCenter.playerInfo = {
        curHp: 0,
        curMp: 0,
        tolHp: 0,
        tolMp: 0 /**d当前玩家总法量值 */
    };
    DataCenter.bag = {
        //角色背包信息
        roleBagInfo: [],
        /**当前掉落物品组 */
        curDropGroup: [],
        /**当前熔炼装备组 */
        curSmeltGroup: [],
        /**背包装备对应质量数据 */
        qualityColor: { 6: 0xfc3434, 5: 0xfca304, 4: 0xd21eff, 3: 0x0fb8ff, 2: 0x04fe10, 1: 0xeae2d1, 0: 0xffffff }
    };
    DataCenter.popTisGather = [];
    //背包扩充预处理集合
    DataCenter.bagGridRelation = [];
    //人物装备战力值集合
    DataCenter.roleMinEquipValueObj = {};
    /**熔炼背包数据集合 */
    DataCenter.smeltData = {};
    /**可熔炼装备集合 */
    DataCenter.canSmeltData = [];
    /**商城数据预处理集合*/
    DataCenter.storeData = {};
    /**道具商城templeId与商城id对应集合 */
    DataCenter.storeGoods = {};
    /**神秘商店数据 */
    DataCenter.steryShopData = [];
    /**神秘商店刷新花费 */
    DataCenter.steryRefreshCost = 10901005;
    /**背包购买上限 */
    DataCenter.maxBoxBuyNum = 10901001;
    /**全名boss最大挑战次数 */
    DataCenter.worldBossTotalNum = 10901010;
    /**全民boss挑战恢复时间 */
    DataCenter.worldBossCountAddTime = 10901011;
    /**好友黑名单上限 */
    DataCenter.balckListTotalNum = 100;
    /**当前背包数量 */
    DataCenter.curBoxNum = 0;
    /**当前玩家所在排行榜排名 */
    DataCenter.curPlayerRank = {};
    /**排行榜集合 */
    DataCenter.rankGather = {};
    /**膜拜集合 */
    DataCenter.shipList = [];
    /**暂存其它玩家角色数据集合 */
    DataCenter.OtherRoleInfoVo = {};
    /**暂存其它玩家角色开启职业顺序 */
    DataCenter.OtherRoleJobList = [];
    /**暂存其它玩家角色锻造数据 */
    DataCenter.OtherforgingData = new Dictionary("otherFogrin");
    /**帧值 毫秒单位*/
    DataCenter.frameRate = 100;
    /**挑战波数 */
    DataCenter.challengeNum = "";
    /**当前副本 */
    DataCenter.curFuBen = data.SenceType.YeWai;
    /**玩家当前经验最大值 */
    DataCenter.playerMaxExp = 0;
    /**膜拜经验值 */
    DataCenter.worShipExp = 0;
    /**膜拜金钱 */
    DataCenter.worShipMoney = 0;
    /**玩家当前经验 */
    DataCenter.playerCurExp = 0;
    /**切换场景状态 */
    DataCenter.changeSenceState = false;
    /**玩家id */
    DataCenter.playerId = "";
    /**橙装数据 */
    DataCenter.cjEquip = [];
    /**背包数据根据itemType2进行分类集合 */
    DataCenter.BagitemType2Gather = {};
    /**时装激活虚拟仓库 */
    DataCenter.fashionActive = {};
    /**翅膀时装激活状态 */
    DataCenter.wingFashionState = false;
    /**人物时装激活状态 */
    DataCenter.roleFashionState = false;
    /**武器时装激活状态 */
    DataCenter.weaponFashionState = false;
    /**当前战斗状态 */
    DataCenter.curFightState = false;
    DataCenter.RoleInFoVo = {};
    DataCenter.roleEquip = new Dictionary("roleEquip");
    DataCenter.wordGather = {};
    DataCenter.goodsUIDgather = new Dictionary("goodsUIDgather");
    DataCenter.enumRelation = {};
    // export var smeltData:proto.s_Client_ItemData
    DataCenter.count = 0;
    /**好友相关列表 */
    DataCenter.friendData = new Dictionary("friendData");
    /**好友数据集合 */
    DataCenter.allFriendData = [];
    DataCenter.friendChatData = new Dictionary("friendChatData");
    ;
    DataCenter.goodsSource = new Dictionary("");
    //标识当前玩家所在场景是不是野外
    DataCenter.isWildScene = true;
    //玩家邮件数据
    DataCenter.mailData = [];
    DataCenter.mailDict = new Dictionary("mailDict");
})(DataCenter || (DataCenter = {}));
//# sourceMappingURL=DataCenter.js.map