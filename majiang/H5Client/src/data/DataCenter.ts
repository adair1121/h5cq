module DataCenter{

    export var tips:any = {
        //红点提示集合
        tipsGather:{}
    }
    
    export var baseInfo:any = {
        //登录状态
        loginState:-1,
        //玩家基础信息
        // playerBaseInfo:{},
        //玩家总战力值
        // power:0
    }
    export var playerInfo:any = {
         curHp:0,/**当前玩家血量值 */
         curMp:0,/**当前玩家法量值 */
         tolHp:0,/**当前玩家总血量值 */
         tolMp:0/**d当前玩家总法量值 */
    }
    export var bag:any = {
        //角色背包信息
        roleBagInfo:[],
        /**当前掉落物品组 */
        curDropGroup:[],
        /**当前熔炼装备组 */
        curSmeltGroup:[],
        /**背包装备对应质量数据 */
        qualityColor: {6:0xfc3434,5:0xfca304,4:0xd21eff,3:0x0fb8ff,2:0x04fe10,1:0xeae2d1,0:0xffffff}
    }
    
    
    export var playerName:string;
    export var popTisGather:any[] = [];
    export var curMapPath:string;
    //背包扩充预处理集合
    export var bagGridRelation:any[] = [];
    //人物装备战力值集合
    export var roleMinEquipValueObj:any = {}
    /**熔炼背包数据集合 */
     export var smeltData:any = {};
    /**可熔炼装备集合 */
    export var canSmeltData:any[] = [];
    /**商城数据预处理集合*/
    export var storeData:any = {};
    /**道具商城templeId与商城id对应集合 */
    export var storeGoods:any = {};
    /**神秘商店数据 */
    export var steryShopData:any[] = [];
    /**神秘商店刷新花费 */
    export var steryRefreshCost:number = 10901005;
    /**背包购买上限 */
    export var maxBoxBuyNum:number = 10901001;
    /**全名boss最大挑战次数 */
    export var worldBossTotalNum:number = 10901010;
    /**全民boss挑战恢复时间 */
    export var worldBossCountAddTime:number = 10901011;
    /**好友黑名单上限 */
    export var balckListTotalNum:number = 100;
    /**当前背包数量 */
    export var curBoxNum:number = 0;
    /**强化类型 */
    export var forginType:number;
    /**排行榜表数据预处理 */
    export var rankData:any;
    /**当前玩家所在排行榜排名 */
    export var curPlayerRank:any = {};
    /**排行榜集合 */
    export var rankGather:any = {};
    /**膜拜集合 */
    export var shipList:boolean[] = [];
    /**暂存其它玩家角色数据集合 */
    export var OtherRoleInfoVo:any ={};
    /**暂存其它玩家角色开启职业顺序 */
    export var OtherRoleJobList:any[] = [];
    /**暂存其它玩家角色锻造数据 */
    export var OtherforgingData:Dictionary = new Dictionary("otherFogrin");
    /**购买物品item状态值 */
    export var buyItemState:string;
    /**帧值 毫秒单位*/
    export var frameRate:number = 100;
    /**挑战波数 */
    export var challengeNum:string = "";
    /**当前副本 */
    export var curFuBen:number = data.SenceType.YeWai;
    /**玩家当前经验最大值 */
    export var playerMaxExp:number = 0;
    /**膜拜经验值 */
    export var worShipExp:number = 0;
    /**膜拜金钱 */
    export var worShipMoney:number = 0;
    /**玩家当前经验 */
    export var playerCurExp:number = 0;
    /**玩家等级集合 */
    export var levelData:any;
    /**切换场景状态 */
    export var changeSenceState:boolean = false;
    /**职业初始化数据 */
    export var jobInitData:any;
    /**玩家id */
    export var playerId:string = "";
    /**橙装数据预处理 */
    export var CJData:any;
    /**橙装templeData 数据预处理*/
    export var CJTempleData:any;
    /**橙装数据 */
    export var cjEquip:any[] = [];
    /**时装数据预处理 */
    export var fashionData:any;
    /**背包数据根据itemType2进行分类集合 */
    export var BagitemType2Gather:any = {};
    /**时装激活虚拟仓库 */
    export var fashionActive:any = {};
    /**翅膀时装激活状态 */
    export var wingFashionState:boolean = false;
    /**当前激活翅膀时装id */
    export var curWingFashionId:number;
    /**人物时装激活状态 */
    export var roleFashionState:boolean = false;
    /**当前激活人物时装id */
    export var curRoleFahsionId:number;
    /**武器时装激活状态 */
    export var weaponFashionState:boolean = false;
    /**当前激活武器时装id */
    export var weaponFashionId:number;
    /**当前战斗状态 */
    export var curFightState:boolean = false;
    /**当前动作列表最后一个动作 */
    export var lastOfAction:proto.MyAction;
    /**服务器时间 */
    export var serverTimer:number;
    /**当前boss房间boss模板id */
    export var curBossRoomId:number;
    // export var basePlayerInfo:proto.Client_PlayerInfo;
    

    export var time_stamps:number;
    export var curActionArr:Array<proto.MyAction>;
    //当前的执行动作
    export var curExecAction:proto.MyAction;
    export var curExecActionState:boolean;
    //最后同类型动作
    export var endAction:Dictionary;
    export var playerInfoVO:PlayerBaseInfoVo;
    export var roleList:Array<any>;
    export var RoleInFoVo:any = {};
    export var roleEquip:Dictionary = new Dictionary("roleEquip");
    export var wordGather:any = {};

    export var playerPower:number;
    export var goodsUIDgather:Dictionary = new Dictionary("goodsUIDgather");
    export var bagData:proto.ItemData[];
    export var goodsData:proto.ItemData[];
   
    export var secretBook:any;
    export var enumRelation:any = {};
    // export var smeltData:proto.s_Client_ItemData
    export var count:number = 0;
    
    export var roleAttrsArr:Dictionary;
    export var forgingData:Dictionary ;
    export var forgingPos:Dictionary  ;
    export var forginPower:Dictionary;
    export var forgingUIPos:Dictionary  ;
    

    export var playerAttr:Array<number> ;
    export var role1Attr:Array<number> ;
    export var role2Attr:Array<number> ;
    export var role3Attr:Array<number> ;

    export var role1Info:proto.Client_RoleInfo;
    export var role1InfoVO_out:RoleInfoVo;
    export var role2Info:proto.Client_RoleInfo;
    export var role2InfoVO_out:RoleInfoVo;
    export var role3Info:proto.Client_RoleInfo;
    export var role3InfoVO_out:RoleInfoVo;

    /**聊天原数据 */
    export var allChatData:Dictionary;
    /**当前需要显示的聊天数据 */
    export var chatData:Dictionary;
    /**好友相关列表 */
    export var friendData:Dictionary = new Dictionary("friendData");
    /**好友数据集合 */
    export var allFriendData:any[] = [];
    export var friendChatData:Dictionary=new Dictionary("friendChatData");;

    export var goodsSource:Dictionary = new Dictionary("") ;
    export var changeItemNum:any ;
    
    //标识当前玩家所在场景是不是野外
    export var isWildScene:boolean=true ;
    export var curSceneId:number ;
    //玩家移动速度
    export var moveSpeed:number ;
    
    

    //玩家邮件数据
    export var mailData:Array<proto.MailData>=[] ;
    export var mailDict:Dictionary=new Dictionary("mailDict") ;
    



    
}
