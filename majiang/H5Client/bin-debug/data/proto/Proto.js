var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var proto;
(function (proto) {
    var s_SendMessbox = (function (_super) {
        __extends(s_SendMessbox, _super);
        function s_SendMessbox() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_SendMessbox;
            return _this;
        }
        s_SendMessbox.prototype.init = function (_errMsg, _messList) {
            this.errMsg = _errMsg;
            this.messList = _messList;
            return this;
        };
        s_SendMessbox.prototype.encode = function (by) {
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.messList != null) {
                by.writeShort(this.messList.length);
                for (var i = 0; i < this.messList.length; i++) {
                    this.messList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_SendMessbox.prototype.decode = function (by) {
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            var __count1 = by.readShort();
            this.messList = [];
            for (var i = 0; i < __count1; i++) {
                this.messList[i] = new MyAction();
                this.messList[i].decode(by);
            }
        };
        return s_SendMessbox;
    }(proto.Pro));
    proto.s_SendMessbox = s_SendMessbox;
    __reflect(s_SendMessbox.prototype, "proto.s_SendMessbox");
    var MyAction = (function (_super) {
        __extends(MyAction, _super);
        function MyAction() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.actionType = 0; //动作类型
            //required>int
            _this.timeSpan = 0; //时间戳
            _this.S = proto.MessageType.MyAction;
            return _this;
        }
        MyAction.prototype.init = function (_actionType, _timeSpan, _InstanceId, _S_Move, _S_Create, _S_Useskill, _S_BuffEffect) {
            this.actionType = _actionType;
            this.timeSpan = _timeSpan;
            this.InstanceId = _InstanceId;
            this.S_Move = _S_Move;
            this.S_Create = _S_Create;
            this.S_Useskill = _S_Useskill;
            this.S_BuffEffect = _S_BuffEffect;
            return this;
        };
        MyAction.prototype.encode = function (by) {
            by.writeByte(this.actionType);
            by.writeInt(this.timeSpan);
            if (this.InstanceId != null) {
                by.writeByte(1);
                by.writeUTF(this.InstanceId);
            }
            else {
                by.writeByte(0);
            }
            if (this.S_Move != null) {
                by.writeByte(1);
                this.S_Move.encode(by);
            }
            else {
                by.writeByte(0);
            }
            if (this.S_Create != null) {
                by.writeByte(1);
                this.S_Create.encode(by);
            }
            else {
                by.writeByte(0);
            }
            if (this.S_Useskill != null) {
                by.writeByte(1);
                this.S_Useskill.encode(by);
            }
            else {
                by.writeByte(0);
            }
            if (this.S_BuffEffect != null) {
                by.writeByte(1);
                this.S_BuffEffect.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        MyAction.prototype.decode = function (by) {
            this.actionType = by.readUnsignedByte();
            this.timeSpan = by.readInt();
            if (by.readByte() > 0) {
                this.InstanceId = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.S_Move = new MoveAction();
                this.S_Move.decode(by);
            }
            if (by.readByte() > 0) {
                this.S_Create = new AddUnit();
                this.S_Create.decode(by);
            }
            if (by.readByte() > 0) {
                this.S_Useskill = new UseSkill();
                this.S_Useskill.decode(by);
            }
            if (by.readByte() > 0) {
                this.S_BuffEffect = new BuffEffect();
                this.S_BuffEffect.decode(by);
            }
        };
        return MyAction;
    }(proto.Pro));
    proto.MyAction = MyAction;
    __reflect(MyAction.prototype, "proto.MyAction");
    var AddUnit = (function (_super) {
        __extends(AddUnit, _super);
        function AddUnit() {
            var _this = _super.call(this) || this;
            //required>int
            _this.type = 0; //创建的单位类型
            _this.S = proto.MessageType.AddUnit;
            return _this;
        }
        AddUnit.prototype.init = function (_type, _entityInfoList, _drop) {
            this.type = _type;
            this.entityInfoList = _entityInfoList;
            this.drop = _drop;
            return this;
        };
        AddUnit.prototype.encode = function (by) {
            by.writeInt(this.type);
            if (this.entityInfoList != null) {
                by.writeShort(this.entityInfoList.length);
                for (var i = 0; i < this.entityInfoList.length; i++) {
                    this.entityInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.drop != null) {
                by.writeShort(this.drop.length);
                for (var i = 0; i < this.drop.length; i++) {
                    this.drop[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        AddUnit.prototype.decode = function (by) {
            this.type = by.readInt();
            var __count1 = by.readShort();
            this.entityInfoList = [];
            for (var i = 0; i < __count1; i++) {
                this.entityInfoList[i] = new RoleEntityInfo();
                this.entityInfoList[i].decode(by);
            }
            var __count2 = by.readShort();
            this.drop = [];
            for (var i = 0; i < __count2; i++) {
                this.drop[i] = new Client_DropInfo();
                this.drop[i].decode(by);
            }
        };
        return AddUnit;
    }(proto.Pro));
    proto.AddUnit = AddUnit;
    __reflect(AddUnit.prototype, "proto.AddUnit");
    var MoveAction = (function (_super) {
        __extends(MoveAction, _super);
        function MoveAction() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.state = 0; //移动状态，1跑动，2平移
            //required>byte
            _this.alpha = 0; //透明度
            //required>byte
            _this.sx = 0; //起始坐标x
            //required>byte
            _this.sy = 0; //起始坐标y
            //required>byte
            _this.ex = 0; //终点坐标x
            //required>byte
            _this.ey = 0; //终点坐标y
            //required>byte
            _this.look = 0; //朝向
            _this.S = proto.MessageType.MoveAction;
            return _this;
        }
        MoveAction.prototype.init = function (_state, _alpha, _sx, _sy, _ex, _ey, _look) {
            this.state = _state;
            this.alpha = _alpha;
            this.sx = _sx;
            this.sy = _sy;
            this.ex = _ex;
            this.ey = _ey;
            this.look = _look;
            return this;
        };
        MoveAction.prototype.encode = function (by) {
            by.writeByte(this.state);
            by.writeByte(this.alpha);
            by.writeByte(this.sx);
            by.writeByte(this.sy);
            by.writeByte(this.ex);
            by.writeByte(this.ey);
            by.writeByte(this.look);
        };
        MoveAction.prototype.decode = function (by) {
            this.state = by.readUnsignedByte();
            this.alpha = by.readUnsignedByte();
            this.sx = by.readUnsignedByte();
            this.sy = by.readUnsignedByte();
            this.ex = by.readUnsignedByte();
            this.ey = by.readUnsignedByte();
            this.look = by.readUnsignedByte();
        };
        return MoveAction;
    }(proto.Pro));
    proto.MoveAction = MoveAction;
    __reflect(MoveAction.prototype, "proto.MoveAction");
    var UseSkill = (function (_super) {
        __extends(UseSkill, _super);
        function UseSkill() {
            var _this = _super.call(this) || this;
            //required>int
            _this.skillID = 0; //技能ID
            //required>byte
            _this.targetX = 0; //目标位置
            //required>byte
            _this.targetY = 0; //undefined
            //required>byte
            _this.look = 0; //看向
            //required>byte
            _this.attacker = 0; //攻击者是谁
            //optional>byte
            _this.hitX = 0; //冲撞到的位置
            //optional>byte
            _this.hitY = 0; //undefined
            //optional>int
            _this.hitSkillTime = 0; //野蛮冲撞技能冲撞时间
            _this.S = proto.MessageType.UseSkill;
            return _this;
        }
        UseSkill.prototype.init = function (_skillID, _targetX, _targetY, _look, _attacker, _bufferList, _removeList, _damageInfoList, _summonUnit, _hitX, _hitY, _hitSkillTime) {
            this.skillID = _skillID;
            this.targetX = _targetX;
            this.targetY = _targetY;
            this.look = _look;
            this.attacker = _attacker;
            this.bufferList = _bufferList;
            this.removeList = _removeList;
            this.damageInfoList = _damageInfoList;
            this.summonUnit = _summonUnit;
            this.hitX = _hitX;
            this.hitY = _hitY;
            this.hitSkillTime = _hitSkillTime;
            return this;
        };
        UseSkill.prototype.encode = function (by) {
            by.writeInt(this.skillID);
            by.writeByte(this.targetX);
            by.writeByte(this.targetY);
            by.writeByte(this.look);
            by.writeByte(this.attacker);
            if (this.bufferList != null) {
                by.writeShort(this.bufferList.length);
                for (var i = 0; i < this.bufferList.length; i++) {
                    by.writeInt(this.bufferList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.removeList != null) {
                by.writeShort(this.removeList.length);
                for (var i = 0; i < this.removeList.length; i++) {
                    by.writeInt(this.removeList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.damageInfoList != null) {
                by.writeShort(this.damageInfoList.length);
                for (var i = 0; i < this.damageInfoList.length; i++) {
                    this.damageInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.summonUnit != null) {
                by.writeByte(1);
                this.summonUnit.encode(by);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeByte(this.hitX);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeByte(this.hitY);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.hitSkillTime);
        };
        UseSkill.prototype.decode = function (by) {
            this.skillID = by.readInt();
            this.targetX = by.readUnsignedByte();
            this.targetY = by.readUnsignedByte();
            this.look = by.readUnsignedByte();
            this.attacker = by.readUnsignedByte();
            var __count5 = by.readShort();
            this.bufferList = [];
            for (var i = 0; i < __count5; i++) {
                this.bufferList[i] = by.readInt();
            }
            var __count6 = by.readShort();
            this.removeList = [];
            for (var i = 0; i < __count6; i++) {
                this.removeList[i] = by.readInt();
            }
            var __count7 = by.readShort();
            this.damageInfoList = [];
            for (var i = 0; i < __count7; i++) {
                this.damageInfoList[i] = new DamageInfo();
                this.damageInfoList[i].decode(by);
            }
            if (by.readByte() > 0) {
                this.summonUnit = new AddUnit();
                this.summonUnit.decode(by);
            }
            if (by.readByte() > 0) {
                this.hitX = by.readUnsignedByte();
            }
            if (by.readByte() > 0) {
                this.hitY = by.readUnsignedByte();
            }
            if (by.readByte() > 0) {
                this.hitSkillTime = by.readInt();
            }
        };
        return UseSkill;
    }(proto.Pro));
    proto.UseSkill = UseSkill;
    __reflect(UseSkill.prototype, "proto.UseSkill");
    var Client_MonsterInfo = (function (_super) {
        __extends(Client_MonsterInfo, _super);
        function Client_MonsterInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.templateId = 0; //模版ID
            //required>int
            _this.HP = 0; //血量
            //required>byte
            _this.sx = 0; //出生坐标x
            //required>byte
            _this.sy = 0; //出生坐标y
            _this.S = proto.MessageType.Client_MonsterInfo;
            return _this;
        }
        Client_MonsterInfo.prototype.init = function (_templateId, _InstanceId, _HP, _sx, _sy) {
            this.templateId = _templateId;
            this.InstanceId = _InstanceId;
            this.HP = _HP;
            this.sx = _sx;
            this.sy = _sy;
            return this;
        };
        Client_MonsterInfo.prototype.encode = function (by) {
            by.writeInt(this.templateId);
            by.writeUTF(this.InstanceId);
            by.writeInt(this.HP);
            by.writeByte(this.sx);
            by.writeByte(this.sy);
        };
        Client_MonsterInfo.prototype.decode = function (by) {
            this.templateId = by.readInt();
            this.InstanceId = by.readUTF();
            this.HP = by.readInt();
            this.sx = by.readUnsignedByte();
            this.sy = by.readUnsignedByte();
        };
        return Client_MonsterInfo;
    }(proto.Pro));
    proto.Client_MonsterInfo = Client_MonsterInfo;
    __reflect(Client_MonsterInfo.prototype, "proto.Client_MonsterInfo");
    var Client_DropInfo = (function (_super) {
        __extends(Client_DropInfo, _super);
        function Client_DropInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.templeID = 0; //表中ID
            //required>int
            _this.num = 0; //金币数量
            //required>byte
            _this.sx = 0; //出生坐标x
            //required>byte
            _this.sy = 0; //出生坐标y
            _this.S = proto.MessageType.Client_DropInfo;
            return _this;
        }
        Client_DropInfo.prototype.init = function (_templeID, _instanceId, _num, _sx, _sy) {
            this.templeID = _templeID;
            this.instanceId = _instanceId;
            this.num = _num;
            this.sx = _sx;
            this.sy = _sy;
            return this;
        };
        Client_DropInfo.prototype.encode = function (by) {
            by.writeInt(this.templeID);
            by.writeUTF(this.instanceId);
            by.writeInt(this.num);
            by.writeByte(this.sx);
            by.writeByte(this.sy);
        };
        Client_DropInfo.prototype.decode = function (by) {
            this.templeID = by.readInt();
            this.instanceId = by.readUTF();
            this.num = by.readInt();
            this.sx = by.readUnsignedByte();
            this.sy = by.readUnsignedByte();
        };
        return Client_DropInfo;
    }(proto.Pro));
    proto.Client_DropInfo = Client_DropInfo;
    __reflect(Client_DropInfo.prototype, "proto.Client_DropInfo");
    var s_Map_Player = (function (_super) {
        __extends(s_Map_Player, _super);
        function s_Map_Player() {
            var _this = _super.call(this) || this;
            //required>int
            _this.timeSpan = 0; //时间戳
            _this.S = proto.MessageType.s_Map_Player;
            return _this;
        }
        s_Map_Player.prototype.init = function (_timeSpan, _playerName, _PlayerInstId, _playerAttr, _client_roleinfo) {
            this.timeSpan = _timeSpan;
            this.playerName = _playerName;
            this.PlayerInstId = _PlayerInstId;
            this.playerAttr = _playerAttr;
            this.client_roleinfo = _client_roleinfo;
            return this;
        };
        s_Map_Player.prototype.encode = function (by) {
            by.writeInt(this.timeSpan);
            by.writeUTF(this.playerName);
            by.writeUTF(this.PlayerInstId);
            if (this.playerAttr != null) {
                by.writeShort(this.playerAttr.length);
                for (var i = 0; i < this.playerAttr.length; i++) {
                    by.writeInt(this.playerAttr[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.client_roleinfo != null) {
                by.writeShort(this.client_roleinfo.length);
                for (var i = 0; i < this.client_roleinfo.length; i++) {
                    this.client_roleinfo[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_Map_Player.prototype.decode = function (by) {
            this.timeSpan = by.readInt();
            this.playerName = by.readUTF();
            this.PlayerInstId = by.readUTF();
            var __count3 = by.readShort();
            this.playerAttr = [];
            for (var i = 0; i < __count3; i++) {
                this.playerAttr[i] = by.readInt();
            }
            var __count4 = by.readShort();
            this.client_roleinfo = [];
            for (var i = 0; i < __count4; i++) {
                this.client_roleinfo[i] = new Client_RoleInfo();
                this.client_roleinfo[i].decode(by);
            }
        };
        return s_Map_Player;
    }(proto.Pro));
    proto.s_Map_Player = s_Map_Player;
    __reflect(s_Map_Player.prototype, "proto.s_Map_Player");
    var PlayerAttrs = (function (_super) {
        __extends(PlayerAttrs, _super);
        function PlayerAttrs() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.firstJob = 0; //主职业
            //required>int
            _this.lev = 0; //等级
            //required>byte
            _this.reborn = 0; //转生次数
            //required>int
            _this.exp = 0; //经验
            //required>int
            _this.HPsum = 0; //三角色的血量汇总
            //required>int
            _this.MPsum = 0; //三角色的蓝量汇总
            //required>int
            _this.feather = 0; //羽毛
            //required>int
            _this.maxskilllve = 0; //技能大等级
            //required>int
            _this.CAMP = 0; //阵营
            //required>int
            _this.mapid = 0; //地图ID
            //required>int
            _this.head = 0; //头像ID
            //required>int
            _this.Reputation = 0; //声望
            //required>int
            _this.bagcount = 0; //背包数量
            //required>int
            _this.money = 0; //金钱
            //required>int
            _this.gold = 0; //元宝
            //required>int
            _this.FightValue = 0; //战斗力
            //required>byte
            _this.VIP = 0; //VIP等级
            //required>int
            _this.Bossear = 0; //boss积分
            _this.S = proto.MessageType.PlayerAttrs;
            return _this;
        }
        PlayerAttrs.prototype.init = function (_name, _firstJob, _lev, _reborn, _exp, _HPsum, _MPsum, _feather, _maxskilllve, _CAMP, _mapid, _head, _Reputation, _bagcount, _money, _gold, _FightValue, _VIP, _Bossear) {
            this.name = _name;
            this.firstJob = _firstJob;
            this.lev = _lev;
            this.reborn = _reborn;
            this.exp = _exp;
            this.HPsum = _HPsum;
            this.MPsum = _MPsum;
            this.feather = _feather;
            this.maxskilllve = _maxskilllve;
            this.CAMP = _CAMP;
            this.mapid = _mapid;
            this.head = _head;
            this.Reputation = _Reputation;
            this.bagcount = _bagcount;
            this.money = _money;
            this.gold = _gold;
            this.FightValue = _FightValue;
            this.VIP = _VIP;
            this.Bossear = _Bossear;
            return this;
        };
        PlayerAttrs.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeByte(this.firstJob);
            by.writeInt(this.lev);
            by.writeByte(this.reborn);
            by.writeInt(this.exp);
            by.writeInt(this.HPsum);
            by.writeInt(this.MPsum);
            by.writeInt(this.feather);
            by.writeInt(this.maxskilllve);
            by.writeInt(this.CAMP);
            by.writeInt(this.mapid);
            by.writeInt(this.head);
            by.writeInt(this.Reputation);
            by.writeInt(this.bagcount);
            by.writeInt(this.money);
            by.writeInt(this.gold);
            by.writeInt(this.FightValue);
            by.writeByte(this.VIP);
            by.writeInt(this.Bossear);
        };
        PlayerAttrs.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.firstJob = by.readUnsignedByte();
            this.lev = by.readInt();
            this.reborn = by.readUnsignedByte();
            this.exp = by.readInt();
            this.HPsum = by.readInt();
            this.MPsum = by.readInt();
            this.feather = by.readInt();
            this.maxskilllve = by.readInt();
            this.CAMP = by.readInt();
            this.mapid = by.readInt();
            this.head = by.readInt();
            this.Reputation = by.readInt();
            this.bagcount = by.readInt();
            this.money = by.readInt();
            this.gold = by.readInt();
            this.FightValue = by.readInt();
            this.VIP = by.readUnsignedByte();
            this.Bossear = by.readInt();
        };
        return PlayerAttrs;
    }(proto.Pro));
    proto.PlayerAttrs = PlayerAttrs;
    __reflect(PlayerAttrs.prototype, "proto.PlayerAttrs");
    var Client_RoleInfo = (function (_super) {
        __extends(Client_RoleInfo, _super);
        function Client_RoleInfo() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            //required>int
            _this.templateId = 0; //模版ID
            _this.S = proto.MessageType.Client_RoleInfo;
            return _this;
        }
        Client_RoleInfo.prototype.init = function (_job, _templateId, _instanceId, _skills, _cheatsList, _equips, _roleAttr, _strengthens) {
            this.job = _job;
            this.templateId = _templateId;
            this.instanceId = _instanceId;
            this.skills = _skills;
            this.cheatsList = _cheatsList;
            this.equips = _equips;
            this.roleAttr = _roleAttr;
            this.strengthens = _strengthens;
            return this;
        };
        Client_RoleInfo.prototype.encode = function (by) {
            by.writeByte(this.job);
            by.writeInt(this.templateId);
            by.writeUTF(this.instanceId);
            if (this.skills != null) {
                by.writeShort(this.skills.length);
                for (var i = 0; i < this.skills.length; i++) {
                    this.skills[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.cheatsList != null) {
                by.writeShort(this.cheatsList.length);
                for (var i = 0; i < this.cheatsList.length; i++) {
                    this.cheatsList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.equips != null) {
                by.writeShort(this.equips.length);
                for (var i = 0; i < this.equips.length; i++) {
                    this.equips[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.roleAttr != null) {
                by.writeShort(this.roleAttr.length);
                for (var i = 0; i < this.roleAttr.length; i++) {
                    by.writeInt(this.roleAttr[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.strengthens != null) {
                by.writeShort(this.strengthens.length);
                for (var i = 0; i < this.strengthens.length; i++) {
                    this.strengthens[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        Client_RoleInfo.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
            this.templateId = by.readInt();
            this.instanceId = by.readUTF();
            var __count3 = by.readShort();
            this.skills = [];
            for (var i = 0; i < __count3; i++) {
                this.skills[i] = new SkillInfo();
                this.skills[i].decode(by);
            }
            var __count4 = by.readShort();
            this.cheatsList = [];
            for (var i = 0; i < __count4; i++) {
                this.cheatsList[i] = new CheatsInfo();
                this.cheatsList[i].decode(by);
            }
            var __count5 = by.readShort();
            this.equips = [];
            for (var i = 0; i < __count5; i++) {
                this.equips[i] = new ItemData();
                this.equips[i].decode(by);
            }
            var __count6 = by.readShort();
            this.roleAttr = [];
            for (var i = 0; i < __count6; i++) {
                this.roleAttr[i] = by.readInt();
            }
            var __count7 = by.readShort();
            this.strengthens = [];
            for (var i = 0; i < __count7; i++) {
                this.strengthens[i] = new StrengthenInfo();
                this.strengthens[i].decode(by);
            }
        };
        return Client_RoleInfo;
    }(proto.Pro));
    proto.Client_RoleInfo = Client_RoleInfo;
    __reflect(Client_RoleInfo.prototype, "proto.Client_RoleInfo");
    var StrengthenInfo = (function (_super) {
        __extends(StrengthenInfo, _super);
        function StrengthenInfo() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //强化信息类型
            //required>int
            _this.strengthId = 0; //强化表ID
            _this.S = proto.MessageType.StrengthenInfo;
            return _this;
        }
        StrengthenInfo.prototype.init = function (_type, _strengthId) {
            this.type = _type;
            this.strengthId = _strengthId;
            return this;
        };
        StrengthenInfo.prototype.encode = function (by) {
            by.writeByte(this.type);
            by.writeInt(this.strengthId);
        };
        StrengthenInfo.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            this.strengthId = by.readInt();
        };
        return StrengthenInfo;
    }(proto.Pro));
    proto.StrengthenInfo = StrengthenInfo;
    __reflect(StrengthenInfo.prototype, "proto.StrengthenInfo");
    var RoleAttrs = (function (_super) {
        __extends(RoleAttrs, _super);
        function RoleAttrs() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.look = 0; //朝向
            //required>byte
            _this.state = 0; //状态
            //required>int
            _this.wingsID = 0; //翅膀在表中ID
            //required>int
            _this.wingsexp = 0; //翅膀经验
            //required>int
            _this.wingslve = 0; //翅膀等级
            //required>int
            _this.wingsstar = 0; //翅膀星数
            //required>byte
            _this.sex = 0; //性别
            //required>byte
            _this.job = 0; //职业
            //required>int
            _this.FightValue = 0; //战斗力
            //required>byte
            _this.x = 0; //x坐标
            //required>byte
            _this.y = 0; //y坐标
            //required>int
            _this.MHP = 0; //undefined
            //required>int
            _this.MMP = 0; //最大HP，MP
            //required>int
            _this.HP = 0; //undefined
            //required>int
            _this.MP = 0; //当前HP，当前MP
            //required>int
            _this.critial = 0; //暴击率
            //required>int
            _this.critcoe = 0; //暴击伤害系数
            //required>int
            _this.resicritial = 0; //抗暴系数
            //required>int
            _this.ATK = 0; //物攻
            //required>int
            _this.DEF = 0; //物防
            //required>int
            _this.MATK = 0; //魔攻
            //required>int
            _this.MDEF = 0; //魔防
            //required>int
            _this.DRD = 0; //物理伤害减免
            //required>int
            _this.DRDrate = 0; //物理傷害減免比率
            //required>int
            _this.MDRD = 0; //魔法伤害减免
            //required>int
            _this.MDRDrate = 0; //魔法傷害減免比率
            //required>int
            _this.DRF = 0; //物理伤害反射
            //required>int
            _this.DRFrate = 0; //物理伤害反射几率
            _this.S = proto.MessageType.RoleAttrs;
            return _this;
        }
        RoleAttrs.prototype.init = function (_mapID, _look, _state, _weaponID, _clothes, _wingsID, _wingsexp, _wingslve, _wingsstar, _sex, _job, _FightValue, _x, _y, _MHP, _MMP, _HP, _MP, _critial, _critcoe, _resicritial, _ATK, _DEF, _MATK, _MDEF, _DRD, _DRDrate, _MDRD, _MDRDrate, _DRF, _DRFrate) {
            this.mapID = _mapID;
            this.look = _look;
            this.state = _state;
            this.weaponID = _weaponID;
            this.clothes = _clothes;
            this.wingsID = _wingsID;
            this.wingsexp = _wingsexp;
            this.wingslve = _wingslve;
            this.wingsstar = _wingsstar;
            this.sex = _sex;
            this.job = _job;
            this.FightValue = _FightValue;
            this.x = _x;
            this.y = _y;
            this.MHP = _MHP;
            this.MMP = _MMP;
            this.HP = _HP;
            this.MP = _MP;
            this.critial = _critial;
            this.critcoe = _critcoe;
            this.resicritial = _resicritial;
            this.ATK = _ATK;
            this.DEF = _DEF;
            this.MATK = _MATK;
            this.MDEF = _MDEF;
            this.DRD = _DRD;
            this.DRDrate = _DRDrate;
            this.MDRD = _MDRD;
            this.MDRDrate = _MDRDrate;
            this.DRF = _DRF;
            this.DRFrate = _DRFrate;
            return this;
        };
        RoleAttrs.prototype.encode = function (by) {
            by.writeUTF(this.mapID);
            by.writeByte(this.look);
            by.writeByte(this.state);
            by.writeUTF(this.weaponID);
            by.writeUTF(this.clothes);
            by.writeInt(this.wingsID);
            by.writeInt(this.wingsexp);
            by.writeInt(this.wingslve);
            by.writeInt(this.wingsstar);
            by.writeByte(this.sex);
            by.writeByte(this.job);
            by.writeInt(this.FightValue);
            by.writeByte(this.x);
            by.writeByte(this.y);
            by.writeInt(this.MHP);
            by.writeInt(this.MMP);
            by.writeInt(this.HP);
            by.writeInt(this.MP);
            by.writeInt(this.critial);
            by.writeInt(this.critcoe);
            by.writeInt(this.resicritial);
            by.writeInt(this.ATK);
            by.writeInt(this.DEF);
            by.writeInt(this.MATK);
            by.writeInt(this.MDEF);
            by.writeInt(this.DRD);
            by.writeInt(this.DRDrate);
            by.writeInt(this.MDRD);
            by.writeInt(this.MDRDrate);
            by.writeInt(this.DRF);
            by.writeInt(this.DRFrate);
        };
        RoleAttrs.prototype.decode = function (by) {
            this.mapID = by.readUTF();
            this.look = by.readUnsignedByte();
            this.state = by.readUnsignedByte();
            this.weaponID = by.readUTF();
            this.clothes = by.readUTF();
            this.wingsID = by.readInt();
            this.wingsexp = by.readInt();
            this.wingslve = by.readInt();
            this.wingsstar = by.readInt();
            this.sex = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
            this.FightValue = by.readInt();
            this.x = by.readUnsignedByte();
            this.y = by.readUnsignedByte();
            this.MHP = by.readInt();
            this.MMP = by.readInt();
            this.HP = by.readInt();
            this.MP = by.readInt();
            this.critial = by.readInt();
            this.critcoe = by.readInt();
            this.resicritial = by.readInt();
            this.ATK = by.readInt();
            this.DEF = by.readInt();
            this.MATK = by.readInt();
            this.MDEF = by.readInt();
            this.DRD = by.readInt();
            this.DRDrate = by.readInt();
            this.MDRD = by.readInt();
            this.MDRDrate = by.readInt();
            this.DRF = by.readInt();
            this.DRFrate = by.readInt();
        };
        return RoleAttrs;
    }(proto.Pro));
    proto.RoleAttrs = RoleAttrs;
    __reflect(RoleAttrs.prototype, "proto.RoleAttrs");
    var ItemData = (function (_super) {
        __extends(ItemData, _super);
        function ItemData() {
            var _this = _super.call(this) || this;
            //required>int
            _this.TempleID = 0; //物品模板ID
            //optional>int
            _this.expireTime = 0; //过期时间
            _this.S = proto.MessageType.ItemData;
            return _this;
        }
        ItemData.prototype.init = function (_InstanceId, _TempleID, _attrList, _expireTime) {
            this.InstanceId = _InstanceId;
            this.TempleID = _TempleID;
            this.attrList = _attrList;
            this.expireTime = _expireTime;
            return this;
        };
        ItemData.prototype.encode = function (by) {
            by.writeUTF(this.InstanceId);
            by.writeInt(this.TempleID);
            if (this.attrList != null) {
                by.writeShort(this.attrList.length);
                for (var i = 0; i < this.attrList.length; i++) {
                    this.attrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.expireTime);
        };
        ItemData.prototype.decode = function (by) {
            this.InstanceId = by.readUTF();
            this.TempleID = by.readInt();
            var __count2 = by.readShort();
            this.attrList = [];
            for (var i = 0; i < __count2; i++) {
                this.attrList[i] = new AttrValue();
                this.attrList[i].decode(by);
            }
            if (by.readByte() > 0) {
                this.expireTime = by.readInt();
            }
        };
        return ItemData;
    }(proto.Pro));
    proto.ItemData = ItemData;
    __reflect(ItemData.prototype, "proto.ItemData");
    var S_Skill = (function (_super) {
        __extends(S_Skill, _super);
        function S_Skill() {
            var _this = _super.call(this) || this;
            //required>int
            _this.SkillID = 0; //技能ID
            _this.S = proto.MessageType.S_Skill;
            return _this;
        }
        S_Skill.prototype.init = function (_SkillID) {
            this.SkillID = _SkillID;
            return this;
        };
        S_Skill.prototype.encode = function (by) {
            by.writeInt(this.SkillID);
        };
        S_Skill.prototype.decode = function (by) {
            this.SkillID = by.readInt();
        };
        return S_Skill;
    }(proto.Pro));
    proto.S_Skill = S_Skill;
    __reflect(S_Skill.prototype, "proto.S_Skill");
    var c_skill_up = (function (_super) {
        __extends(c_skill_up, _super);
        function c_skill_up() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //当前职业
            //required>int
            _this.skillid = 0; //技能ID
            _this.S = proto.MessageType.c_skill_up;
            return _this;
        }
        c_skill_up.prototype.init = function (_job, _skillid) {
            this.job = _job;
            this.skillid = _skillid;
            return this;
        };
        c_skill_up.prototype.encode = function (by) {
            by.writeByte(this.job);
            by.writeInt(this.skillid);
        };
        c_skill_up.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
            this.skillid = by.readInt();
        };
        return c_skill_up;
    }(proto.Pro));
    proto.c_skill_up = c_skill_up;
    __reflect(c_skill_up.prototype, "proto.c_skill_up");
    var s_skill_up = (function (_super) {
        __extends(s_skill_up, _super);
        function s_skill_up() {
            var _this = _super.call(this) || this;
            //required>int
            _this.skillid = 0; //技能ID
            _this.S = proto.MessageType.s_skill_up;
            return _this;
        }
        s_skill_up.prototype.init = function (_isSuccessed, _skillid) {
            this.isSuccessed = _isSuccessed;
            this.skillid = _skillid;
            return this;
        };
        s_skill_up.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccessed);
            by.writeInt(this.skillid);
        };
        s_skill_up.prototype.decode = function (by) {
            this.isSuccessed = by.readBoolean();
            this.skillid = by.readInt();
        };
        return s_skill_up;
    }(proto.Pro));
    proto.s_skill_up = s_skill_up;
    __reflect(s_skill_up.prototype, "proto.s_skill_up");
    var c_skillAllUp = (function (_super) {
        __extends(c_skillAllUp, _super);
        function c_skillAllUp() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_skillAllUp;
            return _this;
        }
        c_skillAllUp.prototype.init = function (_job) {
            this.job = _job;
            return this;
        };
        c_skillAllUp.prototype.encode = function (by) {
            by.writeByte(this.job);
        };
        c_skillAllUp.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
        };
        return c_skillAllUp;
    }(proto.Pro));
    proto.c_skillAllUp = c_skillAllUp;
    __reflect(c_skillAllUp.prototype, "proto.c_skillAllUp");
    var s_skillAllUp = (function (_super) {
        __extends(s_skillAllUp, _super);
        function s_skillAllUp() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_skillAllUp;
            return _this;
        }
        s_skillAllUp.prototype.init = function (_idSuccessed, _skillInfoList) {
            this.idSuccessed = _idSuccessed;
            this.skillInfoList = _skillInfoList;
            return this;
        };
        s_skillAllUp.prototype.encode = function (by) {
            by.writeBoolean(this.idSuccessed);
            if (this.skillInfoList != null) {
                by.writeShort(this.skillInfoList.length);
                for (var i = 0; i < this.skillInfoList.length; i++) {
                    this.skillInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_skillAllUp.prototype.decode = function (by) {
            this.idSuccessed = by.readBoolean();
            var __count1 = by.readShort();
            this.skillInfoList = [];
            for (var i = 0; i < __count1; i++) {
                this.skillInfoList[i] = new SkillInfo();
                this.skillInfoList[i].decode(by);
            }
        };
        return s_skillAllUp;
    }(proto.Pro));
    proto.s_skillAllUp = s_skillAllUp;
    __reflect(s_skillAllUp.prototype, "proto.s_skillAllUp");
    var c_Login = (function (_super) {
        __extends(c_Login, _super);
        function c_Login() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_Login;
            return _this;
        }
        c_Login.prototype.init = function (_name, _pass, _isReLogin) {
            this.name = _name;
            this.pass = _pass;
            this.isReLogin = _isReLogin;
            return this;
        };
        c_Login.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeUTF(this.pass);
            by.writeBoolean(this.isReLogin);
        };
        c_Login.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.pass = by.readUTF();
            this.isReLogin = by.readBoolean();
        };
        return c_Login;
    }(proto.Pro));
    proto.c_Login = c_Login;
    __reflect(c_Login.prototype, "proto.c_Login");
    var s_Login = (function (_super) {
        __extends(s_Login, _super);
        function s_Login() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.state = 0; //错误号
            _this.S = proto.MessageType.s_Login;
            return _this;
        }
        s_Login.prototype.init = function (_state, _mess) {
            this.state = _state;
            this.mess = _mess;
            return this;
        };
        s_Login.prototype.encode = function (by) {
            by.writeByte(this.state);
            if (this.mess != null) {
                by.writeByte(1);
                by.writeUTF(this.mess);
            }
            else {
                by.writeByte(0);
            }
        };
        s_Login.prototype.decode = function (by) {
            this.state = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.mess = by.readUTF();
            }
        };
        return s_Login;
    }(proto.Pro));
    proto.s_Login = s_Login;
    __reflect(s_Login.prototype, "proto.s_Login");
    var c_CreateChar = (function (_super) {
        __extends(c_CreateChar, _super);
        function c_CreateChar() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.JOB = 0; //职业
            //required>byte
            _this.Sex = 0; //性别
            _this.S = proto.MessageType.c_CreateChar;
            return _this;
        }
        c_CreateChar.prototype.init = function (_name, _JOB, _Sex) {
            this.name = _name;
            this.JOB = _JOB;
            this.Sex = _Sex;
            return this;
        };
        c_CreateChar.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeByte(this.JOB);
            by.writeByte(this.Sex);
        };
        c_CreateChar.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.JOB = by.readUnsignedByte();
            this.Sex = by.readUnsignedByte();
        };
        return c_CreateChar;
    }(proto.Pro));
    proto.c_CreateChar = c_CreateChar;
    __reflect(c_CreateChar.prototype, "proto.c_CreateChar");
    var c_wings_up = (function (_super) {
        __extends(c_wings_up, _super);
        function c_wings_up() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //升级类型，1金币
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_wings_up;
            return _this;
        }
        c_wings_up.prototype.init = function (_type, _job) {
            this.type = _type;
            this.job = _job;
            return this;
        };
        c_wings_up.prototype.encode = function (by) {
            by.writeByte(this.type);
            by.writeByte(this.job);
        };
        c_wings_up.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
        };
        return c_wings_up;
    }(proto.Pro));
    proto.c_wings_up = c_wings_up;
    __reflect(c_wings_up.prototype, "proto.c_wings_up");
    var s_wings_up = (function (_super) {
        __extends(s_wings_up, _super);
        function s_wings_up() {
            var _this = _super.call(this) || this;
            //required>int
            _this.exp = 0; //+经验
            _this.S = proto.MessageType.s_wings_up;
            return _this;
        }
        s_wings_up.prototype.init = function (_isSuccess, _exp) {
            this.isSuccess = _isSuccess;
            this.exp = _exp;
            return this;
        };
        s_wings_up.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeInt(this.exp);
        };
        s_wings_up.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.exp = by.readInt();
        };
        return s_wings_up;
    }(proto.Pro));
    proto.s_wings_up = s_wings_up;
    __reflect(s_wings_up.prototype, "proto.s_wings_up");
    var c_wings_levup = (function (_super) {
        __extends(c_wings_levup, _super);
        function c_wings_levup() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_wings_levup;
            return _this;
        }
        c_wings_levup.prototype.init = function (_job) {
            this.job = _job;
            return this;
        };
        c_wings_levup.prototype.encode = function (by) {
            by.writeByte(this.job);
        };
        c_wings_levup.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
        };
        return c_wings_levup;
    }(proto.Pro));
    proto.c_wings_levup = c_wings_levup;
    __reflect(c_wings_levup.prototype, "proto.c_wings_levup");
    var s_wings_levup = (function (_super) {
        __extends(s_wings_levup, _super);
        function s_wings_levup() {
            var _this = _super.call(this) || this;
            //required>int
            _this.wingsID = 0; //undefined
            _this.S = proto.MessageType.s_wings_levup;
            return _this;
        }
        s_wings_levup.prototype.init = function (_isSuccess, _wingsID) {
            this.isSuccess = _isSuccess;
            this.wingsID = _wingsID;
            return this;
        };
        s_wings_levup.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeInt(this.wingsID);
        };
        s_wings_levup.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.wingsID = by.readInt();
        };
        return s_wings_levup;
    }(proto.Pro));
    proto.s_wings_levup = s_wings_levup;
    __reflect(s_wings_levup.prototype, "proto.s_wings_levup");
    var c_ChangeEquip = (function (_super) {
        __extends(c_ChangeEquip, _super);
        function c_ChangeEquip() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //要换装的职业
            _this.S = proto.MessageType.c_ChangeEquip;
            return _this;
        }
        c_ChangeEquip.prototype.init = function (_job) {
            this.job = _job;
            return this;
        };
        c_ChangeEquip.prototype.encode = function (by) {
            by.writeByte(this.job);
        };
        c_ChangeEquip.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
        };
        return c_ChangeEquip;
    }(proto.Pro));
    proto.c_ChangeEquip = c_ChangeEquip;
    __reflect(c_ChangeEquip.prototype, "proto.c_ChangeEquip");
    var s_ChangeEquip = (function (_super) {
        __extends(s_ChangeEquip, _super);
        function s_ChangeEquip() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.s_ChangeEquip;
            return _this;
        }
        s_ChangeEquip.prototype.init = function (_job, _equips) {
            this.job = _job;
            this.equips = _equips;
            return this;
        };
        s_ChangeEquip.prototype.encode = function (by) {
            by.writeByte(this.job);
            if (this.equips != null) {
                by.writeShort(this.equips.length);
                for (var i = 0; i < this.equips.length; i++) {
                    this.equips[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_ChangeEquip.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
            var __count1 = by.readShort();
            this.equips = [];
            for (var i = 0; i < __count1; i++) {
                this.equips[i] = new ItemData();
                this.equips[i].decode(by);
            }
        };
        return s_ChangeEquip;
    }(proto.Pro));
    proto.s_ChangeEquip = s_ChangeEquip;
    __reflect(s_ChangeEquip.prototype, "proto.s_ChangeEquip");
    var AttrValue = (function (_super) {
        __extends(AttrValue, _super);
        function AttrValue() {
            var _this = _super.call(this) || this;
            //required>int
            _this.attrID = 0; //属性对应枚举ID
            //required>int
            _this.myvalue = 0; //值
            //required>int
            _this.additional = 0; //附加值
            _this.S = proto.MessageType.AttrValue;
            return _this;
        }
        AttrValue.prototype.init = function (_attrID, _myvalue, _additional) {
            this.attrID = _attrID;
            this.myvalue = _myvalue;
            this.additional = _additional;
            return this;
        };
        AttrValue.prototype.encode = function (by) {
            by.writeInt(this.attrID);
            by.writeInt(this.myvalue);
            by.writeInt(this.additional);
        };
        AttrValue.prototype.decode = function (by) {
            this.attrID = by.readInt();
            this.myvalue = by.readInt();
            this.additional = by.readInt();
        };
        return AttrValue;
    }(proto.Pro));
    proto.AttrValue = AttrValue;
    __reflect(AttrValue.prototype, "proto.AttrValue");
    var c_Reborn = (function (_super) {
        __extends(c_Reborn, _super);
        function c_Reborn() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_Reborn;
            return _this;
        }
        c_Reborn.prototype.init = function () {
            return this;
        };
        c_Reborn.prototype.encode = function (by) {
        };
        c_Reborn.prototype.decode = function (by) {
        };
        return c_Reborn;
    }(proto.Pro));
    proto.c_Reborn = c_Reborn;
    __reflect(c_Reborn.prototype, "proto.c_Reborn");
    var s_Reborn = (function (_super) {
        __extends(s_Reborn, _super);
        function s_Reborn() {
            var _this = _super.call(this) || this;
            //required>int
            _this.newRebornID = 0; //转生后ID
            _this.S = proto.MessageType.s_Reborn;
            return _this;
        }
        s_Reborn.prototype.init = function (_isSuccess, _newRebornID) {
            this.isSuccess = _isSuccess;
            this.newRebornID = _newRebornID;
            return this;
        };
        s_Reborn.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeInt(this.newRebornID);
        };
        s_Reborn.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.newRebornID = by.readInt();
        };
        return s_Reborn;
    }(proto.Pro));
    proto.s_Reborn = s_Reborn;
    __reflect(s_Reborn.prototype, "proto.s_Reborn");
    var c_GetXiuWei = (function (_super) {
        __extends(c_GetXiuWei, _super);
        function c_GetXiuWei() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //获取修为方式
            _this.S = proto.MessageType.c_GetXiuWei;
            return _this;
        }
        c_GetXiuWei.prototype.init = function (_type) {
            this.type = _type;
            return this;
        };
        c_GetXiuWei.prototype.encode = function (by) {
            by.writeByte(this.type);
        };
        c_GetXiuWei.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
        };
        return c_GetXiuWei;
    }(proto.Pro));
    proto.c_GetXiuWei = c_GetXiuWei;
    __reflect(c_GetXiuWei.prototype, "proto.c_GetXiuWei");
    var s_GetXiuWei = (function (_super) {
        __extends(s_GetXiuWei, _super);
        function s_GetXiuWei() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_GetXiuWei;
            return _this;
        }
        s_GetXiuWei.prototype.init = function (_isSuccess) {
            this.isSuccess = _isSuccess;
            return this;
        };
        s_GetXiuWei.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
        };
        s_GetXiuWei.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
        };
        return s_GetXiuWei;
    }(proto.Pro));
    proto.s_GetXiuWei = s_GetXiuWei;
    __reflect(s_GetXiuWei.prototype, "proto.s_GetXiuWei");
    var c_AddBag = (function (_super) {
        __extends(c_AddBag, _super);
        function c_AddBag() {
            var _this = _super.call(this) || this;
            //required>int
            _this.num = 0; //要开启的背包数量
            _this.S = proto.MessageType.c_AddBag;
            return _this;
        }
        c_AddBag.prototype.init = function (_num) {
            this.num = _num;
            return this;
        };
        c_AddBag.prototype.encode = function (by) {
            by.writeInt(this.num);
        };
        c_AddBag.prototype.decode = function (by) {
            this.num = by.readInt();
        };
        return c_AddBag;
    }(proto.Pro));
    proto.c_AddBag = c_AddBag;
    __reflect(c_AddBag.prototype, "proto.c_AddBag");
    var s_AddBag = (function (_super) {
        __extends(s_AddBag, _super);
        function s_AddBag() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_AddBag;
            return _this;
        }
        s_AddBag.prototype.init = function (_isSuccess) {
            this.isSuccess = _isSuccess;
            return this;
        };
        s_AddBag.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
        };
        s_AddBag.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
        };
        return s_AddBag;
    }(proto.Pro));
    proto.s_AddBag = s_AddBag;
    __reflect(s_AddBag.prototype, "proto.s_AddBag");
    var c_SmeltEquips = (function (_super) {
        __extends(c_SmeltEquips, _super);
        function c_SmeltEquips() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_SmeltEquips;
            return _this;
        }
        c_SmeltEquips.prototype.init = function (_InstIdList) {
            this.InstIdList = _InstIdList;
            return this;
        };
        c_SmeltEquips.prototype.encode = function (by) {
            if (this.InstIdList != null) {
                by.writeShort(this.InstIdList.length);
                for (var i = 0; i < this.InstIdList.length; i++) {
                    by.writeUTF(this.InstIdList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        c_SmeltEquips.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.InstIdList = [];
            for (var i = 0; i < __count0; i++) {
                this.InstIdList[i] = by.readUTF();
            }
        };
        return c_SmeltEquips;
    }(proto.Pro));
    proto.c_SmeltEquips = c_SmeltEquips;
    __reflect(c_SmeltEquips.prototype, "proto.c_SmeltEquips");
    var s_SmeltEquips = (function (_super) {
        __extends(s_SmeltEquips, _super);
        function s_SmeltEquips() {
            var _this = _super.call(this) || this;
            //required>int
            _this.money = 0; //熔炼获得金钱
            //required>int
            _this.qianghuashi = 0; //熔炼获得强化石
            _this.S = proto.MessageType.s_SmeltEquips;
            return _this;
        }
        s_SmeltEquips.prototype.init = function (_money, _qianghuashi, _InstIdList) {
            this.money = _money;
            this.qianghuashi = _qianghuashi;
            this.InstIdList = _InstIdList;
            return this;
        };
        s_SmeltEquips.prototype.encode = function (by) {
            by.writeInt(this.money);
            by.writeInt(this.qianghuashi);
            if (this.InstIdList != null) {
                by.writeShort(this.InstIdList.length);
                for (var i = 0; i < this.InstIdList.length; i++) {
                    by.writeUTF(this.InstIdList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_SmeltEquips.prototype.decode = function (by) {
            this.money = by.readInt();
            this.qianghuashi = by.readInt();
            var __count2 = by.readShort();
            this.InstIdList = [];
            for (var i = 0; i < __count2; i++) {
                this.InstIdList[i] = by.readUTF();
            }
        };
        return s_SmeltEquips;
    }(proto.Pro));
    proto.s_SmeltEquips = s_SmeltEquips;
    __reflect(s_SmeltEquips.prototype, "proto.s_SmeltEquips");
    var c_Strengthen = (function (_super) {
        __extends(c_Strengthen, _super);
        function c_Strengthen() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            //required>byte
            _this.type = 0; //强化类型
            //required>byte
            _this.pos = 0; //当前要强化的部位
            _this.S = proto.MessageType.c_Strengthen;
            return _this;
        }
        c_Strengthen.prototype.init = function (_job, _type, _pos) {
            this.job = _job;
            this.type = _type;
            this.pos = _pos;
            return this;
        };
        c_Strengthen.prototype.encode = function (by) {
            by.writeByte(this.job);
            by.writeByte(this.type);
            by.writeByte(this.pos);
        };
        c_Strengthen.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
            this.type = by.readUnsignedByte();
            this.pos = by.readUnsignedByte();
        };
        return c_Strengthen;
    }(proto.Pro));
    proto.c_Strengthen = c_Strengthen;
    __reflect(c_Strengthen.prototype, "proto.c_Strengthen");
    var s_Strengthen = (function (_super) {
        __extends(s_Strengthen, _super);
        function s_Strengthen() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.newID = 0; //新的ID
            //required>int
            _this.nextStrengthId = 0; //下一个要强化的ID
            _this.S = proto.MessageType.s_Strengthen;
            return _this;
        }
        s_Strengthen.prototype.init = function (_isSuccess, _newID, _nextStrengthId) {
            this.isSuccess = _isSuccess;
            this.newID = _newID;
            this.nextStrengthId = _nextStrengthId;
            return this;
        };
        s_Strengthen.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.newID);
            by.writeInt(this.nextStrengthId);
        };
        s_Strengthen.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.newID = by.readInt();
            }
            this.nextStrengthId = by.readInt();
        };
        return s_Strengthen;
    }(proto.Pro));
    proto.s_Strengthen = s_Strengthen;
    __reflect(s_Strengthen.prototype, "proto.s_Strengthen");
    var s_AddItems = (function (_super) {
        __extends(s_AddItems, _super);
        function s_AddItems() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_AddItems;
            return _this;
        }
        s_AddItems.prototype.init = function (_items) {
            this.items = _items;
            return this;
        };
        s_AddItems.prototype.encode = function (by) {
            if (this.items != null) {
                by.writeShort(this.items.length);
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_AddItems.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.items = [];
            for (var i = 0; i < __count0; i++) {
                this.items[i] = new ItemData();
                this.items[i].decode(by);
            }
        };
        return s_AddItems;
    }(proto.Pro));
    proto.s_AddItems = s_AddItems;
    __reflect(s_AddItems.prototype, "proto.s_AddItems");
    var s_ChangeItemNum = (function (_super) {
        __extends(s_ChangeItemNum, _super);
        function s_ChangeItemNum() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //品对应唯一ID
            //required>int
            _this.num = 0; //当前数量
            _this.S = proto.MessageType.s_ChangeItemNum;
            return _this;
        }
        s_ChangeItemNum.prototype.init = function (_uid, _num) {
            this.uid = _uid;
            this.num = _num;
            return this;
        };
        s_ChangeItemNum.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeInt(this.num);
        };
        s_ChangeItemNum.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.num = by.readInt();
        };
        return s_ChangeItemNum;
    }(proto.Pro));
    proto.s_ChangeItemNum = s_ChangeItemNum;
    __reflect(s_ChangeItemNum.prototype, "proto.s_ChangeItemNum");
    var c_JingMai_Up = (function (_super) {
        __extends(c_JingMai_Up, _super);
        function c_JingMai_Up() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //提升经脉的类型
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_JingMai_Up;
            return _this;
        }
        c_JingMai_Up.prototype.init = function (_type, _job) {
            this.type = _type;
            this.job = _job;
            return this;
        };
        c_JingMai_Up.prototype.encode = function (by) {
            by.writeByte(this.type);
            by.writeByte(this.job);
        };
        c_JingMai_Up.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
        };
        return c_JingMai_Up;
    }(proto.Pro));
    proto.c_JingMai_Up = c_JingMai_Up;
    __reflect(c_JingMai_Up.prototype, "proto.c_JingMai_Up");
    var s_JingMai_Up = (function (_super) {
        __extends(s_JingMai_Up, _super);
        function s_JingMai_Up() {
            var _this = _super.call(this) || this;
            //required>int
            _this.jingMaiID = 0; //经脉在表中的ID
            _this.S = proto.MessageType.s_JingMai_Up;
            return _this;
        }
        s_JingMai_Up.prototype.init = function (_isSuccess, _jingMaiID) {
            this.isSuccess = _isSuccess;
            this.jingMaiID = _jingMaiID;
            return this;
        };
        s_JingMai_Up.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeInt(this.jingMaiID);
        };
        s_JingMai_Up.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.jingMaiID = by.readInt();
        };
        return s_JingMai_Up;
    }(proto.Pro));
    proto.s_JingMai_Up = s_JingMai_Up;
    __reflect(s_JingMai_Up.prototype, "proto.s_JingMai_Up");
    var c_say = (function (_super) {
        __extends(c_say, _super);
        function c_say() {
            var _this = _super.call(this) || this;
            //required>int
            _this.channel = 0; //频道
            _this.S = proto.MessageType.c_say;
            return _this;
        }
        c_say.prototype.init = function (_channel, _content, _sendTo) {
            this.channel = _channel;
            this.content = _content;
            this.sendTo = _sendTo;
            return this;
        };
        c_say.prototype.encode = function (by) {
            by.writeInt(this.channel);
            by.writeUTF(this.content);
            if (this.sendTo != null) {
                by.writeByte(1);
                by.writeUTF(this.sendTo);
            }
            else {
                by.writeByte(0);
            }
        };
        c_say.prototype.decode = function (by) {
            this.channel = by.readInt();
            this.content = by.readUTF();
            if (by.readByte() > 0) {
                this.sendTo = by.readUTF();
            }
        };
        return c_say;
    }(proto.Pro));
    proto.c_say = c_say;
    __reflect(c_say.prototype, "proto.c_say");
    var s_say = (function (_super) {
        __extends(s_say, _super);
        function s_say() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_say;
            return _this;
        }
        s_say.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_say.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_say.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_say;
    }(proto.Pro));
    proto.s_say = s_say;
    __reflect(s_say.prototype, "proto.s_say");
    var RoleBasicInfo = (function (_super) {
        __extends(RoleBasicInfo, _super);
        function RoleBasicInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.headID = 0; //头像
            //required>byte
            _this.rank = 0; //段位
            //required>byte
            _this.vip = 0; //vip等级
            //required>byte
            _this.guildJob = 0; //公会职位
            _this.S = proto.MessageType.RoleBasicInfo;
            return _this;
        }
        RoleBasicInfo.prototype.init = function (_instanceId, _name, _headID, _rank, _yueka, _vip, _guildJob) {
            this.instanceId = _instanceId;
            this.name = _name;
            this.headID = _headID;
            this.rank = _rank;
            this.yueka = _yueka;
            this.vip = _vip;
            this.guildJob = _guildJob;
            return this;
        };
        RoleBasicInfo.prototype.encode = function (by) {
            by.writeUTF(this.instanceId);
            by.writeUTF(this.name);
            by.writeInt(this.headID);
            by.writeByte(this.rank);
            by.writeBoolean(this.yueka);
            by.writeByte(this.vip);
            by.writeByte(this.guildJob);
        };
        RoleBasicInfo.prototype.decode = function (by) {
            this.instanceId = by.readUTF();
            this.name = by.readUTF();
            this.headID = by.readInt();
            this.rank = by.readUnsignedByte();
            this.yueka = by.readBoolean();
            this.vip = by.readUnsignedByte();
            this.guildJob = by.readUnsignedByte();
        };
        return RoleBasicInfo;
    }(proto.Pro));
    proto.RoleBasicInfo = RoleBasicInfo;
    __reflect(RoleBasicInfo.prototype, "proto.RoleBasicInfo");
    var c_SpecialEquip_Up = (function (_super) {
        __extends(c_SpecialEquip_Up, _super);
        function c_SpecialEquip_Up() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //类型
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_SpecialEquip_Up;
            return _this;
        }
        c_SpecialEquip_Up.prototype.init = function (_type, _job) {
            this.type = _type;
            this.job = _job;
            return this;
        };
        c_SpecialEquip_Up.prototype.encode = function (by) {
            by.writeByte(this.type);
            by.writeByte(this.job);
        };
        c_SpecialEquip_Up.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
        };
        return c_SpecialEquip_Up;
    }(proto.Pro));
    proto.c_SpecialEquip_Up = c_SpecialEquip_Up;
    __reflect(c_SpecialEquip_Up.prototype, "proto.c_SpecialEquip_Up");
    var s_SpecialEquip_Up = (function (_super) {
        __extends(s_SpecialEquip_Up, _super);
        function s_SpecialEquip_Up() {
            var _this = _super.call(this) || this;
            //required>int
            _this.equipLevID = 0; //返回新的ID
            _this.S = proto.MessageType.s_SpecialEquip_Up;
            return _this;
        }
        s_SpecialEquip_Up.prototype.init = function (_isSuccess, _equipLevID) {
            this.isSuccess = _isSuccess;
            this.equipLevID = _equipLevID;
            return this;
        };
        s_SpecialEquip_Up.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeInt(this.equipLevID);
        };
        s_SpecialEquip_Up.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.equipLevID = by.readInt();
        };
        return s_SpecialEquip_Up;
    }(proto.Pro));
    proto.s_SpecialEquip_Up = s_SpecialEquip_Up;
    __reflect(s_SpecialEquip_Up.prototype, "proto.s_SpecialEquip_Up");
    var c_createRole = (function (_super) {
        __extends(c_createRole, _super);
        function c_createRole() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            //required>byte
            _this.sex = 0; //性别
            _this.S = proto.MessageType.c_createRole;
            return _this;
        }
        c_createRole.prototype.init = function (_job, _sex) {
            this.job = _job;
            this.sex = _sex;
            return this;
        };
        c_createRole.prototype.encode = function (by) {
            by.writeByte(this.job);
            by.writeByte(this.sex);
        };
        c_createRole.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
            this.sex = by.readUnsignedByte();
        };
        return c_createRole;
    }(proto.Pro));
    proto.c_createRole = c_createRole;
    __reflect(c_createRole.prototype, "proto.c_createRole");
    var c_RequestShop = (function (_super) {
        __extends(c_RequestShop, _super);
        function c_RequestShop() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_RequestShop;
            return _this;
        }
        c_RequestShop.prototype.init = function () {
            return this;
        };
        c_RequestShop.prototype.encode = function (by) {
        };
        c_RequestShop.prototype.decode = function (by) {
        };
        return c_RequestShop;
    }(proto.Pro));
    proto.c_RequestShop = c_RequestShop;
    __reflect(c_RequestShop.prototype, "proto.c_RequestShop");
    var s_RequestShop = (function (_super) {
        __extends(s_RequestShop, _super);
        function s_RequestShop() {
            var _this = _super.call(this) || this;
            //required>int
            _this.remainRefreshSeconds = 0; //下次刷新所剩秒数
            _this.S = proto.MessageType.s_RequestShop;
            return _this;
        }
        s_RequestShop.prototype.init = function (_isRefresh, _templateIdList, _remainRefreshSeconds) {
            this.isRefresh = _isRefresh;
            this.templateIdList = _templateIdList;
            this.remainRefreshSeconds = _remainRefreshSeconds;
            return this;
        };
        s_RequestShop.prototype.encode = function (by) {
            by.writeBoolean(this.isRefresh);
            if (this.templateIdList != null) {
                by.writeShort(this.templateIdList.length);
                for (var i = 0; i < this.templateIdList.length; i++) {
                    by.writeInt(this.templateIdList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.remainRefreshSeconds);
        };
        s_RequestShop.prototype.decode = function (by) {
            this.isRefresh = by.readBoolean();
            var __count1 = by.readShort();
            this.templateIdList = [];
            for (var i = 0; i < __count1; i++) {
                this.templateIdList[i] = by.readInt();
            }
            this.remainRefreshSeconds = by.readInt();
        };
        return s_RequestShop;
    }(proto.Pro));
    proto.s_RequestShop = s_RequestShop;
    __reflect(s_RequestShop.prototype, "proto.s_RequestShop");
    var c_BuyItem = (function (_super) {
        __extends(c_BuyItem, _super);
        function c_BuyItem() {
            var _this = _super.call(this) || this;
            //required>int
            _this.ID = 0; //物品对应商店表ID
            //required>int
            _this.num = 0; //数量
            _this.S = proto.MessageType.c_BuyItem;
            return _this;
        }
        c_BuyItem.prototype.init = function (_ID, _num) {
            this.ID = _ID;
            this.num = _num;
            return this;
        };
        c_BuyItem.prototype.encode = function (by) {
            by.writeInt(this.ID);
            by.writeInt(this.num);
        };
        c_BuyItem.prototype.decode = function (by) {
            this.ID = by.readInt();
            this.num = by.readInt();
        };
        return c_BuyItem;
    }(proto.Pro));
    proto.c_BuyItem = c_BuyItem;
    __reflect(c_BuyItem.prototype, "proto.c_BuyItem");
    var s_BuyItem = (function (_super) {
        __extends(s_BuyItem, _super);
        function s_BuyItem() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_BuyItem;
            return _this;
        }
        s_BuyItem.prototype.init = function (_isSuccess) {
            this.isSuccess = _isSuccess;
            return this;
        };
        s_BuyItem.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
        };
        s_BuyItem.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
        };
        return s_BuyItem;
    }(proto.Pro));
    proto.s_BuyItem = s_BuyItem;
    __reflect(s_BuyItem.prototype, "proto.s_BuyItem");
    var c_AddFriendByName = (function (_super) {
        __extends(c_AddFriendByName, _super);
        function c_AddFriendByName() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_AddFriendByName;
            return _this;
        }
        c_AddFriendByName.prototype.init = function (_friendName) {
            this.friendName = _friendName;
            return this;
        };
        c_AddFriendByName.prototype.encode = function (by) {
            by.writeUTF(this.friendName);
        };
        c_AddFriendByName.prototype.decode = function (by) {
            this.friendName = by.readUTF();
        };
        return c_AddFriendByName;
    }(proto.Pro));
    proto.c_AddFriendByName = c_AddFriendByName;
    __reflect(c_AddFriendByName.prototype, "proto.c_AddFriendByName");
    var s_FriendAck = (function (_super) {
        __extends(s_FriendAck, _super);
        function s_FriendAck() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_FriendAck;
            return _this;
        }
        s_FriendAck.prototype.init = function (_isSuccess, _errMsg, _friendInfo) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.friendInfo = _friendInfo;
            return this;
        };
        s_FriendAck.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.friendInfo != null) {
                by.writeByte(1);
                this.friendInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_FriendAck.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.friendInfo = new FriendInfo();
                this.friendInfo.decode(by);
            }
        };
        return s_FriendAck;
    }(proto.Pro));
    proto.s_FriendAck = s_FriendAck;
    __reflect(s_FriendAck.prototype, "proto.s_FriendAck");
    var s_SendFriendList = (function (_super) {
        __extends(s_SendFriendList, _super);
        function s_SendFriendList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_SendFriendList;
            return _this;
        }
        s_SendFriendList.prototype.init = function (_friendList) {
            this.friendList = _friendList;
            return this;
        };
        s_SendFriendList.prototype.encode = function (by) {
            if (this.friendList != null) {
                by.writeShort(this.friendList.length);
                for (var i = 0; i < this.friendList.length; i++) {
                    this.friendList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_SendFriendList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.friendList = [];
            for (var i = 0; i < __count0; i++) {
                this.friendList[i] = new FriendInfo();
                this.friendList[i].decode(by);
            }
        };
        return s_SendFriendList;
    }(proto.Pro));
    proto.s_SendFriendList = s_SendFriendList;
    __reflect(s_SendFriendList.prototype, "proto.s_SendFriendList");
    var c_ReplyAdd = (function (_super) {
        __extends(c_ReplyAdd, _super);
        function c_ReplyAdd() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_ReplyAdd;
            return _this;
        }
        c_ReplyAdd.prototype.init = function (_isOK, _name) {
            this.isOK = _isOK;
            this.name = _name;
            return this;
        };
        c_ReplyAdd.prototype.encode = function (by) {
            by.writeBoolean(this.isOK);
            if (this.name != null) {
                by.writeShort(this.name.length);
                for (var i = 0; i < this.name.length; i++) {
                    by.writeUTF(this.name[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        c_ReplyAdd.prototype.decode = function (by) {
            this.isOK = by.readBoolean();
            var __count1 = by.readShort();
            this.name = [];
            for (var i = 0; i < __count1; i++) {
                this.name[i] = by.readUTF();
            }
        };
        return c_ReplyAdd;
    }(proto.Pro));
    proto.c_ReplyAdd = c_ReplyAdd;
    __reflect(c_ReplyAdd.prototype, "proto.c_ReplyAdd");
    var s_ReplyAdd = (function (_super) {
        __extends(s_ReplyAdd, _super);
        function s_ReplyAdd() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ReplyAdd;
            return _this;
        }
        s_ReplyAdd.prototype.init = function (_isSuccess, _targetName) {
            this.isSuccess = _isSuccess;
            this.targetName = _targetName;
            return this;
        };
        s_ReplyAdd.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeUTF(this.targetName);
        };
        s_ReplyAdd.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.targetName = by.readUTF();
        };
        return s_ReplyAdd;
    }(proto.Pro));
    proto.s_ReplyAdd = s_ReplyAdd;
    __reflect(s_ReplyAdd.prototype, "proto.s_ReplyAdd");
    var FriendInfo = (function (_super) {
        __extends(FriendInfo, _super);
        function FriendInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.state = 0; //好友状态:0被人邀请
            _this.S = proto.MessageType.FriendInfo;
            return _this;
        }
        FriendInfo.prototype.init = function (_playerId, _state, _name, _playerAttrList) {
            this.playerId = _playerId;
            this.state = _state;
            this.name = _name;
            this.playerAttrList = _playerAttrList;
            return this;
        };
        FriendInfo.prototype.encode = function (by) {
            by.writeUTF(this.playerId);
            by.writeInt(this.state);
            by.writeUTF(this.name);
            if (this.playerAttrList != null) {
                by.writeShort(this.playerAttrList.length);
                for (var i = 0; i < this.playerAttrList.length; i++) {
                    this.playerAttrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        FriendInfo.prototype.decode = function (by) {
            this.playerId = by.readUTF();
            this.state = by.readInt();
            this.name = by.readUTF();
            var __count3 = by.readShort();
            this.playerAttrList = [];
            for (var i = 0; i < __count3; i++) {
                this.playerAttrList[i] = new AttrValue();
                this.playerAttrList[i].decode(by);
            }
        };
        return FriendInfo;
    }(proto.Pro));
    proto.FriendInfo = FriendInfo;
    __reflect(FriendInfo.prototype, "proto.FriendInfo");
    var c_CreateNewSence = (function (_super) {
        __extends(c_CreateNewSence, _super);
        function c_CreateNewSence() {
            var _this = _super.call(this) || this;
            //required>int
            _this.levelStageID = 0; //当前关卡ID
            _this.S = proto.MessageType.c_CreateNewSence;
            return _this;
        }
        c_CreateNewSence.prototype.init = function (_levelStageID) {
            this.levelStageID = _levelStageID;
            return this;
        };
        c_CreateNewSence.prototype.encode = function (by) {
            by.writeInt(this.levelStageID);
        };
        c_CreateNewSence.prototype.decode = function (by) {
            this.levelStageID = by.readInt();
        };
        return c_CreateNewSence;
    }(proto.Pro));
    proto.c_CreateNewSence = c_CreateNewSence;
    __reflect(c_CreateNewSence.prototype, "proto.c_CreateNewSence");
    var s_CreateNewSence = (function (_super) {
        __extends(s_CreateNewSence, _super);
        function s_CreateNewSence() {
            var _this = _super.call(this) || this;
            //required>int
            _this.levelStageID = 0; //当前关卡ID
            _this.S = proto.MessageType.s_CreateNewSence;
            return _this;
        }
        s_CreateNewSence.prototype.init = function (_levelStageID, _pos) {
            this.levelStageID = _levelStageID;
            this.pos = _pos;
            return this;
        };
        s_CreateNewSence.prototype.encode = function (by) {
            by.writeInt(this.levelStageID);
            if (this.pos != null) {
                by.writeShort(this.pos.length);
                for (var i = 0; i < this.pos.length; i++) {
                    this.pos[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_CreateNewSence.prototype.decode = function (by) {
            this.levelStageID = by.readInt();
            var __count1 = by.readShort();
            this.pos = [];
            for (var i = 0; i < __count1; i++) {
                this.pos[i] = new Pos();
                this.pos[i].decode(by);
            }
        };
        return s_CreateNewSence;
    }(proto.Pro));
    proto.s_CreateNewSence = s_CreateNewSence;
    __reflect(s_CreateNewSence.prototype, "proto.s_CreateNewSence");
    var s_ChangeMainRole = (function (_super) {
        __extends(s_ChangeMainRole, _super);
        function s_ChangeMainRole() {
            var _this = _super.call(this) || this;
            //required>int
            _this.mapid = 0; //角色在地图的唯一ID
            _this.S = proto.MessageType.s_ChangeMainRole;
            return _this;
        }
        s_ChangeMainRole.prototype.init = function (_mapid) {
            this.mapid = _mapid;
            return this;
        };
        s_ChangeMainRole.prototype.encode = function (by) {
            by.writeInt(this.mapid);
        };
        s_ChangeMainRole.prototype.decode = function (by) {
            this.mapid = by.readInt();
        };
        return s_ChangeMainRole;
    }(proto.Pro));
    proto.s_ChangeMainRole = s_ChangeMainRole;
    __reflect(s_ChangeMainRole.prototype, "proto.s_ChangeMainRole");
    var s_Kickout = (function (_super) {
        __extends(s_Kickout, _super);
        function s_Kickout() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Kickout;
            return _this;
        }
        s_Kickout.prototype.init = function (_MsgReason) {
            this.MsgReason = _MsgReason;
            return this;
        };
        s_Kickout.prototype.encode = function (by) {
            by.writeUTF(this.MsgReason);
        };
        s_Kickout.prototype.decode = function (by) {
            this.MsgReason = by.readUTF();
        };
        return s_Kickout;
    }(proto.Pro));
    proto.s_Kickout = s_Kickout;
    __reflect(s_Kickout.prototype, "proto.s_Kickout");
    var s_CreateRole = (function (_super) {
        __extends(s_CreateRole, _super);
        function s_CreateRole() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.result = 0; //错误号
            _this.S = proto.MessageType.s_CreateRole;
            return _this;
        }
        s_CreateRole.prototype.init = function (_result, _msg, _roleInfo) {
            this.result = _result;
            this.msg = _msg;
            this.roleInfo = _roleInfo;
            return this;
        };
        s_CreateRole.prototype.encode = function (by) {
            by.writeByte(this.result);
            if (this.msg != null) {
                by.writeByte(1);
                by.writeUTF(this.msg);
            }
            else {
                by.writeByte(0);
            }
            if (this.roleInfo != null) {
                by.writeByte(1);
                this.roleInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_CreateRole.prototype.decode = function (by) {
            this.result = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.msg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.roleInfo = new Client_RoleInfo();
                this.roleInfo.decode(by);
            }
        };
        return s_CreateRole;
    }(proto.Pro));
    proto.s_CreateRole = s_CreateRole;
    __reflect(s_CreateRole.prototype, "proto.s_CreateRole");
    var DamageInfo = (function (_super) {
        __extends(DamageInfo, _super);
        function DamageInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.showInfo = 0; //造成伤害
            //optional>byte
            _this.hitX = 0; //undefined
            //optional>byte
            _this.hitY = 0; //undefined
            _this.S = proto.MessageType.DamageInfo;
            return _this;
        }
        DamageInfo.prototype.init = function (_instId, _showInfo, _addbuffList, _removeBufferList, _isDead, _dropActionList, _hitX, _hitY) {
            this.instId = _instId;
            this.showInfo = _showInfo;
            this.addbuffList = _addbuffList;
            this.removeBufferList = _removeBufferList;
            this.isDead = _isDead;
            this.dropActionList = _dropActionList;
            this.hitX = _hitX;
            this.hitY = _hitY;
            return this;
        };
        DamageInfo.prototype.encode = function (by) {
            by.writeUTF(this.instId);
            by.writeInt(this.showInfo);
            if (this.addbuffList != null) {
                by.writeShort(this.addbuffList.length);
                for (var i = 0; i < this.addbuffList.length; i++) {
                    by.writeInt(this.addbuffList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.removeBufferList != null) {
                by.writeShort(this.removeBufferList.length);
                for (var i = 0; i < this.removeBufferList.length; i++) {
                    by.writeInt(this.removeBufferList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeBoolean(this.isDead);
            if (this.dropActionList != null) {
                by.writeByte(1);
                this.dropActionList.encode(by);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeByte(this.hitX);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeByte(this.hitY);
        };
        DamageInfo.prototype.decode = function (by) {
            this.instId = by.readUTF();
            this.showInfo = by.readInt();
            var __count2 = by.readShort();
            this.addbuffList = [];
            for (var i = 0; i < __count2; i++) {
                this.addbuffList[i] = by.readInt();
            }
            var __count3 = by.readShort();
            this.removeBufferList = [];
            for (var i = 0; i < __count3; i++) {
                this.removeBufferList[i] = by.readInt();
            }
            this.isDead = by.readBoolean();
            if (by.readByte() > 0) {
                this.dropActionList = new MyAction();
                this.dropActionList.decode(by);
            }
            if (by.readByte() > 0) {
                this.hitX = by.readUnsignedByte();
            }
            if (by.readByte() > 0) {
                this.hitY = by.readUnsignedByte();
            }
        };
        return DamageInfo;
    }(proto.Pro));
    proto.DamageInfo = DamageInfo;
    __reflect(DamageInfo.prototype, "proto.DamageInfo");
    var BuffEffect = (function (_super) {
        __extends(BuffEffect, _super);
        function BuffEffect() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //0.移除
            //optional>int
            _this.showInfo = 0; //正数是增益效果，负数是减益效果
            _this.S = proto.MessageType.BuffEffect;
            return _this;
        }
        BuffEffect.prototype.init = function (_type, _buffIdList, _showInfo, _isDead, _ResurrectionUnit) {
            this.type = _type;
            this.buffIdList = _buffIdList;
            this.showInfo = _showInfo;
            this.isDead = _isDead;
            this.ResurrectionUnit = _ResurrectionUnit;
            return this;
        };
        BuffEffect.prototype.encode = function (by) {
            by.writeByte(this.type);
            if (this.buffIdList != null) {
                by.writeShort(this.buffIdList.length);
                for (var i = 0; i < this.buffIdList.length; i++) {
                    by.writeInt(this.buffIdList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.showInfo);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isDead);
            if (this.ResurrectionUnit != null) {
                by.writeByte(1);
                this.ResurrectionUnit.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        BuffEffect.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            var __count1 = by.readShort();
            this.buffIdList = [];
            for (var i = 0; i < __count1; i++) {
                this.buffIdList[i] = by.readInt();
            }
            if (by.readByte() > 0) {
                this.showInfo = by.readInt();
            }
            if (by.readByte() > 0) {
                this.isDead = by.readBoolean();
            }
            if (by.readByte() > 0) {
                this.ResurrectionUnit = new AddUnit();
                this.ResurrectionUnit.decode(by);
            }
        };
        return BuffEffect;
    }(proto.Pro));
    proto.BuffEffect = BuffEffect;
    __reflect(BuffEffect.prototype, "proto.BuffEffect");
    var s_RoleAttrChange = (function (_super) {
        __extends(s_RoleAttrChange, _super);
        function s_RoleAttrChange() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.Job = 0; //职业
            _this.S = proto.MessageType.s_RoleAttrChange;
            return _this;
        }
        s_RoleAttrChange.prototype.init = function (_Job, _AttrChangeList) {
            this.Job = _Job;
            this.AttrChangeList = _AttrChangeList;
            return this;
        };
        s_RoleAttrChange.prototype.encode = function (by) {
            by.writeByte(this.Job);
            if (this.AttrChangeList != null) {
                by.writeShort(this.AttrChangeList.length);
                for (var i = 0; i < this.AttrChangeList.length; i++) {
                    this.AttrChangeList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_RoleAttrChange.prototype.decode = function (by) {
            this.Job = by.readUnsignedByte();
            var __count1 = by.readShort();
            this.AttrChangeList = [];
            for (var i = 0; i < __count1; i++) {
                this.AttrChangeList[i] = new AttrValue();
                this.AttrChangeList[i].decode(by);
            }
        };
        return s_RoleAttrChange;
    }(proto.Pro));
    proto.s_RoleAttrChange = s_RoleAttrChange;
    __reflect(s_RoleAttrChange.prototype, "proto.s_RoleAttrChange");
    var s_ItemAttrChange = (function (_super) {
        __extends(s_ItemAttrChange, _super);
        function s_ItemAttrChange() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ItemAttrChange;
            return _this;
        }
        s_ItemAttrChange.prototype.init = function (_InstanceId, _AttrChangeList) {
            this.InstanceId = _InstanceId;
            this.AttrChangeList = _AttrChangeList;
            return this;
        };
        s_ItemAttrChange.prototype.encode = function (by) {
            by.writeUTF(this.InstanceId);
            if (this.AttrChangeList != null) {
                by.writeShort(this.AttrChangeList.length);
                for (var i = 0; i < this.AttrChangeList.length; i++) {
                    this.AttrChangeList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_ItemAttrChange.prototype.decode = function (by) {
            this.InstanceId = by.readUTF();
            var __count1 = by.readShort();
            this.AttrChangeList = [];
            for (var i = 0; i < __count1; i++) {
                this.AttrChangeList[i] = new AttrValue();
                this.AttrChangeList[i].decode(by);
            }
        };
        return s_ItemAttrChange;
    }(proto.Pro));
    proto.s_ItemAttrChange = s_ItemAttrChange;
    __reflect(s_ItemAttrChange.prototype, "proto.s_ItemAttrChange");
    var s_BagItem = (function (_super) {
        __extends(s_BagItem, _super);
        function s_BagItem() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_BagItem;
            return _this;
        }
        s_BagItem.prototype.init = function (_ItemList) {
            this.ItemList = _ItemList;
            return this;
        };
        s_BagItem.prototype.encode = function (by) {
            if (this.ItemList != null) {
                by.writeShort(this.ItemList.length);
                for (var i = 0; i < this.ItemList.length; i++) {
                    this.ItemList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_BagItem.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.ItemList = [];
            for (var i = 0; i < __count0; i++) {
                this.ItemList[i] = new ItemData();
                this.ItemList[i].decode(by);
            }
        };
        return s_BagItem;
    }(proto.Pro));
    proto.s_BagItem = s_BagItem;
    __reflect(s_BagItem.prototype, "proto.s_BagItem");
    var c_ItemUse = (function (_super) {
        __extends(c_ItemUse, _super);
        function c_ItemUse() {
            var _this = _super.call(this) || this;
            //required>int
            _this.templateId = 0; //道具模版Id
            //required>int
            _this.useCount = 0; //使用数量
            _this.S = proto.MessageType.c_ItemUse;
            return _this;
        }
        c_ItemUse.prototype.init = function (_templateId, _useCount) {
            this.templateId = _templateId;
            this.useCount = _useCount;
            return this;
        };
        c_ItemUse.prototype.encode = function (by) {
            by.writeInt(this.templateId);
            by.writeInt(this.useCount);
        };
        c_ItemUse.prototype.decode = function (by) {
            this.templateId = by.readInt();
            this.useCount = by.readInt();
        };
        return c_ItemUse;
    }(proto.Pro));
    proto.c_ItemUse = c_ItemUse;
    __reflect(c_ItemUse.prototype, "proto.c_ItemUse");
    var s_ItemUse = (function (_super) {
        __extends(s_ItemUse, _super);
        function s_ItemUse() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //0.错误
            _this.S = proto.MessageType.s_ItemUse;
            return _this;
        }
        s_ItemUse.prototype.init = function (_type, _errMsg, _itemList, _attrList) {
            this.type = _type;
            this.errMsg = _errMsg;
            this.itemList = _itemList;
            this.attrList = _attrList;
            return this;
        };
        s_ItemUse.prototype.encode = function (by) {
            by.writeByte(this.type);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.itemList != null) {
                by.writeShort(this.itemList.length);
                for (var i = 0; i < this.itemList.length; i++) {
                    this.itemList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.attrList != null) {
                by.writeShort(this.attrList.length);
                for (var i = 0; i < this.attrList.length; i++) {
                    this.attrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_ItemUse.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            var __count2 = by.readShort();
            this.itemList = [];
            for (var i = 0; i < __count2; i++) {
                this.itemList[i] = new ItemData();
                this.itemList[i].decode(by);
            }
            var __count3 = by.readShort();
            this.attrList = [];
            for (var i = 0; i < __count3; i++) {
                this.attrList[i] = new AttrValue();
                this.attrList[i].decode(by);
            }
        };
        return s_ItemUse;
    }(proto.Pro));
    proto.s_ItemUse = s_ItemUse;
    __reflect(s_ItemUse.prototype, "proto.s_ItemUse");
    var s_ChatCacheInfo = (function (_super) {
        __extends(s_ChatCacheInfo, _super);
        function s_ChatCacheInfo() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ChatCacheInfo;
            return _this;
        }
        s_ChatCacheInfo.prototype.init = function (_chatCacheList) {
            this.chatCacheList = _chatCacheList;
            return this;
        };
        s_ChatCacheInfo.prototype.encode = function (by) {
            if (this.chatCacheList != null) {
                by.writeShort(this.chatCacheList.length);
                for (var i = 0; i < this.chatCacheList.length; i++) {
                    this.chatCacheList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_ChatCacheInfo.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.chatCacheList = [];
            for (var i = 0; i < __count0; i++) {
                this.chatCacheList[i] = new s_ChatInfo();
                this.chatCacheList[i].decode(by);
            }
        };
        return s_ChatCacheInfo;
    }(proto.Pro));
    proto.s_ChatCacheInfo = s_ChatCacheInfo;
    __reflect(s_ChatCacheInfo.prototype, "proto.s_ChatCacheInfo");
    var s_ChatInfo = (function (_super) {
        __extends(s_ChatInfo, _super);
        function s_ChatInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.timeSpan = 0; //时间戳
            //required>byte
            _this.channel = 0; //发言频道
            //required>byte
            _this.type = 0; //0普通
            _this.S = proto.MessageType.s_ChatInfo;
            return _this;
        }
        s_ChatInfo.prototype.init = function (_timeSpan, _channel, _type, _senderBasicInfo, _privateBasicInfo, _content) {
            this.timeSpan = _timeSpan;
            this.channel = _channel;
            this.type = _type;
            this.senderBasicInfo = _senderBasicInfo;
            this.privateBasicInfo = _privateBasicInfo;
            this.content = _content;
            return this;
        };
        s_ChatInfo.prototype.encode = function (by) {
            by.writeInt(this.timeSpan);
            by.writeByte(this.channel);
            by.writeByte(this.type);
            if (this.senderBasicInfo != null) {
                by.writeByte(1);
                this.senderBasicInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
            if (this.privateBasicInfo != null) {
                by.writeByte(1);
                this.privateBasicInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
            by.writeUTF(this.content);
        };
        s_ChatInfo.prototype.decode = function (by) {
            this.timeSpan = by.readInt();
            this.channel = by.readUnsignedByte();
            this.type = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.senderBasicInfo = new RoleBasicInfo();
                this.senderBasicInfo.decode(by);
            }
            if (by.readByte() > 0) {
                this.privateBasicInfo = new RoleBasicInfo();
                this.privateBasicInfo.decode(by);
            }
            this.content = by.readUTF();
        };
        return s_ChatInfo;
    }(proto.Pro));
    proto.s_ChatInfo = s_ChatInfo;
    __reflect(s_ChatInfo.prototype, "proto.s_ChatInfo");
    var c_JingMai_LvUp = (function (_super) {
        __extends(c_JingMai_LvUp, _super);
        function c_JingMai_LvUp() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_JingMai_LvUp;
            return _this;
        }
        c_JingMai_LvUp.prototype.init = function (_job) {
            this.job = _job;
            return this;
        };
        c_JingMai_LvUp.prototype.encode = function (by) {
            by.writeByte(this.job);
        };
        c_JingMai_LvUp.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
        };
        return c_JingMai_LvUp;
    }(proto.Pro));
    proto.c_JingMai_LvUp = c_JingMai_LvUp;
    __reflect(c_JingMai_LvUp.prototype, "proto.c_JingMai_LvUp");
    var s_JingMai_LvUp = (function (_super) {
        __extends(s_JingMai_LvUp, _super);
        function s_JingMai_LvUp() {
            var _this = _super.call(this) || this;
            //required>int
            _this.jingMaiID = 0; //经脉在表中的ID
            _this.S = proto.MessageType.s_JingMai_LvUp;
            return _this;
        }
        s_JingMai_LvUp.prototype.init = function (_isSuccess, _jingMaiID) {
            this.isSuccess = _isSuccess;
            this.jingMaiID = _jingMaiID;
            return this;
        };
        s_JingMai_LvUp.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            by.writeInt(this.jingMaiID);
        };
        s_JingMai_LvUp.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            this.jingMaiID = by.readInt();
        };
        return s_JingMai_LvUp;
    }(proto.Pro));
    proto.s_JingMai_LvUp = s_JingMai_LvUp;
    __reflect(s_JingMai_LvUp.prototype, "proto.s_JingMai_LvUp");
    var c_ManualRefresh = (function (_super) {
        __extends(c_ManualRefresh, _super);
        function c_ManualRefresh() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_ManualRefresh;
            return _this;
        }
        c_ManualRefresh.prototype.init = function () {
            return this;
        };
        c_ManualRefresh.prototype.encode = function (by) {
        };
        c_ManualRefresh.prototype.decode = function (by) {
        };
        return c_ManualRefresh;
    }(proto.Pro));
    proto.c_ManualRefresh = c_ManualRefresh;
    __reflect(c_ManualRefresh.prototype, "proto.c_ManualRefresh");
    var s_UpdateFriendState = (function (_super) {
        __extends(s_UpdateFriendState, _super);
        function s_UpdateFriendState() {
            var _this = _super.call(this) || this;
            //required>int
            _this.state = 0; //好友状态:0被人邀请
            _this.S = proto.MessageType.s_UpdateFriendState;
            return _this;
        }
        s_UpdateFriendState.prototype.init = function (_friendId, _state) {
            this.friendId = _friendId;
            this.state = _state;
            return this;
        };
        s_UpdateFriendState.prototype.encode = function (by) {
            by.writeUTF(this.friendId);
            by.writeInt(this.state);
        };
        s_UpdateFriendState.prototype.decode = function (by) {
            this.friendId = by.readUTF();
            this.state = by.readInt();
        };
        return s_UpdateFriendState;
    }(proto.Pro));
    proto.s_UpdateFriendState = s_UpdateFriendState;
    __reflect(s_UpdateFriendState.prototype, "proto.s_UpdateFriendState");
    var c_AddFriendById = (function (_super) {
        __extends(c_AddFriendById, _super);
        function c_AddFriendById() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_AddFriendById;
            return _this;
        }
        c_AddFriendById.prototype.init = function (_friendInstId) {
            this.friendInstId = _friendInstId;
            return this;
        };
        c_AddFriendById.prototype.encode = function (by) {
            by.writeUTF(this.friendInstId);
        };
        c_AddFriendById.prototype.decode = function (by) {
            this.friendInstId = by.readUTF();
        };
        return c_AddFriendById;
    }(proto.Pro));
    proto.c_AddFriendById = c_AddFriendById;
    __reflect(c_AddFriendById.prototype, "proto.c_AddFriendById");
    var c_DelFriend = (function (_super) {
        __extends(c_DelFriend, _super);
        function c_DelFriend() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_DelFriend;
            return _this;
        }
        c_DelFriend.prototype.init = function (_friendId) {
            this.friendId = _friendId;
            return this;
        };
        c_DelFriend.prototype.encode = function (by) {
            by.writeUTF(this.friendId);
        };
        c_DelFriend.prototype.decode = function (by) {
            this.friendId = by.readUTF();
        };
        return c_DelFriend;
    }(proto.Pro));
    proto.c_DelFriend = c_DelFriend;
    __reflect(c_DelFriend.prototype, "proto.c_DelFriend");
    var c_AddBlacklist = (function (_super) {
        __extends(c_AddBlacklist, _super);
        function c_AddBlacklist() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_AddBlacklist;
            return _this;
        }
        c_AddBlacklist.prototype.init = function (_playerId) {
            this.playerId = _playerId;
            return this;
        };
        c_AddBlacklist.prototype.encode = function (by) {
            by.writeUTF(this.playerId);
        };
        c_AddBlacklist.prototype.decode = function (by) {
            this.playerId = by.readUTF();
        };
        return c_AddBlacklist;
    }(proto.Pro));
    proto.c_AddBlacklist = c_AddBlacklist;
    __reflect(c_AddBlacklist.prototype, "proto.c_AddBlacklist");
    var RankInfo = (function (_super) {
        __extends(RankInfo, _super);
        function RankInfo() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.RankInfo;
            return _this;
        }
        RankInfo.prototype.init = function (_playerName, _playerId, _playerAttrList, _roleInfoList) {
            this.playerName = _playerName;
            this.playerId = _playerId;
            this.playerAttrList = _playerAttrList;
            this.roleInfoList = _roleInfoList;
            return this;
        };
        RankInfo.prototype.encode = function (by) {
            by.writeUTF(this.playerName);
            by.writeUTF(this.playerId);
            if (this.playerAttrList != null) {
                by.writeShort(this.playerAttrList.length);
                for (var i = 0; i < this.playerAttrList.length; i++) {
                    this.playerAttrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.roleInfoList != null) {
                by.writeShort(this.roleInfoList.length);
                for (var i = 0; i < this.roleInfoList.length; i++) {
                    this.roleInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        RankInfo.prototype.decode = function (by) {
            this.playerName = by.readUTF();
            this.playerId = by.readUTF();
            var __count2 = by.readShort();
            this.playerAttrList = [];
            for (var i = 0; i < __count2; i++) {
                this.playerAttrList[i] = new AttrValue();
                this.playerAttrList[i].decode(by);
            }
            var __count3 = by.readShort();
            this.roleInfoList = [];
            for (var i = 0; i < __count3; i++) {
                this.roleInfoList[i] = new Client_RoleInfo();
                this.roleInfoList[i].decode(by);
            }
        };
        return RankInfo;
    }(proto.Pro));
    proto.RankInfo = RankInfo;
    __reflect(RankInfo.prototype, "proto.RankInfo");
    var s_GetRankInfo = (function (_super) {
        __extends(s_GetRankInfo, _super);
        function s_GetRankInfo() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_GetRankInfo;
            return _this;
        }
        s_GetRankInfo.prototype.init = function (_isSuccess, _errMsg, _rankInfo) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.rankInfo = _rankInfo;
            return this;
        };
        s_GetRankInfo.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.rankInfo != null) {
                by.writeByte(1);
                this.rankInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_GetRankInfo.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.rankInfo = new RankInfo();
                this.rankInfo.decode(by);
            }
        };
        return s_GetRankInfo;
    }(proto.Pro));
    proto.s_GetRankInfo = s_GetRankInfo;
    __reflect(s_GetRankInfo.prototype, "proto.s_GetRankInfo");
    var s_RankChange = (function (_super) {
        __extends(s_RankChange, _super);
        function s_RankChange() {
            var _this = _super.call(this) || this;
            //required>int
            _this.order = 0; //排名序列
            //required>int
            _this.index = 0; //排名的下标
            _this.S = proto.MessageType.s_RankChange;
            return _this;
        }
        s_RankChange.prototype.init = function (_order, _index, _playerName, _playerId, _playerAttrList, _RoleChangeList) {
            this.order = _order;
            this.index = _index;
            this.playerName = _playerName;
            this.playerId = _playerId;
            this.playerAttrList = _playerAttrList;
            this.RoleChangeList = _RoleChangeList;
            return this;
        };
        s_RankChange.prototype.encode = function (by) {
            by.writeInt(this.order);
            by.writeInt(this.index);
            by.writeUTF(this.playerName);
            by.writeUTF(this.playerId);
            if (this.playerAttrList != null) {
                by.writeShort(this.playerAttrList.length);
                for (var i = 0; i < this.playerAttrList.length; i++) {
                    this.playerAttrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.RoleChangeList != null) {
                by.writeShort(this.RoleChangeList.length);
                for (var i = 0; i < this.RoleChangeList.length; i++) {
                    this.RoleChangeList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_RankChange.prototype.decode = function (by) {
            this.order = by.readInt();
            this.index = by.readInt();
            this.playerName = by.readUTF();
            this.playerId = by.readUTF();
            var __count4 = by.readShort();
            this.playerAttrList = [];
            for (var i = 0; i < __count4; i++) {
                this.playerAttrList[i] = new AttrValue();
                this.playerAttrList[i].decode(by);
            }
            var __count5 = by.readShort();
            this.RoleChangeList = [];
            for (var i = 0; i < __count5; i++) {
                this.RoleChangeList[i] = new s_RoleAttrChange();
                this.RoleChangeList[i].decode(by);
            }
        };
        return s_RankChange;
    }(proto.Pro));
    proto.s_RankChange = s_RankChange;
    __reflect(s_RankChange.prototype, "proto.s_RankChange");
    var c_GetRankInfo = (function (_super) {
        __extends(c_GetRankInfo, _super);
        function c_GetRankInfo() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_GetRankInfo;
            return _this;
        }
        c_GetRankInfo.prototype.init = function (_playerId) {
            this.playerId = _playerId;
            return this;
        };
        c_GetRankInfo.prototype.encode = function (by) {
            by.writeUTF(this.playerId);
        };
        c_GetRankInfo.prototype.decode = function (by) {
            this.playerId = by.readUTF();
        };
        return c_GetRankInfo;
    }(proto.Pro));
    proto.c_GetRankInfo = c_GetRankInfo;
    __reflect(c_GetRankInfo.prototype, "proto.c_GetRankInfo");
    var s_GetRankList = (function (_super) {
        __extends(s_GetRankList, _super);
        function s_GetRankList() {
            var _this = _super.call(this) || this;
            //required>int
            _this.order = 0; //排行序列
            _this.S = proto.MessageType.s_GetRankList;
            return _this;
        }
        s_GetRankList.prototype.init = function (_order, _RankInfoList) {
            this.order = _order;
            this.RankInfoList = _RankInfoList;
            return this;
        };
        s_GetRankList.prototype.encode = function (by) {
            by.writeInt(this.order);
            if (this.RankInfoList != null) {
                by.writeShort(this.RankInfoList.length);
                for (var i = 0; i < this.RankInfoList.length; i++) {
                    this.RankInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_GetRankList.prototype.decode = function (by) {
            this.order = by.readInt();
            var __count1 = by.readShort();
            this.RankInfoList = [];
            for (var i = 0; i < __count1; i++) {
                this.RankInfoList[i] = new RankInfo();
                this.RankInfoList[i].decode(by);
            }
        };
        return s_GetRankList;
    }(proto.Pro));
    proto.s_GetRankList = s_GetRankList;
    __reflect(s_GetRankList.prototype, "proto.s_GetRankList");
    var s_MailList = (function (_super) {
        __extends(s_MailList, _super);
        function s_MailList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_MailList;
            return _this;
        }
        s_MailList.prototype.init = function (_mailList) {
            this.mailList = _mailList;
            return this;
        };
        s_MailList.prototype.encode = function (by) {
            if (this.mailList != null) {
                by.writeShort(this.mailList.length);
                for (var i = 0; i < this.mailList.length; i++) {
                    this.mailList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_MailList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.mailList = [];
            for (var i = 0; i < __count0; i++) {
                this.mailList[i] = new MailData();
                this.mailList[i].decode(by);
            }
        };
        return s_MailList;
    }(proto.Pro));
    proto.s_MailList = s_MailList;
    __reflect(s_MailList.prototype, "proto.s_MailList");
    var MailData = (function (_super) {
        __extends(MailData, _super);
        function MailData() {
            var _this = _super.call(this) || this;
            //required>int
            _this.mailState = 0; //0:未读
            //required>int
            _this.mailTemplateId = 0; //邮件模版ID
            //required>int
            _this.sendTime = 0; //发送时间
            _this.S = proto.MessageType.MailData;
            return _this;
        }
        MailData.prototype.init = function (_mailId, _mailState, _mailTemplateId, _argumentList, _itemList, _sendTime) {
            this.mailId = _mailId;
            this.mailState = _mailState;
            this.mailTemplateId = _mailTemplateId;
            this.argumentList = _argumentList;
            this.itemList = _itemList;
            this.sendTime = _sendTime;
            return this;
        };
        MailData.prototype.encode = function (by) {
            by.writeUTF(this.mailId);
            by.writeInt(this.mailState);
            by.writeInt(this.mailTemplateId);
            if (this.argumentList != null) {
                by.writeShort(this.argumentList.length);
                for (var i = 0; i < this.argumentList.length; i++) {
                    by.writeInt(this.argumentList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.itemList != null) {
                by.writeShort(this.itemList.length);
                for (var i = 0; i < this.itemList.length; i++) {
                    this.itemList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.sendTime);
        };
        MailData.prototype.decode = function (by) {
            this.mailId = by.readUTF();
            this.mailState = by.readInt();
            this.mailTemplateId = by.readInt();
            var __count3 = by.readShort();
            this.argumentList = [];
            for (var i = 0; i < __count3; i++) {
                this.argumentList[i] = by.readInt();
            }
            var __count4 = by.readShort();
            this.itemList = [];
            for (var i = 0; i < __count4; i++) {
                this.itemList[i] = new ItemData();
                this.itemList[i].decode(by);
            }
            this.sendTime = by.readInt();
        };
        return MailData;
    }(proto.Pro));
    proto.MailData = MailData;
    __reflect(MailData.prototype, "proto.MailData");
    var c_TakeAward = (function (_super) {
        __extends(c_TakeAward, _super);
        function c_TakeAward() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_TakeAward;
            return _this;
        }
        c_TakeAward.prototype.init = function (_mailId) {
            this.mailId = _mailId;
            return this;
        };
        c_TakeAward.prototype.encode = function (by) {
            by.writeUTF(this.mailId);
        };
        c_TakeAward.prototype.decode = function (by) {
            this.mailId = by.readUTF();
        };
        return c_TakeAward;
    }(proto.Pro));
    proto.c_TakeAward = c_TakeAward;
    __reflect(c_TakeAward.prototype, "proto.c_TakeAward");
    var s_TakeAward = (function (_super) {
        __extends(s_TakeAward, _super);
        function s_TakeAward() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TakeAward;
            return _this;
        }
        s_TakeAward.prototype.init = function (_isSuccess, _errMsg, _mailId) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.mailId = _mailId;
            return this;
        };
        s_TakeAward.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.mailId != null) {
                by.writeByte(1);
                by.writeUTF(this.mailId);
            }
            else {
                by.writeByte(0);
            }
        };
        s_TakeAward.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.mailId = by.readUTF();
            }
        };
        return s_TakeAward;
    }(proto.Pro));
    proto.s_TakeAward = s_TakeAward;
    __reflect(s_TakeAward.prototype, "proto.s_TakeAward");
    var c_ReduceLevel = (function (_super) {
        __extends(c_ReduceLevel, _super);
        function c_ReduceLevel() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_ReduceLevel;
            return _this;
        }
        c_ReduceLevel.prototype.init = function () {
            return this;
        };
        c_ReduceLevel.prototype.encode = function (by) {
        };
        c_ReduceLevel.prototype.decode = function (by) {
        };
        return c_ReduceLevel;
    }(proto.Pro));
    proto.c_ReduceLevel = c_ReduceLevel;
    __reflect(c_ReduceLevel.prototype, "proto.c_ReduceLevel");
    var s_ReduceLevel = (function (_super) {
        __extends(s_ReduceLevel, _super);
        function s_ReduceLevel() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ReduceLevel;
            return _this;
        }
        s_ReduceLevel.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_ReduceLevel.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_ReduceLevel.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_ReduceLevel;
    }(proto.Pro));
    proto.s_ReduceLevel = s_ReduceLevel;
    __reflect(s_ReduceLevel.prototype, "proto.s_ReduceLevel");
    var c_AssemblyEquip = (function (_super) {
        __extends(c_AssemblyEquip, _super);
        function c_AssemblyEquip() {
            var _this = _super.call(this) || this;
            //required>int
            _this.itemId = 0; //物品Id
            //required>int
            _this.job = 0; //职业
            //required>int
            _this.equipPos = 0; //穿戴位置
            _this.S = proto.MessageType.c_AssemblyEquip;
            return _this;
        }
        c_AssemblyEquip.prototype.init = function (_itemId, _job, _equipPos) {
            this.itemId = _itemId;
            this.job = _job;
            this.equipPos = _equipPos;
            return this;
        };
        c_AssemblyEquip.prototype.encode = function (by) {
            by.writeInt(this.itemId);
            by.writeInt(this.job);
            by.writeInt(this.equipPos);
        };
        c_AssemblyEquip.prototype.decode = function (by) {
            this.itemId = by.readInt();
            this.job = by.readInt();
            this.equipPos = by.readInt();
        };
        return c_AssemblyEquip;
    }(proto.Pro));
    proto.c_AssemblyEquip = c_AssemblyEquip;
    __reflect(c_AssemblyEquip.prototype, "proto.c_AssemblyEquip");
    var s_AssemblyEquip = (function (_super) {
        __extends(s_AssemblyEquip, _super);
        function s_AssemblyEquip() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_AssemblyEquip;
            return _this;
        }
        s_AssemblyEquip.prototype.init = function (_isSuccess, _errMsg, _equipItem) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.equipItem = _equipItem;
            return this;
        };
        s_AssemblyEquip.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.equipItem != null) {
                by.writeByte(1);
                this.equipItem.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_AssemblyEquip.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.equipItem = new ItemData();
                this.equipItem.decode(by);
            }
        };
        return s_AssemblyEquip;
    }(proto.Pro));
    proto.s_AssemblyEquip = s_AssemblyEquip;
    __reflect(s_AssemblyEquip.prototype, "proto.s_AssemblyEquip");
    var c_DisassembleEquip = (function (_super) {
        __extends(c_DisassembleEquip, _super);
        function c_DisassembleEquip() {
            var _this = _super.call(this) || this;
            //required>int
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_DisassembleEquip;
            return _this;
        }
        c_DisassembleEquip.prototype.init = function (_equipInstId, _job) {
            this.equipInstId = _equipInstId;
            this.job = _job;
            return this;
        };
        c_DisassembleEquip.prototype.encode = function (by) {
            by.writeUTF(this.equipInstId);
            by.writeInt(this.job);
        };
        c_DisassembleEquip.prototype.decode = function (by) {
            this.equipInstId = by.readUTF();
            this.job = by.readInt();
        };
        return c_DisassembleEquip;
    }(proto.Pro));
    proto.c_DisassembleEquip = c_DisassembleEquip;
    __reflect(c_DisassembleEquip.prototype, "proto.c_DisassembleEquip");
    var s_DisassembleEquip = (function (_super) {
        __extends(s_DisassembleEquip, _super);
        function s_DisassembleEquip() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_DisassembleEquip;
            return _this;
        }
        s_DisassembleEquip.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_DisassembleEquip.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_DisassembleEquip.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_DisassembleEquip;
    }(proto.Pro));
    proto.s_DisassembleEquip = s_DisassembleEquip;
    __reflect(s_DisassembleEquip.prototype, "proto.s_DisassembleEquip");
    var c_TakeAllAward = (function (_super) {
        __extends(c_TakeAllAward, _super);
        function c_TakeAllAward() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_TakeAllAward;
            return _this;
        }
        c_TakeAllAward.prototype.init = function () {
            return this;
        };
        c_TakeAllAward.prototype.encode = function (by) {
        };
        c_TakeAllAward.prototype.decode = function (by) {
        };
        return c_TakeAllAward;
    }(proto.Pro));
    proto.c_TakeAllAward = c_TakeAllAward;
    __reflect(c_TakeAllAward.prototype, "proto.c_TakeAllAward");
    var s_TakeAllAward = (function (_super) {
        __extends(s_TakeAllAward, _super);
        function s_TakeAllAward() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TakeAllAward;
            return _this;
        }
        s_TakeAllAward.prototype.init = function (_isSuceess, _errMsg) {
            this.isSuceess = _isSuceess;
            this.errMsg = _errMsg;
            return this;
        };
        s_TakeAllAward.prototype.encode = function (by) {
            by.writeBoolean(this.isSuceess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_TakeAllAward.prototype.decode = function (by) {
            this.isSuceess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_TakeAllAward;
    }(proto.Pro));
    proto.s_TakeAllAward = s_TakeAllAward;
    __reflect(s_TakeAllAward.prototype, "proto.s_TakeAllAward");
    var c_OpenMail = (function (_super) {
        __extends(c_OpenMail, _super);
        function c_OpenMail() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_OpenMail;
            return _this;
        }
        c_OpenMail.prototype.init = function (_mailId) {
            this.mailId = _mailId;
            return this;
        };
        c_OpenMail.prototype.encode = function (by) {
            by.writeUTF(this.mailId);
        };
        c_OpenMail.prototype.decode = function (by) {
            this.mailId = by.readUTF();
        };
        return c_OpenMail;
    }(proto.Pro));
    proto.c_OpenMail = c_OpenMail;
    __reflect(c_OpenMail.prototype, "proto.c_OpenMail");
    var s_OpenMail = (function (_super) {
        __extends(s_OpenMail, _super);
        function s_OpenMail() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_OpenMail;
            return _this;
        }
        s_OpenMail.prototype.init = function (_isSuccess, _errMsg, _mailID) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.mailID = _mailID;
            return this;
        };
        s_OpenMail.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.mailID != null) {
                by.writeByte(1);
                by.writeUTF(this.mailID);
            }
            else {
                by.writeByte(0);
            }
        };
        s_OpenMail.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.mailID = by.readUTF();
            }
        };
        return s_OpenMail;
    }(proto.Pro));
    proto.s_OpenMail = s_OpenMail;
    __reflect(s_OpenMail.prototype, "proto.s_OpenMail");
    var TaskData = (function (_super) {
        __extends(TaskData, _super);
        function TaskData() {
            var _this = _super.call(this) || this;
            //required>int
            _this.templateId = 0; //任务模版ID
            //optional>int
            _this.currentTimes = 0; //当前次数
            //optional>int
            _this.expireTime = 0; //过期时间
            _this.S = proto.MessageType.TaskData;
            return _this;
        }
        TaskData.prototype.init = function (_templateId, _isFinish, _currentTimes, _expireTime) {
            this.templateId = _templateId;
            this.isFinish = _isFinish;
            this.currentTimes = _currentTimes;
            this.expireTime = _expireTime;
            return this;
        };
        TaskData.prototype.encode = function (by) {
            by.writeInt(this.templateId);
            by.writeBoolean(this.isFinish);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.currentTimes);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.expireTime);
        };
        TaskData.prototype.decode = function (by) {
            this.templateId = by.readInt();
            this.isFinish = by.readBoolean();
            if (by.readByte() > 0) {
                this.currentTimes = by.readInt();
            }
            if (by.readByte() > 0) {
                this.expireTime = by.readInt();
            }
        };
        return TaskData;
    }(proto.Pro));
    proto.TaskData = TaskData;
    __reflect(TaskData.prototype, "proto.TaskData");
    var s_TaskList = (function (_super) {
        __extends(s_TaskList, _super);
        function s_TaskList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TaskList;
            return _this;
        }
        s_TaskList.prototype.init = function (_taskList) {
            this.taskList = _taskList;
            return this;
        };
        s_TaskList.prototype.encode = function (by) {
            if (this.taskList != null) {
                by.writeShort(this.taskList.length);
                for (var i = 0; i < this.taskList.length; i++) {
                    this.taskList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_TaskList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.taskList = [];
            for (var i = 0; i < __count0; i++) {
                this.taskList[i] = new TaskData();
                this.taskList[i].decode(by);
            }
        };
        return s_TaskList;
    }(proto.Pro));
    proto.s_TaskList = s_TaskList;
    __reflect(s_TaskList.prototype, "proto.s_TaskList");
    var s_TaskChange = (function (_super) {
        __extends(s_TaskChange, _super);
        function s_TaskChange() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TaskChange;
            return _this;
        }
        s_TaskChange.prototype.init = function (_taskData) {
            this.taskData = _taskData;
            return this;
        };
        s_TaskChange.prototype.encode = function (by) {
            this.taskData.encode(by);
        };
        s_TaskChange.prototype.decode = function (by) {
            this.taskData = new TaskData();
            this.taskData.decode(by);
        };
        return s_TaskChange;
    }(proto.Pro));
    proto.s_TaskChange = s_TaskChange;
    __reflect(s_TaskChange.prototype, "proto.s_TaskChange");
    var c_FinishTask = (function (_super) {
        __extends(c_FinishTask, _super);
        function c_FinishTask() {
            var _this = _super.call(this) || this;
            //required>int
            _this.TaskTemplateId = 0; //任务模版Id
            _this.S = proto.MessageType.c_FinishTask;
            return _this;
        }
        c_FinishTask.prototype.init = function (_TaskTemplateId) {
            this.TaskTemplateId = _TaskTemplateId;
            return this;
        };
        c_FinishTask.prototype.encode = function (by) {
            by.writeInt(this.TaskTemplateId);
        };
        c_FinishTask.prototype.decode = function (by) {
            this.TaskTemplateId = by.readInt();
        };
        return c_FinishTask;
    }(proto.Pro));
    proto.c_FinishTask = c_FinishTask;
    __reflect(c_FinishTask.prototype, "proto.c_FinishTask");
    var s_FinishTask = (function (_super) {
        __extends(s_FinishTask, _super);
        function s_FinishTask() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_FinishTask;
            return _this;
        }
        s_FinishTask.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_FinishTask.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_FinishTask.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_FinishTask;
    }(proto.Pro));
    proto.s_FinishTask = s_FinishTask;
    __reflect(s_FinishTask.prototype, "proto.s_FinishTask");
    var c_ShenGongUpgrade = (function (_super) {
        __extends(c_ShenGongUpgrade, _super);
        function c_ShenGongUpgrade() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_ShenGongUpgrade;
            return _this;
        }
        c_ShenGongUpgrade.prototype.init = function () {
            return this;
        };
        c_ShenGongUpgrade.prototype.encode = function (by) {
        };
        c_ShenGongUpgrade.prototype.decode = function (by) {
        };
        return c_ShenGongUpgrade;
    }(proto.Pro));
    proto.c_ShenGongUpgrade = c_ShenGongUpgrade;
    __reflect(c_ShenGongUpgrade.prototype, "proto.c_ShenGongUpgrade");
    var s_ShenGongUpgrade = (function (_super) {
        __extends(s_ShenGongUpgrade, _super);
        function s_ShenGongUpgrade() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ShenGongUpgrade;
            return _this;
        }
        s_ShenGongUpgrade.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_ShenGongUpgrade.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_ShenGongUpgrade.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_ShenGongUpgrade;
    }(proto.Pro));
    proto.s_ShenGongUpgrade = s_ShenGongUpgrade;
    __reflect(s_ShenGongUpgrade.prototype, "proto.s_ShenGongUpgrade");
    var c_JueweiUpgrade = (function (_super) {
        __extends(c_JueweiUpgrade, _super);
        function c_JueweiUpgrade() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_JueweiUpgrade;
            return _this;
        }
        c_JueweiUpgrade.prototype.init = function () {
            return this;
        };
        c_JueweiUpgrade.prototype.encode = function (by) {
        };
        c_JueweiUpgrade.prototype.decode = function (by) {
        };
        return c_JueweiUpgrade;
    }(proto.Pro));
    proto.c_JueweiUpgrade = c_JueweiUpgrade;
    __reflect(c_JueweiUpgrade.prototype, "proto.c_JueweiUpgrade");
    var s_JueweiUpgrade = (function (_super) {
        __extends(s_JueweiUpgrade, _super);
        function s_JueweiUpgrade() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_JueweiUpgrade;
            return _this;
        }
        s_JueweiUpgrade.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_JueweiUpgrade.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_JueweiUpgrade.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_JueweiUpgrade;
    }(proto.Pro));
    proto.s_JueweiUpgrade = s_JueweiUpgrade;
    __reflect(s_JueweiUpgrade.prototype, "proto.s_JueweiUpgrade");
    var c_ActiveFashion = (function (_super) {
        __extends(c_ActiveFashion, _super);
        function c_ActiveFashion() {
            var _this = _super.call(this) || this;
            //required>int
            _this.job = 0; //职业
            //required>int
            _this.itemTemplateId = 0; //消耗的物品模版Id
            _this.S = proto.MessageType.c_ActiveFashion;
            return _this;
        }
        c_ActiveFashion.prototype.init = function (_job, _itemTemplateId) {
            this.job = _job;
            this.itemTemplateId = _itemTemplateId;
            return this;
        };
        c_ActiveFashion.prototype.encode = function (by) {
            by.writeInt(this.job);
            by.writeInt(this.itemTemplateId);
        };
        c_ActiveFashion.prototype.decode = function (by) {
            this.job = by.readInt();
            this.itemTemplateId = by.readInt();
        };
        return c_ActiveFashion;
    }(proto.Pro));
    proto.c_ActiveFashion = c_ActiveFashion;
    __reflect(c_ActiveFashion.prototype, "proto.c_ActiveFashion");
    var s_ActiveFashion = (function (_super) {
        __extends(s_ActiveFashion, _super);
        function s_ActiveFashion() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ActiveFashion;
            return _this;
        }
        s_ActiveFashion.prototype.init = function (_isSuccess, _errMsg, _fashionEquip) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.fashionEquip = _fashionEquip;
            return this;
        };
        s_ActiveFashion.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.fashionEquip != null) {
                by.writeByte(1);
                this.fashionEquip.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_ActiveFashion.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.fashionEquip = new ItemData();
                this.fashionEquip.decode(by);
            }
        };
        return s_ActiveFashion;
    }(proto.Pro));
    proto.s_ActiveFashion = s_ActiveFashion;
    __reflect(s_ActiveFashion.prototype, "proto.s_ActiveFashion");
    var c_DressFashion = (function (_super) {
        __extends(c_DressFashion, _super);
        function c_DressFashion() {
            var _this = _super.call(this) || this;
            //required>int
            _this.job = 0; //职业
            _this.S = proto.MessageType.c_DressFashion;
            return _this;
        }
        c_DressFashion.prototype.init = function (_job, _ItemInstId) {
            this.job = _job;
            this.ItemInstId = _ItemInstId;
            return this;
        };
        c_DressFashion.prototype.encode = function (by) {
            by.writeInt(this.job);
            by.writeUTF(this.ItemInstId);
        };
        c_DressFashion.prototype.decode = function (by) {
            this.job = by.readInt();
            this.ItemInstId = by.readUTF();
        };
        return c_DressFashion;
    }(proto.Pro));
    proto.c_DressFashion = c_DressFashion;
    __reflect(c_DressFashion.prototype, "proto.c_DressFashion");
    var s_DressFashion = (function (_super) {
        __extends(s_DressFashion, _super);
        function s_DressFashion() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_DressFashion;
            return _this;
        }
        s_DressFashion.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_DressFashion.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_DressFashion.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_DressFashion;
    }(proto.Pro));
    proto.s_DressFashion = s_DressFashion;
    __reflect(s_DressFashion.prototype, "proto.s_DressFashion");
    var c_FashionExpire = (function (_super) {
        __extends(c_FashionExpire, _super);
        function c_FashionExpire() {
            var _this = _super.call(this) || this;
            //required>int
            _this.job = 0; //0:在背包中1
            _this.S = proto.MessageType.c_FashionExpire;
            return _this;
        }
        c_FashionExpire.prototype.init = function (_job, _itemInstId) {
            this.job = _job;
            this.itemInstId = _itemInstId;
            return this;
        };
        c_FashionExpire.prototype.encode = function (by) {
            by.writeInt(this.job);
            by.writeUTF(this.itemInstId);
        };
        c_FashionExpire.prototype.decode = function (by) {
            this.job = by.readInt();
            this.itemInstId = by.readUTF();
        };
        return c_FashionExpire;
    }(proto.Pro));
    proto.c_FashionExpire = c_FashionExpire;
    __reflect(c_FashionExpire.prototype, "proto.c_FashionExpire");
    var s_FashionExpire = (function (_super) {
        __extends(s_FashionExpire, _super);
        function s_FashionExpire() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.remaindSeconds = 0; //残留秒数
            _this.S = proto.MessageType.s_FashionExpire;
            return _this;
        }
        s_FashionExpire.prototype.init = function (_isSuccess, _errMsg, _remaindSeconds) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.remaindSeconds = _remaindSeconds;
            return this;
        };
        s_FashionExpire.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.remaindSeconds);
        };
        s_FashionExpire.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.remaindSeconds = by.readInt();
            }
        };
        return s_FashionExpire;
    }(proto.Pro));
    proto.s_FashionExpire = s_FashionExpire;
    __reflect(s_FashionExpire.prototype, "proto.s_FashionExpire");
    var c_LearnCheats = (function (_super) {
        __extends(c_LearnCheats, _super);
        function c_LearnCheats() {
            var _this = _super.call(this) || this;
            //required>int
            _this.job = 0; //职业
            //required>int
            _this.itemTemplateId = 0; //秘籍物品模版ID
            _this.S = proto.MessageType.c_LearnCheats;
            return _this;
        }
        c_LearnCheats.prototype.init = function (_job, _itemTemplateId) {
            this.job = _job;
            this.itemTemplateId = _itemTemplateId;
            return this;
        };
        c_LearnCheats.prototype.encode = function (by) {
            by.writeInt(this.job);
            by.writeInt(this.itemTemplateId);
        };
        c_LearnCheats.prototype.decode = function (by) {
            this.job = by.readInt();
            this.itemTemplateId = by.readInt();
        };
        return c_LearnCheats;
    }(proto.Pro));
    proto.c_LearnCheats = c_LearnCheats;
    __reflect(c_LearnCheats.prototype, "proto.c_LearnCheats");
    var s_LearnCheats = (function (_super) {
        __extends(s_LearnCheats, _super);
        function s_LearnCheats() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_LearnCheats;
            return _this;
        }
        s_LearnCheats.prototype.init = function (_isSuccess, _errMsg, _cheatsInfo) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.cheatsInfo = _cheatsInfo;
            return this;
        };
        s_LearnCheats.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            if (this.cheatsInfo != null) {
                by.writeByte(1);
                this.cheatsInfo.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_LearnCheats.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.cheatsInfo = new CheatsInfo();
                this.cheatsInfo.decode(by);
            }
        };
        return s_LearnCheats;
    }(proto.Pro));
    proto.s_LearnCheats = s_LearnCheats;
    __reflect(s_LearnCheats.prototype, "proto.s_LearnCheats");
    var c_Worship = (function (_super) {
        __extends(c_Worship, _super);
        function c_Worship() {
            var _this = _super.call(this) || this;
            //required>int
            _this.order = 0; //排行序列
            _this.S = proto.MessageType.c_Worship;
            return _this;
        }
        c_Worship.prototype.init = function (_order) {
            this.order = _order;
            return this;
        };
        c_Worship.prototype.encode = function (by) {
            by.writeInt(this.order);
        };
        c_Worship.prototype.decode = function (by) {
            this.order = by.readInt();
        };
        return c_Worship;
    }(proto.Pro));
    proto.c_Worship = c_Worship;
    __reflect(c_Worship.prototype, "proto.c_Worship");
    var s_Worship = (function (_super) {
        __extends(s_Worship, _super);
        function s_Worship() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Worship;
            return _this;
        }
        s_Worship.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_Worship.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_Worship.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_Worship;
    }(proto.Pro));
    proto.s_Worship = s_Worship;
    __reflect(s_Worship.prototype, "proto.s_Worship");
    var s_RankWorship = (function (_super) {
        __extends(s_RankWorship, _super);
        function s_RankWorship() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_RankWorship;
            return _this;
        }
        s_RankWorship.prototype.init = function (_isWorshipList) {
            this.isWorshipList = _isWorshipList;
            return this;
        };
        s_RankWorship.prototype.encode = function (by) {
            if (this.isWorshipList != null) {
                by.writeShort(this.isWorshipList.length);
                for (var i = 0; i < this.isWorshipList.length; i++) {
                    by.writeBoolean(this.isWorshipList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_RankWorship.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.isWorshipList = [];
            for (var i = 0; i < __count0; i++) {
                this.isWorshipList[i] = by.readBoolean();
            }
        };
        return s_RankWorship;
    }(proto.Pro));
    proto.s_RankWorship = s_RankWorship;
    __reflect(s_RankWorship.prototype, "proto.s_RankWorship");
    var CheatsInfo = (function (_super) {
        __extends(CheatsInfo, _super);
        function CheatsInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.pos = 0; //对应的秘籍位置
            //required>int
            _this.itemTemplateId = 0; //所镶嵌秘籍的模版ID
            _this.S = proto.MessageType.CheatsInfo;
            return _this;
        }
        CheatsInfo.prototype.init = function (_pos, _itemTemplateId) {
            this.pos = _pos;
            this.itemTemplateId = _itemTemplateId;
            return this;
        };
        CheatsInfo.prototype.encode = function (by) {
            by.writeInt(this.pos);
            by.writeInt(this.itemTemplateId);
        };
        CheatsInfo.prototype.decode = function (by) {
            this.pos = by.readInt();
            this.itemTemplateId = by.readInt();
        };
        return CheatsInfo;
    }(proto.Pro));
    proto.CheatsInfo = CheatsInfo;
    __reflect(CheatsInfo.prototype, "proto.CheatsInfo");
    var s_CheatsList = (function (_super) {
        __extends(s_CheatsList, _super);
        function s_CheatsList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_CheatsList;
            return _this;
        }
        s_CheatsList.prototype.init = function (_cheatsList) {
            this.cheatsList = _cheatsList;
            return this;
        };
        s_CheatsList.prototype.encode = function (by) {
            if (this.cheatsList != null) {
                by.writeShort(this.cheatsList.length);
                for (var i = 0; i < this.cheatsList.length; i++) {
                    this.cheatsList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_CheatsList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.cheatsList = [];
            for (var i = 0; i < __count0; i++) {
                this.cheatsList[i] = new CheatsInfo();
                this.cheatsList[i].decode(by);
            }
        };
        return s_CheatsList;
    }(proto.Pro));
    proto.s_CheatsList = s_CheatsList;
    __reflect(s_CheatsList.prototype, "proto.s_CheatsList");
    var s_FriendList = (function (_super) {
        __extends(s_FriendList, _super);
        function s_FriendList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_FriendList;
            return _this;
        }
        s_FriendList.prototype.init = function (_FriendList) {
            this.FriendList = _FriendList;
            return this;
        };
        s_FriendList.prototype.encode = function (by) {
            if (this.FriendList != null) {
                by.writeShort(this.FriendList.length);
                for (var i = 0; i < this.FriendList.length; i++) {
                    this.FriendList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_FriendList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.FriendList = [];
            for (var i = 0; i < __count0; i++) {
                this.FriendList[i] = new FriendInfo();
                this.FriendList[i].decode(by);
            }
        };
        return s_FriendList;
    }(proto.Pro));
    proto.s_FriendList = s_FriendList;
    __reflect(s_FriendList.prototype, "proto.s_FriendList");
    var c_ChangeHeadIcon = (function (_super) {
        __extends(c_ChangeHeadIcon, _super);
        function c_ChangeHeadIcon() {
            var _this = _super.call(this) || this;
            //required>int
            _this.headIcon = 0; //头像Id
            _this.S = proto.MessageType.c_ChangeHeadIcon;
            return _this;
        }
        c_ChangeHeadIcon.prototype.init = function (_headIcon) {
            this.headIcon = _headIcon;
            return this;
        };
        c_ChangeHeadIcon.prototype.encode = function (by) {
            by.writeInt(this.headIcon);
        };
        c_ChangeHeadIcon.prototype.decode = function (by) {
            this.headIcon = by.readInt();
        };
        return c_ChangeHeadIcon;
    }(proto.Pro));
    proto.c_ChangeHeadIcon = c_ChangeHeadIcon;
    __reflect(c_ChangeHeadIcon.prototype, "proto.c_ChangeHeadIcon");
    var s_ChangeHeadIcon = (function (_super) {
        __extends(s_ChangeHeadIcon, _super);
        function s_ChangeHeadIcon() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_ChangeHeadIcon;
            return _this;
        }
        s_ChangeHeadIcon.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_ChangeHeadIcon.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_ChangeHeadIcon.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_ChangeHeadIcon;
    }(proto.Pro));
    proto.s_ChangeHeadIcon = s_ChangeHeadIcon;
    __reflect(s_ChangeHeadIcon.prototype, "proto.s_ChangeHeadIcon");
    var c_RefreshMailExpire = (function (_super) {
        __extends(c_RefreshMailExpire, _super);
        function c_RefreshMailExpire() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_RefreshMailExpire;
            return _this;
        }
        c_RefreshMailExpire.prototype.init = function () {
            return this;
        };
        c_RefreshMailExpire.prototype.encode = function (by) {
        };
        c_RefreshMailExpire.prototype.decode = function (by) {
        };
        return c_RefreshMailExpire;
    }(proto.Pro));
    proto.c_RefreshMailExpire = c_RefreshMailExpire;
    __reflect(c_RefreshMailExpire.prototype, "proto.c_RefreshMailExpire");
    var s_RefreshMailExpire = (function (_super) {
        __extends(s_RefreshMailExpire, _super);
        function s_RefreshMailExpire() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_RefreshMailExpire;
            return _this;
        }
        s_RefreshMailExpire.prototype.init = function (_expireIdList) {
            this.expireIdList = _expireIdList;
            return this;
        };
        s_RefreshMailExpire.prototype.encode = function (by) {
            if (this.expireIdList != null) {
                by.writeShort(this.expireIdList.length);
                for (var i = 0; i < this.expireIdList.length; i++) {
                    by.writeUTF(this.expireIdList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_RefreshMailExpire.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.expireIdList = [];
            for (var i = 0; i < __count0; i++) {
                this.expireIdList[i] = by.readUTF();
            }
        };
        return s_RefreshMailExpire;
    }(proto.Pro));
    proto.s_RefreshMailExpire = s_RefreshMailExpire;
    __reflect(s_RefreshMailExpire.prototype, "proto.s_RefreshMailExpire");
    var c_TalismanStrengthen = (function (_super) {
        __extends(c_TalismanStrengthen, _super);
        function c_TalismanStrengthen() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //法宝强化位置
            _this.S = proto.MessageType.c_TalismanStrengthen;
            return _this;
        }
        c_TalismanStrengthen.prototype.init = function (_pos) {
            this.pos = _pos;
            return this;
        };
        c_TalismanStrengthen.prototype.encode = function (by) {
            by.writeByte(this.pos);
        };
        c_TalismanStrengthen.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
        };
        return c_TalismanStrengthen;
    }(proto.Pro));
    proto.c_TalismanStrengthen = c_TalismanStrengthen;
    __reflect(c_TalismanStrengthen.prototype, "proto.c_TalismanStrengthen");
    var s_TalismanStrengthen = (function (_super) {
        __extends(s_TalismanStrengthen, _super);
        function s_TalismanStrengthen() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.newID = 0; //新的ID
            _this.S = proto.MessageType.s_TalismanStrengthen;
            return _this;
        }
        s_TalismanStrengthen.prototype.init = function (_isSuccess, _newID) {
            this.isSuccess = _isSuccess;
            this.newID = _newID;
            return this;
        };
        s_TalismanStrengthen.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.newID);
        };
        s_TalismanStrengthen.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.newID = by.readInt();
            }
        };
        return s_TalismanStrengthen;
    }(proto.Pro));
    proto.s_TalismanStrengthen = s_TalismanStrengthen;
    __reflect(s_TalismanStrengthen.prototype, "proto.s_TalismanStrengthen");
    var c_PersonalBoss = (function (_super) {
        __extends(c_PersonalBoss, _super);
        function c_PersonalBoss() {
            var _this = _super.call(this) || this;
            //required>int
            _this.bossTemplateId = 0; //boss模版ID
            _this.S = proto.MessageType.c_PersonalBoss;
            return _this;
        }
        c_PersonalBoss.prototype.init = function (_bossTemplateId) {
            this.bossTemplateId = _bossTemplateId;
            return this;
        };
        c_PersonalBoss.prototype.encode = function (by) {
            by.writeInt(this.bossTemplateId);
        };
        c_PersonalBoss.prototype.decode = function (by) {
            this.bossTemplateId = by.readInt();
        };
        return c_PersonalBoss;
    }(proto.Pro));
    proto.c_PersonalBoss = c_PersonalBoss;
    __reflect(c_PersonalBoss.prototype, "proto.c_PersonalBoss");
    var s_PersonalBoss = (function (_super) {
        __extends(s_PersonalBoss, _super);
        function s_PersonalBoss() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_PersonalBoss;
            return _this;
        }
        s_PersonalBoss.prototype.init = function (_isWin, _actList) {
            this.isWin = _isWin;
            this.actList = _actList;
            return this;
        };
        s_PersonalBoss.prototype.encode = function (by) {
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isWin);
            if (this.actList != null) {
                by.writeShort(this.actList.length);
                for (var i = 0; i < this.actList.length; i++) {
                    this.actList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_PersonalBoss.prototype.decode = function (by) {
            if (by.readByte() > 0) {
                this.isWin = by.readBoolean();
            }
            var __count1 = by.readShort();
            this.actList = [];
            for (var i = 0; i < __count1; i++) {
                this.actList[i] = new MyAction();
                this.actList[i].decode(by);
            }
        };
        return s_PersonalBoss;
    }(proto.Pro));
    proto.s_PersonalBoss = s_PersonalBoss;
    __reflect(s_PersonalBoss.prototype, "proto.s_PersonalBoss");
    var s_SyncBossPlayer = (function (_super) {
        __extends(s_SyncBossPlayer, _super);
        function s_SyncBossPlayer() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_SyncBossPlayer;
            return _this;
        }
        s_SyncBossPlayer.prototype.init = function (_addUnitList) {
            this.addUnitList = _addUnitList;
            return this;
        };
        s_SyncBossPlayer.prototype.encode = function (by) {
            if (this.addUnitList != null) {
                by.writeShort(this.addUnitList.length);
                for (var i = 0; i < this.addUnitList.length; i++) {
                    this.addUnitList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_SyncBossPlayer.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.addUnitList = [];
            for (var i = 0; i < __count0; i++) {
                this.addUnitList[i] = new MyAction();
                this.addUnitList[i].decode(by);
            }
        };
        return s_SyncBossPlayer;
    }(proto.Pro));
    proto.s_SyncBossPlayer = s_SyncBossPlayer;
    __reflect(s_SyncBossPlayer.prototype, "proto.s_SyncBossPlayer");
    var s_NotifyAction = (function (_super) {
        __extends(s_NotifyAction, _super);
        function s_NotifyAction() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_NotifyAction;
            return _this;
        }
        s_NotifyAction.prototype.init = function (_actionList) {
            this.actionList = _actionList;
            return this;
        };
        s_NotifyAction.prototype.encode = function (by) {
            if (this.actionList != null) {
                by.writeShort(this.actionList.length);
                for (var i = 0; i < this.actionList.length; i++) {
                    this.actionList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_NotifyAction.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.actionList = [];
            for (var i = 0; i < __count0; i++) {
                this.actionList[i] = new MyAction();
                this.actionList[i].decode(by);
            }
        };
        return s_NotifyAction;
    }(proto.Pro));
    proto.s_NotifyAction = s_NotifyAction;
    __reflect(s_NotifyAction.prototype, "proto.s_NotifyAction");
    var RoleEntityInfo = (function (_super) {
        __extends(RoleEntityInfo, _super);
        function RoleEntityInfo() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.job = 0; //职业
            //optional>int
            _this.templateId = 0; //怪物模版ID
            _this.S = proto.MessageType.RoleEntityInfo;
            return _this;
        }
        RoleEntityInfo.prototype.init = function (_job, _InstanceId, _templateId, _attrList, _equips) {
            this.job = _job;
            this.InstanceId = _InstanceId;
            this.templateId = _templateId;
            this.attrList = _attrList;
            this.equips = _equips;
            return this;
        };
        RoleEntityInfo.prototype.encode = function (by) {
            by.writeByte(this.job);
            by.writeUTF(this.InstanceId);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.templateId);
            if (this.attrList != null) {
                by.writeShort(this.attrList.length);
                for (var i = 0; i < this.attrList.length; i++) {
                    by.writeInt(this.attrList[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.equips != null) {
                by.writeShort(this.equips.length);
                for (var i = 0; i < this.equips.length; i++) {
                    this.equips[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        RoleEntityInfo.prototype.decode = function (by) {
            this.job = by.readUnsignedByte();
            this.InstanceId = by.readUTF();
            if (by.readByte() > 0) {
                this.templateId = by.readInt();
            }
            var __count3 = by.readShort();
            this.attrList = [];
            for (var i = 0; i < __count3; i++) {
                this.attrList[i] = by.readInt();
            }
            var __count4 = by.readShort();
            this.equips = [];
            for (var i = 0; i < __count4; i++) {
                this.equips[i] = new ItemData();
                this.equips[i].decode(by);
            }
        };
        return RoleEntityInfo;
    }(proto.Pro));
    proto.RoleEntityInfo = RoleEntityInfo;
    __reflect(RoleEntityInfo.prototype, "proto.RoleEntityInfo");
    var c_LeaveBossRoom = (function (_super) {
        __extends(c_LeaveBossRoom, _super);
        function c_LeaveBossRoom() {
            var _this = _super.call(this) || this;
            //required>int
            _this.bossTemplateId = 0; //Boss模版ID
            _this.S = proto.MessageType.c_LeaveBossRoom;
            return _this;
        }
        c_LeaveBossRoom.prototype.init = function (_bossTemplateId) {
            this.bossTemplateId = _bossTemplateId;
            return this;
        };
        c_LeaveBossRoom.prototype.encode = function (by) {
            by.writeInt(this.bossTemplateId);
        };
        c_LeaveBossRoom.prototype.decode = function (by) {
            this.bossTemplateId = by.readInt();
        };
        return c_LeaveBossRoom;
    }(proto.Pro));
    proto.c_LeaveBossRoom = c_LeaveBossRoom;
    __reflect(c_LeaveBossRoom.prototype, "proto.c_LeaveBossRoom");
    var s_LeaveBossRoom = (function (_super) {
        __extends(s_LeaveBossRoom, _super);
        function s_LeaveBossRoom() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_LeaveBossRoom;
            return _this;
        }
        s_LeaveBossRoom.prototype.init = function (_isSuccess, _errMsg) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            return this;
        };
        s_LeaveBossRoom.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
        };
        s_LeaveBossRoom.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
        };
        return s_LeaveBossRoom;
    }(proto.Pro));
    proto.s_LeaveBossRoom = s_LeaveBossRoom;
    __reflect(s_LeaveBossRoom.prototype, "proto.s_LeaveBossRoom");
    var BossInfo = (function (_super) {
        __extends(BossInfo, _super);
        function BossInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.bossTemplateId = 0; //Boss模版ID
            //optional>int
            _this.expireTime = 0; //过期时间
            //required>int
            _this.playerCount = 0; //玩家数量
            _this.S = proto.MessageType.BossInfo;
            return _this;
        }
        BossInfo.prototype.init = function (_bossTemplateId, _isOpen, _expireTime, _playerCount) {
            this.bossTemplateId = _bossTemplateId;
            this.isOpen = _isOpen;
            this.expireTime = _expireTime;
            this.playerCount = _playerCount;
            return this;
        };
        BossInfo.prototype.encode = function (by) {
            by.writeInt(this.bossTemplateId);
            by.writeBoolean(this.isOpen);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.expireTime);
            by.writeInt(this.playerCount);
        };
        BossInfo.prototype.decode = function (by) {
            this.bossTemplateId = by.readInt();
            this.isOpen = by.readBoolean();
            if (by.readByte() > 0) {
                this.expireTime = by.readInt();
            }
            this.playerCount = by.readInt();
        };
        return BossInfo;
    }(proto.Pro));
    proto.BossInfo = BossInfo;
    __reflect(BossInfo.prototype, "proto.BossInfo");
    var c_WorldBoss = (function (_super) {
        __extends(c_WorldBoss, _super);
        function c_WorldBoss() {
            var _this = _super.call(this) || this;
            //required>int
            _this.bossTemplateId = 0; //boss模版ID
            _this.S = proto.MessageType.c_WorldBoss;
            return _this;
        }
        c_WorldBoss.prototype.init = function (_bossTemplateId) {
            this.bossTemplateId = _bossTemplateId;
            return this;
        };
        c_WorldBoss.prototype.encode = function (by) {
            by.writeInt(this.bossTemplateId);
        };
        c_WorldBoss.prototype.decode = function (by) {
            this.bossTemplateId = by.readInt();
        };
        return c_WorldBoss;
    }(proto.Pro));
    proto.c_WorldBoss = c_WorldBoss;
    __reflect(c_WorldBoss.prototype, "proto.c_WorldBoss");
    var s_WorldBoss = (function (_super) {
        __extends(s_WorldBoss, _super);
        function s_WorldBoss() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_WorldBoss;
            return _this;
        }
        s_WorldBoss.prototype.init = function (_isWin, _DropList) {
            this.isWin = _isWin;
            this.DropList = _DropList;
            return this;
        };
        s_WorldBoss.prototype.encode = function (by) {
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isWin);
            if (this.DropList != null) {
                by.writeShort(this.DropList.length);
                for (var i = 0; i < this.DropList.length; i++) {
                    this.DropList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_WorldBoss.prototype.decode = function (by) {
            if (by.readByte() > 0) {
                this.isWin = by.readBoolean();
            }
            var __count1 = by.readShort();
            this.DropList = [];
            for (var i = 0; i < __count1; i++) {
                this.DropList[i] = new ItemData();
                this.DropList[i].decode(by);
            }
        };
        return s_WorldBoss;
    }(proto.Pro));
    proto.s_WorldBoss = s_WorldBoss;
    __reflect(s_WorldBoss.prototype, "proto.s_WorldBoss");
    var s_BossAck = (function (_super) {
        __extends(s_BossAck, _super);
        function s_BossAck() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.remainSeconds = 0; //残留秒数
            _this.S = proto.MessageType.s_BossAck;
            return _this;
        }
        s_BossAck.prototype.init = function (_isSuccess, _errMsg, _remainSeconds) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.remainSeconds = _remainSeconds;
            return this;
        };
        s_BossAck.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.remainSeconds);
        };
        s_BossAck.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.remainSeconds = by.readInt();
            }
        };
        return s_BossAck;
    }(proto.Pro));
    proto.s_BossAck = s_BossAck;
    __reflect(s_BossAck.prototype, "proto.s_BossAck");
    var s_PersonalBossList = (function (_super) {
        __extends(s_PersonalBossList, _super);
        function s_PersonalBossList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_PersonalBossList;
            return _this;
        }
        s_PersonalBossList.prototype.init = function (_bossInfoList) {
            this.bossInfoList = _bossInfoList;
            return this;
        };
        s_PersonalBossList.prototype.encode = function (by) {
            if (this.bossInfoList != null) {
                by.writeShort(this.bossInfoList.length);
                for (var i = 0; i < this.bossInfoList.length; i++) {
                    this.bossInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_PersonalBossList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.bossInfoList = [];
            for (var i = 0; i < __count0; i++) {
                this.bossInfoList[i] = new BossInfo();
                this.bossInfoList[i].decode(by);
            }
        };
        return s_PersonalBossList;
    }(proto.Pro));
    proto.s_PersonalBossList = s_PersonalBossList;
    __reflect(s_PersonalBossList.prototype, "proto.s_PersonalBossList");
    var c_WorldBossList = (function (_super) {
        __extends(c_WorldBossList, _super);
        function c_WorldBossList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_WorldBossList;
            return _this;
        }
        c_WorldBossList.prototype.init = function () {
            return this;
        };
        c_WorldBossList.prototype.encode = function (by) {
        };
        c_WorldBossList.prototype.decode = function (by) {
        };
        return c_WorldBossList;
    }(proto.Pro));
    proto.c_WorldBossList = c_WorldBossList;
    __reflect(c_WorldBossList.prototype, "proto.c_WorldBossList");
    var s_WorldBossList = (function (_super) {
        __extends(s_WorldBossList, _super);
        function s_WorldBossList() {
            var _this = _super.call(this) || this;
            //required>int
            _this.serverTime = 0; //服务器当前时间
            _this.S = proto.MessageType.s_WorldBossList;
            return _this;
        }
        s_WorldBossList.prototype.init = function (_bossInfoList, _serverTime) {
            this.bossInfoList = _bossInfoList;
            this.serverTime = _serverTime;
            return this;
        };
        s_WorldBossList.prototype.encode = function (by) {
            if (this.bossInfoList != null) {
                by.writeShort(this.bossInfoList.length);
                for (var i = 0; i < this.bossInfoList.length; i++) {
                    this.bossInfoList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.serverTime);
        };
        s_WorldBossList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.bossInfoList = [];
            for (var i = 0; i < __count0; i++) {
                this.bossInfoList[i] = new BossInfo();
                this.bossInfoList[i].decode(by);
            }
            this.serverTime = by.readInt();
        };
        return s_WorldBossList;
    }(proto.Pro));
    proto.s_WorldBossList = s_WorldBossList;
    __reflect(s_WorldBossList.prototype, "proto.s_WorldBossList");
    var c_SyncTime = (function (_super) {
        __extends(c_SyncTime, _super);
        function c_SyncTime() {
            var _this = _super.call(this) || this;
            //required>int
            _this.clientTime = 0; //客户端时间
            _this.S = proto.MessageType.c_SyncTime;
            return _this;
        }
        c_SyncTime.prototype.init = function (_clientTime) {
            this.clientTime = _clientTime;
            return this;
        };
        c_SyncTime.prototype.encode = function (by) {
            by.writeInt(this.clientTime);
        };
        c_SyncTime.prototype.decode = function (by) {
            this.clientTime = by.readInt();
        };
        return c_SyncTime;
    }(proto.Pro));
    proto.c_SyncTime = c_SyncTime;
    __reflect(c_SyncTime.prototype, "proto.c_SyncTime");
    var s_SyncTime = (function (_super) {
        __extends(s_SyncTime, _super);
        function s_SyncTime() {
            var _this = _super.call(this) || this;
            //required>int
            _this.clientTime = 0; //客户端时间
            //required>int
            _this.serverTime = 0; //服务器时间
            _this.S = proto.MessageType.s_SyncTime;
            return _this;
        }
        s_SyncTime.prototype.init = function (_clientTime, _serverTime) {
            this.clientTime = _clientTime;
            this.serverTime = _serverTime;
            return this;
        };
        s_SyncTime.prototype.encode = function (by) {
            by.writeInt(this.clientTime);
            by.writeInt(this.serverTime);
        };
        s_SyncTime.prototype.decode = function (by) {
            this.clientTime = by.readInt();
            this.serverTime = by.readInt();
        };
        return s_SyncTime;
    }(proto.Pro));
    proto.s_SyncTime = s_SyncTime;
    __reflect(s_SyncTime.prototype, "proto.s_SyncTime");
    var c_RebornBoss = (function (_super) {
        __extends(c_RebornBoss, _super);
        function c_RebornBoss() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_RebornBoss;
            return _this;
        }
        c_RebornBoss.prototype.init = function () {
            return this;
        };
        c_RebornBoss.prototype.encode = function (by) {
        };
        c_RebornBoss.prototype.decode = function (by) {
        };
        return c_RebornBoss;
    }(proto.Pro));
    proto.c_RebornBoss = c_RebornBoss;
    __reflect(c_RebornBoss.prototype, "proto.c_RebornBoss");
    var s_RebornBoss = (function (_super) {
        __extends(s_RebornBoss, _super);
        function s_RebornBoss() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_RebornBoss;
            return _this;
        }
        s_RebornBoss.prototype.init = function (_isWin, _DropList) {
            this.isWin = _isWin;
            this.DropList = _DropList;
            return this;
        };
        s_RebornBoss.prototype.encode = function (by) {
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isWin);
            if (this.DropList != null) {
                by.writeShort(this.DropList.length);
                for (var i = 0; i < this.DropList.length; i++) {
                    this.DropList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_RebornBoss.prototype.decode = function (by) {
            if (by.readByte() > 0) {
                this.isWin = by.readBoolean();
            }
            var __count1 = by.readShort();
            this.DropList = [];
            for (var i = 0; i < __count1; i++) {
                this.DropList[i] = new ItemData();
                this.DropList[i].decode(by);
            }
        };
        return s_RebornBoss;
    }(proto.Pro));
    proto.s_RebornBoss = s_RebornBoss;
    __reflect(s_RebornBoss.prototype, "proto.s_RebornBoss");
    var c_MeetBattle = (function (_super) {
        __extends(c_MeetBattle, _super);
        function c_MeetBattle() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_MeetBattle;
            return _this;
        }
        c_MeetBattle.prototype.init = function () {
            return this;
        };
        c_MeetBattle.prototype.encode = function (by) {
        };
        c_MeetBattle.prototype.decode = function (by) {
        };
        return c_MeetBattle;
    }(proto.Pro));
    proto.c_MeetBattle = c_MeetBattle;
    __reflect(c_MeetBattle.prototype, "proto.c_MeetBattle");
    var s_MeetBattle = (function (_super) {
        __extends(s_MeetBattle, _super);
        function s_MeetBattle() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_MeetBattle;
            return _this;
        }
        s_MeetBattle.prototype.init = function (_attrList) {
            this.attrList = _attrList;
            return this;
        };
        s_MeetBattle.prototype.encode = function (by) {
            if (this.attrList != null) {
                by.writeShort(this.attrList.length);
                for (var i = 0; i < this.attrList.length; i++) {
                    this.attrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_MeetBattle.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.attrList = [];
            for (var i = 0; i < __count0; i++) {
                this.attrList[i] = new AttrValue();
                this.attrList[i].decode(by);
            }
        };
        return s_MeetBattle;
    }(proto.Pro));
    proto.s_MeetBattle = s_MeetBattle;
    __reflect(s_MeetBattle.prototype, "proto.s_MeetBattle");
    var s_MeetData = (function (_super) {
        __extends(s_MeetData, _super);
        function s_MeetData() {
            var _this = _super.call(this) || this;
            //required>int
            _this.refreshTime = 0; //最后一次出现敌人的时间
            _this.S = proto.MessageType.s_MeetData;
            return _this;
        }
        s_MeetData.prototype.init = function (_meetPlayerList, _refreshTime) {
            this.meetPlayerList = _meetPlayerList;
            this.refreshTime = _refreshTime;
            return this;
        };
        s_MeetData.prototype.encode = function (by) {
            if (this.meetPlayerList != null) {
                by.writeShort(this.meetPlayerList.length);
                for (var i = 0; i < this.meetPlayerList.length; i++) {
                    this.meetPlayerList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.refreshTime);
        };
        s_MeetData.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.meetPlayerList = [];
            for (var i = 0; i < __count0; i++) {
                this.meetPlayerList[i] = new RankInfo();
                this.meetPlayerList[i].decode(by);
            }
            this.refreshTime = by.readInt();
        };
        return s_MeetData;
    }(proto.Pro));
    proto.s_MeetData = s_MeetData;
    __reflect(s_MeetData.prototype, "proto.s_MeetData");
    var c_MeetKill = (function (_super) {
        __extends(c_MeetKill, _super);
        function c_MeetKill() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_MeetKill;
            return _this;
        }
        c_MeetKill.prototype.init = function (_playerId) {
            this.playerId = _playerId;
            return this;
        };
        c_MeetKill.prototype.encode = function (by) {
            by.writeUTF(this.playerId);
        };
        c_MeetKill.prototype.decode = function (by) {
            this.playerId = by.readUTF();
        };
        return c_MeetKill;
    }(proto.Pro));
    proto.c_MeetKill = c_MeetKill;
    __reflect(c_MeetKill.prototype, "proto.c_MeetKill");
    var s_MeetKill = (function (_super) {
        __extends(s_MeetKill, _super);
        function s_MeetKill() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_MeetKill;
            return _this;
        }
        s_MeetKill.prototype.init = function (_isSuccess, _errMsg, _isWin, _actList) {
            this.isSuccess = _isSuccess;
            this.errMsg = _errMsg;
            this.isWin = _isWin;
            this.actList = _actList;
            return this;
        };
        s_MeetKill.prototype.encode = function (by) {
            by.writeBoolean(this.isSuccess);
            if (this.errMsg != null) {
                by.writeByte(1);
                by.writeUTF(this.errMsg);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeBoolean(this.isWin);
            if (this.actList != null) {
                by.writeShort(this.actList.length);
                for (var i = 0; i < this.actList.length; i++) {
                    this.actList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_MeetKill.prototype.decode = function (by) {
            this.isSuccess = by.readBoolean();
            if (by.readByte() > 0) {
                this.errMsg = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.isWin = by.readBoolean();
            }
            var __count3 = by.readShort();
            this.actList = [];
            for (var i = 0; i < __count3; i++) {
                this.actList[i] = new MyAction();
                this.actList[i].decode(by);
            }
        };
        return s_MeetKill;
    }(proto.Pro));
    proto.s_MeetKill = s_MeetKill;
    __reflect(s_MeetKill.prototype, "proto.s_MeetKill");
    var s_GuildList = (function (_super) {
        __extends(s_GuildList, _super);
        function s_GuildList() {
            var _this = _super.call(this) || this;
            //required>int
            _this.guildLv = 0; //公会等级
            //required>int
            _this.gold = 0; //公会资金
            _this.S = proto.MessageType.s_GuildList;
            return _this;
        }
        s_GuildList.prototype.init = function (_guildLv, _gold, _memberList, _notice, _requstList) {
            this.guildLv = _guildLv;
            this.gold = _gold;
            this.memberList = _memberList;
            this.notice = _notice;
            this.requstList = _requstList;
            return this;
        };
        s_GuildList.prototype.encode = function (by) {
            by.writeInt(this.guildLv);
            by.writeInt(this.gold);
            if (this.memberList != null) {
                by.writeShort(this.memberList.length);
                for (var i = 0; i < this.memberList.length; i++) {
                    this.memberList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeUTF(this.notice);
            if (this.requstList != null) {
                by.writeShort(this.requstList.length);
                for (var i = 0; i < this.requstList.length; i++) {
                    this.requstList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_GuildList.prototype.decode = function (by) {
            this.guildLv = by.readInt();
            this.gold = by.readInt();
            var __count2 = by.readShort();
            this.memberList = [];
            for (var i = 0; i < __count2; i++) {
                this.memberList[i] = new GuildMemberData();
                this.memberList[i].decode(by);
            }
            this.notice = by.readUTF();
            var __count4 = by.readShort();
            this.requstList = [];
            for (var i = 0; i < __count4; i++) {
                this.requstList[i] = new GuildMemberData();
                this.requstList[i].decode(by);
            }
        };
        return s_GuildList;
    }(proto.Pro));
    proto.s_GuildList = s_GuildList;
    __reflect(s_GuildList.prototype, "proto.s_GuildList");
    var GuildMemberData = (function (_super) {
        __extends(GuildMemberData, _super);
        function GuildMemberData() {
            var _this = _super.call(this) || this;
            //required>int
            _this.totalContribution = 0; //历史贡献
            //required>int
            _this.currContribution = 0; //当前可用贡献
            //required>int
            _this.duty = 0; //职位
            //required>int
            _this.logoutTime = 0; //离线时间
            _this.S = proto.MessageType.GuildMemberData;
            return _this;
        }
        GuildMemberData.prototype.init = function (_name, _playerId, _totalContribution, _currContribution, _duty, _attrList, _logoutTime) {
            this.name = _name;
            this.playerId = _playerId;
            this.totalContribution = _totalContribution;
            this.currContribution = _currContribution;
            this.duty = _duty;
            this.attrList = _attrList;
            this.logoutTime = _logoutTime;
            return this;
        };
        GuildMemberData.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeUTF(this.playerId);
            by.writeInt(this.totalContribution);
            by.writeInt(this.currContribution);
            by.writeInt(this.duty);
            if (this.attrList != null) {
                by.writeShort(this.attrList.length);
                for (var i = 0; i < this.attrList.length; i++) {
                    this.attrList[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.logoutTime);
        };
        GuildMemberData.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.playerId = by.readUTF();
            this.totalContribution = by.readInt();
            this.currContribution = by.readInt();
            this.duty = by.readInt();
            var __count5 = by.readShort();
            this.attrList = [];
            for (var i = 0; i < __count5; i++) {
                this.attrList[i] = new AttrValue();
                this.attrList[i].decode(by);
            }
            this.logoutTime = by.readInt();
        };
        return GuildMemberData;
    }(proto.Pro));
    proto.GuildMemberData = GuildMemberData;
    __reflect(GuildMemberData.prototype, "proto.GuildMemberData");
    var s_mess = (function (_super) {
        __extends(s_mess, _super);
        function s_mess() {
            var _this = _super.call(this) || this;
            //required>int
            _this.channel = 0; //提示频道
            _this.S = proto.MessageType.s_mess;
            return _this;
        }
        s_mess.prototype.init = function (_channel, _content) {
            this.channel = _channel;
            this.content = _content;
            return this;
        };
        s_mess.prototype.encode = function (by) {
            by.writeInt(this.channel);
            by.writeUTF(this.content);
        };
        s_mess.prototype.decode = function (by) {
            this.channel = by.readInt();
            this.content = by.readUTF();
        };
        return s_mess;
    }(proto.Pro));
    proto.s_mess = s_mess;
    __reflect(s_mess.prototype, "proto.s_mess");
    var c_move = (function (_super) {
        __extends(c_move, _super);
        function c_move() {
            var _this = _super.call(this) || this;
            //required>short
            _this.cx = 0; //横向坐标
            //required>short
            _this.cy = 0; //纵向坐标
            //required>short
            _this.endx = 0; //横向坐标
            //required>short
            _this.endy = 0; //纵向坐标
            _this.S = proto.MessageType.c_move;
            return _this;
        }
        c_move.prototype.init = function (_cx, _cy, _endx, _endy) {
            this.cx = _cx;
            this.cy = _cy;
            this.endx = _endx;
            this.endy = _endy;
            return this;
        };
        c_move.prototype.encode = function (by) {
            by.writeShort(this.cx);
            by.writeShort(this.cy);
            by.writeShort(this.endx);
            by.writeShort(this.endy);
        };
        c_move.prototype.decode = function (by) {
            this.cx = by.readShort();
            this.cy = by.readShort();
            this.endx = by.readShort();
            this.endy = by.readShort();
        };
        return c_move;
    }(proto.Pro));
    proto.c_move = c_move;
    __reflect(c_move.prototype, "proto.c_move");
    var s_move = (function (_super) {
        __extends(s_move, _super);
        function s_move() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            //required>short
            _this.cx = 0; //横向坐标
            //required>short
            _this.cy = 0; //纵向坐标
            //required>short
            _this.endx = 0; //横向坐标
            //required>short
            _this.endy = 0; //纵向坐标
            _this.S = proto.MessageType.s_move;
            return _this;
        }
        s_move.prototype.init = function (_uid, _cx, _cy, _endx, _endy, _timeSpan) {
            this.uid = _uid;
            this.cx = _cx;
            this.cy = _cy;
            this.endx = _endx;
            this.endy = _endy;
            this.timeSpan = _timeSpan;
            return this;
        };
        s_move.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeShort(this.cx);
            by.writeShort(this.cy);
            by.writeShort(this.endx);
            by.writeShort(this.endy);
            by.writeUTF(this.timeSpan);
        };
        s_move.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.cx = by.readShort();
            this.cy = by.readShort();
            this.endx = by.readShort();
            this.endy = by.readShort();
            this.timeSpan = by.readUTF();
        };
        return s_move;
    }(proto.Pro));
    proto.s_move = s_move;
    __reflect(s_move.prototype, "proto.s_move");
    var Pos = (function (_super) {
        __extends(Pos, _super);
        function Pos() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.x = 0; //横向坐标
            //required>byte
            _this.y = 0; //纵向坐标
            _this.S = proto.MessageType.Pos;
            return _this;
        }
        Pos.prototype.init = function (_uid, _x, _y) {
            this.uid = _uid;
            this.x = _x;
            this.y = _y;
            return this;
        };
        Pos.prototype.encode = function (by) {
            by.writeUTF(this.uid);
            by.writeByte(this.x);
            by.writeByte(this.y);
        };
        Pos.prototype.decode = function (by) {
            this.uid = by.readUTF();
            this.x = by.readUnsignedByte();
            this.y = by.readUnsignedByte();
        };
        return Pos;
    }(proto.Pro));
    proto.Pos = Pos;
    __reflect(Pos.prototype, "proto.Pos");
    var s_Mapload = (function (_super) {
        __extends(s_Mapload, _super);
        function s_Mapload() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Mapload;
            return _this;
        }
        s_Mapload.prototype.init = function (_mapid) {
            this.mapid = _mapid;
            return this;
        };
        s_Mapload.prototype.encode = function (by) {
            by.writeUTF(this.mapid);
        };
        s_Mapload.prototype.decode = function (by) {
            this.mapid = by.readUTF();
        };
        return s_Mapload;
    }(proto.Pro));
    proto.s_Mapload = s_Mapload;
    __reflect(s_Mapload.prototype, "proto.s_Mapload");
    var s_Mapshow = (function (_super) {
        __extends(s_Mapshow, _super);
        function s_Mapshow() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Mapshow;
            return _this;
        }
        s_Mapshow.prototype.init = function () {
            return this;
        };
        s_Mapshow.prototype.encode = function (by) {
        };
        s_Mapshow.prototype.decode = function (by) {
        };
        return s_Mapshow;
    }(proto.Pro));
    proto.s_Mapshow = s_Mapshow;
    __reflect(s_Mapshow.prototype, "proto.s_Mapshow");
    var s_setpos = (function (_super) {
        __extends(s_setpos, _super);
        function s_setpos() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            _this.S = proto.MessageType.s_setpos;
            return _this;
        }
        s_setpos.prototype.init = function (_uid, _pos) {
            this.uid = _uid;
            this.pos = _pos;
            return this;
        };
        s_setpos.prototype.encode = function (by) {
            by.writeInt(this.uid);
            this.pos.encode(by);
        };
        s_setpos.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.pos = new Pos();
            this.pos.decode(by);
        };
        return s_setpos;
    }(proto.Pro));
    proto.s_setpos = s_setpos;
    __reflect(s_setpos.prototype, "proto.s_setpos");
    var s_Map_UnitAdd = (function (_super) {
        __extends(s_Map_UnitAdd, _super);
        function s_Map_UnitAdd() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Map_UnitAdd;
            return _this;
        }
        s_Map_UnitAdd.prototype.init = function (_unitinfo) {
            this.unitinfo = _unitinfo;
            return this;
        };
        s_Map_UnitAdd.prototype.encode = function (by) {
            this.unitinfo.encode(by);
        };
        s_Map_UnitAdd.prototype.decode = function (by) {
            this.unitinfo = new s_MapUnitInfo();
            this.unitinfo.decode(by);
        };
        return s_Map_UnitAdd;
    }(proto.Pro));
    proto.s_Map_UnitAdd = s_Map_UnitAdd;
    __reflect(s_Map_UnitAdd.prototype, "proto.s_Map_UnitAdd");
    var s_Map_UnitRemove = (function (_super) {
        __extends(s_Map_UnitRemove, _super);
        function s_Map_UnitRemove() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            _this.S = proto.MessageType.s_Map_UnitRemove;
            return _this;
        }
        s_Map_UnitRemove.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        s_Map_UnitRemove.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        s_Map_UnitRemove.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return s_Map_UnitRemove;
    }(proto.Pro));
    proto.s_Map_UnitRemove = s_Map_UnitRemove;
    __reflect(s_Map_UnitRemove.prototype, "proto.s_Map_UnitRemove");
    var s_MapUnitInfo = (function (_super) {
        __extends(s_MapUnitInfo, _super);
        function s_MapUnitInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            //required>byte
            _this.type = 0; //单位类型
            //requited>byte
            _this.lev = 0; //掉落物的话是剩余时间
            //requited>byte
            _this.bind = 0; //是否绑定，0表示不绑定，1表示绑定
            //requited>short
            _this.count = 0; //数量
            _this.S = proto.MessageType.s_MapUnitInfo;
            return _this;
        }
        s_MapUnitInfo.prototype.init = function (_uid, _type, _name, _pos, _lev, _bind, _templeID, _count, _extra) {
            this.uid = _uid;
            this.type = _type;
            this.name = _name;
            this.pos = _pos;
            this.lev = _lev;
            this.bind = _bind;
            this.templeID = _templeID;
            this.count = _count;
            this.extra = _extra;
            return this;
        };
        s_MapUnitInfo.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeByte(this.type);
            by.writeUTF(this.name);
            this.pos.encode(by);
            by.writeByte(this.lev);
            by.writeByte(this.bind);
            if (this.templeID != null) {
                by.writeByte(1);
                by.writeUTF(this.templeID);
            }
            else {
                by.writeByte(0);
            }
            by.writeShort(this.count);
            if (this.extra != null) {
                by.writeByte(1);
                this.extra.encode(by);
            }
            else {
                by.writeByte(0);
            }
        };
        s_MapUnitInfo.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.type = by.readUnsignedByte();
            this.name = by.readUTF();
            this.pos = new Pos();
            this.pos.decode(by);
            this.lev = by.readUnsignedByte();
            this.bind = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.templeID = by.readUTF();
            }
            this.count = by.readShort();
            if (by.readByte() > 0) {
                this.extra = new MapUnit_extraInfo();
                this.extra.decode(by);
            }
        };
        return s_MapUnitInfo;
    }(proto.Pro));
    proto.s_MapUnitInfo = s_MapUnitInfo;
    __reflect(s_MapUnitInfo.prototype, "proto.s_MapUnitInfo");
    var s_MapUnit_Model = (function (_super) {
        __extends(s_MapUnit_Model, _super);
        function s_MapUnit_Model() {
            var _this = _super.call(this) || this;
            //required>int
            _this.oid = 0; //流水号
            _this.S = proto.MessageType.s_MapUnit_Model;
            return _this;
        }
        s_MapUnit_Model.prototype.init = function (_oid, _models) {
            this.oid = _oid;
            this.models = _models;
            return this;
        };
        s_MapUnit_Model.prototype.encode = function (by) {
            by.writeInt(this.oid);
            if (this.models != null) {
                by.writeShort(this.models.length);
                for (var i = 0; i < this.models.length; i++) {
                    by.writeShort(this.models[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_MapUnit_Model.prototype.decode = function (by) {
            this.oid = by.readInt();
            var __count1 = by.readShort();
            this.models = [];
            for (var i = 0; i < __count1; i++) {
                this.models[i] = by.readShort();
            }
        };
        return s_MapUnit_Model;
    }(proto.Pro));
    proto.s_MapUnit_Model = s_MapUnit_Model;
    __reflect(s_MapUnit_Model.prototype, "proto.s_MapUnit_Model");
    var s_MapUnit_title = (function (_super) {
        __extends(s_MapUnit_title, _super);
        function s_MapUnit_title() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_MapUnit_title;
            return _this;
        }
        s_MapUnit_title.prototype.init = function () {
            return this;
        };
        s_MapUnit_title.prototype.encode = function (by) {
        };
        s_MapUnit_title.prototype.decode = function (by) {
        };
        return s_MapUnit_title;
    }(proto.Pro));
    proto.s_MapUnit_title = s_MapUnit_title;
    __reflect(s_MapUnit_title.prototype, "proto.s_MapUnit_title");
    var c_MapUnit_sel = (function (_super) {
        __extends(c_MapUnit_sel, _super);
        function c_MapUnit_sel() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            _this.S = proto.MessageType.c_MapUnit_sel;
            return _this;
        }
        c_MapUnit_sel.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        c_MapUnit_sel.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        c_MapUnit_sel.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return c_MapUnit_sel;
    }(proto.Pro));
    proto.c_MapUnit_sel = c_MapUnit_sel;
    __reflect(c_MapUnit_sel.prototype, "proto.c_MapUnit_sel");
    var s_MapUnit_state = (function (_super) {
        __extends(s_MapUnit_state, _super);
        function s_MapUnit_state() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            //required>byte
            _this.state = 0; //单位在服务器的状态0
            _this.S = proto.MessageType.s_MapUnit_state;
            return _this;
        }
        s_MapUnit_state.prototype.init = function (_uid, _state) {
            this.uid = _uid;
            this.state = _state;
            return this;
        };
        s_MapUnit_state.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeByte(this.state);
        };
        s_MapUnit_state.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.state = by.readUnsignedByte();
        };
        return s_MapUnit_state;
    }(proto.Pro));
    proto.s_MapUnit_state = s_MapUnit_state;
    __reflect(s_MapUnit_state.prototype, "proto.s_MapUnit_state");
    var MapUnit_extraInfo = (function (_super) {
        __extends(MapUnit_extraInfo, _super);
        function MapUnit_extraInfo() {
            var _this = _super.call(this) || this;
            //required>float
            _this.Speed = 0; //undefined
            //required>float
            _this.Quick = 0; //undefined
            //required>byte
            _this.lev = 0; //undefined
            //required>byte
            _this.pkflag = 0; //0，白名，1黄名，2，红名，3灰名
            //required>int
            _this.MHP = 0; //undefined
            //required>int
            _this.HP = 0; //undefined
            //requied>byte
            _this.state = 0; //undefined
            //required>byte
            _this.head = 0; //目标头像
            _this.S = proto.MessageType.MapUnit_extraInfo;
            return _this;
        }
        MapUnit_extraInfo.prototype.init = function (_Speed, _Quick, _lev, _pkflag, _MHP, _HP, _state, _guildname, _head, _models, _titles) {
            this.Speed = _Speed;
            this.Quick = _Quick;
            this.lev = _lev;
            this.pkflag = _pkflag;
            this.MHP = _MHP;
            this.HP = _HP;
            this.state = _state;
            this.guildname = _guildname;
            this.head = _head;
            this.models = _models;
            this.titles = _titles;
            return this;
        };
        MapUnit_extraInfo.prototype.encode = function (by) {
            by.writeFloat(this.Speed);
            by.writeFloat(this.Quick);
            by.writeByte(this.lev);
            by.writeByte(this.pkflag);
            by.writeInt(this.MHP);
            by.writeInt(this.HP);
            by.writeByte(this.state);
            if (this.guildname != null) {
                by.writeByte(1);
                by.writeUTF(this.guildname);
            }
            else {
                by.writeByte(0);
            }
            by.writeByte(this.head);
            if (this.models != null) {
                by.writeShort(this.models.length);
                for (var i = 0; i < this.models.length; i++) {
                    by.writeShort(this.models[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.titles != null) {
                by.writeShort(this.titles.length);
                for (var i = 0; i < this.titles.length; i++) {
                    by.writeUTF(this.titles[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        MapUnit_extraInfo.prototype.decode = function (by) {
            this.Speed = by.readFloat();
            this.Quick = by.readFloat();
            this.lev = by.readUnsignedByte();
            this.pkflag = by.readUnsignedByte();
            this.MHP = by.readInt();
            this.HP = by.readInt();
            this.state = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.guildname = by.readUTF();
            }
            this.head = by.readUnsignedByte();
            var __count9 = by.readShort();
            this.models = [];
            for (var i = 0; i < __count9; i++) {
                this.models[i] = by.readShort();
            }
            var __count10 = by.readShort();
            this.titles = [];
            for (var i = 0; i < __count10; i++) {
                this.titles[i] = by.readUTF();
            }
        };
        return MapUnit_extraInfo;
    }(proto.Pro));
    proto.MapUnit_extraInfo = MapUnit_extraInfo;
    __reflect(MapUnit_extraInfo.prototype, "proto.MapUnit_extraInfo");
    var s_TweenTo = (function (_super) {
        __extends(s_TweenTo, _super);
        function s_TweenTo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            //required>int
            _this.targetuid = 0; //朝向的目标UID
            _this.S = proto.MessageType.s_TweenTo;
            return _this;
        }
        s_TweenTo.prototype.init = function (_uid, _pos, _targetuid) {
            this.uid = _uid;
            this.pos = _pos;
            this.targetuid = _targetuid;
            return this;
        };
        s_TweenTo.prototype.encode = function (by) {
            by.writeInt(this.uid);
            this.pos.encode(by);
            by.writeInt(this.targetuid);
        };
        s_TweenTo.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.pos = new Pos();
            this.pos.decode(by);
            this.targetuid = by.readInt();
        };
        return s_TweenTo;
    }(proto.Pro));
    proto.s_TweenTo = s_TweenTo;
    __reflect(s_TweenTo.prototype, "proto.s_TweenTo");
    var s_addFire = (function (_super) {
        __extends(s_addFire, _super);
        function s_addFire() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_addFire;
            return _this;
        }
        s_addFire.prototype.init = function (_postions) {
            this.postions = _postions;
            return this;
        };
        s_addFire.prototype.encode = function (by) {
            if (this.postions != null) {
                by.writeShort(this.postions.length);
                for (var i = 0; i < this.postions.length; i++) {
                    this.postions[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_addFire.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.postions = [];
            for (var i = 0; i < __count0; i++) {
                this.postions[i] = new Pos();
                this.postions[i].decode(by);
            }
        };
        return s_addFire;
    }(proto.Pro));
    proto.s_addFire = s_addFire;
    __reflect(s_addFire.prototype, "proto.s_addFire");
    var s_removeFire = (function (_super) {
        __extends(s_removeFire, _super);
        function s_removeFire() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.x = 0; //undefined
            //required>byte
            _this.y = 0; //undefined
            _this.S = proto.MessageType.s_removeFire;
            return _this;
        }
        s_removeFire.prototype.init = function (_x, _y) {
            this.x = _x;
            this.y = _y;
            return this;
        };
        s_removeFire.prototype.encode = function (by) {
            by.writeByte(this.x);
            by.writeByte(this.y);
        };
        s_removeFire.prototype.decode = function (by) {
            this.x = by.readUnsignedByte();
            this.y = by.readUnsignedByte();
        };
        return s_removeFire;
    }(proto.Pro));
    proto.s_removeFire = s_removeFire;
    __reflect(s_removeFire.prototype, "proto.s_removeFire");
    var s_MapUnit_PkState = (function (_super) {
        __extends(s_MapUnit_PkState, _super);
        function s_MapUnit_PkState() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位的uid
            //required>byte
            _this.pkflag = 0; //0，白名，1黄名，2，红名，3灰名
            _this.S = proto.MessageType.s_MapUnit_PkState;
            return _this;
        }
        s_MapUnit_PkState.prototype.init = function (_uid, _pkflag) {
            this.uid = _uid;
            this.pkflag = _pkflag;
            return this;
        };
        s_MapUnit_PkState.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeByte(this.pkflag);
        };
        s_MapUnit_PkState.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.pkflag = by.readUnsignedByte();
        };
        return s_MapUnit_PkState;
    }(proto.Pro));
    proto.s_MapUnit_PkState = s_MapUnit_PkState;
    __reflect(s_MapUnit_PkState.prototype, "proto.s_MapUnit_PkState");
    var c_GetDrop = (function (_super) {
        __extends(c_GetDrop, _super);
        function c_GetDrop() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //单位在服务器的唯一ID
            //required>byte
            _this.place = 0; //背包所在位置
            _this.S = proto.MessageType.c_GetDrop;
            return _this;
        }
        c_GetDrop.prototype.init = function (_uid, _place) {
            this.uid = _uid;
            this.place = _place;
            return this;
        };
        c_GetDrop.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeByte(this.place);
        };
        c_GetDrop.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.place = by.readUnsignedByte();
        };
        return c_GetDrop;
    }(proto.Pro));
    proto.c_GetDrop = c_GetDrop;
    __reflect(c_GetDrop.prototype, "proto.c_GetDrop");
    var c_flyto = (function (_super) {
        __extends(c_flyto, _super);
        function c_flyto() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.x = 0; //要飞过去的格子坐标
            //required>byte
            _this.y = 0; //要飞过去的格子坐标
            _this.S = proto.MessageType.c_flyto;
            return _this;
        }
        c_flyto.prototype.init = function (_mapid, _x, _y) {
            this.mapid = _mapid;
            this.x = _x;
            this.y = _y;
            return this;
        };
        c_flyto.prototype.encode = function (by) {
            by.writeUTF(this.mapid);
            by.writeByte(this.x);
            by.writeByte(this.y);
        };
        c_flyto.prototype.decode = function (by) {
            this.mapid = by.readUTF();
            this.x = by.readUnsignedByte();
            this.y = by.readUnsignedByte();
        };
        return c_flyto;
    }(proto.Pro));
    proto.c_flyto = c_flyto;
    __reflect(c_flyto.prototype, "proto.c_flyto");
    var c_revive = (function (_super) {
        __extends(c_revive, _super);
        function c_revive() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //0
            _this.S = proto.MessageType.c_revive;
            return _this;
        }
        c_revive.prototype.init = function (_flag) {
            this.flag = _flag;
            return this;
        };
        c_revive.prototype.encode = function (by) {
            by.writeByte(this.flag);
        };
        c_revive.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
        };
        return c_revive;
    }(proto.Pro));
    proto.c_revive = c_revive;
    __reflect(c_revive.prototype, "proto.c_revive");
    var c_skill_use = (function (_super) {
        __extends(c_skill_use, _super);
        function c_skill_use() {
            var _this = _super.call(this) || this;
            //required>short
            _this.x = 0; //undefined
            //required>short
            _this.y = 0; //使用技能必须先停到某个坐标
            //optional>byte
            _this.dir = 0; //自身朝向
            _this.S = proto.MessageType.c_skill_use;
            return _this;
        }
        c_skill_use.prototype.init = function (_x, _y, _skillid, _targets, _targetPos, _dir) {
            this.x = _x;
            this.y = _y;
            this.skillid = _skillid;
            this.targets = _targets;
            this.targetPos = _targetPos;
            this.dir = _dir;
            return this;
        };
        c_skill_use.prototype.encode = function (by) {
            by.writeShort(this.x);
            by.writeShort(this.y);
            by.writeUTF(this.skillid);
            if (this.targets != null) {
                by.writeShort(this.targets.length);
                for (var i = 0; i < this.targets.length; i++) {
                    by.writeInt(this.targets[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.targetPos != null) {
                by.writeByte(1);
                this.targetPos.encode(by);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeByte(this.dir);
        };
        c_skill_use.prototype.decode = function (by) {
            this.x = by.readShort();
            this.y = by.readShort();
            this.skillid = by.readUTF();
            var __count3 = by.readShort();
            this.targets = [];
            for (var i = 0; i < __count3; i++) {
                this.targets[i] = by.readInt();
            }
            if (by.readByte() > 0) {
                this.targetPos = new Pos();
                this.targetPos.decode(by);
            }
            if (by.readByte() > 0) {
                this.dir = by.readUnsignedByte();
            }
        };
        return c_skill_use;
    }(proto.Pro));
    proto.c_skill_use = c_skill_use;
    __reflect(c_skill_use.prototype, "proto.c_skill_use");
    var s_skilluse = (function (_super) {
        __extends(s_skilluse, _super);
        function s_skilluse() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //施法者
            //required>int
            _this.targetid = 0; //目标
            _this.S = proto.MessageType.s_skilluse;
            return _this;
        }
        s_skilluse.prototype.init = function (_skillid, _uid, _targetid, _targetpos, _targets) {
            this.skillid = _skillid;
            this.uid = _uid;
            this.targetid = _targetid;
            this.targetpos = _targetpos;
            this.targets = _targets;
            return this;
        };
        s_skilluse.prototype.encode = function (by) {
            by.writeUTF(this.skillid);
            by.writeInt(this.uid);
            by.writeInt(this.targetid);
            if (this.targetpos != null) {
                by.writeByte(1);
                this.targetpos.encode(by);
            }
            else {
                by.writeByte(0);
            }
            if (this.targets != null) {
                by.writeShort(this.targets.length);
                for (var i = 0; i < this.targets.length; i++) {
                    this.targets[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_skilluse.prototype.decode = function (by) {
            this.skillid = by.readUTF();
            this.uid = by.readInt();
            this.targetid = by.readInt();
            if (by.readByte() > 0) {
                this.targetpos = new Pos();
                this.targetpos.decode(by);
            }
            var __count4 = by.readShort();
            this.targets = [];
            for (var i = 0; i < __count4; i++) {
                this.targets[i] = new s_Damage();
                this.targets[i].decode(by);
            }
        };
        return s_skilluse;
    }(proto.Pro));
    proto.s_skilluse = s_skilluse;
    __reflect(s_skilluse.prototype, "proto.s_skilluse");
    var s_skill_add = (function (_super) {
        __extends(s_skill_add, _super);
        function s_skill_add() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_skill_add;
            return _this;
        }
        s_skill_add.prototype.init = function (_skillinfo) {
            this.skillinfo = _skillinfo;
            return this;
        };
        s_skill_add.prototype.encode = function (by) {
            this.skillinfo.encode(by);
        };
        s_skill_add.prototype.decode = function (by) {
            this.skillinfo = new SkillInfo();
            this.skillinfo.decode(by);
        };
        return s_skill_add;
    }(proto.Pro));
    proto.s_skill_add = s_skill_add;
    __reflect(s_skill_add.prototype, "proto.s_skill_add");
    var SkillInfo = (function (_super) {
        __extends(SkillInfo, _super);
        function SkillInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.SkillID = 0; //技能ID
            _this.S = proto.MessageType.SkillInfo;
            return _this;
        }
        SkillInfo.prototype.init = function (_SkillID) {
            this.SkillID = _SkillID;
            return this;
        };
        SkillInfo.prototype.encode = function (by) {
            by.writeInt(this.SkillID);
        };
        SkillInfo.prototype.decode = function (by) {
            this.SkillID = by.readInt();
        };
        return SkillInfo;
    }(proto.Pro));
    proto.SkillInfo = SkillInfo;
    __reflect(SkillInfo.prototype, "proto.SkillInfo");
    var s_Damage = (function (_super) {
        __extends(s_Damage, _super);
        function s_Damage() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //目标ID
            //required>byte
            _this.damageType = 0; //伤害类型
            //required>int
            _this.value = 0; //值
            _this.S = proto.MessageType.s_Damage;
            return _this;
        }
        s_Damage.prototype.init = function (_uid, _damageType, _value) {
            this.uid = _uid;
            this.damageType = _damageType;
            this.value = _value;
            return this;
        };
        s_Damage.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeByte(this.damageType);
            by.writeInt(this.value);
        };
        s_Damage.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.damageType = by.readUnsignedByte();
            this.value = by.readInt();
        };
        return s_Damage;
    }(proto.Pro));
    proto.s_Damage = s_Damage;
    __reflect(s_Damage.prototype, "proto.s_Damage");
    var s_skill_setAttr = (function (_super) {
        __extends(s_skill_setAttr, _super);
        function s_skill_setAttr() {
            var _this = _super.call(this) || this;
            //required>int
            _this.value = 0; //值
            _this.S = proto.MessageType.s_skill_setAttr;
            return _this;
        }
        s_skill_setAttr.prototype.init = function (_skillid, _attr, _value) {
            this.skillid = _skillid;
            this.attr = _attr;
            this.value = _value;
            return this;
        };
        s_skill_setAttr.prototype.encode = function (by) {
            by.writeUTF(this.skillid);
            by.writeUTF(this.attr);
            by.writeInt(this.value);
        };
        s_skill_setAttr.prototype.decode = function (by) {
            this.skillid = by.readUTF();
            this.attr = by.readUTF();
            this.value = by.readInt();
        };
        return s_skill_setAttr;
    }(proto.Pro));
    proto.s_skill_setAttr = s_skill_setAttr;
    __reflect(s_skill_setAttr.prototype, "proto.s_skill_setAttr");
    var s_CD_add = (function (_super) {
        __extends(s_CD_add, _super);
        function s_CD_add() {
            var _this = _super.call(this) || this;
            //required>int
            _this.cdtime = 0; //毫秒数
            _this.S = proto.MessageType.s_CD_add;
            return _this;
        }
        s_CD_add.prototype.init = function (_cdgroup, _cdtime) {
            this.cdgroup = _cdgroup;
            this.cdtime = _cdtime;
            return this;
        };
        s_CD_add.prototype.encode = function (by) {
            by.writeUTF(this.cdgroup);
            by.writeInt(this.cdtime);
        };
        s_CD_add.prototype.decode = function (by) {
            this.cdgroup = by.readUTF();
            this.cdtime = by.readInt();
        };
        return s_CD_add;
    }(proto.Pro));
    proto.s_CD_add = s_CD_add;
    __reflect(s_CD_add.prototype, "proto.s_CD_add");
    var s_CD_remove = (function (_super) {
        __extends(s_CD_remove, _super);
        function s_CD_remove() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_CD_remove;
            return _this;
        }
        s_CD_remove.prototype.init = function (_cdgroup) {
            this.cdgroup = _cdgroup;
            return this;
        };
        s_CD_remove.prototype.encode = function (by) {
            by.writeUTF(this.cdgroup);
        };
        s_CD_remove.prototype.decode = function (by) {
            this.cdgroup = by.readUTF();
        };
        return s_CD_remove;
    }(proto.Pro));
    proto.s_CD_remove = s_CD_remove;
    __reflect(s_CD_remove.prototype, "proto.s_CD_remove");
    var c_item_use = (function (_super) {
        __extends(c_item_use, _super);
        function c_item_use() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            //required>int
            _this.uid = 0; //目标单位的ID
            //required>byte
            _this.count = 0; //使用数量
            _this.S = proto.MessageType.c_item_use;
            return _this;
        }
        c_item_use.prototype.init = function (_pos, _guid, _targetguid, _uid, _point, _count) {
            this.pos = _pos;
            this.guid = _guid;
            this.targetguid = _targetguid;
            this.uid = _uid;
            this.point = _point;
            this.count = _count;
            return this;
        };
        c_item_use.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
            if (this.targetguid != null) {
                by.writeByte(1);
                by.writeUTF(this.targetguid);
            }
            else {
                by.writeByte(0);
            }
            by.writeInt(this.uid);
            if (this.point != null) {
                by.writeByte(1);
                this.point.encode(by);
            }
            else {
                by.writeByte(0);
            }
            by.writeByte(this.count);
        };
        c_item_use.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
            if (by.readByte() > 0) {
                this.targetguid = by.readUTF();
            }
            this.uid = by.readInt();
            if (by.readByte() > 0) {
                this.point = new Pos();
                this.point.decode(by);
            }
            this.count = by.readUnsignedByte();
        };
        return c_item_use;
    }(proto.Pro));
    proto.c_item_use = c_item_use;
    __reflect(c_item_use.prototype, "proto.c_item_use");
    var c_item_move = (function (_super) {
        __extends(c_item_move, _super);
        function c_item_move() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.sourcepos = 0; //物品开始位置
            //required>byte
            _this.despos = 0; //物品目标位置
            _this.S = proto.MessageType.c_item_move;
            return _this;
        }
        c_item_move.prototype.init = function (_sourceloc, _sourcepos, _desloc, _despos) {
            this.sourceloc = _sourceloc;
            this.sourcepos = _sourcepos;
            this.desloc = _desloc;
            this.despos = _despos;
            return this;
        };
        c_item_move.prototype.encode = function (by) {
            by.writeUTF(this.sourceloc);
            by.writeByte(this.sourcepos);
            by.writeUTF(this.desloc);
            by.writeByte(this.despos);
        };
        c_item_move.prototype.decode = function (by) {
            this.sourceloc = by.readUTF();
            this.sourcepos = by.readUnsignedByte();
            this.desloc = by.readUTF();
            this.despos = by.readUnsignedByte();
        };
        return c_item_move;
    }(proto.Pro));
    proto.c_item_move = c_item_move;
    __reflect(c_item_move.prototype, "proto.c_item_move");
    var c_item_sell = (function (_super) {
        __extends(c_item_sell, _super);
        function c_item_sell() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            _this.S = proto.MessageType.c_item_sell;
            return _this;
        }
        c_item_sell.prototype.init = function (_pos, _gid, _isbuy) {
            this.pos = _pos;
            this.gid = _gid;
            this.isbuy = _isbuy;
            return this;
        };
        c_item_sell.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.gid);
            by.writeBoolean(this.isbuy);
        };
        c_item_sell.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.gid = by.readUTF();
            this.isbuy = by.readBoolean();
        };
        return c_item_sell;
    }(proto.Pro));
    proto.c_item_sell = c_item_sell;
    __reflect(c_item_sell.prototype, "proto.c_item_sell");
    var c_item_stone = (function (_super) {
        __extends(c_item_stone, _super);
        function c_item_stone() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            _this.S = proto.MessageType.c_item_stone;
            return _this;
        }
        c_item_stone.prototype.init = function (_pos, _gid) {
            this.pos = _pos;
            this.gid = _gid;
            return this;
        };
        c_item_stone.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.gid);
        };
        c_item_stone.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.gid = by.readUTF();
        };
        return c_item_stone;
    }(proto.Pro));
    proto.c_item_stone = c_item_stone;
    __reflect(c_item_stone.prototype, "proto.c_item_stone");
    var c_item_unstone = (function (_super) {
        __extends(c_item_unstone, _super);
        function c_item_unstone() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            _this.S = proto.MessageType.c_item_unstone;
            return _this;
        }
        c_item_unstone.prototype.init = function (_pos, _gid) {
            this.pos = _pos;
            this.gid = _gid;
            return this;
        };
        c_item_unstone.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.gid);
        };
        c_item_unstone.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.gid = by.readUTF();
        };
        return c_item_unstone;
    }(proto.Pro));
    proto.c_item_unstone = c_item_unstone;
    __reflect(c_item_unstone.prototype, "proto.c_item_unstone");
    var c_item_destroy = (function (_super) {
        __extends(c_item_destroy, _super);
        function c_item_destroy() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            //required>byte
            _this.flag = 0; //1是销毁
            _this.S = proto.MessageType.c_item_destroy;
            return _this;
        }
        c_item_destroy.prototype.init = function (_pos, _gid, _flag) {
            this.pos = _pos;
            this.gid = _gid;
            this.flag = _flag;
            return this;
        };
        c_item_destroy.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.gid);
            by.writeByte(this.flag);
        };
        c_item_destroy.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.gid = by.readUTF();
            this.flag = by.readUnsignedByte();
        };
        return c_item_destroy;
    }(proto.Pro));
    proto.c_item_destroy = c_item_destroy;
    __reflect(c_item_destroy.prototype, "proto.c_item_destroy");
    var s_item_add = (function (_super) {
        __extends(s_item_add, _super);
        function s_item_add() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_item_add;
            return _this;
        }
        s_item_add.prototype.init = function (_item) {
            this.item = _item;
            return this;
        };
        s_item_add.prototype.encode = function (by) {
            this.item.encode(by);
        };
        s_item_add.prototype.decode = function (by) {
            this.item = new s_ItemInfo();
            this.item.decode(by);
        };
        return s_item_add;
    }(proto.Pro));
    proto.s_item_add = s_item_add;
    __reflect(s_item_add.prototype, "proto.s_item_add");
    var s_item_remove = (function (_super) {
        __extends(s_item_remove, _super);
        function s_item_remove() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_item_remove;
            return _this;
        }
        s_item_remove.prototype.init = function (_guid) {
            this.guid = _guid;
            return this;
        };
        s_item_remove.prototype.encode = function (by) {
            by.writeUTF(this.guid);
        };
        s_item_remove.prototype.decode = function (by) {
            this.guid = by.readUTF();
        };
        return s_item_remove;
    }(proto.Pro));
    proto.s_item_remove = s_item_remove;
    __reflect(s_item_remove.prototype, "proto.s_item_remove");
    var s_item_setplace = (function (_super) {
        __extends(s_item_setplace, _super);
        function s_item_setplace() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.place = 0; //物品位置
            _this.S = proto.MessageType.s_item_setplace;
            return _this;
        }
        s_item_setplace.prototype.init = function (_location, _place, _guid) {
            this.location = _location;
            this.place = _place;
            this.guid = _guid;
            return this;
        };
        s_item_setplace.prototype.encode = function (by) {
            by.writeUTF(this.location);
            by.writeByte(this.place);
            if (this.guid != null) {
                by.writeByte(1);
                by.writeUTF(this.guid);
            }
            else {
                by.writeByte(0);
            }
        };
        s_item_setplace.prototype.decode = function (by) {
            this.location = by.readUTF();
            this.place = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.guid = by.readUTF();
            }
        };
        return s_item_setplace;
    }(proto.Pro));
    proto.s_item_setplace = s_item_setplace;
    __reflect(s_item_setplace.prototype, "proto.s_item_setplace");
    var s_ItemInfo = (function (_super) {
        __extends(s_ItemInfo, _super);
        function s_ItemInfo() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.place = 0; //物品所在位置
            //required>byte
            _this.flag = 0; //标志位1
            //required>int
            _this.count = 0; //物品数量
            //optional>int
            _this.lefttime = 0; //可选，到期时间
            //optional>int
            _this.sellPrice = 0; //出售价格，金币
            _this.S = proto.MessageType.s_ItemInfo;
            return _this;
        }
        s_ItemInfo.prototype.init = function (_location, _place, _guid, _templeID, _flag, _count, _lefttime, _extra, _sellPrice) {
            this.location = _location;
            this.place = _place;
            this.guid = _guid;
            this.templeID = _templeID;
            this.flag = _flag;
            this.count = _count;
            this.lefttime = _lefttime;
            this.extra = _extra;
            this.sellPrice = _sellPrice;
            return this;
        };
        s_ItemInfo.prototype.encode = function (by) {
            by.writeUTF(this.location);
            by.writeByte(this.place);
            by.writeUTF(this.guid);
            by.writeUTF(this.templeID);
            by.writeByte(this.flag);
            by.writeInt(this.count);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.lefttime);
            if (this.extra != null) {
                by.writeByte(1);
                this.extra.encode(by);
            }
            else {
                by.writeByte(0);
            }
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.sellPrice);
        };
        s_ItemInfo.prototype.decode = function (by) {
            this.location = by.readUTF();
            this.place = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.templeID = by.readUTF();
            this.flag = by.readUnsignedByte();
            this.count = by.readInt();
            if (by.readByte() > 0) {
                this.lefttime = by.readInt();
            }
            if (by.readByte() > 0) {
                this.extra = new ItemExtraInfo();
                this.extra.decode(by);
            }
            if (by.readByte() > 0) {
                this.sellPrice = by.readInt();
            }
        };
        return s_ItemInfo;
    }(proto.Pro));
    proto.s_ItemInfo = s_ItemInfo;
    __reflect(s_ItemInfo.prototype, "proto.s_ItemInfo");
    var ItemExtraInfo = (function (_super) {
        __extends(ItemExtraInfo, _super);
        function ItemExtraInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.dur = 0; //当前耐久
            //required>int
            _this.maxdur = 0; //最大耐久
            //required>byte
            _this.rank = 0; //军衔等级
            //required>byte
            _this.improve = 0; //强化等级
            //required>byte
            _this.maxImprove = 0; //最大强化等级
            //required>int
            _this.improvegold = 0; //强化需要金币
            //required>int
            _this.improvemoney = 0; //确保强化成功需要元宝
            //required>int
            _this.maximprovegold = 0; //强化上限需要金币
            _this.S = proto.MessageType.ItemExtraInfo;
            return _this;
        }
        ItemExtraInfo.prototype.init = function (_dur, _maxdur, _prefix, _postfix, _rank, _improve, _maxImprove, _holes, _improvegold, _improvemoney, _maximprovegold) {
            this.dur = _dur;
            this.maxdur = _maxdur;
            this.prefix = _prefix;
            this.postfix = _postfix;
            this.rank = _rank;
            this.improve = _improve;
            this.maxImprove = _maxImprove;
            this.holes = _holes;
            this.improvegold = _improvegold;
            this.improvemoney = _improvemoney;
            this.maximprovegold = _maximprovegold;
            return this;
        };
        ItemExtraInfo.prototype.encode = function (by) {
            by.writeInt(this.dur);
            by.writeInt(this.maxdur);
            if (this.prefix != null) {
                by.writeShort(this.prefix.length);
                for (var i = 0; i < this.prefix.length; i++) {
                    this.prefix[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.postfix != null) {
                by.writeByte(1);
                by.writeUTF(this.postfix);
            }
            else {
                by.writeByte(0);
            }
            by.writeByte(this.rank);
            by.writeByte(this.improve);
            by.writeByte(this.maxImprove);
            if (this.holes != null) {
                by.writeShort(this.holes.length);
                for (var i = 0; i < this.holes.length; i++) {
                    by.writeUTF(this.holes[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.improvegold);
            by.writeInt(this.improvemoney);
            by.writeInt(this.maximprovegold);
        };
        ItemExtraInfo.prototype.decode = function (by) {
            this.dur = by.readInt();
            this.maxdur = by.readInt();
            var __count2 = by.readShort();
            this.prefix = [];
            for (var i = 0; i < __count2; i++) {
                this.prefix[i] = new s_Prefix();
                this.prefix[i].decode(by);
            }
            if (by.readByte() > 0) {
                this.postfix = by.readUTF();
            }
            this.rank = by.readUnsignedByte();
            this.improve = by.readUnsignedByte();
            this.maxImprove = by.readUnsignedByte();
            var __count7 = by.readShort();
            this.holes = [];
            for (var i = 0; i < __count7; i++) {
                this.holes[i] = by.readUTF();
            }
            this.improvegold = by.readInt();
            this.improvemoney = by.readInt();
            this.maximprovegold = by.readInt();
        };
        return ItemExtraInfo;
    }(proto.Pro));
    proto.ItemExtraInfo = ItemExtraInfo;
    __reflect(ItemExtraInfo.prototype, "proto.ItemExtraInfo");
    var c_item_improve = (function (_super) {
        __extends(c_item_improve, _super);
        function c_item_improve() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在容器的所在格子
            _this.S = proto.MessageType.c_item_improve;
            return _this;
        }
        c_item_improve.prototype.init = function (_location, _pos, _guid, _usemoney) {
            this.location = _location;
            this.pos = _pos;
            this.guid = _guid;
            this.usemoney = _usemoney;
            return this;
        };
        c_item_improve.prototype.encode = function (by) {
            by.writeUTF(this.location);
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
            by.writeBoolean(this.usemoney);
        };
        c_item_improve.prototype.decode = function (by) {
            this.location = by.readUTF();
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.usemoney = by.readBoolean();
        };
        return c_item_improve;
    }(proto.Pro));
    proto.c_item_improve = c_item_improve;
    __reflect(c_item_improve.prototype, "proto.c_item_improve");
    var c_item_maxImprove = (function (_super) {
        __extends(c_item_maxImprove, _super);
        function c_item_maxImprove() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在容器的所在格子
            _this.S = proto.MessageType.c_item_maxImprove;
            return _this;
        }
        c_item_maxImprove.prototype.init = function (_location, _pos, _guid) {
            this.location = _location;
            this.pos = _pos;
            this.guid = _guid;
            return this;
        };
        c_item_maxImprove.prototype.encode = function (by) {
            by.writeUTF(this.location);
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
        };
        c_item_maxImprove.prototype.decode = function (by) {
            this.location = by.readUTF();
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
        };
        return c_item_maxImprove;
    }(proto.Pro));
    proto.c_item_maxImprove = c_item_maxImprove;
    __reflect(c_item_maxImprove.prototype, "proto.c_item_maxImprove");
    var s_item_setAttr = (function (_super) {
        __extends(s_item_setAttr, _super);
        function s_item_setAttr() {
            var _this = _super.call(this) || this;
            //required>int
            _this.value = 0; //物品属性值
            _this.S = proto.MessageType.s_item_setAttr;
            return _this;
        }
        s_item_setAttr.prototype.init = function (_guid, _key, _value) {
            this.guid = _guid;
            this.key = _key;
            this.value = _value;
            return this;
        };
        s_item_setAttr.prototype.encode = function (by) {
            by.writeUTF(this.guid);
            by.writeUTF(this.key);
            by.writeInt(this.value);
        };
        s_item_setAttr.prototype.decode = function (by) {
            this.guid = by.readUTF();
            this.key = by.readUTF();
            this.value = by.readInt();
        };
        return s_item_setAttr;
    }(proto.Pro));
    proto.s_item_setAttr = s_item_setAttr;
    __reflect(s_item_setAttr.prototype, "proto.s_item_setAttr");
    var s_item_update = (function (_super) {
        __extends(s_item_update, _super);
        function s_item_update() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_item_update;
            return _this;
        }
        s_item_update.prototype.init = function (_item) {
            this.item = _item;
            return this;
        };
        s_item_update.prototype.encode = function (by) {
            this.item.encode(by);
        };
        s_item_update.prototype.decode = function (by) {
            this.item = new s_ItemInfo();
            this.item.decode(by);
        };
        return s_item_update;
    }(proto.Pro));
    proto.s_item_update = s_item_update;
    __reflect(s_item_update.prototype, "proto.s_item_update");
    var c_unEquip = (function (_super) {
        __extends(c_unEquip, _super);
        function c_unEquip() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品的装备部位
            _this.S = proto.MessageType.c_unEquip;
            return _this;
        }
        c_unEquip.prototype.init = function (_pos) {
            this.pos = _pos;
            return this;
        };
        c_unEquip.prototype.encode = function (by) {
            by.writeByte(this.pos);
        };
        c_unEquip.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
        };
        return c_unEquip;
    }(proto.Pro));
    proto.c_unEquip = c_unEquip;
    __reflect(c_unEquip.prototype, "proto.c_unEquip");
    var s_Prefix = (function (_super) {
        __extends(s_Prefix, _super);
        function s_Prefix() {
            var _this = _super.call(this) || this;
            //required>short
            _this.value = 0; //undefined
            _this.S = proto.MessageType.s_Prefix;
            return _this;
        }
        s_Prefix.prototype.init = function (_preID, _value) {
            this.preID = _preID;
            this.value = _value;
            return this;
        };
        s_Prefix.prototype.encode = function (by) {
            by.writeUTF(this.preID);
            by.writeShort(this.value);
        };
        s_Prefix.prototype.decode = function (by) {
            this.preID = by.readUTF();
            this.value = by.readShort();
        };
        return s_Prefix;
    }(proto.Pro));
    proto.s_Prefix = s_Prefix;
    __reflect(s_Prefix.prototype, "proto.s_Prefix");
    var c_item_sort = (function (_super) {
        __extends(c_item_sort, _super);
        function c_item_sort() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_item_sort;
            return _this;
        }
        c_item_sort.prototype.init = function () {
            return this;
        };
        c_item_sort.prototype.encode = function (by) {
        };
        c_item_sort.prototype.decode = function (by) {
        };
        return c_item_sort;
    }(proto.Pro));
    proto.c_item_sort = c_item_sort;
    __reflect(c_item_sort.prototype, "proto.c_item_sort");
    var s_item_sort = (function (_super) {
        __extends(s_item_sort, _super);
        function s_item_sort() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_item_sort;
            return _this;
        }
        s_item_sort.prototype.init = function () {
            return this;
        };
        s_item_sort.prototype.encode = function (by) {
        };
        s_item_sort.prototype.decode = function (by) {
        };
        return s_item_sort;
    }(proto.Pro));
    proto.s_item_sort = s_item_sort;
    __reflect(s_item_sort.prototype, "proto.s_item_sort");
    var c_item_upgrade = (function (_super) {
        __extends(c_item_upgrade, _super);
        function c_item_upgrade() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.place = 0; //物品装备部位
            _this.S = proto.MessageType.c_item_upgrade;
            return _this;
        }
        c_item_upgrade.prototype.init = function (_place, _guid) {
            this.place = _place;
            this.guid = _guid;
            return this;
        };
        c_item_upgrade.prototype.encode = function (by) {
            by.writeByte(this.place);
            by.writeUTF(this.guid);
        };
        c_item_upgrade.prototype.decode = function (by) {
            this.place = by.readUnsignedByte();
            this.guid = by.readUTF();
        };
        return c_item_upgrade;
    }(proto.Pro));
    proto.c_item_upgrade = c_item_upgrade;
    __reflect(c_item_upgrade.prototype, "proto.c_item_upgrade");
    var s_item_upgrade = (function (_super) {
        __extends(s_item_upgrade, _super);
        function s_item_upgrade() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.place = 0; //物品位置
            _this.S = proto.MessageType.s_item_upgrade;
            return _this;
        }
        s_item_upgrade.prototype.init = function (_location, _place, _guid, _templeID) {
            this.location = _location;
            this.place = _place;
            this.guid = _guid;
            this.templeID = _templeID;
            return this;
        };
        s_item_upgrade.prototype.encode = function (by) {
            by.writeUTF(this.location);
            by.writeByte(this.place);
            by.writeUTF(this.guid);
            by.writeUTF(this.templeID);
        };
        s_item_upgrade.prototype.decode = function (by) {
            this.location = by.readUTF();
            this.place = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.templeID = by.readUTF();
        };
        return s_item_upgrade;
    }(proto.Pro));
    proto.s_item_upgrade = s_item_upgrade;
    __reflect(s_item_upgrade.prototype, "proto.s_item_upgrade");
    var c_item_moveImprove = (function (_super) {
        __extends(c_item_moveImprove, _super);
        function c_item_moveImprove() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在容器的位置
            //required>byte
            _this.tarpos = 0; //目标物品在容器的位置
            _this.S = proto.MessageType.c_item_moveImprove;
            return _this;
        }
        c_item_moveImprove.prototype.init = function (_location, _pos, _guid, _tarlocation, _tarpos, _targuid) {
            this.location = _location;
            this.pos = _pos;
            this.guid = _guid;
            this.tarlocation = _tarlocation;
            this.tarpos = _tarpos;
            this.targuid = _targuid;
            return this;
        };
        c_item_moveImprove.prototype.encode = function (by) {
            by.writeUTF(this.location);
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
            by.writeUTF(this.tarlocation);
            by.writeByte(this.tarpos);
            by.writeUTF(this.targuid);
        };
        c_item_moveImprove.prototype.decode = function (by) {
            this.location = by.readUTF();
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.tarlocation = by.readUTF();
            this.tarpos = by.readUnsignedByte();
            this.targuid = by.readUTF();
        };
        return c_item_moveImprove;
    }(proto.Pro));
    proto.c_item_moveImprove = c_item_moveImprove;
    __reflect(c_item_moveImprove.prototype, "proto.c_item_moveImprove");
    var s_item_Confirm = (function (_super) {
        __extends(s_item_Confirm, _super);
        function s_item_Confirm() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //0.强化，1，强化上限，2，强化转移
            //required>byte
            _this.status = 0; //0失败，1成功
            _this.S = proto.MessageType.s_item_Confirm;
            return _this;
        }
        s_item_Confirm.prototype.init = function (_type, _status) {
            this.type = _type;
            this.status = _status;
            return this;
        };
        s_item_Confirm.prototype.encode = function (by) {
            by.writeByte(this.type);
            by.writeByte(this.status);
        };
        s_item_Confirm.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            this.status = by.readUnsignedByte();
        };
        return s_item_Confirm;
    }(proto.Pro));
    proto.s_item_Confirm = s_item_Confirm;
    __reflect(s_item_Confirm.prototype, "proto.s_item_Confirm");
    var c_item_split = (function (_super) {
        __extends(c_item_split, _super);
        function c_item_split() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.place = 0; //物品在背包的位置
            //required>short
            _this.count = 0; //拆出的数量
            _this.S = proto.MessageType.c_item_split;
            return _this;
        }
        c_item_split.prototype.init = function (_place, _guid, _count) {
            this.place = _place;
            this.guid = _guid;
            this.count = _count;
            return this;
        };
        c_item_split.prototype.encode = function (by) {
            by.writeByte(this.place);
            by.writeUTF(this.guid);
            by.writeShort(this.count);
        };
        c_item_split.prototype.decode = function (by) {
            this.place = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.count = by.readShort();
        };
        return c_item_split;
    }(proto.Pro));
    proto.c_item_split = c_item_split;
    __reflect(c_item_split.prototype, "proto.c_item_split");
    var c_xilian = (function (_super) {
        __extends(c_xilian, _super);
        function c_xilian() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            _this.S = proto.MessageType.c_xilian;
            return _this;
        }
        c_xilian.prototype.init = function (_loc, _pos, _guid, _suoding) {
            this.loc = _loc;
            this.pos = _pos;
            this.guid = _guid;
            this.suoding = _suoding;
            return this;
        };
        c_xilian.prototype.encode = function (by) {
            by.writeUTF(this.loc);
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
            if (this.suoding != null) {
                by.writeShort(this.suoding.length);
                for (var i = 0; i < this.suoding.length; i++) {
                    by.writeByte(this.suoding[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        c_xilian.prototype.decode = function (by) {
            this.loc = by.readUTF();
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
            var __count4 = by.readShort();
            this.suoding = [];
            for (var i = 0; i < __count4; i++) {
                this.suoding[i] = by.readUnsignedByte();
            }
        };
        return c_xilian;
    }(proto.Pro));
    proto.c_xilian = c_xilian;
    __reflect(c_xilian.prototype, "proto.c_xilian");
    var s_xilian = (function (_super) {
        __extends(s_xilian, _super);
        function s_xilian() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            _this.S = proto.MessageType.s_xilian;
            return _this;
        }
        s_xilian.prototype.init = function (_loc, _pos, _guid, _prefix) {
            this.loc = _loc;
            this.pos = _pos;
            this.guid = _guid;
            this.prefix = _prefix;
            return this;
        };
        s_xilian.prototype.encode = function (by) {
            by.writeUTF(this.loc);
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
            if (this.prefix != null) {
                by.writeShort(this.prefix.length);
                for (var i = 0; i < this.prefix.length; i++) {
                    this.prefix[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_xilian.prototype.decode = function (by) {
            this.loc = by.readUTF();
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
            var __count3 = by.readShort();
            this.prefix = [];
            for (var i = 0; i < __count3; i++) {
                this.prefix[i] = new s_Prefix();
                this.prefix[i].decode(by);
            }
        };
        return s_xilian;
    }(proto.Pro));
    proto.s_xilian = s_xilian;
    __reflect(s_xilian.prototype, "proto.s_xilian");
    var c_item_zhufu = (function (_super) {
        __extends(c_item_zhufu, _super);
        function c_item_zhufu() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //物品在背包的所在格子
            _this.S = proto.MessageType.c_item_zhufu;
            return _this;
        }
        c_item_zhufu.prototype.init = function (_pos, _guid) {
            this.pos = _pos;
            this.guid = _guid;
            return this;
        };
        c_item_zhufu.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
        };
        c_item_zhufu.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
        };
        return c_item_zhufu;
    }(proto.Pro));
    proto.c_item_zhufu = c_item_zhufu;
    __reflect(c_item_zhufu.prototype, "proto.c_item_zhufu");
    var s_item_zhufu = (function (_super) {
        __extends(s_item_zhufu, _super);
        function s_item_zhufu() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.status = 0; //0
            //required>byte
            _this.newrank = 0; //祝福后武器新的rank值
            _this.S = proto.MessageType.s_item_zhufu;
            return _this;
        }
        s_item_zhufu.prototype.init = function (_status, _guid, _newrank) {
            this.status = _status;
            this.guid = _guid;
            this.newrank = _newrank;
            return this;
        };
        s_item_zhufu.prototype.encode = function (by) {
            by.writeByte(this.status);
            by.writeUTF(this.guid);
            by.writeByte(this.newrank);
        };
        s_item_zhufu.prototype.decode = function (by) {
            this.status = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.newrank = by.readUnsignedByte();
        };
        return s_item_zhufu;
    }(proto.Pro));
    proto.s_item_zhufu = s_item_zhufu;
    __reflect(s_item_zhufu.prototype, "proto.s_item_zhufu");
    var c_extendgrid = (function (_super) {
        __extends(c_extendgrid, _super);
        function c_extendgrid() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.count = 0; //扩展的格子数量
            _this.S = proto.MessageType.c_extendgrid;
            return _this;
        }
        c_extendgrid.prototype.init = function (_count) {
            this.count = _count;
            return this;
        };
        c_extendgrid.prototype.encode = function (by) {
            by.writeByte(this.count);
        };
        c_extendgrid.prototype.decode = function (by) {
            this.count = by.readUnsignedByte();
        };
        return c_extendgrid;
    }(proto.Pro));
    proto.c_extendgrid = c_extendgrid;
    __reflect(c_extendgrid.prototype, "proto.c_extendgrid");
    var c_group_apply = (function (_super) {
        __extends(c_group_apply, _super);
        function c_group_apply() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_group_apply;
            return _this;
        }
        c_group_apply.prototype.init = function (_tar) {
            this.tar = _tar;
            return this;
        };
        c_group_apply.prototype.encode = function (by) {
            by.writeUTF(this.tar);
        };
        c_group_apply.prototype.decode = function (by) {
            this.tar = by.readUTF();
        };
        return c_group_apply;
    }(proto.Pro));
    proto.c_group_apply = c_group_apply;
    __reflect(c_group_apply.prototype, "proto.c_group_apply");
    var c_group_leave = (function (_super) {
        __extends(c_group_leave, _super);
        function c_group_leave() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_group_leave;
            return _this;
        }
        c_group_leave.prototype.init = function () {
            return this;
        };
        c_group_leave.prototype.encode = function (by) {
        };
        c_group_leave.prototype.decode = function (by) {
        };
        return c_group_leave;
    }(proto.Pro));
    proto.c_group_leave = c_group_leave;
    __reflect(c_group_leave.prototype, "proto.c_group_leave");
    var s_GroupInfo = (function (_super) {
        __extends(s_GroupInfo, _super);
        function s_GroupInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //成员ID
            //required>byte
            _this.sex = 0; //成员性别
            //required>byte
            _this.vip = 0; //是不是vip
            //required>byte
            _this.head = 0; //成员头像
            //required>byte
            _this.lev = 0; //成员等级
            //required>byte
            _this.job = 0; //成员职业
            //required>byte
            _this.isLeader = 0; //是否是队长
            //required>byte
            _this.playstatus = 0; //游戏状态
            //required>int
            _this.mapid = 0; //地图ID
            //required>int
            _this.MHP = 0; //undefined
            //required>int
            _this.HP = 0; //undefined
            //required>int
            _this.MMP = 0; //undefined
            //required>int
            _this.MP = 0; //undefined
            _this.S = proto.MessageType.s_GroupInfo;
            return _this;
        }
        s_GroupInfo.prototype.init = function (_uid, _name, _sex, _vip, _head, _lev, _job, _isLeader, _playstatus, _mapid, _MHP, _HP, _MMP, _MP) {
            this.uid = _uid;
            this.name = _name;
            this.sex = _sex;
            this.vip = _vip;
            this.head = _head;
            this.lev = _lev;
            this.job = _job;
            this.isLeader = _isLeader;
            this.playstatus = _playstatus;
            this.mapid = _mapid;
            this.MHP = _MHP;
            this.HP = _HP;
            this.MMP = _MMP;
            this.MP = _MP;
            return this;
        };
        s_GroupInfo.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeUTF(this.name);
            by.writeByte(this.sex);
            by.writeByte(this.vip);
            by.writeByte(this.head);
            by.writeByte(this.lev);
            by.writeByte(this.job);
            by.writeByte(this.isLeader);
            by.writeByte(this.playstatus);
            by.writeInt(this.mapid);
            by.writeInt(this.MHP);
            by.writeInt(this.HP);
            by.writeInt(this.MMP);
            by.writeInt(this.MP);
        };
        s_GroupInfo.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.name = by.readUTF();
            this.sex = by.readUnsignedByte();
            this.vip = by.readUnsignedByte();
            this.head = by.readUnsignedByte();
            this.lev = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
            this.isLeader = by.readUnsignedByte();
            this.playstatus = by.readUnsignedByte();
            this.mapid = by.readInt();
            this.MHP = by.readInt();
            this.HP = by.readInt();
            this.MMP = by.readInt();
            this.MP = by.readInt();
        };
        return s_GroupInfo;
    }(proto.Pro));
    proto.s_GroupInfo = s_GroupInfo;
    __reflect(s_GroupInfo.prototype, "proto.s_GroupInfo");
    var s_Group_addMember = (function (_super) {
        __extends(s_Group_addMember, _super);
        function s_Group_addMember() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Group_addMember;
            return _this;
        }
        s_Group_addMember.prototype.init = function (_info) {
            this.info = _info;
            return this;
        };
        s_Group_addMember.prototype.encode = function (by) {
            this.info.encode(by);
        };
        s_Group_addMember.prototype.decode = function (by) {
            this.info = new s_GroupInfo();
            this.info.decode(by);
        };
        return s_Group_addMember;
    }(proto.Pro));
    proto.s_Group_addMember = s_Group_addMember;
    __reflect(s_Group_addMember.prototype, "proto.s_Group_addMember");
    var s_Group_removeMember = (function (_super) {
        __extends(s_Group_removeMember, _super);
        function s_Group_removeMember() {
            var _this = _super.call(this) || this;
            //required>int
            _this.guid = 0; //成员ID
            _this.S = proto.MessageType.s_Group_removeMember;
            return _this;
        }
        s_Group_removeMember.prototype.init = function (_guid) {
            this.guid = _guid;
            return this;
        };
        s_Group_removeMember.prototype.encode = function (by) {
            by.writeInt(this.guid);
        };
        s_Group_removeMember.prototype.decode = function (by) {
            this.guid = by.readInt();
        };
        return s_Group_removeMember;
    }(proto.Pro));
    proto.s_Group_removeMember = s_Group_removeMember;
    __reflect(s_Group_removeMember.prototype, "proto.s_Group_removeMember");
    var s_Group_Disband = (function (_super) {
        __extends(s_Group_Disband, _super);
        function s_Group_Disband() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Group_Disband;
            return _this;
        }
        s_Group_Disband.prototype.init = function () {
            return this;
        };
        s_Group_Disband.prototype.encode = function (by) {
        };
        s_Group_Disband.prototype.decode = function (by) {
        };
        return s_Group_Disband;
    }(proto.Pro));
    proto.s_Group_Disband = s_Group_Disband;
    __reflect(s_Group_Disband.prototype, "proto.s_Group_Disband");
    var s_GroupUpdateLeader = (function (_super) {
        __extends(s_GroupUpdateLeader, _super);
        function s_GroupUpdateLeader() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //成员ID
            _this.S = proto.MessageType.s_GroupUpdateLeader;
            return _this;
        }
        s_GroupUpdateLeader.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        s_GroupUpdateLeader.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        s_GroupUpdateLeader.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return s_GroupUpdateLeader;
    }(proto.Pro));
    proto.s_GroupUpdateLeader = s_GroupUpdateLeader;
    __reflect(s_GroupUpdateLeader.prototype, "proto.s_GroupUpdateLeader");
    var s_groupInvite = (function (_super) {
        __extends(s_groupInvite, _super);
        function s_groupInvite() {
            var _this = _super.call(this) || this;
            //required>int
            _this.requestid = 0; //请求的ID
            _this.S = proto.MessageType.s_groupInvite;
            return _this;
        }
        s_groupInvite.prototype.init = function (_requestid, _name) {
            this.requestid = _requestid;
            this.name = _name;
            return this;
        };
        s_groupInvite.prototype.encode = function (by) {
            by.writeInt(this.requestid);
            by.writeUTF(this.name);
        };
        s_groupInvite.prototype.decode = function (by) {
            this.requestid = by.readInt();
            this.name = by.readUTF();
        };
        return s_groupInvite;
    }(proto.Pro));
    proto.s_groupInvite = s_groupInvite;
    __reflect(s_groupInvite.prototype, "proto.s_groupInvite");
    var c_group_accept = (function (_super) {
        __extends(c_group_accept, _super);
        function c_group_accept() {
            var _this = _super.call(this) || this;
            //required>int
            _this.requestid = 0; //请求的ID
            _this.S = proto.MessageType.c_group_accept;
            return _this;
        }
        c_group_accept.prototype.init = function (_requestid) {
            this.requestid = _requestid;
            return this;
        };
        c_group_accept.prototype.encode = function (by) {
            by.writeInt(this.requestid);
        };
        c_group_accept.prototype.decode = function (by) {
            this.requestid = by.readInt();
        };
        return c_group_accept;
    }(proto.Pro));
    proto.c_group_accept = c_group_accept;
    __reflect(c_group_accept.prototype, "proto.c_group_accept");
    var c_group_refuse = (function (_super) {
        __extends(c_group_refuse, _super);
        function c_group_refuse() {
            var _this = _super.call(this) || this;
            //required>int
            _this.requestid = 0; //请求的ID
            _this.S = proto.MessageType.c_group_refuse;
            return _this;
        }
        c_group_refuse.prototype.init = function (_requestid) {
            this.requestid = _requestid;
            return this;
        };
        c_group_refuse.prototype.encode = function (by) {
            by.writeInt(this.requestid);
        };
        c_group_refuse.prototype.decode = function (by) {
            this.requestid = by.readInt();
        };
        return c_group_refuse;
    }(proto.Pro));
    proto.c_group_refuse = c_group_refuse;
    __reflect(c_group_refuse.prototype, "proto.c_group_refuse");
    var s_group_leave = (function (_super) {
        __extends(s_group_leave, _super);
        function s_group_leave() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //退出的成员ID
            _this.S = proto.MessageType.s_group_leave;
            return _this;
        }
        s_group_leave.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        s_group_leave.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        s_group_leave.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return s_group_leave;
    }(proto.Pro));
    proto.s_group_leave = s_group_leave;
    __reflect(s_group_leave.prototype, "proto.s_group_leave");
    var c_group_appoint = (function (_super) {
        __extends(c_group_appoint, _super);
        function c_group_appoint() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //成员ID
            _this.S = proto.MessageType.c_group_appoint;
            return _this;
        }
        c_group_appoint.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        c_group_appoint.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        c_group_appoint.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return c_group_appoint;
    }(proto.Pro));
    proto.c_group_appoint = c_group_appoint;
    __reflect(c_group_appoint.prototype, "proto.c_group_appoint");
    var c_group_kick = (function (_super) {
        __extends(c_group_kick, _super);
        function c_group_kick() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //成员ID
            _this.S = proto.MessageType.c_group_kick;
            return _this;
        }
        c_group_kick.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        c_group_kick.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        c_group_kick.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return c_group_kick;
    }(proto.Pro));
    proto.c_group_kick = c_group_kick;
    __reflect(c_group_kick.prototype, "proto.c_group_kick");
    var s_Task_triger = (function (_super) {
        __extends(s_Task_triger, _super);
        function s_Task_triger() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Task_triger;
            return _this;
        }
        s_Task_triger.prototype.init = function (_taskid) {
            this.taskid = _taskid;
            return this;
        };
        s_Task_triger.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
        };
        s_Task_triger.prototype.decode = function (by) {
            this.taskid = by.readUTF();
        };
        return s_Task_triger;
    }(proto.Pro));
    proto.s_Task_triger = s_Task_triger;
    __reflect(s_Task_triger.prototype, "proto.s_Task_triger");
    var s_TaskInfo = (function (_super) {
        __extends(s_TaskInfo, _super);
        function s_TaskInfo() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.state = 0; //任务的状态
            //required>int
            _this.leftsecond = 0; //任务剩余时间，以秒计数，只针对有时间限制的任务
            _this.S = proto.MessageType.s_TaskInfo;
            return _this;
        }
        s_TaskInfo.prototype.init = function (_taskid, _state, _currentcount, _leftsecond) {
            this.taskid = _taskid;
            this.state = _state;
            this.currentcount = _currentcount;
            this.leftsecond = _leftsecond;
            return this;
        };
        s_TaskInfo.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
            by.writeByte(this.state);
            if (this.currentcount != null) {
                by.writeShort(this.currentcount.length);
                for (var i = 0; i < this.currentcount.length; i++) {
                    by.writeInt(this.currentcount[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeInt(this.leftsecond);
        };
        s_TaskInfo.prototype.decode = function (by) {
            this.taskid = by.readUTF();
            this.state = by.readUnsignedByte();
            var __count2 = by.readShort();
            this.currentcount = [];
            for (var i = 0; i < __count2; i++) {
                this.currentcount[i] = by.readInt();
            }
            this.leftsecond = by.readInt();
        };
        return s_TaskInfo;
    }(proto.Pro));
    proto.s_TaskInfo = s_TaskInfo;
    __reflect(s_TaskInfo.prototype, "proto.s_TaskInfo");
    var s_TaskActive = (function (_super) {
        __extends(s_TaskActive, _super);
        function s_TaskActive() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TaskActive;
            return _this;
        }
        s_TaskActive.prototype.init = function (_taskids) {
            this.taskids = _taskids;
            return this;
        };
        s_TaskActive.prototype.encode = function (by) {
            if (this.taskids != null) {
                by.writeShort(this.taskids.length);
                for (var i = 0; i < this.taskids.length; i++) {
                    by.writeUTF(this.taskids[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_TaskActive.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.taskids = [];
            for (var i = 0; i < __count0; i++) {
                this.taskids[i] = by.readUTF();
            }
        };
        return s_TaskActive;
    }(proto.Pro));
    proto.s_TaskActive = s_TaskActive;
    __reflect(s_TaskActive.prototype, "proto.s_TaskActive");
    var s_TaskInActive = (function (_super) {
        __extends(s_TaskInActive, _super);
        function s_TaskInActive() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TaskInActive;
            return _this;
        }
        s_TaskInActive.prototype.init = function (_taskids) {
            this.taskids = _taskids;
            return this;
        };
        s_TaskInActive.prototype.encode = function (by) {
            if (this.taskids != null) {
                by.writeShort(this.taskids.length);
                for (var i = 0; i < this.taskids.length; i++) {
                    by.writeUTF(this.taskids[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_TaskInActive.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.taskids = [];
            for (var i = 0; i < __count0; i++) {
                this.taskids[i] = by.readUTF();
            }
        };
        return s_TaskInActive;
    }(proto.Pro));
    proto.s_TaskInActive = s_TaskInActive;
    __reflect(s_TaskInActive.prototype, "proto.s_TaskInActive");
    var s_TaskRemove = (function (_super) {
        __extends(s_TaskRemove, _super);
        function s_TaskRemove() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TaskRemove;
            return _this;
        }
        s_TaskRemove.prototype.init = function (_taskid) {
            this.taskid = _taskid;
            return this;
        };
        s_TaskRemove.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
        };
        s_TaskRemove.prototype.decode = function (by) {
            this.taskid = by.readUTF();
        };
        return s_TaskRemove;
    }(proto.Pro));
    proto.s_TaskRemove = s_TaskRemove;
    __reflect(s_TaskRemove.prototype, "proto.s_TaskRemove");
    var c_Task_accept = (function (_super) {
        __extends(c_Task_accept, _super);
        function c_Task_accept() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_Task_accept;
            return _this;
        }
        c_Task_accept.prototype.init = function (_taskid) {
            this.taskid = _taskid;
            return this;
        };
        c_Task_accept.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
        };
        c_Task_accept.prototype.decode = function (by) {
            this.taskid = by.readUTF();
        };
        return c_Task_accept;
    }(proto.Pro));
    proto.c_Task_accept = c_Task_accept;
    __reflect(c_Task_accept.prototype, "proto.c_Task_accept");
    var c_Task_giveup = (function (_super) {
        __extends(c_Task_giveup, _super);
        function c_Task_giveup() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_Task_giveup;
            return _this;
        }
        c_Task_giveup.prototype.init = function (_taskid) {
            this.taskid = _taskid;
            return this;
        };
        c_Task_giveup.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
        };
        c_Task_giveup.prototype.decode = function (by) {
            this.taskid = by.readUTF();
        };
        return c_Task_giveup;
    }(proto.Pro));
    proto.c_Task_giveup = c_Task_giveup;
    __reflect(c_Task_giveup.prototype, "proto.c_Task_giveup");
    var c_Task_getBonus = (function (_super) {
        __extends(c_Task_getBonus, _super);
        function c_Task_getBonus() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_Task_getBonus;
            return _this;
        }
        c_Task_getBonus.prototype.init = function (_taskid) {
            this.taskid = _taskid;
            return this;
        };
        c_Task_getBonus.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
        };
        c_Task_getBonus.prototype.decode = function (by) {
            this.taskid = by.readUTF();
        };
        return c_Task_getBonus;
    }(proto.Pro));
    proto.c_Task_getBonus = c_Task_getBonus;
    __reflect(c_Task_getBonus.prototype, "proto.c_Task_getBonus");
    var s_Task_dayInfo = (function (_super) {
        __extends(s_Task_dayInfo, _super);
        function s_Task_dayInfo() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.daytasktimes = 0; //每日任务完成次数
            //required>byte
            _this.daytaskStar = 0; //任务星级
            //required>byte
            _this.totaltimes = 0; //每日任务最大次shu
            //required>byte
            _this.finishtimes = 0; //每日任务完成次数
            _this.S = proto.MessageType.s_Task_dayInfo;
            return _this;
        }
        s_Task_dayInfo.prototype.init = function (_taskid, _daytasktimes, _daytaskStar, _totaltimes, _finishtimes) {
            this.taskid = _taskid;
            this.daytasktimes = _daytasktimes;
            this.daytaskStar = _daytaskStar;
            this.totaltimes = _totaltimes;
            this.finishtimes = _finishtimes;
            return this;
        };
        s_Task_dayInfo.prototype.encode = function (by) {
            by.writeUTF(this.taskid);
            by.writeByte(this.daytasktimes);
            by.writeByte(this.daytaskStar);
            by.writeByte(this.totaltimes);
            by.writeByte(this.finishtimes);
        };
        s_Task_dayInfo.prototype.decode = function (by) {
            this.taskid = by.readUTF();
            this.daytasktimes = by.readUnsignedByte();
            this.daytaskStar = by.readUnsignedByte();
            this.totaltimes = by.readUnsignedByte();
            this.finishtimes = by.readUnsignedByte();
        };
        return s_Task_dayInfo;
    }(proto.Pro));
    proto.s_Task_dayInfo = s_Task_dayInfo;
    __reflect(s_Task_dayInfo.prototype, "proto.s_Task_dayInfo");
    var c_Task_DayUp = (function (_super) {
        __extends(c_Task_DayUp, _super);
        function c_Task_DayUp() {
            var _this = _super.call(this) || this;
            //required>int
            _this.type = 0; //0，表示任务，1
            _this.S = proto.MessageType.c_Task_DayUp;
            return _this;
        }
        c_Task_DayUp.prototype.init = function (_type) {
            this.type = _type;
            return this;
        };
        c_Task_DayUp.prototype.encode = function (by) {
            by.writeInt(this.type);
        };
        c_Task_DayUp.prototype.decode = function (by) {
            this.type = by.readInt();
        };
        return c_Task_DayUp;
    }(proto.Pro));
    proto.c_Task_DayUp = c_Task_DayUp;
    __reflect(c_Task_DayUp.prototype, "proto.c_Task_DayUp");
    var s_CharInfo = (function (_super) {
        __extends(s_CharInfo, _super);
        function s_CharInfo() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //流水号
            _this.S = proto.MessageType.s_CharInfo;
            return _this;
        }
        s_CharInfo.prototype.init = function (_name, _uid) {
            this.name = _name;
            this.uid = _uid;
            return this;
        };
        s_CharInfo.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeInt(this.uid);
        };
        s_CharInfo.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.uid = by.readInt();
        };
        return s_CharInfo;
    }(proto.Pro));
    proto.s_CharInfo = s_CharInfo;
    __reflect(s_CharInfo.prototype, "proto.s_CharInfo");
    var s_Player_EndInit = (function (_super) {
        __extends(s_Player_EndInit, _super);
        function s_Player_EndInit() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Player_EndInit;
            return _this;
        }
        s_Player_EndInit.prototype.init = function () {
            return this;
        };
        s_Player_EndInit.prototype.encode = function (by) {
        };
        s_Player_EndInit.prototype.decode = function (by) {
        };
        return s_Player_EndInit;
    }(proto.Pro));
    proto.s_Player_EndInit = s_Player_EndInit;
    __reflect(s_Player_EndInit.prototype, "proto.s_Player_EndInit");
    var s_CharInfoList = (function (_super) {
        __extends(s_CharInfoList, _super);
        function s_CharInfoList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_CharInfoList;
            return _this;
        }
        s_CharInfoList.prototype.init = function (_charlist) {
            this.charlist = _charlist;
            return this;
        };
        s_CharInfoList.prototype.encode = function (by) {
            by.writeUTF(this.charlist);
        };
        s_CharInfoList.prototype.decode = function (by) {
            this.charlist = by.readUTF();
        };
        return s_CharInfoList;
    }(proto.Pro));
    proto.s_CharInfoList = s_CharInfoList;
    __reflect(s_CharInfoList.prototype, "proto.s_CharInfoList");
    var c_enterGame = (function (_super) {
        __extends(c_enterGame, _super);
        function c_enterGame() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_enterGame;
            return _this;
        }
        c_enterGame.prototype.init = function (_name) {
            this.name = _name;
            return this;
        };
        c_enterGame.prototype.encode = function (by) {
            by.writeUTF(this.name);
        };
        c_enterGame.prototype.decode = function (by) {
            this.name = by.readUTF();
        };
        return c_enterGame;
    }(proto.Pro));
    proto.c_enterGame = c_enterGame;
    __reflect(c_enterGame.prototype, "proto.c_enterGame");
    var s_UIshow = (function (_super) {
        __extends(s_UIshow, _super);
        function s_UIshow() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_UIshow;
            return _this;
        }
        s_UIshow.prototype.init = function (_uiID) {
            this.uiID = _uiID;
            return this;
        };
        s_UIshow.prototype.encode = function (by) {
            by.writeUTF(this.uiID);
        };
        s_UIshow.prototype.decode = function (by) {
            this.uiID = by.readUTF();
        };
        return s_UIshow;
    }(proto.Pro));
    proto.s_UIshow = s_UIshow;
    __reflect(s_UIshow.prototype, "proto.s_UIshow");
    var s_UIhide = (function (_super) {
        __extends(s_UIhide, _super);
        function s_UIhide() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_UIhide;
            return _this;
        }
        s_UIhide.prototype.init = function (_uiID) {
            this.uiID = _uiID;
            return this;
        };
        s_UIhide.prototype.encode = function (by) {
            by.writeUTF(this.uiID);
        };
        s_UIhide.prototype.decode = function (by) {
            this.uiID = by.readUTF();
        };
        return s_UIhide;
    }(proto.Pro));
    proto.s_UIhide = s_UIhide;
    __reflect(s_UIhide.prototype, "proto.s_UIhide");
    var c_UIClick = (function (_super) {
        __extends(c_UIClick, _super);
        function c_UIClick() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_UIClick;
            return _this;
        }
        c_UIClick.prototype.init = function (_uiID, _buttonID) {
            this.uiID = _uiID;
            this.buttonID = _buttonID;
            return this;
        };
        c_UIClick.prototype.encode = function (by) {
            by.writeUTF(this.uiID);
            by.writeUTF(this.buttonID);
        };
        c_UIClick.prototype.decode = function (by) {
            this.uiID = by.readUTF();
            this.buttonID = by.readUTF();
        };
        return c_UIClick;
    }(proto.Pro));
    proto.c_UIClick = c_UIClick;
    __reflect(c_UIClick.prototype, "proto.c_UIClick");
    var s_TimerAdd = (function (_super) {
        __extends(s_TimerAdd, _super);
        function s_TimerAdd() {
            var _this = _super.call(this) || this;
            //required>int
            _this.second = 0; //秒数
            _this.S = proto.MessageType.s_TimerAdd;
            return _this;
        }
        s_TimerAdd.prototype.init = function (_TimerTiltle, _second) {
            this.TimerTiltle = _TimerTiltle;
            this.second = _second;
            return this;
        };
        s_TimerAdd.prototype.encode = function (by) {
            by.writeUTF(this.TimerTiltle);
            by.writeInt(this.second);
        };
        s_TimerAdd.prototype.decode = function (by) {
            this.TimerTiltle = by.readUTF();
            this.second = by.readInt();
        };
        return s_TimerAdd;
    }(proto.Pro));
    proto.s_TimerAdd = s_TimerAdd;
    __reflect(s_TimerAdd.prototype, "proto.s_TimerAdd");
    var s_TimerRemove = (function (_super) {
        __extends(s_TimerRemove, _super);
        function s_TimerRemove() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TimerRemove;
            return _this;
        }
        s_TimerRemove.prototype.init = function () {
            return this;
        };
        s_TimerRemove.prototype.encode = function (by) {
        };
        s_TimerRemove.prototype.decode = function (by) {
        };
        return s_TimerRemove;
    }(proto.Pro));
    proto.s_TimerRemove = s_TimerRemove;
    __reflect(s_TimerRemove.prototype, "proto.s_TimerRemove");
    var c_addPoint = (function (_super) {
        __extends(c_addPoint, _super);
        function c_addPoint() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.attrid = 0; //要加的属性ID，可查看PAttr枚举
            _this.S = proto.MessageType.c_addPoint;
            return _this;
        }
        c_addPoint.prototype.init = function (_attrid) {
            this.attrid = _attrid;
            return this;
        };
        c_addPoint.prototype.encode = function (by) {
            by.writeByte(this.attrid);
        };
        c_addPoint.prototype.decode = function (by) {
            this.attrid = by.readUnsignedByte();
        };
        return c_addPoint;
    }(proto.Pro));
    proto.c_addPoint = c_addPoint;
    __reflect(c_addPoint.prototype, "proto.c_addPoint");
    var s_Buff_add = (function (_super) {
        __extends(s_Buff_add, _super);
        function s_Buff_add() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //目标单位的ID
            _this.S = proto.MessageType.s_Buff_add;
            return _this;
        }
        s_Buff_add.prototype.init = function (_uid, _bufid) {
            this.uid = _uid;
            this.bufid = _bufid;
            return this;
        };
        s_Buff_add.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeUTF(this.bufid);
        };
        s_Buff_add.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.bufid = by.readUTF();
        };
        return s_Buff_add;
    }(proto.Pro));
    proto.s_Buff_add = s_Buff_add;
    __reflect(s_Buff_add.prototype, "proto.s_Buff_add");
    var s_Buff_remove = (function (_super) {
        __extends(s_Buff_remove, _super);
        function s_Buff_remove() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //目标单位的ID
            _this.S = proto.MessageType.s_Buff_remove;
            return _this;
        }
        s_Buff_remove.prototype.init = function (_uid, _bufid) {
            this.uid = _uid;
            this.bufid = _bufid;
            return this;
        };
        s_Buff_remove.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeUTF(this.bufid);
        };
        s_Buff_remove.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.bufid = by.readUTF();
        };
        return s_Buff_remove;
    }(proto.Pro));
    proto.s_Buff_remove = s_Buff_remove;
    __reflect(s_Buff_remove.prototype, "proto.s_Buff_remove");
    var s_Buff_clear = (function (_super) {
        __extends(s_Buff_clear, _super);
        function s_Buff_clear() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //目标单位的ID
            _this.S = proto.MessageType.s_Buff_clear;
            return _this;
        }
        s_Buff_clear.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        s_Buff_clear.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        s_Buff_clear.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return s_Buff_clear;
    }(proto.Pro));
    proto.s_Buff_clear = s_Buff_clear;
    __reflect(s_Buff_clear.prototype, "proto.s_Buff_clear");
    var c_mix = (function (_super) {
        __extends(c_mix, _super);
        function c_mix() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_mix;
            return _this;
        }
        c_mix.prototype.init = function (_mixid) {
            this.mixid = _mixid;
            return this;
        };
        c_mix.prototype.encode = function (by) {
            by.writeUTF(this.mixid);
        };
        c_mix.prototype.decode = function (by) {
            this.mixid = by.readUTF();
        };
        return c_mix;
    }(proto.Pro));
    proto.c_mix = c_mix;
    __reflect(c_mix.prototype, "proto.c_mix");
    var s_mix = (function (_super) {
        __extends(s_mix, _super);
        function s_mix() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.state = 0; //1表示成功，0表示失败
            _this.S = proto.MessageType.s_mix;
            return _this;
        }
        s_mix.prototype.init = function (_state, _mixid) {
            this.state = _state;
            this.mixid = _mixid;
            return this;
        };
        s_mix.prototype.encode = function (by) {
            by.writeByte(this.state);
            by.writeUTF(this.mixid);
        };
        s_mix.prototype.decode = function (by) {
            this.state = by.readUnsignedByte();
            this.mixid = by.readUTF();
        };
        return s_mix;
    }(proto.Pro));
    proto.s_mix = s_mix;
    __reflect(s_mix.prototype, "proto.s_mix");
    var c_market_up = (function (_super) {
        __extends(c_market_up, _super);
        function c_market_up() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //在背包的所在格子
            //required>byte
            _this.count = 0; //出售数量
            //required>byte
            _this.days = 0; //上架的天数
            //required>int
            _this.price = 0; //物品出售定价
            _this.S = proto.MessageType.c_market_up;
            return _this;
        }
        c_market_up.prototype.init = function (_pos, _guid, _count, _days, _price) {
            this.pos = _pos;
            this.guid = _guid;
            this.count = _count;
            this.days = _days;
            this.price = _price;
            return this;
        };
        c_market_up.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.guid);
            by.writeByte(this.count);
            by.writeByte(this.days);
            by.writeInt(this.price);
        };
        c_market_up.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.guid = by.readUTF();
            this.count = by.readUnsignedByte();
            this.days = by.readUnsignedByte();
            this.price = by.readInt();
        };
        return c_market_up;
    }(proto.Pro));
    proto.c_market_up = c_market_up;
    __reflect(c_market_up.prototype, "proto.c_market_up");
    var c_market_down = (function (_super) {
        __extends(c_market_down, _super);
        function c_market_down() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_market_down;
            return _this;
        }
        c_market_down.prototype.init = function (_marketid) {
            this.marketid = _marketid;
            return this;
        };
        c_market_down.prototype.encode = function (by) {
            by.writeUTF(this.marketid);
        };
        c_market_down.prototype.decode = function (by) {
            this.marketid = by.readUTF();
        };
        return c_market_down;
    }(proto.Pro));
    proto.c_market_down = c_market_down;
    __reflect(c_market_down.prototype, "proto.c_market_down");
    var c_market_buy = (function (_super) {
        __extends(c_market_buy, _super);
        function c_market_buy() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_market_buy;
            return _this;
        }
        c_market_buy.prototype.init = function (_marketid) {
            this.marketid = _marketid;
            return this;
        };
        c_market_buy.prototype.encode = function (by) {
            by.writeUTF(this.marketid);
        };
        c_market_buy.prototype.decode = function (by) {
            this.marketid = by.readUTF();
        };
        return c_market_buy;
    }(proto.Pro));
    proto.c_market_buy = c_market_buy;
    __reflect(c_market_buy.prototype, "proto.c_market_buy");
    var s_market_up = (function (_super) {
        __extends(s_market_up, _super);
        function s_market_up() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_market_up;
            return _this;
        }
        s_market_up.prototype.init = function () {
            return this;
        };
        s_market_up.prototype.encode = function (by) {
        };
        s_market_up.prototype.decode = function (by) {
        };
        return s_market_up;
    }(proto.Pro));
    proto.s_market_up = s_market_up;
    __reflect(s_market_up.prototype, "proto.s_market_up");
    var s_market_down = (function (_super) {
        __extends(s_market_down, _super);
        function s_market_down() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_market_down;
            return _this;
        }
        s_market_down.prototype.init = function (_marketid) {
            this.marketid = _marketid;
            return this;
        };
        s_market_down.prototype.encode = function (by) {
            by.writeUTF(this.marketid);
        };
        s_market_down.prototype.decode = function (by) {
            this.marketid = by.readUTF();
        };
        return s_market_down;
    }(proto.Pro));
    proto.s_market_down = s_market_down;
    __reflect(s_market_down.prototype, "proto.s_market_down");
    var s_market_buy = (function (_super) {
        __extends(s_market_buy, _super);
        function s_market_buy() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_market_buy;
            return _this;
        }
        s_market_buy.prototype.init = function (_marketid) {
            this.marketid = _marketid;
            return this;
        };
        s_market_buy.prototype.encode = function (by) {
            by.writeUTF(this.marketid);
        };
        s_market_buy.prototype.decode = function (by) {
            this.marketid = by.readUTF();
        };
        return s_market_buy;
    }(proto.Pro));
    proto.s_market_buy = s_market_buy;
    __reflect(s_market_buy.prototype, "proto.s_market_buy");
    var c_market_search = (function (_super) {
        __extends(c_market_search, _super);
        function c_market_search() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //物品类型
            //required>byte
            _this.job = 0; //职业
            //required>byte
            _this.minlev = 0; //最小等级
            //required>byte
            _this.maxlev = 0; //最高等级
            //required>byte
            _this.quality = 0; //pingzhi
            //required>byte
            _this.minrank = 0; //最小强化等级
            //required>byte
            _this.maxrank = 0; //最高强化等级
            //required>byte
            _this.equippos = 0; //部位
            //required>byte
            _this.page = 0; //第几页
            //required>byte
            _this.searchOption = 0; //0按等级低，1，按等级高，2，按价格低，3价格高
            _this.S = proto.MessageType.c_market_search;
            return _this;
        }
        c_market_search.prototype.init = function (_type, _job, _minlev, _maxlev, _quality, _minrank, _maxrank, _equippos, _page, _searchOption, _itemname, _salechar) {
            this.type = _type;
            this.job = _job;
            this.minlev = _minlev;
            this.maxlev = _maxlev;
            this.quality = _quality;
            this.minrank = _minrank;
            this.maxrank = _maxrank;
            this.equippos = _equippos;
            this.page = _page;
            this.searchOption = _searchOption;
            this.itemname = _itemname;
            this.salechar = _salechar;
            return this;
        };
        c_market_search.prototype.encode = function (by) {
            by.writeByte(this.type);
            by.writeByte(this.job);
            by.writeByte(this.minlev);
            by.writeByte(this.maxlev);
            by.writeByte(this.quality);
            by.writeByte(this.minrank);
            by.writeByte(this.maxrank);
            by.writeByte(this.equippos);
            by.writeByte(this.page);
            by.writeByte(this.searchOption);
            if (this.itemname != null) {
                by.writeByte(1);
                by.writeUTF(this.itemname);
            }
            else {
                by.writeByte(0);
            }
            if (this.salechar != null) {
                by.writeByte(1);
                by.writeUTF(this.salechar);
            }
            else {
                by.writeByte(0);
            }
        };
        c_market_search.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
            this.minlev = by.readUnsignedByte();
            this.maxlev = by.readUnsignedByte();
            this.quality = by.readUnsignedByte();
            this.minrank = by.readUnsignedByte();
            this.maxrank = by.readUnsignedByte();
            this.equippos = by.readUnsignedByte();
            this.page = by.readUnsignedByte();
            this.searchOption = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.itemname = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.salechar = by.readUTF();
            }
        };
        return c_market_search;
    }(proto.Pro));
    proto.c_market_search = c_market_search;
    __reflect(c_market_search.prototype, "proto.c_market_search");
    var s_market_list = (function (_super) {
        __extends(s_market_list, _super);
        function s_market_list() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //0表示自己
            //required>byte
            _this.count = 0; //记录数量
            //required>byte
            _this.page = 0; //curr记录
            //required>byte
            _this.totalpage = 0; //zong数量
            _this.S = proto.MessageType.s_market_list;
            return _this;
        }
        s_market_list.prototype.init = function (_flag, _count, _page, _totalpage, _marketlist) {
            this.flag = _flag;
            this.count = _count;
            this.page = _page;
            this.totalpage = _totalpage;
            this.marketlist = _marketlist;
            return this;
        };
        s_market_list.prototype.encode = function (by) {
            by.writeByte(this.flag);
            by.writeByte(this.count);
            by.writeByte(this.page);
            by.writeByte(this.totalpage);
            if (this.marketlist != null) {
                by.writeShort(this.marketlist.length);
                for (var i = 0; i < this.marketlist.length; i++) {
                    this.marketlist[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_market_list.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
            this.count = by.readUnsignedByte();
            this.page = by.readUnsignedByte();
            this.totalpage = by.readUnsignedByte();
            var __count4 = by.readShort();
            this.marketlist = [];
            for (var i = 0; i < __count4; i++) {
                this.marketlist[i] = new s_market_item();
                this.marketlist[i].decode(by);
            }
        };
        return s_market_list;
    }(proto.Pro));
    proto.s_market_list = s_market_list;
    __reflect(s_market_list.prototype, "proto.s_market_list");
    var c_market_getmoney = (function (_super) {
        __extends(c_market_getmoney, _super);
        function c_market_getmoney() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_market_getmoney;
            return _this;
        }
        c_market_getmoney.prototype.init = function (_marketid) {
            this.marketid = _marketid;
            return this;
        };
        c_market_getmoney.prototype.encode = function (by) {
            by.writeUTF(this.marketid);
        };
        c_market_getmoney.prototype.decode = function (by) {
            this.marketid = by.readUTF();
        };
        return c_market_getmoney;
    }(proto.Pro));
    proto.c_market_getmoney = c_market_getmoney;
    __reflect(c_market_getmoney.prototype, "proto.c_market_getmoney");
    var c_market_my = (function (_super) {
        __extends(c_market_my, _super);
        function c_market_my() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_market_my;
            return _this;
        }
        c_market_my.prototype.init = function () {
            return this;
        };
        c_market_my.prototype.encode = function (by) {
        };
        c_market_my.prototype.decode = function (by) {
        };
        return c_market_my;
    }(proto.Pro));
    proto.c_market_my = c_market_my;
    __reflect(c_market_my.prototype, "proto.c_market_my");
    var s_market_item = (function (_super) {
        __extends(s_market_item, _super);
        function s_market_item() {
            var _this = _super.call(this) || this;
            //required>int
            _this.price = 0; //价格
            //required>int
            _this.uptime = 0; //上架时间
            //required>byte
            _this.status = 0; //0出售中
            _this.S = proto.MessageType.s_market_item;
            return _this;
        }
        s_market_item.prototype.init = function (_marketid, _saleName, _price, _uptime, _item, _status) {
            this.marketid = _marketid;
            this.saleName = _saleName;
            this.price = _price;
            this.uptime = _uptime;
            this.item = _item;
            this.status = _status;
            return this;
        };
        s_market_item.prototype.encode = function (by) {
            by.writeUTF(this.marketid);
            by.writeUTF(this.saleName);
            by.writeInt(this.price);
            by.writeInt(this.uptime);
            this.item.encode(by);
            by.writeByte(this.status);
        };
        s_market_item.prototype.decode = function (by) {
            this.marketid = by.readUTF();
            this.saleName = by.readUTF();
            this.price = by.readInt();
            this.uptime = by.readInt();
            this.item = new s_ItemInfo();
            this.item.decode(by);
            this.status = by.readUnsignedByte();
        };
        return s_market_item;
    }(proto.Pro));
    proto.s_market_item = s_market_item;
    __reflect(s_market_item.prototype, "proto.s_market_item");
    var c_shop_buy = (function (_super) {
        __extends(c_shop_buy, _super);
        function c_shop_buy() {
            var _this = _super.call(this) || this;
            //required>short
            _this.count = 0; //undefined
            _this.S = proto.MessageType.c_shop_buy;
            return _this;
        }
        c_shop_buy.prototype.init = function (_shopid, _itemid, _count) {
            this.shopid = _shopid;
            this.itemid = _itemid;
            this.count = _count;
            return this;
        };
        c_shop_buy.prototype.encode = function (by) {
            by.writeUTF(this.shopid);
            by.writeUTF(this.itemid);
            by.writeShort(this.count);
        };
        c_shop_buy.prototype.decode = function (by) {
            this.shopid = by.readUTF();
            this.itemid = by.readUTF();
            this.count = by.readShort();
        };
        return c_shop_buy;
    }(proto.Pro));
    proto.c_shop_buy = c_shop_buy;
    __reflect(c_shop_buy.prototype, "proto.c_shop_buy");
    var c_shop_buyAndUse = (function (_super) {
        __extends(c_shop_buyAndUse, _super);
        function c_shop_buyAndUse() {
            var _this = _super.call(this) || this;
            //required>short
            _this.count = 0; //undefined
            _this.S = proto.MessageType.c_shop_buyAndUse;
            return _this;
        }
        c_shop_buyAndUse.prototype.init = function (_shopid, _itemid, _count) {
            this.shopid = _shopid;
            this.itemid = _itemid;
            this.count = _count;
            return this;
        };
        c_shop_buyAndUse.prototype.encode = function (by) {
            by.writeUTF(this.shopid);
            by.writeUTF(this.itemid);
            by.writeShort(this.count);
        };
        c_shop_buyAndUse.prototype.decode = function (by) {
            this.shopid = by.readUTF();
            this.itemid = by.readUTF();
            this.count = by.readShort();
        };
        return c_shop_buyAndUse;
    }(proto.Pro));
    proto.c_shop_buyAndUse = c_shop_buyAndUse;
    __reflect(c_shop_buyAndUse.prototype, "proto.c_shop_buyAndUse");
    var c_Vip_buy = (function (_super) {
        __extends(c_Vip_buy, _super);
        function c_Vip_buy() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.type = 0; //取值1
            _this.S = proto.MessageType.c_Vip_buy;
            return _this;
        }
        c_Vip_buy.prototype.init = function (_type) {
            this.type = _type;
            return this;
        };
        c_Vip_buy.prototype.encode = function (by) {
            by.writeByte(this.type);
        };
        c_Vip_buy.prototype.decode = function (by) {
            this.type = by.readUnsignedByte();
        };
        return c_Vip_buy;
    }(proto.Pro));
    proto.c_Vip_buy = c_Vip_buy;
    __reflect(c_Vip_buy.prototype, "proto.c_Vip_buy");
    var s_Vip_leftime = (function (_super) {
        __extends(s_Vip_leftime, _super);
        function s_Vip_leftime() {
            var _this = _super.call(this) || this;
            //required>int
            _this.lefttime = 0; //剩余秒数
            _this.S = proto.MessageType.s_Vip_leftime;
            return _this;
        }
        s_Vip_leftime.prototype.init = function (_lefttime) {
            this.lefttime = _lefttime;
            return this;
        };
        s_Vip_leftime.prototype.encode = function (by) {
            by.writeInt(this.lefttime);
        };
        s_Vip_leftime.prototype.decode = function (by) {
            this.lefttime = by.readInt();
        };
        return s_Vip_leftime;
    }(proto.Pro));
    proto.s_Vip_leftime = s_Vip_leftime;
    __reflect(s_Vip_leftime.prototype, "proto.s_Vip_leftime");
    var s_Vip_price = (function (_super) {
        __extends(s_Vip_price, _super);
        function s_Vip_price() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_Vip_price;
            return _this;
        }
        s_Vip_price.prototype.init = function (_Price, _curPrice) {
            this.Price = _Price;
            this.curPrice = _curPrice;
            return this;
        };
        s_Vip_price.prototype.encode = function (by) {
            if (this.Price != null) {
                by.writeShort(this.Price.length);
                for (var i = 0; i < this.Price.length; i++) {
                    by.writeShort(this.Price[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            if (this.curPrice != null) {
                by.writeShort(this.curPrice.length);
                for (var i = 0; i < this.curPrice.length; i++) {
                    by.writeShort(this.curPrice[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_Vip_price.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.Price = [];
            for (var i = 0; i < __count0; i++) {
                this.Price[i] = by.readShort();
            }
            var __count1 = by.readShort();
            this.curPrice = [];
            for (var i = 0; i < __count1; i++) {
                this.curPrice[i] = by.readShort();
            }
        };
        return s_Vip_price;
    }(proto.Pro));
    proto.s_Vip_price = s_Vip_price;
    __reflect(s_Vip_price.prototype, "proto.s_Vip_price");
    var s_broadcast = (function (_super) {
        __extends(s_broadcast, _super);
        function s_broadcast() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.pos = 0; //广播位置
            _this.S = proto.MessageType.s_broadcast;
            return _this;
        }
        s_broadcast.prototype.init = function (_pos, _id, _args) {
            this.pos = _pos;
            this.id = _id;
            this.args = _args;
            return this;
        };
        s_broadcast.prototype.encode = function (by) {
            by.writeByte(this.pos);
            by.writeUTF(this.id);
            if (this.args != null) {
                by.writeShort(this.args.length);
                for (var i = 0; i < this.args.length; i++) {
                    by.writeUTF(this.args[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_broadcast.prototype.decode = function (by) {
            this.pos = by.readUnsignedByte();
            this.id = by.readUTF();
            var __count2 = by.readShort();
            this.args = [];
            for (var i = 0; i < __count2; i++) {
                this.args[i] = by.readUTF();
            }
        };
        return s_broadcast;
    }(proto.Pro));
    proto.s_broadcast = s_broadcast;
    __reflect(s_broadcast.prototype, "proto.s_broadcast");
    var c_npc = (function (_super) {
        __extends(c_npc, _super);
        function c_npc() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //npc流水ID
            //required>int
            _this.funcid = 0; //npc功能ID
            _this.S = proto.MessageType.c_npc;
            return _this;
        }
        c_npc.prototype.init = function (_uid, _templeid, _funcid, _args) {
            this.uid = _uid;
            this.templeid = _templeid;
            this.funcid = _funcid;
            this.args = _args;
            return this;
        };
        c_npc.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeUTF(this.templeid);
            by.writeInt(this.funcid);
            by.writeUTF(this.args);
        };
        c_npc.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.templeid = by.readUTF();
            this.funcid = by.readInt();
            this.args = by.readUTF();
        };
        return c_npc;
    }(proto.Pro));
    proto.c_npc = c_npc;
    __reflect(c_npc.prototype, "proto.c_npc");
    var c_npc_transport = (function (_super) {
        __extends(c_npc_transport, _super);
        function c_npc_transport() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_npc_transport;
            return _this;
        }
        c_npc_transport.prototype.init = function (_moveid) {
            this.moveid = _moveid;
            return this;
        };
        c_npc_transport.prototype.encode = function (by) {
            by.writeUTF(this.moveid);
        };
        c_npc_transport.prototype.decode = function (by) {
            this.moveid = by.readUTF();
        };
        return c_npc_transport;
    }(proto.Pro));
    proto.c_npc_transport = c_npc_transport;
    __reflect(c_npc_transport.prototype, "proto.c_npc_transport");
    var s_executeScript = (function (_super) {
        __extends(s_executeScript, _super);
        function s_executeScript() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_executeScript;
            return _this;
        }
        s_executeScript.prototype.init = function (_code) {
            this.code = _code;
            return this;
        };
        s_executeScript.prototype.encode = function (by) {
            by.writeUTF(this.code);
        };
        s_executeScript.prototype.decode = function (by) {
            this.code = by.readUTF();
        };
        return s_executeScript;
    }(proto.Pro));
    proto.s_executeScript = s_executeScript;
    __reflect(s_executeScript.prototype, "proto.s_executeScript");
    var c_mapenter = (function (_super) {
        __extends(c_mapenter, _super);
        function c_mapenter() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_mapenter;
            return _this;
        }
        c_mapenter.prototype.init = function (_mapid) {
            this.mapid = _mapid;
            return this;
        };
        c_mapenter.prototype.encode = function (by) {
            by.writeUTF(this.mapid);
        };
        c_mapenter.prototype.decode = function (by) {
            this.mapid = by.readUTF();
        };
        return c_mapenter;
    }(proto.Pro));
    proto.c_mapenter = c_mapenter;
    __reflect(c_mapenter.prototype, "proto.c_mapenter");
    var c_mapexit = (function (_super) {
        __extends(c_mapexit, _super);
        function c_mapexit() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_mapexit;
            return _this;
        }
        c_mapexit.prototype.init = function () {
            return this;
        };
        c_mapexit.prototype.encode = function (by) {
        };
        c_mapexit.prototype.decode = function (by) {
        };
        return c_mapexit;
    }(proto.Pro));
    proto.c_mapexit = c_mapexit;
    __reflect(c_mapexit.prototype, "proto.c_mapexit");
    var s_mapTimer = (function (_super) {
        __extends(s_mapTimer, _super);
        function s_mapTimer() {
            var _this = _super.call(this) || this;
            //required>short
            _this.second = 0; //秒数
            //required>byte
            _this.monsterCount = 0; //剩余怪数量
            //required>byte
            _this.totalmonster = 0; //当前波怪数量
            //required>byte
            _this.wave = 0; //当前波数
            //required>byte
            _this.totalwave = 0; //总波数
            _this.S = proto.MessageType.s_mapTimer;
            return _this;
        }
        s_mapTimer.prototype.init = function (_second, _monsterCount, _totalmonster, _wave, _totalwave) {
            this.second = _second;
            this.monsterCount = _monsterCount;
            this.totalmonster = _totalmonster;
            this.wave = _wave;
            this.totalwave = _totalwave;
            return this;
        };
        s_mapTimer.prototype.encode = function (by) {
            by.writeShort(this.second);
            by.writeByte(this.monsterCount);
            by.writeByte(this.totalmonster);
            by.writeByte(this.wave);
            by.writeByte(this.totalwave);
        };
        s_mapTimer.prototype.decode = function (by) {
            this.second = by.readShort();
            this.monsterCount = by.readUnsignedByte();
            this.totalmonster = by.readUnsignedByte();
            this.wave = by.readUnsignedByte();
            this.totalwave = by.readUnsignedByte();
        };
        return s_mapTimer;
    }(proto.Pro));
    proto.s_mapTimer = s_mapTimer;
    __reflect(s_mapTimer.prototype, "proto.s_mapTimer");
    var s_map_turn = (function (_super) {
        __extends(s_map_turn, _super);
        function s_map_turn() {
            var _this = _super.call(this) || this;
            //required>int
            _this.turn = 0; //N波
            _this.S = proto.MessageType.s_map_turn;
            return _this;
        }
        s_map_turn.prototype.init = function (_turn) {
            this.turn = _turn;
            return this;
        };
        s_map_turn.prototype.encode = function (by) {
            by.writeInt(this.turn);
        };
        s_map_turn.prototype.decode = function (by) {
            this.turn = by.readInt();
        };
        return s_map_turn;
    }(proto.Pro));
    proto.s_map_turn = s_map_turn;
    __reflect(s_map_turn.prototype, "proto.s_map_turn");
    var s_map_entertimes = (function (_super) {
        __extends(s_map_entertimes, _super);
        function s_map_entertimes() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.entertimes = 0; //次数
            _this.S = proto.MessageType.s_map_entertimes;
            return _this;
        }
        s_map_entertimes.prototype.init = function (_fubenID, _entertimes) {
            this.fubenID = _fubenID;
            this.entertimes = _entertimes;
            return this;
        };
        s_map_entertimes.prototype.encode = function (by) {
            by.writeUTF(this.fubenID);
            by.writeByte(this.entertimes);
        };
        s_map_entertimes.prototype.decode = function (by) {
            this.fubenID = by.readUTF();
            this.entertimes = by.readUnsignedByte();
        };
        return s_map_entertimes;
    }(proto.Pro));
    proto.s_map_entertimes = s_map_entertimes;
    __reflect(s_map_entertimes.prototype, "proto.s_map_entertimes");
    var s_map_pop = (function (_super) {
        __extends(s_map_pop, _super);
        function s_map_pop() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.uiID = 0; //undefined
            //required>int
            _this.showTime = 0; //窗体显示时间
            _this.S = proto.MessageType.s_map_pop;
            return _this;
        }
        s_map_pop.prototype.init = function (_uiID, _title, _content, _showTime, _Btn1, _Btn2) {
            this.uiID = _uiID;
            this.title = _title;
            this.content = _content;
            this.showTime = _showTime;
            this.Btn1 = _Btn1;
            this.Btn2 = _Btn2;
            return this;
        };
        s_map_pop.prototype.encode = function (by) {
            by.writeByte(this.uiID);
            by.writeUTF(this.title);
            by.writeUTF(this.content);
            by.writeInt(this.showTime);
            if (this.Btn1 != null) {
                by.writeByte(1);
                by.writeUTF(this.Btn1);
            }
            else {
                by.writeByte(0);
            }
            if (this.Btn2 != null) {
                by.writeByte(1);
                by.writeUTF(this.Btn2);
            }
            else {
                by.writeByte(0);
            }
        };
        s_map_pop.prototype.decode = function (by) {
            this.uiID = by.readUnsignedByte();
            this.title = by.readUTF();
            this.content = by.readUTF();
            this.showTime = by.readInt();
            if (by.readByte() > 0) {
                this.Btn1 = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.Btn2 = by.readUTF();
            }
        };
        return s_map_pop;
    }(proto.Pro));
    proto.s_map_pop = s_map_pop;
    __reflect(s_map_pop.prototype, "proto.s_map_pop");
    var c_map_ClickBtn = (function (_super) {
        __extends(c_map_ClickBtn, _super);
        function c_map_ClickBtn() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.uiID = 0; //UiID
            _this.S = proto.MessageType.c_map_ClickBtn;
            return _this;
        }
        c_map_ClickBtn.prototype.init = function (_uiID, _BtnID) {
            this.uiID = _uiID;
            this.BtnID = _BtnID;
            return this;
        };
        c_map_ClickBtn.prototype.encode = function (by) {
            by.writeByte(this.uiID);
            by.writeUTF(this.BtnID);
        };
        c_map_ClickBtn.prototype.decode = function (by) {
            this.uiID = by.readUnsignedByte();
            this.BtnID = by.readUTF();
        };
        return c_map_ClickBtn;
    }(proto.Pro));
    proto.c_map_ClickBtn = c_map_ClickBtn;
    __reflect(c_map_ClickBtn.prototype, "proto.c_map_ClickBtn");
    var s_map_lasttime = (function (_super) {
        __extends(s_map_lasttime, _super);
        function s_map_lasttime() {
            var _this = _super.call(this) || this;
            //required>int
            _this.time = 0; //副本剩余时间
            _this.S = proto.MessageType.s_map_lasttime;
            return _this;
        }
        s_map_lasttime.prototype.init = function (_time) {
            this.time = _time;
            return this;
        };
        s_map_lasttime.prototype.encode = function (by) {
            by.writeInt(this.time);
        };
        s_map_lasttime.prototype.decode = function (by) {
            this.time = by.readInt();
        };
        return s_map_lasttime;
    }(proto.Pro));
    proto.s_map_lasttime = s_map_lasttime;
    __reflect(s_map_lasttime.prototype, "proto.s_map_lasttime");
    var s_map_lastmonster = (function (_super) {
        __extends(s_map_lastmonster, _super);
        function s_map_lastmonster() {
            var _this = _super.call(this) || this;
            //required>int
            _this.curr = 0; //当前地图上的怪物数量
            //required>int
            _this.total = 0; //当前地图上所有出现怪物的数量
            _this.S = proto.MessageType.s_map_lastmonster;
            return _this;
        }
        s_map_lastmonster.prototype.init = function (_curr, _total) {
            this.curr = _curr;
            this.total = _total;
            return this;
        };
        s_map_lastmonster.prototype.encode = function (by) {
            by.writeInt(this.curr);
            by.writeInt(this.total);
        };
        s_map_lastmonster.prototype.decode = function (by) {
            this.curr = by.readInt();
            this.total = by.readInt();
        };
        return s_map_lastmonster;
    }(proto.Pro));
    proto.s_map_lastmonster = s_map_lastmonster;
    __reflect(s_map_lastmonster.prototype, "proto.s_map_lastmonster");
    var s_map_lastturn = (function (_super) {
        __extends(s_map_lastturn, _super);
        function s_map_lastturn() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.curr = 0; //已经出现的波数
            //required>byte
            _this.total = 0; //总波数
            _this.S = proto.MessageType.s_map_lastturn;
            return _this;
        }
        s_map_lastturn.prototype.init = function (_curr, _total) {
            this.curr = _curr;
            this.total = _total;
            return this;
        };
        s_map_lastturn.prototype.encode = function (by) {
            by.writeByte(this.curr);
            by.writeByte(this.total);
        };
        s_map_lastturn.prototype.decode = function (by) {
            this.curr = by.readUnsignedByte();
            this.total = by.readUnsignedByte();
        };
        return s_map_lastturn;
    }(proto.Pro));
    proto.s_map_lastturn = s_map_lastturn;
    __reflect(s_map_lastturn.prototype, "proto.s_map_lastturn");
    var c_map_addcount = (function (_super) {
        __extends(c_map_addcount, _super);
        function c_map_addcount() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.count = 0; //增加次数
            _this.S = proto.MessageType.c_map_addcount;
            return _this;
        }
        c_map_addcount.prototype.init = function (_mapid, _count) {
            this.mapid = _mapid;
            this.count = _count;
            return this;
        };
        c_map_addcount.prototype.encode = function (by) {
            by.writeUTF(this.mapid);
            by.writeByte(this.count);
        };
        c_map_addcount.prototype.decode = function (by) {
            this.mapid = by.readUTF();
            this.count = by.readUnsignedByte();
        };
        return c_map_addcount;
    }(proto.Pro));
    proto.c_map_addcount = c_map_addcount;
    __reflect(c_map_addcount.prototype, "proto.c_map_addcount");
    var c_reborn = (function (_super) {
        __extends(c_reborn, _super);
        function c_reborn() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_reborn;
            return _this;
        }
        c_reborn.prototype.init = function () {
            return this;
        };
        c_reborn.prototype.encode = function (by) {
        };
        c_reborn.prototype.decode = function (by) {
        };
        return c_reborn;
    }(proto.Pro));
    proto.c_reborn = c_reborn;
    __reflect(c_reborn.prototype, "proto.c_reborn");
    var s_reborn = (function (_super) {
        __extends(s_reborn, _super);
        function s_reborn() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.state = 0; //羽化结果
            _this.S = proto.MessageType.s_reborn;
            return _this;
        }
        s_reborn.prototype.init = function (_state) {
            this.state = _state;
            return this;
        };
        s_reborn.prototype.encode = function (by) {
            by.writeByte(this.state);
        };
        s_reborn.prototype.decode = function (by) {
            this.state = by.readUnsignedByte();
        };
        return s_reborn;
    }(proto.Pro));
    proto.s_reborn = s_reborn;
    __reflect(s_reborn.prototype, "proto.s_reborn");
    var s_EXPRate_add = (function (_super) {
        __extends(s_EXPRate_add, _super);
        function s_EXPRate_add() {
            var _this = _super.call(this) || this;
            //required>int
            _this.cdtime = 0; //毫秒数
            _this.S = proto.MessageType.s_EXPRate_add;
            return _this;
        }
        s_EXPRate_add.prototype.init = function (_expgroup, _cdtime) {
            this.expgroup = _expgroup;
            this.cdtime = _cdtime;
            return this;
        };
        s_EXPRate_add.prototype.encode = function (by) {
            by.writeUTF(this.expgroup);
            by.writeInt(this.cdtime);
        };
        s_EXPRate_add.prototype.decode = function (by) {
            this.expgroup = by.readUTF();
            this.cdtime = by.readInt();
        };
        return s_EXPRate_add;
    }(proto.Pro));
    proto.s_EXPRate_add = s_EXPRate_add;
    __reflect(s_EXPRate_add.prototype, "proto.s_EXPRate_add");
    var c_heart = (function (_super) {
        __extends(c_heart, _super);
        function c_heart() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_heart;
            return _this;
        }
        c_heart.prototype.init = function () {
            return this;
        };
        c_heart.prototype.encode = function (by) {
        };
        c_heart.prototype.decode = function (by) {
        };
        return c_heart;
    }(proto.Pro));
    proto.c_heart = c_heart;
    __reflect(c_heart.prototype, "proto.c_heart");
    var c_setPKFlag = (function (_super) {
        __extends(c_setPKFlag, _super);
        function c_setPKFlag() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //玩家要设置为的PKFLAG枚举值
            _this.S = proto.MessageType.c_setPKFlag;
            return _this;
        }
        c_setPKFlag.prototype.init = function (_flag) {
            this.flag = _flag;
            return this;
        };
        c_setPKFlag.prototype.encode = function (by) {
            by.writeByte(this.flag);
        };
        c_setPKFlag.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
        };
        return c_setPKFlag;
    }(proto.Pro));
    proto.c_setPKFlag = c_setPKFlag;
    __reflect(c_setPKFlag.prototype, "proto.c_setPKFlag");
    var s_heart = (function (_super) {
        __extends(s_heart, _super);
        function s_heart() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_heart;
            return _this;
        }
        s_heart.prototype.init = function () {
            return this;
        };
        s_heart.prototype.encode = function (by) {
        };
        s_heart.prototype.decode = function (by) {
        };
        return s_heart;
    }(proto.Pro));
    proto.s_heart = s_heart;
    __reflect(s_heart.prototype, "proto.s_heart");
    var s_boss_state = (function (_super) {
        __extends(s_boss_state, _super);
        function s_boss_state() {
            var _this = _super.call(this) || this;
            //required>int
            _this.backtime = 0; //0
            _this.S = proto.MessageType.s_boss_state;
            return _this;
        }
        s_boss_state.prototype.init = function (_bossID, _backtime) {
            this.bossID = _bossID;
            this.backtime = _backtime;
            return this;
        };
        s_boss_state.prototype.encode = function (by) {
            by.writeUTF(this.bossID);
            by.writeInt(this.backtime);
        };
        s_boss_state.prototype.decode = function (by) {
            this.bossID = by.readUTF();
            this.backtime = by.readInt();
        };
        return s_boss_state;
    }(proto.Pro));
    proto.s_boss_state = s_boss_state;
    __reflect(s_boss_state.prototype, "proto.s_boss_state");
    var c_boss_goto = (function (_super) {
        __extends(c_boss_goto, _super);
        function c_boss_goto() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_boss_goto;
            return _this;
        }
        c_boss_goto.prototype.init = function (_bossID) {
            this.bossID = _bossID;
            return this;
        };
        c_boss_goto.prototype.encode = function (by) {
            by.writeUTF(this.bossID);
        };
        c_boss_goto.prototype.decode = function (by) {
            this.bossID = by.readUTF();
        };
        return c_boss_goto;
    }(proto.Pro));
    proto.c_boss_goto = c_boss_goto;
    __reflect(c_boss_goto.prototype, "proto.c_boss_goto");
    var s_bonus_state = (function (_super) {
        __extends(s_bonus_state, _super);
        function s_bonus_state() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.state = 0; //0表示不可领取，1表示可领取，2表示已领取
            _this.S = proto.MessageType.s_bonus_state;
            return _this;
        }
        s_bonus_state.prototype.init = function (_bonusID, _state) {
            this.bonusID = _bonusID;
            this.state = _state;
            return this;
        };
        s_bonus_state.prototype.encode = function (by) {
            by.writeUTF(this.bonusID);
            by.writeByte(this.state);
        };
        s_bonus_state.prototype.decode = function (by) {
            this.bonusID = by.readUTF();
            this.state = by.readUnsignedByte();
        };
        return s_bonus_state;
    }(proto.Pro));
    proto.s_bonus_state = s_bonus_state;
    __reflect(s_bonus_state.prototype, "proto.s_bonus_state");
    var c_bonus_get = (function (_super) {
        __extends(c_bonus_get, _super);
        function c_bonus_get() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_bonus_get;
            return _this;
        }
        c_bonus_get.prototype.init = function (_bonusID) {
            this.bonusID = _bonusID;
            return this;
        };
        c_bonus_get.prototype.encode = function (by) {
            by.writeUTF(this.bonusID);
        };
        c_bonus_get.prototype.decode = function (by) {
            this.bonusID = by.readUTF();
        };
        return c_bonus_get;
    }(proto.Pro));
    proto.c_bonus_get = c_bonus_get;
    __reflect(c_bonus_get.prototype, "proto.c_bonus_get");
    var c_bonus_getLixian = (function (_super) {
        __extends(c_bonus_getLixian, _super);
        function c_bonus_getLixian() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.bonusType = 0; //获取离线奖励的类型
            _this.S = proto.MessageType.c_bonus_getLixian;
            return _this;
        }
        c_bonus_getLixian.prototype.init = function (_bonusType) {
            this.bonusType = _bonusType;
            return this;
        };
        c_bonus_getLixian.prototype.encode = function (by) {
            by.writeByte(this.bonusType);
        };
        c_bonus_getLixian.prototype.decode = function (by) {
            this.bonusType = by.readUnsignedByte();
        };
        return c_bonus_getLixian;
    }(proto.Pro));
    proto.c_bonus_getLixian = c_bonus_getLixian;
    __reflect(c_bonus_getLixian.prototype, "proto.c_bonus_getLixian");
    var s_bonus_lixian = (function (_super) {
        __extends(s_bonus_lixian, _super);
        function s_bonus_lixian() {
            var _this = _super.call(this) || this;
            //required>short
            _this.minie = 0; //离线分钟数
            //required>int
            _this.gold = 0; //奖励金币
            //required>int
            _this.exp = 0; //奖励经验
            _this.S = proto.MessageType.s_bonus_lixian;
            return _this;
        }
        s_bonus_lixian.prototype.init = function (_minie, _gold, _exp) {
            this.minie = _minie;
            this.gold = _gold;
            this.exp = _exp;
            return this;
        };
        s_bonus_lixian.prototype.encode = function (by) {
            by.writeShort(this.minie);
            by.writeInt(this.gold);
            by.writeInt(this.exp);
        };
        s_bonus_lixian.prototype.decode = function (by) {
            this.minie = by.readShort();
            this.gold = by.readInt();
            this.exp = by.readInt();
        };
        return s_bonus_lixian;
    }(proto.Pro));
    proto.s_bonus_lixian = s_bonus_lixian;
    __reflect(s_bonus_lixian.prototype, "proto.s_bonus_lixian");
    var s_LiveNess = (function (_super) {
        __extends(s_LiveNess, _super);
        function s_LiveNess() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.count = 0; //次数
            _this.S = proto.MessageType.s_LiveNess;
            return _this;
        }
        s_LiveNess.prototype.init = function (_liveID, _count) {
            this.liveID = _liveID;
            this.count = _count;
            return this;
        };
        s_LiveNess.prototype.encode = function (by) {
            by.writeUTF(this.liveID);
            by.writeByte(this.count);
        };
        s_LiveNess.prototype.decode = function (by) {
            this.liveID = by.readUTF();
            this.count = by.readUnsignedByte();
        };
        return s_LiveNess;
    }(proto.Pro));
    proto.s_LiveNess = s_LiveNess;
    __reflect(s_LiveNess.prototype, "proto.s_LiveNess");
    var c_team_create = (function (_super) {
        __extends(c_team_create, _super);
        function c_team_create() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_team_create;
            return _this;
        }
        c_team_create.prototype.init = function () {
            return this;
        };
        c_team_create.prototype.encode = function (by) {
        };
        c_team_create.prototype.decode = function (by) {
        };
        return c_team_create;
    }(proto.Pro));
    proto.c_team_create = c_team_create;
    __reflect(c_team_create.prototype, "proto.c_team_create");
    var s_team_info = (function (_super) {
        __extends(s_team_info, _super);
        function s_team_info() {
            var _this = _super.call(this) || this;
            //required>int
            _this.teamleader = 0; //队长名
            _this.S = proto.MessageType.s_team_info;
            return _this;
        }
        s_team_info.prototype.init = function (_teamleader, _members) {
            this.teamleader = _teamleader;
            this.members = _members;
            return this;
        };
        s_team_info.prototype.encode = function (by) {
            by.writeInt(this.teamleader);
            if (this.members != null) {
                by.writeShort(this.members.length);
                for (var i = 0; i < this.members.length; i++) {
                    this.members[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_team_info.prototype.decode = function (by) {
            this.teamleader = by.readInt();
            var __count1 = by.readShort();
            this.members = [];
            for (var i = 0; i < __count1; i++) {
                this.members[i] = new MemberItem();
                this.members[i].decode(by);
            }
        };
        return s_team_info;
    }(proto.Pro));
    proto.s_team_info = s_team_info;
    __reflect(s_team_info.prototype, "proto.s_team_info");
    var MemberItem = (function (_super) {
        __extends(MemberItem, _super);
        function MemberItem() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //唯一ID
            //required>byte
            _this.reborn = 0; //几转
            //required>byte
            _this.lev = 0; //等级
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.MemberItem;
            return _this;
        }
        MemberItem.prototype.init = function (_uid, _name, _reborn, _lev, _job, _models) {
            this.uid = _uid;
            this.name = _name;
            this.reborn = _reborn;
            this.lev = _lev;
            this.job = _job;
            this.models = _models;
            return this;
        };
        MemberItem.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeUTF(this.name);
            by.writeByte(this.reborn);
            by.writeByte(this.lev);
            by.writeByte(this.job);
            if (this.models != null) {
                by.writeShort(this.models.length);
                for (var i = 0; i < this.models.length; i++) {
                    by.writeShort(this.models[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        MemberItem.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.name = by.readUTF();
            this.reborn = by.readUnsignedByte();
            this.lev = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
            var __count5 = by.readShort();
            this.models = [];
            for (var i = 0; i < __count5; i++) {
                this.models[i] = by.readShort();
            }
        };
        return MemberItem;
    }(proto.Pro));
    proto.MemberItem = MemberItem;
    __reflect(MemberItem.prototype, "proto.MemberItem");
    var c_team_add = (function (_super) {
        __extends(c_team_add, _super);
        function c_team_add() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_team_add;
            return _this;
        }
        c_team_add.prototype.init = function (_name) {
            this.name = _name;
            return this;
        };
        c_team_add.prototype.encode = function (by) {
            by.writeUTF(this.name);
        };
        c_team_add.prototype.decode = function (by) {
            this.name = by.readUTF();
        };
        return c_team_add;
    }(proto.Pro));
    proto.c_team_add = c_team_add;
    __reflect(c_team_add.prototype, "proto.c_team_add");
    var c_team_remove = (function (_super) {
        __extends(c_team_remove, _super);
        function c_team_remove() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //undefined
            _this.S = proto.MessageType.c_team_remove;
            return _this;
        }
        c_team_remove.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        c_team_remove.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        c_team_remove.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return c_team_remove;
    }(proto.Pro));
    proto.c_team_remove = c_team_remove;
    __reflect(c_team_remove.prototype, "proto.c_team_remove");
    var c_team_list = (function (_super) {
        __extends(c_team_list, _super);
        function c_team_list() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_team_list;
            return _this;
        }
        c_team_list.prototype.init = function () {
            return this;
        };
        c_team_list.prototype.encode = function (by) {
        };
        c_team_list.prototype.decode = function (by) {
        };
        return c_team_list;
    }(proto.Pro));
    proto.c_team_list = c_team_list;
    __reflect(c_team_list.prototype, "proto.c_team_list");
    var s_team_list = (function (_super) {
        __extends(s_team_list, _super);
        function s_team_list() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_team_list;
            return _this;
        }
        s_team_list.prototype.init = function (_teams) {
            this.teams = _teams;
            return this;
        };
        s_team_list.prototype.encode = function (by) {
            if (this.teams != null) {
                by.writeShort(this.teams.length);
                for (var i = 0; i < this.teams.length; i++) {
                    this.teams[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_team_list.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.teams = [];
            for (var i = 0; i < __count0; i++) {
                this.teams[i] = new TeamItem();
                this.teams[i].decode(by);
            }
        };
        return s_team_list;
    }(proto.Pro));
    proto.s_team_list = s_team_list;
    __reflect(s_team_list.prototype, "proto.s_team_list");
    var TeamItem = (function (_super) {
        __extends(TeamItem, _super);
        function TeamItem() {
            var _this = _super.call(this) || this;
            //required>int
            _this.teamid = 0; //队伍唯一ID
            //required>int
            _this.num = 0; //人数
            _this.S = proto.MessageType.TeamItem;
            return _this;
        }
        TeamItem.prototype.init = function (_teamid, _num, _leader) {
            this.teamid = _teamid;
            this.num = _num;
            this.leader = _leader;
            return this;
        };
        TeamItem.prototype.encode = function (by) {
            by.writeInt(this.teamid);
            by.writeInt(this.num);
            this.leader.encode(by);
        };
        TeamItem.prototype.decode = function (by) {
            this.teamid = by.readInt();
            this.num = by.readInt();
            this.leader = new MemberItem();
            this.leader.decode(by);
        };
        return TeamItem;
    }(proto.Pro));
    proto.TeamItem = TeamItem;
    __reflect(TeamItem.prototype, "proto.TeamItem");
    var c_team_apply = (function (_super) {
        __extends(c_team_apply, _super);
        function c_team_apply() {
            var _this = _super.call(this) || this;
            //required>int
            _this.teamid = 0; //队伍唯一ID
            _this.S = proto.MessageType.c_team_apply;
            return _this;
        }
        c_team_apply.prototype.init = function (_teamid) {
            this.teamid = _teamid;
            return this;
        };
        c_team_apply.prototype.encode = function (by) {
            by.writeInt(this.teamid);
        };
        c_team_apply.prototype.decode = function (by) {
            this.teamid = by.readInt();
        };
        return c_team_apply;
    }(proto.Pro));
    proto.c_team_apply = c_team_apply;
    __reflect(c_team_apply.prototype, "proto.c_team_apply");
    var c_team_appoint = (function (_super) {
        __extends(c_team_appoint, _super);
        function c_team_appoint() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //要移交的队长
            _this.S = proto.MessageType.c_team_appoint;
            return _this;
        }
        c_team_appoint.prototype.init = function (_uid) {
            this.uid = _uid;
            return this;
        };
        c_team_appoint.prototype.encode = function (by) {
            by.writeInt(this.uid);
        };
        c_team_appoint.prototype.decode = function (by) {
            this.uid = by.readInt();
        };
        return c_team_appoint;
    }(proto.Pro));
    proto.c_team_appoint = c_team_appoint;
    __reflect(c_team_appoint.prototype, "proto.c_team_appoint");
    var c_team_disband = (function (_super) {
        __extends(c_team_disband, _super);
        function c_team_disband() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_team_disband;
            return _this;
        }
        c_team_disband.prototype.init = function () {
            return this;
        };
        c_team_disband.prototype.encode = function (by) {
        };
        c_team_disband.prototype.decode = function (by) {
        };
        return c_team_disband;
    }(proto.Pro));
    proto.c_team_disband = c_team_disband;
    __reflect(c_team_disband.prototype, "proto.c_team_disband");
    var s_team_disband = (function (_super) {
        __extends(s_team_disband, _super);
        function s_team_disband() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_team_disband;
            return _this;
        }
        s_team_disband.prototype.init = function (_leader) {
            this.leader = _leader;
            return this;
        };
        s_team_disband.prototype.encode = function (by) {
            by.writeUTF(this.leader);
        };
        s_team_disband.prototype.decode = function (by) {
            this.leader = by.readUTF();
        };
        return s_team_disband;
    }(proto.Pro));
    proto.s_team_disband = s_team_disband;
    __reflect(s_team_disband.prototype, "proto.s_team_disband");
    var s_team_leave = (function (_super) {
        __extends(s_team_leave, _super);
        function s_team_leave() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_team_leave;
            return _this;
        }
        s_team_leave.prototype.init = function () {
            return this;
        };
        s_team_leave.prototype.encode = function (by) {
        };
        s_team_leave.prototype.decode = function (by) {
        };
        return s_team_leave;
    }(proto.Pro));
    proto.s_team_leave = s_team_leave;
    __reflect(s_team_leave.prototype, "proto.s_team_leave");
    var s_team_invite = (function (_super) {
        __extends(s_team_invite, _super);
        function s_team_invite() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //申请类型
            //required>int
            _this.uid = 0; //唯一ID
            //required>byte
            _this.lev = 0; //等级
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.s_team_invite;
            return _this;
        }
        s_team_invite.prototype.init = function (_flag, _uid, _name, _lev, _job) {
            this.flag = _flag;
            this.uid = _uid;
            this.name = _name;
            this.lev = _lev;
            this.job = _job;
            return this;
        };
        s_team_invite.prototype.encode = function (by) {
            by.writeByte(this.flag);
            by.writeInt(this.uid);
            by.writeUTF(this.name);
            by.writeByte(this.lev);
            by.writeByte(this.job);
        };
        s_team_invite.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
            this.uid = by.readInt();
            this.name = by.readUTF();
            this.lev = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
        };
        return s_team_invite;
    }(proto.Pro));
    proto.s_team_invite = s_team_invite;
    __reflect(s_team_invite.prototype, "proto.s_team_invite");
    var c_team_confirm = (function (_super) {
        __extends(c_team_confirm, _super);
        function c_team_confirm() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //undefined
            //required>int
            _this.uid = 0; //对方的uID
            _this.S = proto.MessageType.c_team_confirm;
            return _this;
        }
        c_team_confirm.prototype.init = function (_flag, _isAccept, _uid) {
            this.flag = _flag;
            this.isAccept = _isAccept;
            this.uid = _uid;
            return this;
        };
        c_team_confirm.prototype.encode = function (by) {
            by.writeByte(this.flag);
            by.writeBoolean(this.isAccept);
            by.writeInt(this.uid);
        };
        c_team_confirm.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
            this.isAccept = by.readBoolean();
            this.uid = by.readInt();
        };
        return c_team_confirm;
    }(proto.Pro));
    proto.c_team_confirm = c_team_confirm;
    __reflect(c_team_confirm.prototype, "proto.c_team_confirm");
    var c_team_quick = (function (_super) {
        __extends(c_team_quick, _super);
        function c_team_quick() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_team_quick;
            return _this;
        }
        c_team_quick.prototype.init = function () {
            return this;
        };
        c_team_quick.prototype.encode = function (by) {
        };
        c_team_quick.prototype.decode = function (by) {
        };
        return c_team_quick;
    }(proto.Pro));
    proto.c_team_quick = c_team_quick;
    __reflect(c_team_quick.prototype, "proto.c_team_quick");
    var c_look_fujin = (function (_super) {
        __extends(c_look_fujin, _super);
        function c_look_fujin() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_look_fujin;
            return _this;
        }
        c_look_fujin.prototype.init = function () {
            return this;
        };
        c_look_fujin.prototype.encode = function (by) {
        };
        c_look_fujin.prototype.decode = function (by) {
        };
        return c_look_fujin;
    }(proto.Pro));
    proto.c_look_fujin = c_look_fujin;
    __reflect(c_look_fujin.prototype, "proto.c_look_fujin");
    var s_look_infos = (function (_super) {
        __extends(s_look_infos, _super);
        function s_look_infos() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_look_infos;
            return _this;
        }
        s_look_infos.prototype.init = function (_players) {
            this.players = _players;
            return this;
        };
        s_look_infos.prototype.encode = function (by) {
            if (this.players != null) {
                by.writeShort(this.players.length);
                for (var i = 0; i < this.players.length; i++) {
                    this.players[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_look_infos.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.players = [];
            for (var i = 0; i < __count0; i++) {
                this.players[i] = new PlayerDesc();
                this.players[i].decode(by);
            }
        };
        return s_look_infos;
    }(proto.Pro));
    proto.s_look_infos = s_look_infos;
    __reflect(s_look_infos.prototype, "proto.s_look_infos");
    var PlayerDesc = (function (_super) {
        __extends(PlayerDesc, _super);
        function PlayerDesc() {
            var _this = _super.call(this) || this;
            //required>int
            _this.uid = 0; //唯一ID
            //required>byte
            _this.reborn = 0; //几转
            //required>byte
            _this.lev = 0; //等级
            //required>byte
            _this.job = 0; //职业
            _this.S = proto.MessageType.PlayerDesc;
            return _this;
        }
        PlayerDesc.prototype.init = function (_uid, _name, _reborn, _lev, _job, _guildname) {
            this.uid = _uid;
            this.name = _name;
            this.reborn = _reborn;
            this.lev = _lev;
            this.job = _job;
            this.guildname = _guildname;
            return this;
        };
        PlayerDesc.prototype.encode = function (by) {
            by.writeInt(this.uid);
            by.writeUTF(this.name);
            by.writeByte(this.reborn);
            by.writeByte(this.lev);
            by.writeByte(this.job);
            by.writeUTF(this.guildname);
        };
        PlayerDesc.prototype.decode = function (by) {
            this.uid = by.readInt();
            this.name = by.readUTF();
            this.reborn = by.readUnsignedByte();
            this.lev = by.readUnsignedByte();
            this.job = by.readUnsignedByte();
            this.guildname = by.readUTF();
        };
        return PlayerDesc;
    }(proto.Pro));
    proto.PlayerDesc = PlayerDesc;
    __reflect(PlayerDesc.prototype, "proto.PlayerDesc");
    var c_IO_Connect = (function (_super) {
        __extends(c_IO_Connect, _super);
        function c_IO_Connect() {
            var _this = _super.call(this) || this;
            //required>int
            _this.ioID = 0; //连入的ioID
            _this.S = proto.MessageType.c_IO_Connect;
            return _this;
        }
        c_IO_Connect.prototype.init = function (_ioID) {
            this.ioID = _ioID;
            return this;
        };
        c_IO_Connect.prototype.encode = function (by) {
            by.writeInt(this.ioID);
        };
        c_IO_Connect.prototype.decode = function (by) {
            this.ioID = by.readInt();
        };
        return c_IO_Connect;
    }(proto.Pro));
    proto.c_IO_Connect = c_IO_Connect;
    __reflect(c_IO_Connect.prototype, "proto.c_IO_Connect");
    var c_IO_close = (function (_super) {
        __extends(c_IO_close, _super);
        function c_IO_close() {
            var _this = _super.call(this) || this;
            //required>int
            _this.ioID = 0; //断开的ioID
            _this.S = proto.MessageType.c_IO_close;
            return _this;
        }
        c_IO_close.prototype.init = function (_ioID) {
            this.ioID = _ioID;
            return this;
        };
        c_IO_close.prototype.encode = function (by) {
            by.writeInt(this.ioID);
        };
        c_IO_close.prototype.decode = function (by) {
            this.ioID = by.readInt();
        };
        return c_IO_close;
    }(proto.Pro));
    proto.c_IO_close = c_IO_close;
    __reflect(c_IO_close.prototype, "proto.c_IO_close");
    var s_RandShop_updateMoney = (function (_super) {
        __extends(s_RandShop_updateMoney, _super);
        function s_RandShop_updateMoney() {
            var _this = _super.call(this) || this;
            //required>int
            _this.needmoney = 0; //下次刷新所需金币
            _this.S = proto.MessageType.s_RandShop_updateMoney;
            return _this;
        }
        s_RandShop_updateMoney.prototype.init = function (_needmoney) {
            this.needmoney = _needmoney;
            return this;
        };
        s_RandShop_updateMoney.prototype.encode = function (by) {
            by.writeInt(this.needmoney);
        };
        s_RandShop_updateMoney.prototype.decode = function (by) {
            this.needmoney = by.readInt();
        };
        return s_RandShop_updateMoney;
    }(proto.Pro));
    proto.s_RandShop_updateMoney = s_RandShop_updateMoney;
    __reflect(s_RandShop_updateMoney.prototype, "proto.s_RandShop_updateMoney");
    var s_RandShop = (function (_super) {
        __extends(s_RandShop, _super);
        function s_RandShop() {
            var _this = _super.call(this) || this;
            //required>short
            _this.count = 0; //剩余数量
            //required>short
            _this.total = 0; //总量
            //required>byte
            _this.type = 0; //货币种类
            //required>int
            _this.price = 0; //单价
            _this.S = proto.MessageType.s_RandShop;
            return _this;
        }
        s_RandShop.prototype.init = function (_goodsID, _itemID, _count, _total, _type, _price) {
            this.goodsID = _goodsID;
            this.itemID = _itemID;
            this.count = _count;
            this.total = _total;
            this.type = _type;
            this.price = _price;
            return this;
        };
        s_RandShop.prototype.encode = function (by) {
            by.writeUTF(this.goodsID);
            by.writeUTF(this.itemID);
            by.writeShort(this.count);
            by.writeShort(this.total);
            by.writeByte(this.type);
            by.writeInt(this.price);
        };
        s_RandShop.prototype.decode = function (by) {
            this.goodsID = by.readUTF();
            this.itemID = by.readUTF();
            this.count = by.readShort();
            this.total = by.readShort();
            this.type = by.readUnsignedByte();
            this.price = by.readInt();
        };
        return s_RandShop;
    }(proto.Pro));
    proto.s_RandShop = s_RandShop;
    __reflect(s_RandShop.prototype, "proto.s_RandShop");
    var s_RandShopList = (function (_super) {
        __extends(s_RandShopList, _super);
        function s_RandShopList() {
            var _this = _super.call(this) || this;
            //required>int
            _this.nextTime = 0; //下次刷新时间
            _this.S = proto.MessageType.s_RandShopList;
            return _this;
        }
        s_RandShopList.prototype.init = function (_nextTime, _items) {
            this.nextTime = _nextTime;
            this.items = _items;
            return this;
        };
        s_RandShopList.prototype.encode = function (by) {
            by.writeInt(this.nextTime);
            if (this.items != null) {
                by.writeShort(this.items.length);
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_RandShopList.prototype.decode = function (by) {
            this.nextTime = by.readInt();
            var __count1 = by.readShort();
            this.items = [];
            for (var i = 0; i < __count1; i++) {
                this.items[i] = new s_RandShop();
                this.items[i].decode(by);
            }
        };
        return s_RandShopList;
    }(proto.Pro));
    proto.s_RandShopList = s_RandShopList;
    __reflect(s_RandShopList.prototype, "proto.s_RandShopList");
    var c_RandShop_update = (function (_super) {
        __extends(c_RandShop_update, _super);
        function c_RandShop_update() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_RandShop_update;
            return _this;
        }
        c_RandShop_update.prototype.init = function () {
            return this;
        };
        c_RandShop_update.prototype.encode = function (by) {
        };
        c_RandShop_update.prototype.decode = function (by) {
        };
        return c_RandShop_update;
    }(proto.Pro));
    proto.c_RandShop_update = c_RandShop_update;
    __reflect(c_RandShop_update.prototype, "proto.c_RandShop_update");
    var c_RandShop_buy = (function (_super) {
        __extends(c_RandShop_buy, _super);
        function c_RandShop_buy() {
            var _this = _super.call(this) || this;
            //required>int
            _this.count = 0; //购买数量
            _this.S = proto.MessageType.c_RandShop_buy;
            return _this;
        }
        c_RandShop_buy.prototype.init = function (_goodsID, _count) {
            this.goodsID = _goodsID;
            this.count = _count;
            return this;
        };
        c_RandShop_buy.prototype.encode = function (by) {
            by.writeUTF(this.goodsID);
            by.writeInt(this.count);
        };
        c_RandShop_buy.prototype.decode = function (by) {
            this.goodsID = by.readUTF();
            this.count = by.readInt();
        };
        return c_RandShop_buy;
    }(proto.Pro));
    proto.c_RandShop_buy = c_RandShop_buy;
    __reflect(c_RandShop_buy.prototype, "proto.c_RandShop_buy");
    var c_GetTurnList = (function (_super) {
        __extends(c_GetTurnList, _super);
        function c_GetTurnList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_GetTurnList;
            return _this;
        }
        c_GetTurnList.prototype.init = function () {
            return this;
        };
        c_GetTurnList.prototype.encode = function (by) {
        };
        c_GetTurnList.prototype.decode = function (by) {
        };
        return c_GetTurnList;
    }(proto.Pro));
    proto.c_GetTurnList = c_GetTurnList;
    __reflect(c_GetTurnList.prototype, "proto.c_GetTurnList");
    var s_TurnList = (function (_super) {
        __extends(s_TurnList, _super);
        function s_TurnList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_TurnList;
            return _this;
        }
        s_TurnList.prototype.init = function (_items) {
            this.items = _items;
            return this;
        };
        s_TurnList.prototype.encode = function (by) {
            if (this.items != null) {
                by.writeShort(this.items.length);
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_TurnList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.items = [];
            for (var i = 0; i < __count0; i++) {
                this.items[i] = new TurnItem();
                this.items[i].decode(by);
            }
        };
        return s_TurnList;
    }(proto.Pro));
    proto.s_TurnList = s_TurnList;
    __reflect(s_TurnList.prototype, "proto.s_TurnList");
    var c_turn_start = (function (_super) {
        __extends(c_turn_start, _super);
        function c_turn_start() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.index = 0; //点击的哪种方式按钮
            //required>byte
            _this.count = 0; //旋转次数
            _this.S = proto.MessageType.c_turn_start;
            return _this;
        }
        c_turn_start.prototype.init = function (_index, _count) {
            this.index = _index;
            this.count = _count;
            return this;
        };
        c_turn_start.prototype.encode = function (by) {
            by.writeByte(this.index);
            by.writeByte(this.count);
        };
        c_turn_start.prototype.decode = function (by) {
            this.index = by.readUnsignedByte();
            this.count = by.readUnsignedByte();
        };
        return c_turn_start;
    }(proto.Pro));
    proto.c_turn_start = c_turn_start;
    __reflect(c_turn_start.prototype, "proto.c_turn_start");
    var s_turn_result = (function (_super) {
        __extends(s_turn_result, _super);
        function s_turn_result() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.index = 0; //旋转结果
            _this.S = proto.MessageType.s_turn_result;
            return _this;
        }
        s_turn_result.prototype.init = function (_index) {
            this.index = _index;
            return this;
        };
        s_turn_result.prototype.encode = function (by) {
            by.writeByte(this.index);
        };
        s_turn_result.prototype.decode = function (by) {
            this.index = by.readUnsignedByte();
        };
        return s_turn_result;
    }(proto.Pro));
    proto.s_turn_result = s_turn_result;
    __reflect(s_turn_result.prototype, "proto.s_turn_result");
    var c_turn_over = (function (_super) {
        __extends(c_turn_over, _super);
        function c_turn_over() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_turn_over;
            return _this;
        }
        c_turn_over.prototype.init = function () {
            return this;
        };
        c_turn_over.prototype.encode = function (by) {
        };
        c_turn_over.prototype.decode = function (by) {
        };
        return c_turn_over;
    }(proto.Pro));
    proto.c_turn_over = c_turn_over;
    __reflect(c_turn_over.prototype, "proto.c_turn_over");
    var s_turn_over = (function (_super) {
        __extends(s_turn_over, _super);
        function s_turn_over() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_turn_over;
            return _this;
        }
        s_turn_over.prototype.init = function () {
            return this;
        };
        s_turn_over.prototype.encode = function (by) {
        };
        s_turn_over.prototype.decode = function (by) {
        };
        return s_turn_over;
    }(proto.Pro));
    proto.s_turn_over = s_turn_over;
    __reflect(s_turn_over.prototype, "proto.s_turn_over");
    var TurnItem = (function (_super) {
        __extends(TurnItem, _super);
        function TurnItem() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.count = 0; //数量
            _this.S = proto.MessageType.TurnItem;
            return _this;
        }
        TurnItem.prototype.init = function (_ItemId, _count) {
            this.ItemId = _ItemId;
            this.count = _count;
            return this;
        };
        TurnItem.prototype.encode = function (by) {
            by.writeUTF(this.ItemId);
            by.writeByte(this.count);
        };
        TurnItem.prototype.decode = function (by) {
            this.ItemId = by.readUTF();
            this.count = by.readUnsignedByte();
        };
        return TurnItem;
    }(proto.Pro));
    proto.TurnItem = TurnItem;
    __reflect(TurnItem.prototype, "proto.TurnItem");
    var s_turn_notice = (function (_super) {
        __extends(s_turn_notice, _super);
        function s_turn_notice() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.count = 0; //物品数量
            _this.S = proto.MessageType.s_turn_notice;
            return _this;
        }
        s_turn_notice.prototype.init = function (_name, _itemID, _count) {
            this.name = _name;
            this.itemID = _itemID;
            this.count = _count;
            return this;
        };
        s_turn_notice.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeUTF(this.itemID);
            by.writeByte(this.count);
        };
        s_turn_notice.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.itemID = by.readUTF();
            this.count = by.readUnsignedByte();
        };
        return s_turn_notice;
    }(proto.Pro));
    proto.s_turn_notice = s_turn_notice;
    __reflect(s_turn_notice.prototype, "proto.s_turn_notice");
    var s_SBK_aff = (function (_super) {
        __extends(s_SBK_aff, _super);
        function s_SBK_aff() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.holdtime = 0; //已经占领的时间
            //required>byte
            _this.status = 0; //攻城状态
            _this.S = proto.MessageType.s_SBK_aff;
            return _this;
        }
        s_SBK_aff.prototype.init = function (_guildID, _guildname, _chatelain, _f_chatelain, _elder, _mater, _holdtime, _nextstart, _status) {
            this.guildID = _guildID;
            this.guildname = _guildname;
            this.chatelain = _chatelain;
            this.f_chatelain = _f_chatelain;
            this.elder = _elder;
            this.mater = _mater;
            this.holdtime = _holdtime;
            this.nextstart = _nextstart;
            this.status = _status;
            return this;
        };
        s_SBK_aff.prototype.encode = function (by) {
            by.writeUTF(this.guildID);
            by.writeUTF(this.guildname);
            by.writeUTF(this.chatelain);
            by.writeUTF(this.f_chatelain);
            by.writeUTF(this.elder);
            by.writeUTF(this.mater);
            by.writeByte(this.holdtime);
            by.writeUTF(this.nextstart);
            by.writeByte(this.status);
        };
        s_SBK_aff.prototype.decode = function (by) {
            this.guildID = by.readUTF();
            this.guildname = by.readUTF();
            this.chatelain = by.readUTF();
            this.f_chatelain = by.readUTF();
            this.elder = by.readUTF();
            this.mater = by.readUTF();
            this.holdtime = by.readUnsignedByte();
            this.nextstart = by.readUTF();
            this.status = by.readUnsignedByte();
        };
        return s_SBK_aff;
    }(proto.Pro));
    proto.s_SBK_aff = s_SBK_aff;
    __reflect(s_SBK_aff.prototype, "proto.s_SBK_aff");
    var c_SBK_btnindex = (function (_super) {
        __extends(c_SBK_btnindex, _super);
        function c_SBK_btnindex() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.index = 0; //0
            _this.S = proto.MessageType.c_SBK_btnindex;
            return _this;
        }
        c_SBK_btnindex.prototype.init = function (_index) {
            this.index = _index;
            return this;
        };
        c_SBK_btnindex.prototype.encode = function (by) {
            by.writeByte(this.index);
        };
        c_SBK_btnindex.prototype.decode = function (by) {
            this.index = by.readUnsignedByte();
        };
        return c_SBK_btnindex;
    }(proto.Pro));
    proto.c_SBK_btnindex = c_SBK_btnindex;
    __reflect(c_SBK_btnindex.prototype, "proto.c_SBK_btnindex");
    var s_SBK_btnstatus = (function (_super) {
        __extends(s_SBK_btnstatus, _super);
        function s_SBK_btnstatus() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.s_SBK_btnstatus;
            return _this;
        }
        s_SBK_btnstatus.prototype.init = function (_status) {
            this.status = _status;
            return this;
        };
        s_SBK_btnstatus.prototype.encode = function (by) {
            if (this.status != null) {
                by.writeShort(this.status.length);
                for (var i = 0; i < this.status.length; i++) {
                    by.writeByte(this.status[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_SBK_btnstatus.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.status = [];
            for (var i = 0; i < __count0; i++) {
                this.status[i] = by.readUnsignedByte();
            }
        };
        return s_SBK_btnstatus;
    }(proto.Pro));
    proto.s_SBK_btnstatus = s_SBK_btnstatus;
    __reflect(s_SBK_btnstatus.prototype, "proto.s_SBK_btnstatus");
    var c_GetRank = (function (_super) {
        __extends(c_GetRank, _super);
        function c_GetRank() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //排行标识
            _this.S = proto.MessageType.c_GetRank;
            return _this;
        }
        c_GetRank.prototype.init = function (_flag) {
            this.flag = _flag;
            return this;
        };
        c_GetRank.prototype.encode = function (by) {
            by.writeByte(this.flag);
        };
        c_GetRank.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
        };
        return c_GetRank;
    }(proto.Pro));
    proto.c_GetRank = c_GetRank;
    __reflect(c_GetRank.prototype, "proto.c_GetRank");
    var s_ph_Rank = (function (_super) {
        __extends(s_ph_Rank, _super);
        function s_ph_Rank() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.flag = 0; //排行标识
            _this.S = proto.MessageType.s_ph_Rank;
            return _this;
        }
        s_ph_Rank.prototype.init = function (_flag, _lists) {
            this.flag = _flag;
            this.lists = _lists;
            return this;
        };
        s_ph_Rank.prototype.encode = function (by) {
            by.writeByte(this.flag);
            if (this.lists != null) {
                by.writeShort(this.lists.length);
                for (var i = 0; i < this.lists.length; i++) {
                    this.lists[i].encode(by);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        s_ph_Rank.prototype.decode = function (by) {
            this.flag = by.readUnsignedByte();
            var __count1 = by.readShort();
            this.lists = [];
            for (var i = 0; i < __count1; i++) {
                this.lists[i] = new RankInfo();
                this.lists[i].decode(by);
            }
        };
        return s_ph_Rank;
    }(proto.Pro));
    proto.s_ph_Rank = s_ph_Rank;
    __reflect(s_ph_Rank.prototype, "proto.s_ph_Rank");
    var req_Login = (function (_super) {
        __extends(req_Login, _super);
        function req_Login() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.req_Login;
            return _this;
        }
        req_Login.prototype.init = function (_name, _pass) {
            this.name = _name;
            this.pass = _pass;
            return this;
        };
        req_Login.prototype.encode = function (by) {
            by.writeUTF(this.name);
            by.writeUTF(this.pass);
        };
        req_Login.prototype.decode = function (by) {
            this.name = by.readUTF();
            this.pass = by.readUTF();
        };
        return req_Login;
    }(proto.Pro));
    proto.req_Login = req_Login;
    __reflect(req_Login.prototype, "proto.req_Login");
    var res_Login = (function (_super) {
        __extends(res_Login, _super);
        function res_Login() {
            var _this = _super.call(this) || this;
            //public>byte
            _this.status = 0; //0表示正常，>0表示异常
            _this.S = proto.MessageType.res_Login;
            return _this;
        }
        res_Login.prototype.init = function (_status, _session, _error) {
            this.status = _status;
            this.session = _session;
            this.error = _error;
            return this;
        };
        res_Login.prototype.encode = function (by) {
            by.writeByte(this.status);
            if (this.session != null) {
                by.writeByte(1);
                by.writeUTF(this.session);
            }
            else {
                by.writeByte(0);
            }
            if (this.error != null) {
                by.writeByte(1);
                by.writeUTF(this.error);
            }
            else {
                by.writeByte(0);
            }
        };
        res_Login.prototype.decode = function (by) {
            this.status = by.readUnsignedByte();
            if (by.readByte() > 0) {
                this.session = by.readUTF();
            }
            if (by.readByte() > 0) {
                this.error = by.readUTF();
            }
        };
        return res_Login;
    }(proto.Pro));
    proto.res_Login = res_Login;
    __reflect(res_Login.prototype, "proto.res_Login");
    var req_BroadCast = (function (_super) {
        __extends(req_BroadCast, _super);
        function req_BroadCast() {
            var _this = _super.call(this) || this;
            //required>int
            _this.ID = 0; //公告ID
            _this.S = proto.MessageType.req_BroadCast;
            return _this;
        }
        req_BroadCast.prototype.init = function (_ID, _title, _content) {
            this.ID = _ID;
            this.title = _title;
            this.content = _content;
            return this;
        };
        req_BroadCast.prototype.encode = function (by) {
            by.writeInt(this.ID);
            by.writeUTF(this.title);
            by.writeUTF(this.content);
        };
        req_BroadCast.prototype.decode = function (by) {
            this.ID = by.readInt();
            this.title = by.readUTF();
            this.content = by.readUTF();
        };
        return req_BroadCast;
    }(proto.Pro));
    proto.req_BroadCast = req_BroadCast;
    __reflect(req_BroadCast.prototype, "proto.req_BroadCast");
    var req_SendMail = (function (_super) {
        __extends(req_SendMail, _super);
        function req_SendMail() {
            var _this = _super.call(this) || this;
            //optional>int
            _this.gold = 0; //金币
            //optional>int
            _this.money = 0; //元宝
            _this.S = proto.MessageType.req_SendMail;
            return _this;
        }
        req_SendMail.prototype.init = function (_chars, _title, _content, _gold, _money, _items) {
            this.chars = _chars;
            this.title = _title;
            this.content = _content;
            this.gold = _gold;
            this.money = _money;
            this.items = _items;
            return this;
        };
        req_SendMail.prototype.encode = function (by) {
            if (this.chars != null) {
                by.writeShort(this.chars.length);
                for (var i = 0; i < this.chars.length; i++) {
                    by.writeUTF(this.chars[i]);
                }
            }
            else {
                by.writeShort(0);
            }
            by.writeUTF(this.title);
            by.writeUTF(this.content);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.gold);
            //基础类型不建议用optional
            by.writeByte(1);
            by.writeInt(this.money);
            if (this.items != null) {
                by.writeShort(this.items.length);
                for (var i = 0; i < this.items.length; i++) {
                    by.writeUTF(this.items[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        req_SendMail.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.chars = [];
            for (var i = 0; i < __count0; i++) {
                this.chars[i] = by.readUTF();
            }
            this.title = by.readUTF();
            this.content = by.readUTF();
            if (by.readByte() > 0) {
                this.gold = by.readInt();
            }
            if (by.readByte() > 0) {
                this.money = by.readInt();
            }
            var __count5 = by.readShort();
            this.items = [];
            for (var i = 0; i < __count5; i++) {
                this.items[i] = by.readUTF();
            }
        };
        return req_SendMail;
    }(proto.Pro));
    proto.req_SendMail = req_SendMail;
    __reflect(req_SendMail.prototype, "proto.req_SendMail");
    var res_SendMail = (function (_super) {
        __extends(res_SendMail, _super);
        function res_SendMail() {
            var _this = _super.call(this) || this;
            //required>int
            _this.count = 0; //成功发送的条数
            _this.S = proto.MessageType.res_SendMail;
            return _this;
        }
        res_SendMail.prototype.init = function (_count, _chars) {
            this.count = _count;
            this.chars = _chars;
            return this;
        };
        res_SendMail.prototype.encode = function (by) {
            by.writeInt(this.count);
            if (this.chars != null) {
                by.writeShort(this.chars.length);
                for (var i = 0; i < this.chars.length; i++) {
                    by.writeUTF(this.chars[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        res_SendMail.prototype.decode = function (by) {
            this.count = by.readInt();
            var __count1 = by.readShort();
            this.chars = [];
            for (var i = 0; i < __count1; i++) {
                this.chars[i] = by.readUTF();
            }
        };
        return res_SendMail;
    }(proto.Pro));
    proto.res_SendMail = res_SendMail;
    __reflect(res_SendMail.prototype, "proto.res_SendMail");
    var req_RecordList = (function (_super) {
        __extends(req_RecordList, _super);
        function req_RecordList() {
            var _this = _super.call(this) || this;
            //required>int
            _this.datetime = 0; //该日期之后的日志文件列表
            _this.S = proto.MessageType.req_RecordList;
            return _this;
        }
        req_RecordList.prototype.init = function (_datetime, _serverID) {
            this.datetime = _datetime;
            this.serverID = _serverID;
            return this;
        };
        req_RecordList.prototype.encode = function (by) {
            by.writeInt(this.datetime);
            by.writeUTF(this.serverID);
        };
        req_RecordList.prototype.decode = function (by) {
            this.datetime = by.readInt();
            this.serverID = by.readUTF();
        };
        return req_RecordList;
    }(proto.Pro));
    proto.req_RecordList = req_RecordList;
    __reflect(req_RecordList.prototype, "proto.req_RecordList");
    var res_RecordList = (function (_super) {
        __extends(res_RecordList, _super);
        function res_RecordList() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.res_RecordList;
            return _this;
        }
        res_RecordList.prototype.init = function (_files) {
            this.files = _files;
            return this;
        };
        res_RecordList.prototype.encode = function (by) {
            if (this.files != null) {
                by.writeShort(this.files.length);
                for (var i = 0; i < this.files.length; i++) {
                    by.writeUTF(this.files[i]);
                }
            }
            else {
                by.writeShort(0);
            }
        };
        res_RecordList.prototype.decode = function (by) {
            var __count0 = by.readShort();
            this.files = [];
            for (var i = 0; i < __count0; i++) {
                this.files[i] = by.readUTF();
            }
        };
        return res_RecordList;
    }(proto.Pro));
    proto.res_RecordList = res_RecordList;
    __reflect(res_RecordList.prototype, "proto.res_RecordList");
    var s_huodong_status = (function (_super) {
        __extends(s_huodong_status, _super);
        function s_huodong_status() {
            var _this = _super.call(this) || this;
            //required>byte
            _this.status = 0; //0
            _this.S = proto.MessageType.s_huodong_status;
            return _this;
        }
        s_huodong_status.prototype.init = function (_huodongID, _status) {
            this.huodongID = _huodongID;
            this.status = _status;
            return this;
        };
        s_huodong_status.prototype.encode = function (by) {
            by.writeUTF(this.huodongID);
            by.writeByte(this.status);
        };
        s_huodong_status.prototype.decode = function (by) {
            this.huodongID = by.readUTF();
            this.status = by.readUnsignedByte();
        };
        return s_huodong_status;
    }(proto.Pro));
    proto.s_huodong_status = s_huodong_status;
    __reflect(s_huodong_status.prototype, "proto.s_huodong_status");
    var c_huodong_add = (function (_super) {
        __extends(c_huodong_add, _super);
        function c_huodong_add() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_huodong_add;
            return _this;
        }
        c_huodong_add.prototype.init = function (_huodongID) {
            this.huodongID = _huodongID;
            return this;
        };
        c_huodong_add.prototype.encode = function (by) {
            by.writeUTF(this.huodongID);
        };
        c_huodong_add.prototype.decode = function (by) {
            this.huodongID = by.readUTF();
        };
        return c_huodong_add;
    }(proto.Pro));
    proto.c_huodong_add = c_huodong_add;
    __reflect(c_huodong_add.prototype, "proto.c_huodong_add");
    var c_huodong_start = (function (_super) {
        __extends(c_huodong_start, _super);
        function c_huodong_start() {
            var _this = _super.call(this) || this;
            _this.S = proto.MessageType.c_huodong_start;
            return _this;
        }
        c_huodong_start.prototype.init = function (_huodongID) {
            this.huodongID = _huodongID;
            return this;
        };
        c_huodong_start.prototype.encode = function (by) {
            by.writeUTF(this.huodongID);
        };
        c_huodong_start.prototype.decode = function (by) {
            this.huodongID = by.readUTF();
        };
        return c_huodong_start;
    }(proto.Pro));
    proto.c_huodong_start = c_huodong_start;
    __reflect(c_huodong_start.prototype, "proto.c_huodong_start");
})(proto || (proto = {}));
//# sourceMappingURL=Proto.js.map